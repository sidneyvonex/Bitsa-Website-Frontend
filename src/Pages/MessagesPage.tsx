import { useState } from 'react';
import { DashboardLayout } from '../Components/DashboardDesign/DashboardLayout';
import { Send, Search, MoreVertical } from 'lucide-react';

export default function MessagesPage() {
    const [selectedChat, setSelectedChat] = useState(1);
    const [messageText, setMessageText] = useState('');

    const conversations = [
        {
            id: 1,
            name: 'Admin Support',
            lastMessage: 'How can I help you today?',
            time: '10:30 AM',
            unread: 2,
            avatar: 'https://ui-avatars.com/api/?name=Admin&background=667eea&color=ffffff'
        },
        {
            id: 2,
            name: 'BITSA Events Team',
            lastMessage: 'Looking forward to the event!',
            time: 'Yesterday',
            unread: 0,
            avatar: 'https://ui-avatars.com/api/?name=Events&background=10b981&color=ffffff'
        },
        {
            id: 3,
            name: 'Study Group',
            lastMessage: 'Meeting at 3 PM today',
            time: '2 days ago',
            unread: 5,
            avatar: 'https://ui-avatars.com/api/?name=Group&background=f59e0b&color=ffffff'
        },
    ];

    const messages = [
        {
            id: 1,
            sender: 'Admin Support',
            text: 'Hello! Welcome to BITSA. How can I assist you today?',
            time: '10:25 AM',
            isOwn: false
        },
        {
            id: 2,
            sender: 'You',
            text: 'Hi! I have a question about the upcoming events.',
            time: '10:27 AM',
            isOwn: true
        },
        {
            id: 3,
            sender: 'Admin Support',
            text: 'Sure! I\'d be happy to help. What would you like to know?',
            time: '10:30 AM',
            isOwn: false
        },
    ];

    const handleSendMessage = () => {
        if (messageText.trim()) {
            // Add message sending logic here
            console.log('Sending message:', messageText);
            setMessageText('');
        }
    };

    return (
        <DashboardLayout userRole="Student">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
                <div className="flex h-full">
                    {/* Conversations List */}
                    <div className="w-80 border-r border-gray-200 flex flex-col">
                        {/* Search */}
                        <div className="p-4 border-b border-gray-200">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search messages..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5773da] focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Conversations */}
                        <div className="flex-1 overflow-y-auto">
                            {conversations.map((conv) => (
                                <div
                                    key={conv.id}
                                    onClick={() => setSelectedChat(conv.id)}
                                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${selectedChat === conv.id
                                            ? 'bg-[#5773da]/10 border-l-4 border-l-[#5773da]'
                                            : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <img
                                            src={conv.avatar}
                                            alt={conv.name}
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-semibold text-gray-900 text-sm truncate">
                                                    {conv.name}
                                                </h3>
                                                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                                    {conv.time}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                                                {conv.unread > 0 && (
                                                    <span className="ml-2 px-2 py-0.5 bg-[#5773da] text-white text-xs rounded-full">
                                                        {conv.unread}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 flex flex-col">
                        {/* Chat Header */}
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src={conversations.find(c => c.id === selectedChat)?.avatar}
                                    alt="Avatar"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <h2 className="font-semibold text-gray-900">
                                        {conversations.find(c => c.id === selectedChat)?.name}
                                    </h2>
                                    <p className="text-xs text-green-600">● Online</p>
                                </div>
                            </div>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <MoreVertical className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-md px-4 py-3 rounded-2xl ${message.isOwn
                                                ? 'bg-[#5773da] text-white'
                                                : 'bg-gray-100 text-gray-900'
                                            }`}
                                    >
                                        <p className="text-sm">{message.text}</p>
                                        <p className={`text-xs mt-1 ${message.isOwn ? 'text-white/70' : 'text-gray-500'}`}>
                                            {message.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Message Input */}
                        <div className="p-4 border-t border-gray-200">
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5773da] focus:border-transparent"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="px-6 py-3 bg-[#5773da] hover:bg-[#4861c9] text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                                >
                                    <Send className="w-5 h-5" />
                                    <span>Send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
