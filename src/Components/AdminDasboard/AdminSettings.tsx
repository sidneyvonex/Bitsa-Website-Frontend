import { useState } from 'react';
import { Settings, Bell, Lock, Eye } from 'lucide-react';

export const AdminSettings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: true,
    twoFactorAuth: false,
    showOnlineStatus: true,
    theme: 'light',
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key]
    }));
  };

  const handleChange = (key: keyof typeof settings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // In a real app, save to backend
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-2">Manage your admin preferences and account security</p>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-6 h-6 text-[#5773da]" />
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={() => handleToggle('notifications')}
              className="w-5 h-5 accent-[#5773da] cursor-pointer"
            />
            <div>
              <p className="font-medium text-gray-900">Platform Notifications</p>
              <p className="text-sm text-gray-600">Get notified about platform activities</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.emailUpdates}
              onChange={() => handleToggle('emailUpdates')}
              className="w-5 h-5 accent-[#5773da] cursor-pointer"
            />
            <div>
              <p className="font-medium text-gray-900">Email Updates</p>
              <p className="text-sm text-gray-600">Receive email notifications about updates</p>
            </div>
          </label>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="w-6 h-6 text-[#5773da]" />
          <h3 className="text-lg font-semibold text-gray-900">Security</h3>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={() => handleToggle('twoFactorAuth')}
              className="w-5 h-5 accent-[#5773da] cursor-pointer"
            />
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Add extra security to your account</p>
            </div>
          </label>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> You can change your password anytime from your account menu.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Eye className="w-6 h-6 text-[#5773da]" />
          <h3 className="text-lg font-semibold text-gray-900">Privacy</h3>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.showOnlineStatus}
              onChange={() => handleToggle('showOnlineStatus')}
              className="w-5 h-5 accent-[#5773da] cursor-pointer"
            />
            <div>
              <p className="font-medium text-gray-900">Show Online Status</p>
              <p className="text-sm text-gray-600">Let others see when you're online</p>
            </div>
          </label>
        </div>
      </div>

      {/* Display Settings */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Settings className="w-6 h-6 text-[#5773da]" />
          <h3 className="text-lg font-semibold text-gray-900">Display</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => handleChange('theme', e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-white text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5773da]"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="flex-1 bg-[#5773da] text-white px-6 py-3 rounded-lg hover:bg-[#4861c9] transition font-medium"
        >
          Save Settings
        </button>
        <button className="flex-1 bg-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium">
          Reset to Default
        </button>
      </div>

      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-900">
          <strong>Tip:</strong> Your settings are automatically synced across all devices.
        </p>
      </div>
    </div>
  );
};
