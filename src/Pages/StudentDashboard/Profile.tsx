import { useState, useEffect, useRef } from 'react';
import { Mail, GraduationCap, Edit2, Save, X, Camera, Globe, AlertCircle } from 'lucide-react';
import { useGetCurrentUserQuery, useUpdateCurrentUserMutation, useUpdateBioMutation, useUpdateProfilePictureMutation } from '../../features/api/userApi';
import { useUpdateLanguageMutation } from '../../features/api/userApi';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { validateImageFile } from '../../utils/cloudinary';

export const StudentProfile = () => {
  // ============================================================================
  // DATA SOURCES
  // ============================================================================
  // Primary Source: Redux - Always available after login, persists across navigation
  const reduxUser = useAppSelector(selectCurrentUser);
  
  // Secondary Source: API - Fetches additional profile details (bio, picture, language)
  // Only fetches if user is logged in (skip if reduxUser is falsy)
  const { data: userData, isLoading: apiLoading, refetch: refetchUser } = useGetCurrentUserQuery(undefined, {
    skip: !reduxUser,
  });

  // ============================================================================
  // API MUTATIONS
  // ============================================================================
  const [updateUser] = useUpdateCurrentUserMutation();
  const [updateBio] = useUpdateBioMutation();
  const [updateLanguage] = useUpdateLanguageMutation();
  const [updateProfilePicture] = useUpdateProfilePictureMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    firstName: reduxUser?.firstName || '',
    lastName: reduxUser?.lastName || '',
    bio: userData?.user?.bio || userData?.data?.bio || '',
    major: reduxUser?.major || '',
    language: (userData?.user?.language as 'en' | 'sw') || (userData?.data?.language as 'en' | 'sw') || 'en',
  });

  // ============================================================================
  // DATA EXTRACTION & MERGING
  // ============================================================================
  // Extract user data from API response (handles multiple response formats)
  // Backend may return: { user: User }, { data: User }, or other structures
  // Try each format in order of likelihood: userData?.user || userData?.data || userData
  const apiUserData = userData?.user || userData?.data || userData; 
  
  // Merge Redux and API data with Redux as primary source
  // This ensures:
  // 1. Core user data always available (from Redux)
  // 2. Additional details loaded from API
  // 3. No undefined errors if API is slow or fails
  // 4. Real-time updates when API data changes
  const user = {
    ...apiUserData,
    // Use Redux first, fall back to API, then default
    firstName: reduxUser?.firstName || apiUserData?.firstName || '',
    lastName: reduxUser?.lastName || apiUserData?.lastName || '',
    email: reduxUser?.email || apiUserData?.email || '',
    schoolId: reduxUser?.schoolId || apiUserData?.schoolId || '',
    major: reduxUser?.major || apiUserData?.major || '',
    role: reduxUser?.role || apiUserData?.role || '',
    // API-only fields with sensible defaults
    isVerified: apiUserData?.isVerified ?? true,
    isActive: apiUserData?.isActive ?? true,
    bio: apiUserData?.bio || '',
    language: (apiUserData?.language as 'en' | 'sw') || 'en',
    profilePicture: apiUserData?.profilePicture,
  };

  // ============================================================================
  // DEBUG LOGGING (Remove in production)
  // ============================================================================
  console.log('Profile Component - reduxUser:', reduxUser);
  console.log('Profile Component - userData raw:', userData);
  console.log('Profile Component - apiUserData extracted:', apiUserData);
  console.log('Profile Component - merged user:', user);
  console.log('Profile Component - profilePicture URL:', user.profilePicture);

  // Initialize form data when user data updates
  useEffect(() => {
    const apiUserData = userData?.user || userData?.data || userData;
    if (user && apiUserData) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        bio: apiUserData.bio || '',
        major: user.major || '',
        language: (apiUserData.language as 'en' | 'sw') || 'en',
      });
    }
  }, [user.firstName, user.lastName, user.bio, user.major, user.language]);

  const handleSave = async () => {
    try {
      await updateUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        major: formData.major,
      }).unwrap();
      await updateBio({ bio: formData.bio }).unwrap();
      await updateLanguage({ language: formData.language }).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      bio: user.bio || '',
      major: user.major || '',
      language: (user.language as 'en' | 'sw') || 'en',
    });
    setIsEditing(false);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setUploadError(validation.error || 'Invalid file');
      setUploadSuccess(null);
      return;
    }

    setIsUploadingImage(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      // Convert file to base64 data URL
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const dataUrl = e.target?.result as string;
          
          console.log('Uploading profile picture via backend API');
          
          // Send to backend API
          await updateProfilePicture({
            profilePicture: dataUrl,
          }).unwrap();

          console.log('Profile picture updated successfully');
          setUploadSuccess('Profile image updated successfully!');

          // Refetch user data to get the updated profile picture URL
          console.log('Refetching user data...');
          await refetchUser();

          // Clear the file input
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }

          // Clear success message after 3 seconds
          setTimeout(() => setUploadSuccess(null), 3000);
        } catch (error) {
          console.error('Profile picture update error:', error);
          setUploadError(error instanceof Error ? error.message : 'Failed to update profile picture. Please try again.');
        } finally {
          setIsUploadingImage(false);
        }
      };

      reader.onerror = () => {
        setUploadError('Failed to read file');
        setIsUploadingImage(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Image upload error:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to process image. Please try again.');
      setIsUploadingImage(false);
    }
  };

  if (!reduxUser) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
        <p className="text-gray-600">No user data available. Please log in again.</p>
      </div>
    );
  }

  if (apiLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm p-8 animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-6" />
          <div className="h-32 w-32 bg-gray-200 rounded-full mx-auto" />
        </div>
      </div>
    );
  }

  const userAvatar = user.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(`${user.firstName} ${user.lastName}`)}&background=5773da&color=fff&size=256`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={userAvatar}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
              />
              {isEditing && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingImage}
                  className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Click to upload profile picture"
                >
                  {isUploadingImage ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Camera className="w-4 h-4" />
                  )}
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUploadingImage}
              />
            </div>
            {uploadError && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-700">{uploadError}</p>
              </div>
            )}
            {uploadSuccess && (
              <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs text-green-700">{uploadSuccess}</p>
              </div>
            )}
          </div>

          {/* Profile Information */}
          <div className="flex-1 space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              {isEditing ? (
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Last Name"
                  />
                </div>
              ) : (
                <p className="text-lg font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <p className="text-gray-900">{user.email}</p>
            </div>

            {/* School ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                School ID
              </label>
              <p className="text-gray-900">{user.schoolId}</p>
            </div>

            {/* Major */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Major/Program</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Software Engineering"
                />
              ) : (
                <p className="text-gray-900">{user.major || 'Not specified'}</p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-900 whitespace-pre-wrap">{user.bio || 'No bio added yet.'}</p>
              )}
            </div>

            {/* Language Preference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Language Preference
              </label>
              {isEditing ? (
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value as 'en' | 'sw' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="sw">Kiswahili</option>
                </select>
              ) : (
                <p className="text-gray-900">{user.language === 'sw' ? 'Kiswahili' : 'English'}</p>
              )}
            </div>

            {/* Status Badges */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.isVerified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {user.isVerified ? 'Verified' : 'Unverified'}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                {user.isActive ? 'Active' : 'Inactive'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

