import { useState, useEffect } from 'react';
import { Moon, Sun, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Topbar = () => {
    const { language, setLanguage, t } = useLanguage();
    const [isDark, setIsDark] = useState(() => {
        // Initialize from localStorage
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    // Apply theme changes to document
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    // Toggle theme
    const toggleTheme = () => {
        setIsDark(prev => {
            const newTheme = !prev;
            localStorage.setItem('theme', newTheme ? 'dark' : 'light');
            return newTheme;
        });
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo Section */}
                    <a href="/" className="flex items-center space-x-3 cursor-pointer hover:opacity-90 transition-opacity">
                        <img
                            src="/bitsa-logo.png"
                            alt="BITSA Logo"
                            className="h-14 w-auto object-contain"
                        />
                        <div className="hidden lg:block">
                            <div className="text-sm font-bold text-[#1e3a8a] uppercase tracking-tight leading-tight">
                                <div>Bachelor of Information</div>
                                <div>Technology Students</div>
                                <div>Association (BITSA)</div>
                            </div>
                        </div>
                    </a>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a
                            href="/"
                            className="relative text-[#f59e0b] text-base font-semibold py-2"
                        >
                            {t('nav.home')}
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#f59e0b]"></span>
                        </a>

                        {/* About Us Dropdown */}
                        <div className="relative group">
                            <button className="relative text-gray-800 text-base font-medium py-2 transition-colors hover:text-[#f59e0b] flex items-center gap-1">
                                {t('nav.aboutUs')}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f59e0b] transition-all duration-300 group-hover:w-full"></span>
                            </button>
                            <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                <a href="/about" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#f59e0b]">{t('nav.aboutBitsa')}</a>
                                <a href="/mission" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#f59e0b]">{t('nav.missionVision')}</a>
                                <a href="/leadership" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#f59e0b]">{t('nav.ourLeaders')}</a>
                                <a href="/constitution" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#f59e0b]">{t('nav.constitution')}</a>
                            </div>
                        </div>

                        {/* Events Dropdown */}
                        <div className="relative group">
                            <button className="relative text-gray-800 text-base font-medium py-2 transition-colors hover:text-[#f59e0b] flex items-center gap-1">
                                {t('nav.events')}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f59e0b] transition-all duration-300 group-hover:w-full"></span>
                            </button>
                            <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                <a href="/events/upcoming" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#f59e0b]">{t('nav.upcomingEvents')}</a>
                                <a href="/events/past" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#f59e0b]">{t('nav.pastEvents')}</a>
                                <a href="/events/calendar-view" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#f59e0b]">{t('nav.calendarView')}</a>
                            </div>
                        </div>

                        <a
                            href="/blogs"
                            className="relative text-gray-800 text-base font-medium py-2 transition-colors hover:text-[#f59e0b] group"
                        >
                            {t('nav.blogs')}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f59e0b] transition-all duration-300 group-hover:w-full"></span>
                        </a>

                        {/* Resources Dropdown */}
                        <div className="relative group">
                            <button className="relative text-gray-800 text-base font-medium py-2 transition-colors hover:text-[#f59e0b] flex items-center gap-1">
                                {t('nav.resources')}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f59e0b] transition-all duration-300 group-hover:w-full"></span>
                            </button>
                            <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                <a href="/gallery" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#f59e0b]">{t('nav.gallery')}</a>
                                <a href="/marketplace" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#f59e0b]">{t('nav.marketplace')}</a>
                                <a href="/projects" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#f59e0b]">{t('nav.projects')}</a>
                            </div>
                        </div>

                        <a
                            href="/communities"
                            className="relative text-gray-800 text-base font-medium py-2 transition-colors hover:text-[#f59e0b] group"
                        >
                            {t('nav.communities')}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f59e0b] transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    </div>


                    <div className="flex items-center space-x-4">
                        {/* Language/Globe Dropdown */}
                        <div className="relative group hidden md:block">
                            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-1">
                                <Globe className="w-5 h-5 text-gray-700" />
                                <svg className="w-3 h-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 py-1">
                                <button
                                    onClick={() => setLanguage('en')}
                                    className={`block w-full text-left px-4 py-2.5 hover:bg-gray-50 ${language === 'en' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'}`}
                                >
                                    English
                                </button>
                                <button
                                    onClick={() => setLanguage('sw')}
                                    className={`block w-full text-left px-4 py-2.5 hover:bg-gray-50 ${language === 'sw' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'}`}
                                >
                                    Kiswahili
                                </button>
                                <button
                                    onClick={() => setLanguage('fr')}
                                    className={`block w-full text-left px-4 py-2.5 hover:bg-gray-50 ${language === 'fr' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'}`}
                                >
                                    Français
                                </button>
                                <div className="border-t border-gray-200 my-1"></div>
                                <button
                                    className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700"
                                >
                                    Bahasa Indonesia
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700"
                                >
                                    Deutsch
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700"
                                >
                                    Español
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700"
                                >
                                    Italiano
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700"
                                >
                                    Português
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700"
                                >
                                    日本語
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700"
                                >
                                    한국어
                                </button>
                            </div>
                        </div>

                        {/* Sign In Button */}
                        <a
                            href="/signin"
                            className="hidden md:inline-block text-blue-600 font-semibold px-6 py-2 rounded-full border-2 border-blue-600 hover:bg-blue-50 transition-all"
                        >
                            {t('nav.signIn')}
                        </a>

                        {/* Sign Up Button */}
                        <a
                            href="/signup"
                            className="hidden md:inline-block bg-blue-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                        >
                            {t('nav.signUp')}
                        </a>

                        {/* Theme Switcher */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {isDark ? (
                                <Sun className="w-5 h-5 text-gray-700" />
                            ) : (
                                <Moon className="w-5 h-5 text-gray-700" />
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden text-gray-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
