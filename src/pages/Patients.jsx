import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Search, Plus, Edit2, Trash2, Filter, MoreVertical, X } from 'lucide-react';
import Modal from '../components/Modal';
import { cn } from '../utils/cn';

export default function Patients() {
    const { patients, addPatient, updatePatient, deletePatient } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPatient, setEditingPatient] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: 'Male',
        status: 'Pending',
        email: '',
        phone: '',
    });

    const filteredPatients = patients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = statusFilter === 'All' || patient.status === statusFilter;
        return matchesSearch && matchesFilter;
    });

    const handleOpenModal = (patient = null) => {
        if (patient) {
            setEditingPatient(patient);
            setFormData({
                name: patient.name,
                age: patient.age,
                gender: patient.gender,
                status: patient.status,
                email: patient.email,
                phone: patient.phone,
            });
        } else {
            setEditingPatient(null);
            setFormData({
                name: '',
                age: '',
                gender: 'Male',
                status: 'Pending',
                email: '',
                phone: '',
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingPatient) {
            updatePatient(editingPatient.id, formData);
        } else {
            addPatient(formData);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white">Patient Management</h2>
                    <p className="text-gray-400 mt-1">Manage hospital patients and their admission status.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-neon-green text-black font-bold px-6 py-3 rounded-2xl flex items-center gap-2 hover:opacity-90 transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Add New Patient
                </button>
            </div>

            <div className="bg-card-bg border border-white/5 rounded-[32px] overflow-hidden">
                {/* Toolbar */}
                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-neon-green/50 transition-colors"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <Filter className="text-gray-400 w-5 h-5" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-neon-green/50 transition-colors outline-none"
                        >
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="On Recovery">On Recovery</option>
                            <option value="Recovered">Recovered</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 text-gray-400 text-[10px] md:text-sm">
                                <th className="px-4 md:px-6 py-4 font-semibold uppercase tracking-wider">Patient Name</th>
                                <th className="px-4 md:px-6 py-4 font-semibold uppercase tracking-wider">Age / Gender</th>
                                <th className="px-4 md:px-6 py-4 font-semibold uppercase tracking-wider">Status</th>
                                <th className="px-4 md:px-6 py-4 font-semibold uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredPatients.map(patient => (
                                <tr key={patient.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-4 md:px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
                                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.name}`} alt={patient.name} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-white group-hover:text-neon-green transition-colors truncate">{patient.name}</p>
                                                <p className="text-[10px] text-gray-500 truncate">{patient.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 md:px-6 py-4">
                                        <p className="text-white font-medium text-sm md:text-base">{patient.age} Y</p>
                                        <p className="text-[10px] text-gray-500">{patient.gender}</p>
                                    </td>
                                    <td className="px-4 md:px-6 py-4">
                                        <StatusBadge status={patient.status} />
                                    </td>
                                    <td className="px-4 md:px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1 md:gap-2">
                                            <button
                                                onClick={() => handleOpenModal(patient)}
                                                className="p-2 rounded-xl text-gray-400 hover:text-neon-green hover:bg-neon-green/10 transition-all"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => deletePatient(patient.id)}
                                                className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredPatients.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 italic">
                                        No patients found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Patient Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingPatient ? 'Edit Patient' : 'Add New Patient'}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-neon-green/50 transition-colors"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Age</label>
                            <input
                                type="number"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-neon-green/50 transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Gender</label>
                            <select
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-neon-green/50 transition-colors outline-none"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-neon-green/50 transition-colors outline-none"
                            >
                                <option value="Pending">Pending</option>
                                <option value="On Recovery">On Recovery</option>
                                <option value="Recovered">Recovered</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-neon-green/50 transition-colors"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-neon-green/50 transition-colors"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-neon-green text-black font-bold py-4 rounded-2xl hover:opacity-90 transition-opacity active:scale-[0.98]"
                    >
                        {editingPatient ? 'Update Patient' : 'Add Patient'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}

function StatusBadge({ status }) {
    const styles = {
        'Recovered': 'bg-green-500/10 text-green-500',
        'On Recovery': 'bg-blue-500/10 text-blue-500',
        'Pending': 'bg-yellow-500/10 text-yellow-500',
        'Rejected': 'bg-red-500/10 text-red-500',
    }[status] || 'bg-gray-500/10 text-gray-500';

    return (
        <span className={cn("px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-[1px]", styles)}>
            {status}
        </span>
    );
}
