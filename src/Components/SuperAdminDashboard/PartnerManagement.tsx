import { useState } from 'react';
import { Search, Plus, Edit3, Trash2, Building2, Mail, Globe } from 'lucide-react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

export const PartnerManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    // Mock partners data
    const mockPartners = [
        { id: '1', name: 'Tech Solutions Inc', email: 'contact@techsol.com', website: 'techsol.com', status: 'active', startDate: '2024-01-15' },
        { id: '2', name: 'Cloud Innovations', email: 'hello@cloudinno.com', website: 'cloudinno.com', status: 'active', startDate: '2024-02-20' },
        { id: '3', name: 'Digital Marketing Co', email: 'info@digmark.com', website: 'digmark.com', status: 'inactive', startDate: '2024-03-10' },
        { id: '4', name: 'Software House', email: 'support@softhouse.com', website: 'softhouse.com', status: 'active', startDate: '2024-04-05' },
    ];

    const [partners, setPartners] = useState(mockPartners);

    const filteredPartners = partners.filter(partner => {
        const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            partner.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || partner.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleDelete = (id: string) => {
        Swal.fire({
            title: 'Remove Partner?',
            text: 'This action cannot be undone',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Remove',
        }).then((result) => {
            if (result.isConfirmed) {
                setPartners(partners.filter(p => p.id !== id));
                toast.success('Partner removed successfully');
            }
        });
    };

    const handleToggleStatus = (id: string) => {
        setPartners(partners.map(p =>
            p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
        ));
        toast.success('Partner status updated');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Partner Management</h2>
                    <p className="text-gray-600 mt-2">Manage organization partners and sponsors</p>
                </div>
                <button
                    onClick={() => toast.info('Add partner feature coming soon')}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <Plus className="w-4 h-4" />
                    Add Partner
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-4 space-y-4">
                <div className="flex gap-4 flex-col md:flex-row">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by company name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                <p className="text-sm text-gray-600">
                    Found <span className="font-semibold">{filteredPartners.length}</span> partner{filteredPartners.length !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Partners Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Company</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Contact Email</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Website</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Since</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredPartners.length > 0 ? (
                                filteredPartners.map((partner) => (
                                    <tr key={partner.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Building2 className="w-5 h-5 text-gray-600" />
                                                <span className="font-medium text-gray-900">{partner.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4" />
                                                {partner.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href={`https://${partner.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                                                <Globe className="w-4 h-4" />
                                                {partner.website}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggleStatus(partner.id)}
                                                className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                                                    partner.status === 'active'
                                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            >
                                                {partner.status === 'active' ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(partner.startDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button className="p-2 hover:bg-blue-50 rounded-lg transition">
                                                    <Edit3 className="w-4 h-4 text-blue-600" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(partner.id)}
                                                    className="p-2 hover:bg-red-50 rounded-lg transition"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No partners found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
