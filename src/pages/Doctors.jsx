import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Search, Plus, Edit2, Trash2, Star, Facebook, Twitter, Instagram, Filter } from 'lucide-react';
import Modal from '../components/Modal';
import { cn } from '../utils/cn';

export default function Doctors() {
    const { doctors, addDoctor, updateDoctor, deleteDoctor } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [specFilter, setSpecFilter] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        spec: 'General',
        experience: '',
        rating: '5.0',
        img: '',
        email: '',
    });

    const specializations = ['All', ...new Set(doctors.map(d => d.spec))];

    const filteredDoctors = doctors.filter(doctor => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = specFilter === 'All' || doctor.spec === specFilter;
        return matchesSearch && matchesFilter;
    });

    const handleOpenModal = (doctor = null) => {
        if (doctor) {
            setEditingDoctor(doctor);
            setFormData({
                name: doctor.name,
                spec: doctor.spec,
                experience: doctor.experience,
                rating: doctor.rating,
                img: doctor.img,
                email: doctor.email || `${doctor.name.toLowerCase().replace(' ', '.')}@medicore.com`,
            });
        } else {
            setEditingDoctor(null);
            setFormData({
                name: '',
                spec: 'General',
                experience: '',
                rating: '5.0',
                img: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
                email: '',
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingDoctor) {
            updateDoctor(editingDoctor.id, formData);
        } else {
            addDoctor(formData);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white">Doctors Directory</h2>
                    <p className="text-gray-400 mt-1">Manage hospital medical staff and their specializations.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-neon-green text-black font-bold px-6 py-3 rounded-2xl flex items-center gap-2 hover:opacity-90 transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Add New Doctor
                </button>
            </div>

            {/* Filters */}
            <div className="bg-card-bg border border-white/5 rounded-[32px] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by doctor name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-neon-green/50 transition-colors"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <Filter className="text-gray-400 w-5 h-5" />
                    <select
                        value={specFilter}
                        onChange={(e) => setSpecFilter(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-neon-green/50 transition-colors outline-none"
                    >
                        {specializations.map(spec => (
                            <option key={spec} value={spec}>{spec}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDoctors.map(doctor => (
                    <div key={doctor.id} className="bg-card-bg/40 backdrop-blur-md border border-white/5 rounded-[40px] p-8 flex flex-col items-center gap-6 group card-hover relative overflow-hidden">
                        {/* Gradient Background Decoration */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-neon-green/5 blur-[40px] rounded-full -mr-12 -mt-12 transition-all group-hover:bg-neon-green/10"></div>

                        <div className="relative">
                            <div className="w-28 h-28 rounded-full border-4 border-neon-green/20 overflow-hidden group-hover:border-neon-green/50 transition-all">
                                <img src={doctor.img || `https://api.dicebear.com/7.x/avataaars/svg?seed=${doctor.name}`} alt={doctor.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-dashboard-bg border border-white/10 rounded-xl px-2 py-1 flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                <span className="text-[10px] font-bold text-white">{doctor.rating}</span>
                            </div>
                        </div>

                        <div className="text-center space-y-1">
                            <h4 className="font-bold text-xl text-white group-hover:text-neon-green transition-colors">{doctor.name}</h4>
                            <p className="text-xs text-neon-green font-semibold uppercase tracking-widest">{doctor.spec}</p>
                            <p className="text-sm text-gray-500">{doctor.experience}</p>
                        </div>

                        <div className="flex gap-3">
                            <SocialIcon icon={Facebook} />
                            <SocialIcon icon={Twitter} />
                            <SocialIcon icon={Instagram} />
                        </div>

                        <div className="w-full pt-6 border-t border-white/5 flex items-center justify-between">
                            <button
                                onClick={() => handleOpenModal(doctor)}
                                className="flex-1 flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors"
                            >
                                <Edit2 className="w-4 h-4" />
                                <span className="text-sm font-medium">Edit</span>
                            </button>
                            <div className="w-px h-4 bg-white/10mx-4"></div>
                            <button
                                onClick={() => deleteDoctor(doctor.id)}
                                className="flex-1 flex items-center justify-center gap-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span className="text-sm font-medium">Delete</span>
                            </button>
                        </div>
                    </div>
                ))}

                {filteredDoctors.length === 0 && (
                    <div className="col-span-full py-20 text-center text-gray-500 italic bg-card-bg/30 border border-dashed border-white/10 rounded-[40px]">
                        No doctors found matching your criteria.
                    </div>
                )}
            </div>

            {/* Doctor Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingDoctor ? 'Edit Doctor Profile' : 'Add New Doctor'}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-neon-green/50 transition-colors"
                            placeholder="Dr. Gregory House"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Specialization</label>
                            <select
                                value={formData.spec}
                                onChange={(e) => setFormData({ ...formData, spec: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-neon-green/50 transition-colors outline-none"
                            >
                                <option value="Cardiologist">Cardiologist</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Surgeon">Surgeon</option>
                                <option value="Pediatrician">Pediatrician</option>
                                <option value="General">General</option>
                                <option value="Dermatologist">Dermatologist</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Experience</label>
                            <input
                                type="text"
                                value={formData.experience}
                                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-neon-green/50 transition-colors"
                                placeholder="10 Years"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Rating</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                value={formData.rating}
                                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-neon-green/50 transition-colors"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-neon-green/50 transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-neon-green text-black font-bold py-4 rounded-2xl hover:opacity-90 transition-opacity active:scale-[0.98]"
                    >
                        {editingDoctor ? 'Update Profile' : 'Add Doctor'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}

function SocialIcon({ icon: Icon }) {
    return (
        <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-neon-green hover:text-black transition-all">
            <Icon className="w-5 h-5" />
        </a>
    );
}
