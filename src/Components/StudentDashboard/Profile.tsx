import { useState, useRef } from 'react';
import { User, Mail, IdCard, Loader2, Check, Upload, X } from 'lucide-react';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useUpdateCurrentUserMutation, useUpdateProfilePictureMutation } from '../../features/api';
import { toast } from 'sonner';

export const StudentProfile = () => {
    const user = useAppSelector(selectCurrentUser);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    const [updateUser, { isLoading: isUpdating }] = useUpdateCurrentUserMutation();
    const [updateProfilePic, { isLoading: isUpdatingPic }] = useUpdateProfilePictureMutation();

    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        schoolId: user?.schoolId || '',
        bio: user?.bio || '',
        major: user?.major || ''
    });

    const handleSave = async () => {
        try {
            await updateUser({
                firstName: formData.firstName,
                lastName: formData.lastName,
                bio: formData.bio,
                major: formData.major,
            }).unwrap();
            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to update profile');
        }
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Show preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload to Cloudinary
        setUploadingImage(true);
        try {
            const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
            const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

            if (!cloudName || !uploadPreset) {
                toast.error('Image upload not configured');
                setUploadingImage(false);
                return;
            }

            const formDataCloudinary = new FormData();
            formDataCloudinary.append('file', file);
            formDataCloudinary.append('upload_preset', uploadPreset);

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formDataCloudinary,
                }
            );

            const data = await response.json();

            if (data.secure_url) {
                // Update profile picture in backend
                await updateProfilePic({
                    profilePicture: data.secure_url,
                }).unwrap();
                toast.success('Profile picture updated!');
                setPreviewImage(null);
            }
        } catch (error: any) {
            toast.error('Failed to upload image');
            setPreviewImage(null);
        } finally {
            setUploadingImage(false);
        }
    };

    const userAvatar = user?.profilePicture || user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(
        `${user?.firstName} ${user?.lastName}`
    )}&background=6366f1&color=fff&size=128`;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
                    <p className="text-gray-600 mt-1">Manage your profile information</p>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-[#5773da] text-white rounded-lg hover:bg-[#4861c9] transition-colors"
                >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6 space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6 pb-6 border-b">
                    <div className="relative">
                        <img
                            src={previewImage || userAvatar}
                            alt="Profile"
                            className="w-20 h-20 rounded-full border-4 border-[#5773da] object-cover"
                        />
                        {isEditing && (
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploadingImage}
                                className="absolute bottom-0 right-0 bg-[#5773da] text-white p-2 rounded-full hover:bg-[#4861c9] disabled:opacity-50"
                            >
                                {uploadingImage ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Upload className="w-4 h-4" />
                                )}
                            </button>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            disabled={uploadingImage}
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {formData.firstName} {formData.lastName}
                        </h2>
                        <p className="text-gray-600">{user?.role}</p>
                    </div>
                </div>

                {/* Personal Information */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                disabled={!isEditing}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 disabled:bg-gray-100 disabled:text-gray-600 focus:ring-2 focus:ring-[#5773da] focus:border-transparent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                disabled={!isEditing}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 disabled:bg-gray-100 disabled:text-gray-600 focus:ring-2 focus:ring-[#5773da] focus:border-transparent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                disabled
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                <IdCard className="w-4 h-4" />
                                School ID
                            </label>
                            <input
                                type="text"
                                value={formData.schoolId}
                                disabled
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Major/Specialization</label>
                            <input
                                type="text"
                                value={formData.major}
                                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                                disabled={!isEditing}
                                placeholder="e.g., Information Technology"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 disabled:bg-gray-100 disabled:text-gray-600 focus:ring-2 focus:ring-[#5773da] focus:border-transparent outline-none"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                            <textarea
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                disabled={!isEditing}
                                placeholder="Tell us about yourself and your interests"
                                rows={3}
                                maxLength={250}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 disabled:bg-gray-100 disabled:text-gray-600 focus:ring-2 focus:ring-[#5773da] focus:border-transparent outline-none resize-none"
                            />
                            <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/250 characters</p>
                        </div>
                    </div>
                </div>

                {/* Email Verification Status */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                        <p className="font-medium text-green-900">Account Verified</p>
                        <p className="text-sm text-green-700">Your account and email have been verified</p>
                    </div>
                </div>

                {/* Save Button */}
                {isEditing && (
                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                setPreviewImage(null);
                            }}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isUpdating || uploadingImage}
                            className="px-6 py-2 bg-[#5773da] text-white rounded-lg hover:bg-[#4861c9] disabled:opacity-50 flex items-center gap-2"
                        >
                            {isUpdating ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Check className="w-4 h-4" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
