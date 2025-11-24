import { useState } from 'react';
import { Search, Plus, Edit3, Trash2, Award, Users, Mail } from 'lucide-react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

export const LeadersManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Mock leaders data
    const mockLeaders = [
        { id: '1', name: 'John Doe', email: 'john@bitsa.com', title: 'Student Leader', community: 'Blockchain Dev', members: 45, joinDate: '2024-01-15' },
        { id: '2', name: 'Jane Smith', email: 'jane@bitsa.com', title: 'Event Coordinator', community: 'Web Development', members: 62, joinDate: '2024-02-20' },
        { id: '3', name: 'Bob Wilson', email: 'bob@bitsa.com', title: 'Community Manager', community: 'AI/ML', members: 38, joinDate: '2024-03-10' },
        { id: '4', name: 'Alice Johnson', email: 'alice@bitsa.com', title: 'Student Leader', community: 'Cloud Computing', members: 29, joinDate: '2024-04-05' },
    ];

    const [leaders, setLeaders] = useState(mockLeaders);

    const filteredLeaders = leaders.filter(leader =>
        leader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leader.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leader.community.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id: string) => {
        Swal.fire({
            title: 'Remove Leader?',
            text: 'This action cannot be undone',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Remove',
        }).then((result) => {
            if (result.isConfirmed) {
                setLeaders(leaders.filter(l => l.id !== id));
                toast.success('Leader removed successfully');
            }
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Leaders Management</h2>
                    <p className="text-gray-600 mt-2">Manage community leaders and coordinators</p>
                </div>
                <button
                    onClick={() => toast.info('Add leader feature coming soon')}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <Plus className="w-4 h-4" />
                    Add Leader
                </button>
            </div>

            {/* Search */}
            <div className="bg-white rounded-lg shadow p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or community..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <p className="text-sm text-gray-600 mt-3">
                    Found <span className="font-semibold">{filteredLeaders.length}</span> leader{filteredLeaders.length !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Leaders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLeaders.length > 0 ? (
                    filteredLeaders.map((leader) => (
                        <div key={leader.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                                        <Award className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{leader.name}</h3>
                                        <p className="text-xs text-gray-600">{leader.title}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-blue-50 rounded-lg transition">
                                        <Edit3 className="w-4 h-4 text-blue-600" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(leader.id)}
                                        className="p-2 hover:bg-red-50 rounded-lg transition"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-gray-600">Community</p>
                                    <p className="font-semibold text-gray-900">{leader.community}</p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gray-600" />
                                        <p className="text-sm text-gray-600">{leader.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 pt-3 border-t border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-gray-600" />
                                        <span className="text-sm font-semibold text-gray-900">{leader.members} members</span>
                                    </div>
                                    <span className="text-xs text-gray-600">Since {new Date(leader.joinDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-3 text-center py-12">
                        <p className="text-gray-500">No leaders found</p>
                    </div>
                )}
            </div>
        </div>
    );
};
