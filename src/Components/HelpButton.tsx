import { MessageCircleQuestion } from 'lucide-react';

export const HelpButton = () => {
    const handleClick = () => {
        // This is where you'll integrate your AI chat functionality
        console.log('Help button clicked - AI chat will open here');
        // TODO: Open AI chat modal/widget
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group animate-bounce hover:animate-none"
            aria-label="Help & Support"
            title="Get help from our AI assistant"
        >
            <MessageCircleQuestion className="w-6 h-6" />

            {/* Pulse indicator */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></span>

            {/* Ripple effect */}
            <span className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-30 group-hover:scale-150 transition-all duration-500"></span>

            {/* Tooltip */}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Need help? Ask our AI assistant
            </span>
        </button>
    );
};
