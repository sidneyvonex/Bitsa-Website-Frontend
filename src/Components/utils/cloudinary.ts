/**
 * Cloudinary Image Upload Utility
 * Handles uploading images to Cloudinary for profile pictures and other media
 * 
 * NOTE: For production, it's recommended to upload through your backend API
 * which can securely handle Cloudinary authentication.
 */

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  error?: {
    message: string;
  };
}

interface UploadOptions {
  folder?: string;
  uploadPreset?: string;
  transformation?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string;
  };
}

/**
 * Upload an image to Cloudinary using a signed request (recommended for production)
 * This requires a backend endpoint to sign the upload
 * @param file - The image file to upload
 * @param backendSignUrl - URL to your backend endpoint that signs Cloudinary uploads
 * @returns Promise with the upload URL
 */
export const uploadToCloudinaryViaBackend = async (
  file: File,
  backendSignUrl: string
): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(backendSignUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Backend upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.secure_url) {
      return data.secure_url;
    }
    throw new Error('No secure_url in response');
  } catch (error) {
    console.error('Backend upload error:', error);
    throw error;
  }
};

/**
 * Upload an image to Cloudinary using an unsigned upload preset
 * Make sure to create an unsigned upload preset in your Cloudinary dashboard
 * @param file - The image file to upload
 * @param options - Upload options
 * @returns Promise with the Cloudinary response
 */
export const uploadToCloudinary = async (
  file: File,
  options: UploadOptions = {}
): Promise<CloudinaryResponse> => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = options.uploadPreset || import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName) {
    throw new Error('Cloudinary cloud name is not configured. Please set VITE_CLOUDINARY_CLOUD_NAME in your .env file.');
  }

  if (!uploadPreset) {
    throw new Error(
      'Cloudinary upload preset is not configured. ' +
      'Please either:\n' +
      '1. Set VITE_CLOUDINARY_UPLOAD_PRESET in your .env file, OR\n' +
      '2. Create an unsigned upload preset in your Cloudinary dashboard (Settings > Upload > Unsigned)'
    );
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  if (options.folder) {
    formData.append('folder', options.folder);
  }

  // Add tags for organization
  formData.append('tags', 'bitsa,profile-images');

  try {
    console.log('Uploading to Cloudinary:', { cloudName, uploadPreset, folder: options.folder });

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Cloudinary response error:', data);
      const errorMessage = data.error?.message || response.statusText;
      throw new Error(
        `Cloudinary upload failed: ${errorMessage}\n\n` +
        'To fix this:\n' +
        '1. Go to https://cloudinary.com/console\n' +
        '2. Settings > Upload\n' +
        `3. Create/Edit an unsigned upload preset named "${uploadPreset}"\n` +
        '4. Set Mode to "Unsigned"\n' +
        '5. Add any allowed file types you want (Images recommended)'
      );
    }

    return data;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

/**
 * Generate a Cloudinary URL with transformations
 * @param publicId - The public ID of the uploaded image
 * @param width - Image width
 * @param height - Image height
 * @param crop - Crop mode (fill, fit, etc.)
 * @returns The transformed Cloudinary URL
 */
export const getCloudinaryUrl = (
  publicId: string,
  width: number = 500,
  height: number = 500,
  crop: string = 'fill'
): string => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    throw new Error('Cloudinary cloud name is not configured');
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/w_${width},h_${height},c_${crop},q_auto/v1/${publicId}`;
};

/**
 * Delete an image from Cloudinary (requires authentication)
 * @param publicId - The public ID of the image to delete
 * @returns Promise indicating success
 */
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
  const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Cloudinary credentials are not configured');
  }

  try {
    // Note: Direct deletion from client-side requires the API secret
    // This should ideally be done from your backend for security
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Basic ${btoa(`${apiKey}:${apiSecret}`)}`,
        },
        body: JSON.stringify({ public_id: publicId }),
      }
    );

    if (!response.ok) {
      throw new Error(`Cloudinary deletion failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    throw error;
  }
};

/**
 * Validate image file before upload
 * @param file - The file to validate
 * @param maxSizeMB - Maximum file size in MB
 * @returns Object with validation result and error message if any
 */
export const validateImageFile = (
  file: File,
  maxSizeMB: number = 5
): { valid: boolean; error?: string } => {
  // Check file type
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.',
    };
  }

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File size exceeds ${maxSizeMB}MB limit.`,
    };
  }

  return { valid: true };
};