import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../features/app/hooks';
import { selectCurrentUser, updateUser } from '../../features/auth/authSlice';
import { useUpdateCurrentUserMutation, useUpdateProfilePictureMutation } from '../../features/api/userApi';
import { User, Mail, Shield, Calendar, Edit3, Check, X, Upload } from 'lucide-react';
import { toast } from 'sonner';

export const AdminProfile = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [updateCurrentUser] = useUpdateCurrentUserMutation();
  const [updateProfilePicture] = useUpdateProfilePictureMutation();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingProfile, setIsUploadingProfile] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    major: user?.major || '',
  });

  const joinDate = 'November 2024';

  const handleSave = async () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error('First name and last name are required');
      return;
    }

    setIsSaving(true);
    try {
      const result = await updateCurrentUser(formData).unwrap();
      dispatch(updateUser(result.data));
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      major: user?.major || '',
    });
    setIsEditing(false);
  };

  const handleProfilePictureUpload = async (file: File) => {
    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        toast.error('Cloudinary not configured');
        return;
      }

      setIsUploadingProfile(true);
      setUploadProgress(0);

      const formDataCloud = new FormData();
      formDataCloud.append('file', file);
      formDataCloud.append('upload_preset', uploadPreset);

      return new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(progress);
          }
        });

        xhr.addEventListener('load', async () => {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            try {
              const result = await updateProfilePicture({
                profilePicture: data.secure_url,
              }).unwrap();
              if (result.data) {
                dispatch(updateUser({ avatar: result.data.profilePicture }));
              }
              toast.success('Profile picture updated!');
              resolve();
            } catch (error) {
              toast.error('Failed to update profile picture');
              reject(error);
            }
          } else {
            toast.error('Upload failed');
            reject(new Error('Upload failed'));
          }
        });

        xhr.addEventListener('error', () => {
          toast.error('Upload error');
          reject(new Error('Upload error'));
        });

        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        xhr.open('POST', url, true);
        xhr.send(formDataCloud);
      }).finally(() => {
        setIsUploadingProfile(false);
        setUploadProgress(0);
      });
    } catch (error) {
      toast.error('Failed to upload profile picture');
      setIsUploadingProfile(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Profile</h2>
          <p className="text-gray-600 mt-2">View and manage your admin profile</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-[#5773da] to-[#4861c9]">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = 'none';
                  }}
                />
              ) : null}
              <div id="profile-fallback" className="w-full h-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <label className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition flex items-center justify-center cursor-pointer group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleProfilePictureUpload(e.target.files[0]);
                    }
                  }}
                  disabled={isUploadingProfile}
                  className="hidden"
                />
                <Upload className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition" />
              </label>
            </div>
            
            {/* Upload Progress */}
            {isUploadingProfile && uploadProgress > 0 && (
              <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gray-900 h-2 rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">{uploadProgress}%</p>
              </div>
            )}

            <h3 className="text-xl font-bold text-gray-900">
              {formData.firstName} {formData.lastName}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{user?.email}</p>
            <div className="flex items-center justify-center gap-2 mt-3 px-3 py-1 bg-blue-100 rounded-full w-fit mx-auto">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">{user?.role}</span>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-gray-400"
                />
              ) : (
                <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                  {user?.firstName || 'N/A'}
                </div>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-gray-400"
                />
              ) : (
                <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                  {user?.lastName || 'N/A'}
                </div>
              )}
            </div>

            {/* Major */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Major/Field</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  placeholder="e.g., Computer Science"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-gray-400"
                />
              ) : (
                <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                  {user?.major || 'N/A'}
                </div>
              )}
            </div>

            {/* Email (Protected) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email <span className="text-xs text-gray-500">(Protected)</span></label>
              <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 flex items-center gap-2 cursor-not-allowed opacity-75">
                <Mail className="w-4 h-4 text-gray-600" />
                {user?.email || 'N/A'}
              </div>
            </div>

            {/* Role (Protected) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role <span className="text-xs text-gray-500">(Protected)</span></label>
              <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 flex items-center gap-2 cursor-not-allowed opacity-75">
                <Shield className="w-4 h-4 text-gray-600" />
                {user?.role || 'N/A'}
              </div>
            </div>

            {/* Member Since (Protected) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Member Since <span className="text-xs text-gray-500">(Protected)</span></label>
              <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 flex items-center gap-2 cursor-not-allowed opacity-75">
                <Calendar className="w-4 h-4 text-gray-600" />
                {joinDate}
              </div>
            </div>

            {/* Status (Protected) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status <span className="text-xs text-gray-500">(Protected)</span></label>
              <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 cursor-not-allowed opacity-75">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-green-600"></div>
                  <span className="text-sm font-medium text-green-600">Active</span>
                </span>
              </div>
            </div>
          </div>

          {/* Save/Cancel Buttons */}
          {isEditing && (
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="flex items-center gap-2 bg-gray-300 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Permissions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Permissions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Create and manage blogs',
            'Create and manage events',
            'Manage communities',
            'Manage student projects',
            'Manage interests/tags',
            'Upload and manage reports',
            'View statistics and analytics',
            'Manage admin settings',
          ].map((permission, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-5 h-5 rounded bg-green-500 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-gray-700">{permission}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
