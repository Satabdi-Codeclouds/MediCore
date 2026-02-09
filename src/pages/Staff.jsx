import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Search, Filter, Mail, Phone, ShieldCheck, MoreVertical, ToggleLeft as Toggle, ToggleRight } from 'lucide-react';
import { cn } from '../utils/cn';

export default function Staff() {
    const { staff, updateStaff } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');

    const roles = ['All', ...new Set(staff.map(s => s.role))];

    const filteredStaff = staff.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = roleFilter === 'All' || s.role === roleFilter;
        return matchesSearch && matchesFilter;
    });

    const handleToggleStatus = (id) => {
        const member = staff.find(s => s.id === id);
        updateStaff(id, { status: member.status === 'Active' ? 'Offline' : 'Active' });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white">Staff Management</h2>
                    <p className="text-gray-400 mt-1">Manage hospital employees, roles, and system access.</p>
                </div>
                <button className="bg-neon-green text-black font-bold px-6 py-3 rounded-2xl flex items-center gap-2 hover:opacity-90 transition-all active:scale-95">
                    <ShieldCheck className="w-5 h-5" />
                    Assign New Role
                </button>
            </div>

            <div className="bg-card-bg border border-white/5 rounded-[32px] overflow-hidden">
                {/* Toolbar */}
                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search staff by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-neon-green/50 transition-colors"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <Filter className="text-gray-400 w-5 h-5" />
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-neon-green/50 transition-colors outline-none"
                        >
                            {roles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Staff Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 text-gray-400 text-sm">
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Role & Dept</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredStaff.map(member => (
                                <tr key={member.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-neon-green/10 flex items-center justify-center border border-neon-green/20">
                                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} alt={member.name} className="w-full h-full" />
                                            </div>
                                            <span className="font-bold text-white group-hover:text-neon-green transition-colors">{member.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-white font-medium">{member.role}</p>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest">{member.dept}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <Mail className="w-3 h-3 text-neon-green" />
                                                {member.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <Phone className="w-3 h-3 text-neon-green" />
                                                {member.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className={cn(
                                                "w-2 h-2 rounded-full",
                                                member.status === 'Active' ? "bg-neon-green animate-pulse" : "bg-gray-600"
                                            )} />
                                            <span className={cn(
                                                "text-xs font-bold uppercase tracking-wider",
                                                member.status === 'Active' ? "text-neon-green" : "text-gray-500"
                                            )}>
                                                {member.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <button
                                                onClick={() => handleToggleStatus(member.id)}
                                                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                                            >
                                                {member.status === 'Active' ? <ToggleRight className="w-6 h-6 text-neon-green" /> : <Toggle className="w-6 h-6" />}
                                            </button>
                                            <button className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
