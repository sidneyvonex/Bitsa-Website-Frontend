import { useEffect, useMemo, useRef, useState } from 'react';
import { Camera, Loader2, Mail, ShieldCheck, User, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { DashboardLayout } from '../DashboardDesign/DashboardLayout';
import {
    useGetCurrentUserQuery,
    useUpdateCurrentUserMutation,
    useUpdateProfilePictureMutation,
} from '../../features/api/userApi';
import { uploadToCloudinary, validateImageFile } from '../utils/cloudinary';

interface ProfileFormState {
    firstName: string;
    lastName: string;
    major: string;
    bio: string;
}

const initialState: ProfileFormState = {
    firstName: '',
    lastName: '',
    major: '',
    bio: '',
};

const AdminProfilePage = () => {
    const { data: profileResponse, isLoading, refetch } = useGetCurrentUserQuery();
    const user = profileResponse?.data;

    const [formState, setFormState] = useState<ProfileFormState>(initialState);
    const [updateUser, { isLoading: isSavingProfile }] = useUpdateCurrentUserMutation();
    const [updateAvatar] = useUpdateProfilePictureMutation();
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (user) {
            setFormState({
                firstName: user.firstName ?? '',
                lastName: user.lastName ?? '',
                major: user.major ?? '',
                bio: user.bio ?? '',
            });
        }
    }, [user]);

    const profileStrength = useMemo(() => {
        if (!user) return 0;
        const fields = [
            Boolean(user.firstName),
            Boolean(user.lastName),
            Boolean(user.major),
            Boolean(user.bio),
            Boolean(user.profilePicture),
        ];
        const completed = fields.filter(Boolean).length;
        return Math.round((completed / fields.length) * 100);
    }, [user]);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const { valid, error } = validateImageFile(file, 5);
        if (!valid) {
            toast.error(error ?? 'Invalid image');
            return;
        }

        setIsUploadingAvatar(true);
        try {
            const uploadResult = await uploadToCloudinary(file, { folder: 'bitsa/profiles' });
            await updateAvatar({ profilePicture: uploadResult.secure_url }).unwrap();
            toast.success('Profile photo updated');
            refetch();
        } catch (err) {
            console.error(err);
            toast.error('Unable to update profile photo');
        } finally {
            setIsUploadingAvatar(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await updateUser({
                firstName: formState.firstName.trim(),
                lastName: formState.lastName.trim(),
                major: formState.major.trim(),
                bio: formState.bio.trim(),
            }).unwrap();
            toast.success('Profile details saved');
            refetch();
        } catch (err) {
            console.error(err);
            toast.error('Unable to save profile changes');
        }
    };

    if (isLoading || !user) {
        return (
            <DashboardLayout userRole="Admin">
                <div className="flex h-64 items-center justify-center text-slate-500">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Loading profile...
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout userRole="Admin">
            <div className="space-y-6">
                <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <img
                                    src={
                                        user.profilePicture ||
                                        `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=4f46e5&color=fff`
                                    }
                                    alt={`${user.firstName} ${user.lastName}`}
                                    className="h-24 w-24 rounded-2xl object-cover ring-4 ring-blue-50"
                                />
                                <button
                                    type="button"
                                    onClick={handleAvatarClick}
                                    className="absolute bottom-0 right-0 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700"
                                >
                                    {isUploadingAvatar ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Camera className="h-4 w-4" />
                                    )}
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                />
                            </div>
                            <div>
                                <p className="text-sm uppercase tracking-wide text-slate-500">Administrator</p>
                                <h1 className="text-3xl font-bold text-slate-900">
                                    {user.firstName} {user.lastName}
                                </h1>
                                <p className="text-sm text-slate-500">{user.major || 'Major not set'}</p>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-blue-900">
                            <p className="text-sm font-semibold">Profile completion</p>
                            <div className="mt-2 flex items-center gap-3">
                                <div className="h-2 flex-1 rounded-full bg-blue-100">
                                    <div
                                        className="h-full rounded-full bg-blue-600 transition-all"
                                        style={{ width: `${profileStrength}%` }}
                                    />
                                </div>
                                <span className="text-lg font-bold">{profileStrength}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid gap-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:grid-cols-2 md:p-8"
                >
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-slate-600">First name</label>
                            <input
                                type="text"
                                value={formState.firstName}
                                onChange={(event) => setFormState({ ...formState, firstName: event.target.value })}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                placeholder="Enter first name"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-600">Major / Department</label>
                            <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
                                <Building2 className="h-4 w-4 text-slate-400" />
                                <input
                                    type="text"
                                    value={formState.major}
                                    onChange={(event) => setFormState({ ...formState, major: event.target.value })}
                                    className="w-full bg-transparent outline-none"
                                    placeholder="ICT, Engineering, Business..."
                                />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-slate-600">Last name</label>
                            <input
                                type="text"
                                value={formState.lastName}
                                onChange={(event) => setFormState({ ...formState, lastName: event.target.value })}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                placeholder="Enter last name"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-600">Short bio</label>
                            <textarea
                                value={formState.bio}
                                onChange={(event) => setFormState({ ...formState, bio: event.target.value })}
                                rows={4}
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                placeholder="Tell students how you support BITSA..."
                            />
                        </div>
                    </div>
                    <div className="md:col-span-2 flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                            <Mail className="h-4 w-4 text-blue-500" />
                            {user.email}
                        </div>
                        <div className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                            <ShieldCheck className="h-4 w-4 text-emerald-500" />
                            {user.role}
                        </div>
                        <div className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                            <User className="h-4 w-4 text-purple-500" />
                            School ID: {user.schoolId}
                        </div>
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-3 md:flex-row">
                        <button
                            type="button"
                            onClick={() => {
                                setFormState({
                                    firstName: user.firstName ?? '',
                                    lastName: user.lastName ?? '',
                                    major: user.major ?? '',
                                    bio: user.bio ?? '',
                                });
                            }}
                            className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300"
                        >
                            Reset changes
                        </button>
                        <button
                            type="submit"
                            disabled={isSavingProfile}
                            className="flex-1 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {isSavingProfile ? 'Saving...' : 'Save profile'}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default AdminProfilePage;

