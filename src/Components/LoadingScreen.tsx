import { useEffect, useState } from 'react';

export const LoadingScreen = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Hide loading screen after 2 seconds
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white animate-fade-out"
            style={{
                animation: 'fadeOut 0.5s ease-in-out 1.5s forwards'
            }}
        >
            <div className="text-center">
                {/* Logo with pulse animation */}
                <div className="animate-pulse-slow mb-6">
                    <img
                        src="/bitsa-logo.png"
                        alt="BITSA Logo"
                        className="h-32 w-auto mx-auto object-contain drop-shadow-2xl"
                    />
                </div>

                {/* Loading text */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-[#1e3a8a] animate-fade-in">
                        BITSA
                    </h1>
                    <p className="text-sm text-gray-600 animate-fade-in-delay">
                        Bachelor of Information Technology Students Association
                    </p>
                </div>

                {/* Loading dots animation */}
                <div className="flex justify-center space-x-2 mt-8">
                    <div className="w-3 h-3 bg-[#1e3a8a] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-3 h-3 bg-[#1e40af] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 bg-[#3b82f6] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </div>

            <style>{`
                @keyframes fadeOut {
                    from {
                        opacity: 1;
                    }
                    to {
                        opacity: 0;
                        visibility: hidden;
                    }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out;
                }

                .animate-fade-in-delay {
                    animation: fadeIn 0.8s ease-out 0.3s backwards;
                }

                .animate-pulse-slow {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.8;
                        transform: scale(1.05);
                    }
                }
            `}</style>
        </div>
    );
};
