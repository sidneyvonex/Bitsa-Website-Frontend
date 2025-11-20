import { useEffect, useState, useMemo } from 'react';
import { Bell, Globe, Loader2, RefreshCcw, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { DashboardLayout } from '../DashboardDesign/DashboardLayout';
import {
    useGetCurrentUserQuery,
    useUpdateLanguageMutation,
} from '../../features/api/userApi';

type NotificationPrefs = {
    eventReminders: boolean;
    communityDigest: boolean;
    productUpdates: boolean;
    securityAlerts: boolean;
};

const defaultNotifications: NotificationPrefs = {
    eventReminders: true,
    communityDigest: true,
    productUpdates: false,
    securityAlerts: true,
};

const AdminSettingsPage = () => {
    const { data: userResponse, isLoading } = useGetCurrentUserQuery();
    const user = userResponse?.data;
    const [updateLanguage, { isLoading: isSavingLanguage }] = useUpdateLanguageMutation();

    const [languageOverride, setLanguageOverride] = useState<'en' | 'sw' | null>(null);
    const [timezone, setTimezone] = useState('Africa/Nairobi');
    const [theme, setTheme] = useState<'system' | 'light' | 'dark'>('system');

    const [notificationPrefs, setNotificationPrefs] = useState<NotificationPrefs>(() => {
        const stored = localStorage.getItem('adminNotificationPrefs');
        return stored ? JSON.parse(stored) : defaultNotifications;
    });

    useEffect(() => {
        localStorage.setItem('adminNotificationPrefs', JSON.stringify(notificationPrefs));
    }, [notificationPrefs]);

    const resolvedLanguage = useMemo<'en' | 'sw'>(() => {
        if (languageOverride) return languageOverride;
        return (user?.language as 'en' | 'sw') || 'en';
    }, [languageOverride, user]);

    const handleSaveGeneral = async () => {
        const nextLanguage = resolvedLanguage;
        try {
            if (nextLanguage !== user?.language) {
                await updateLanguage({ language: nextLanguage }).unwrap();
            }
            toast.success('General preferences saved');
        } catch (err) {
            console.error(err);
            toast.error('Unable to update preferences');
        }
    };

    const handleSaveNotifications = () => {
        toast.success('Notification preferences saved');
    };

    const handleReset = () => {
        setLanguageOverride(null);
        setTimezone('Africa/Nairobi');
        setTheme('system');
        setNotificationPrefs(defaultNotifications);
        localStorage.removeItem('adminNotificationPrefs');
        toast.message('Settings reset', {
            description: 'All preferences restored to defaults.',
        });
    };

    if (isLoading || !user) {
        return (
            <DashboardLayout userRole="Admin">
                <div className="flex h-64 items-center justify-center text-slate-500">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Loading settings...
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout userRole="Admin">
            <div className="space-y-6">
                <div className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between md:p-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Control center</p>
                        <h1 className="text-3xl font-bold text-slate-900">Admin settings</h1>
                        <p className="text-slate-500">
                            Configure language, notifications, and security for your dashboard session.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300"
                    >
                        <RefreshCcw className="h-4 w-4" />
                        Reset
                    </button>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <section className="space-y-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <Globe className="h-5 w-5 text-blue-500" />
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">General preferences</h2>
                                <p className="text-sm text-slate-500">Applies to your admin dashboard only.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-600">Language</label>
                                <select
                                value={resolvedLanguage}
                                onChange={(event) => setLanguageOverride(event.target.value as 'en' | 'sw')}
                                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="en">English</option>
                                    <option value="sw">Swahili</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-600">Timezone</label>
                                <input
                                    type="text"
                                value={timezone}
                                onChange={(event) => setTimezone(event.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                    placeholder="Africa/Nairobi"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-600">Theme</label>
                                <select
                                value={theme}
                                onChange={(event) => setTheme(event.target.value as 'system' | 'light' | 'dark')}
                                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="system">Follow system</option>
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                </select>
                            </div>
                            <button
                                type="button"
                                onClick={handleSaveGeneral}
                                disabled={isSavingLanguage}
                                className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isSavingLanguage ? 'Saving...' : 'Save general preferences'}
                            </button>
                        </div>
                    </section>

                    <section className="space-y-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <Bell className="h-5 w-5 text-amber-500" />
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">Notifications</h2>
                                <p className="text-sm text-slate-500">Delivered via email and dashboard alerts.</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {Object.entries(notificationPrefs).map(([key, value]) => (
                                <label
                                    key={key}
                                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                                >
                                    <span>
                                        {key === 'eventReminders' && 'Event reminders'}
                                        {key === 'communityDigest' && 'Weekly community digest'}
                                        {key === 'productUpdates' && 'Product updates'}
                                        {key === 'securityAlerts' && 'Security alerts'}
                                    </span>
                                    <input
                                        type="checkbox"
                                        checked={value}
                                        onChange={(event) =>
                                            setNotificationPrefs({
                                                ...notificationPrefs,
                                                [key]: event.target.checked,
                                            })
                                        }
                                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-200"
                                    />
                                </label>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={handleSaveNotifications}
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
                        >
                            Save notification rules
                        </button>
                    </section>
                </div>

                <section className="space-y-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="h-5 w-5 text-emerald-500" />
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">Security</h2>
                            <p className="text-sm text-slate-500">
                                Monitor admin activity and keep your account safe.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Recent logins</p>
                            <p className="text-2xl font-semibold text-slate-900">3</p>
                            <p className="text-xs text-slate-400">Past 24 hours</p>
                        </div>
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Active sessions</p>
                            <p className="text-2xl font-semibold text-slate-900">2</p>
                            <p className="text-xs text-slate-400">Web + Mobile</p>
                        </div>
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Two-factor auth</p>
                            <p className="text-2xl font-semibold text-slate-900">Enabled</p>
                            <p className="text-xs text-slate-400">Managed in auth portal</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 md:flex-row">
                        <button
                            type="button"
                            className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300"
                            onClick={() => toast.message('Security audit', { description: 'Audit log export coming soon.' })}
                        >
                            View audit log
                        </button>
                        <button
                            type="button"
                            className="flex-1 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                            onClick={() => toast.success('Session revoked for other devices')}
                        >
                            Revoke other sessions
                        </button>
                        <button
                            type="button"
                            className="flex-1 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:border-rose-300"
                            onClick={() => toast.error('Password change handled in the auth portal.')}
                        >
                            Change password
                        </button>
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-100 bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white shadow-lg">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">Integrations</p>
                            <h2 className="text-2xl font-bold">Need a new API surface?</h2>
                            <p className="text-sm text-slate-300">
                                Reference the official docs any time:{' '}
                                <a
                                    href="https://bitsabackendapi.azurewebsites.net/api-docs/#/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline"
                                >
                                    https://bitsabackendapi.azurewebsites.net/api-docs/#/
                                </a>
                            </p>
                        </div>
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                            onClick={() => window.open('https://bitsabackendapi.azurewebsites.net/api-docs/#/', '_blank')}
                        >
                            Open API reference
                        </button>
                    </div>
                </section>
            </div>
        </DashboardLayout>
    );
};

export default AdminSettingsPage;

