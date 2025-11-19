import { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Globe, Moon, Sun, Save } from 'lucide-react';
import { useGetCurrentUserQuery, useUpdateLanguageMutation } from '../../features/api/userApi';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../../features/auth/authSlice';

export const StudentSettings = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data: userData } = useGetCurrentUserQuery();
  const [updateLanguage] = useUpdateLanguageMutation();

  const [settings, setSettings] = useState({
    language: (userData?.data?.language as 'en' | 'sw') || 'en',
    notifications: {
      email: true,
      push: true,
      events: true,
      blogs: true,
    },
    theme: 'light' as 'light' | 'dark',
  });

  const handleSave = async () => {
    try {
      await updateLanguage({ language: settings.language }).unwrap();
      // Save other settings to localStorage or API
      localStorage.setItem('theme', settings.theme);
      localStorage.setItem('notifications', JSON.stringify(settings.notifications));
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences and settings</p>
      </div>

      {/* Language Settings */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Language & Region</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
            <select
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value as 'en' | 'sw' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="sw">Kiswahili</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
        </div>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive notifications via email</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.email}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, email: e.target.checked },
                })
              }
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium text-gray-900">Push Notifications</p>
              <p className="text-sm text-gray-500">Receive push notifications in browser</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.push}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, push: e.target.checked },
                })
              }
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium text-gray-900">Event Notifications</p>
              <p className="text-sm text-gray-500">Get notified about new events</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.events}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, events: e.target.checked },
                })
              }
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium text-gray-900">Blog Notifications</p>
              <p className="text-sm text-gray-500">Get notified about new blog posts</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.blogs}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, blogs: e.target.checked },
                })
              }
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          {settings.theme === 'dark' ? (
            <Moon className="w-5 h-5 text-blue-600" />
          ) : (
            <Sun className="w-5 h-5 text-blue-600" />
          )}
          <h2 className="text-xl font-semibold text-gray-900">Appearance</h2>
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
          <div className="flex gap-4">
            <button
              onClick={() => setSettings({ ...settings, theme: 'light' })}
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors ${
                settings.theme === 'light'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Sun className="w-5 h-5 mx-auto mb-2" />
              <p className="font-medium">Light</p>
            </button>
            <button
              onClick={() => setSettings({ ...settings, theme: 'dark' })}
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors ${
                settings.theme === 'dark'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Moon className="w-5 h-5 mx-auto mb-2" />
              <p className="font-medium">Dark</p>
            </button>
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Privacy & Security</h2>
        </div>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Your account security is important to us. For password changes and security settings, please contact
            support.
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-5 h-5" />
          Save Settings
        </button>
      </div>
    </div>
  );
};

