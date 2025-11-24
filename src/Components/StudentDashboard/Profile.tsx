import { useState, useRef } from 'react';
import { Loader2, Check, X, Camera, Mail, Briefcase, BookOpen } from 'lucide-react';
import { useAppSelector } from '../../features/app/hooks';
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
    const [updateProfilePic] = useUpdateProfilePictureMutation();

    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        schoolId: user?.schoolId || '',
        bio: (user as any)?.bio || '',
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

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);

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

            await updateProfilePic({
                profilePicture: data.secure_url,
            }).unwrap();

            toast.success('Profile picture updated successfully!');
            setPreviewImage(null);
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to upload image');
        } finally {
            setUploadingImage(false);
        }
    };

    return (
        <div className="space-y-8 max-w-4xl">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">My Profile</h1>
                    <p className="text-gray-600 mt-2">Manage your personal information</p>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 rounded-lg bg-[#5773da] text-white hover:bg-[#4861c9] font-medium transition-colors"
                >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>

            {/* Profile Card Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Profile Picture Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-4">
                        <div className="relative mx-auto w-32 h-32">
                            <img
                                src={previewImage || (user as any)?.profilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.firstName}`}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover border-4 border-[#5773da]"
                            />
                            {isEditing && (
                                <label className="absolute bottom-0 right-0 bg-[#5773da] text-white rounded-full p-2 cursor-pointer hover:bg-[#4861c9] transition-colors">
                                    <Camera className="w-5 h-5" />
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="hidden"
                                        disabled={uploadingImage}
                                    />
                                </label>
                            )}
                            {uploadingImage && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                                    <Loader2 className="w-6 h-6 animate-spin text-white" />
                                </div>
                            )}
                        </div>
                        <div className="text-center">
                            <h2 className="text-lg font-bold text-gray-900">
                                {formData.firstName} {formData.lastName}
                            </h2>
                            <p className="text-sm text-gray-600">{formData.schoolId}</p>
                        </div>
                    </div>
                </div>

                {/* Right: Information Sections */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Personal Information */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Mail className="w-5 h-5 text-[#5773da]" />
                            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 disabled:opacity-75"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 disabled:opacity-75"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                value={formData.email}
                                disabled
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 opacity-75"
                            />
                        </div>
                    </div>

                    {/* Academic Information */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <BookOpen className="w-5 h-5 text-[#5773da]" />
                            <h3 className="text-lg font-semibold text-gray-900">Academic Information</h3>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">School ID</label>
                            <input
                                type="text"
                                value={formData.schoolId}
                                disabled
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 opacity-75"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
                            <input
                                type="text"
                                value={formData.major}
                                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                                disabled={!isEditing}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 disabled:opacity-75"
                            />
                        </div>
                    </div>

                    {/* Bio Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Briefcase className="w-5 h-5 text-[#5773da]" />
                            <h3 className="text-lg font-semibold text-gray-900">Bio</h3>
                        </div>

                        <textarea
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            disabled={!isEditing}
                            placeholder="Tell us about yourself..."
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 disabled:opacity-75"
                        />
                    </div>

                    {/* Action Buttons */}
                    {isEditing && (
                        <div className="flex gap-3">
                            <button
                                onClick={handleSave}
                                disabled={isUpdating}
                                className="flex-1 px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-medium transition-colors disabled:opacity-75 flex items-center justify-center gap-2"
                            >
                                <Check className="w-4 h-4" />
                                {isUpdating ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="flex-1 px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
