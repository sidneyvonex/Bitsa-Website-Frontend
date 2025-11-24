import { useState } from 'react';
import { Lock, Bell, Eye, LogOut, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';

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
        darkMode: false
    });

    const handleSaveSettings = async () => {
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
    };

    const handleChangePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
        setShowPasswordForm(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        alert('Password changed successfully');
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/signin');
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-1">Manage your account preferences and security</p>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                    <Bell className="w-6 h-6 text-[#5773da]" />
                    <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
                </div>
                <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={settings.emailNotifications}
                            onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                            className="w-4 h-4 rounded"
                        />
                        <div>
                            <p className="font-medium text-gray-900">Email Notifications</p>
                            <p className="text-sm text-gray-600">Receive email updates about events and communities</p>
                        </div>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={settings.pushNotifications}
                            onChange={(e) => setSettings({ ...settings, pushNotifications: e.target.checked })}
                            className="w-4 h-4 rounded"
                        />
                        <div>
                            <p className="font-medium text-gray-900">Push Notifications</p>
                            <p className="text-sm text-gray-600">Receive browser notifications</p>
                        </div>
                    </label>
                </div>
                <button
                    onClick={handleSaveSettings}
                    disabled={isSaving}
                    className="mt-6 px-6 py-2 bg-[#5773da] text-white rounded-lg hover:bg-[#4861c9] disabled:opacity-50 flex items-center gap-2"
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        'Save Notification Settings'
                    )}
                </button>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                    <Eye className="w-6 h-6 text-[#5773da]" />
                    <h2 className="text-xl font-semibold text-gray-900">Privacy</h2>
                </div>
                <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={settings.showProfile}
                            onChange={(e) => setSettings({ ...settings, showProfile: e.target.checked })}
                            className="w-4 h-4 rounded"
                        />
                        <div>
                            <p className="font-medium text-gray-900">Show Profile to Others</p>
                            <p className="text-sm text-gray-600">Allow other students to view your profile</p>
                        </div>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={settings.allowMessages}
                            onChange={(e) => setSettings({ ...settings, allowMessages: e.target.checked })}
                            className="w-4 h-4 rounded"
                        />
                        <div>
                            <p className="font-medium text-gray-900">Allow Messages</p>
                            <p className="text-sm text-gray-600">Let other students send you messages</p>
                        </div>
                    </label>
                </div>
                <button
                    onClick={handleSaveSettings}
                    disabled={isSaving}
                    className="mt-6 px-6 py-2 bg-[#5773da] text-white rounded-lg hover:bg-[#4861c9] disabled:opacity-50 flex items-center gap-2"
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        'Save Privacy Settings'
                    )}
                </button>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                    <Lock className="w-6 h-6 text-[#5773da]" />
                    <h2 className="text-xl font-semibold text-gray-900">Security</h2>
                </div>
                {!showPasswordForm ? (
                    <button
                        onClick={() => setShowPasswordForm(true)}
                        className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                        <Lock className="w-4 h-4" />
                        Change Password
                    </button>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                            <input
                                type="password"
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5773da]"
                                placeholder="Enter current password"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input
                                type="password"
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5773da]"
                                placeholder="Enter new password"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <input
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5773da]"
                                placeholder="Confirm new password"
                            />
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={() => setShowPasswordForm(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleChangePassword}
                                disabled={isSaving}
                                className="flex-1 px-4 py-2 bg-[#5773da] text-white rounded-lg hover:bg-[#4861c9] disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Changing...
                                    </>
                                ) : (
                                    'Change Password'
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Logout Section */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-900">Logout</h3>
                        <p className="text-sm text-gray-600">Sign out from your account</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};
