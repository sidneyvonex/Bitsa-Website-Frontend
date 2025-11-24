import { useState } from 'react';
import { Lock, Bell, Eye, LogOut, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../features/app/hooks';
import { logout } from '../../features/auth/authSlice';
import { toast } from 'sonner';

export const StudentSettings = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isSaving, setIsSaving] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: true,
        showProfile: true,
        allowMessages: true,
        twoFactorAuth: false
    });

    const handleSaveSettings = async () => {
        setIsSaving(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            toast.success('Settings saved successfully!');
        } catch (error) {
            toast.error('Failed to save settings');
        } finally {
            setIsSaving(false);
        }
    };

    const handleChangePassword = async () => {
        if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            toast.error('Please fill in all password fields');
            return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        if (passwordData.newPassword.length < 8) {
            toast.error('Password must be at least 8 characters long');
            return;
        }
        
        setIsSaving(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success('Password changed successfully!');
            setShowPasswordForm(false);
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            toast.error('Failed to change password');
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        toast.info('You have been logged out. See you soon!');
        navigate('/signin');
    };

    return (
        <div className="space-y-8 max-w-4xl">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-2">Manage your account preferences and security</p>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-transparent px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                    <Bell className="w-6 h-6 text-[#5773da]" />
                    <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
                </div>
                <div className="p-6 space-y-4">
                    {[
                        { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive email updates about events and communities' },
                        { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive browser notifications' },
                        { key: 'showProfile', label: 'Show Profile Publicly', description: 'Allow other users to view your profile' },
                        { key: 'allowMessages', label: 'Allow Messages', description: 'Allow other users to send you messages' },
                    ].map(({ key, label, description }) => (
                        <label key={key} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                            <input
                                type="checkbox"
                                checked={settings[key as keyof typeof settings] as boolean}
                                onChange={(e) => setSettings({ ...settings, [key]: e.target.checked })}
                                className="w-5 h-5 rounded text-[#5773da] mt-1"
                            />
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">{label}</p>
                                <p className="text-sm text-gray-600">{description}</p>
                            </div>
                        </label>
                    ))}
                    <button
                        onClick={handleSaveSettings}
                        disabled={isSaving}
                        className="mt-6 px-6 py-2 rounded-lg bg-[#5773da] text-white hover:bg-[#4861c9] font-medium transition-colors disabled:opacity-75 flex items-center gap-2"
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                        {isSaving ? 'Saving...' : 'Save Preferences'}
                    </button>
                </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-50 to-transparent px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                    <Lock className="w-6 h-6 text-amber-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
                </div>
                <div className="p-6 space-y-4">
                    {!showPasswordForm ? (
                        <button
                            onClick={() => setShowPasswordForm(true)}
                            className="w-full p-4 rounded-lg border border-gray-200 hover:border-[#5773da] hover:bg-blue-50 transition-colors flex items-center gap-3 text-left group"
                        >
                            <Eye className="w-5 h-5 text-gray-400 group-hover:text-[#5773da]" />
                            <div>
                                <p className="font-medium text-gray-900">Change Password</p>
                                <p className="text-sm text-gray-600">Update your password regularly for better security</p>
                            </div>
                        </button>
                    ) : (
                        <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                <input
                                    type="password"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                    placeholder="Enter current password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5773da] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                <input
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    placeholder="Enter new password (min 8 characters)"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5773da] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                <input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    placeholder="Confirm new password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5773da] focus:border-transparent"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleChangePassword}
                                    disabled={isSaving}
                                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-75"
                                >
                                    {isSaving ? 'Updating...' : 'Update Password'}
                                </button>
                                <button
                                    onClick={() => setShowPasswordForm(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-lg shadow-sm border border-red-200 overflow-hidden">
                <div className="bg-gradient-to-r from-red-50 to-transparent px-6 py-4 border-b border-red-200 flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Danger Zone</h2>
                </div>
                <div className="p-6 space-y-4">
                    <p className="text-sm text-gray-600">Proceed with caution. These actions cannot be undone.</p>
                    <button
                        onClick={handleLogout}
                        className="w-full p-4 rounded-lg border border-red-200 hover:bg-red-50 transition-colors flex items-center gap-3 text-left group"
                    >
                        <LogOut className="w-5 h-5 text-red-600" />
                        <div>
                            <p className="font-medium text-red-600">Logout</p>
                            <p className="text-sm text-gray-600">Sign out of your account</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};
