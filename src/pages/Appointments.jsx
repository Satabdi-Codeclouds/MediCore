import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Calendar as CalendarIcon, Clock, Plus, Filter, CheckCircle, XCircle, Clock4, Search } from 'lucide-react';
import Modal from '../components/Modal';
import { cn } from '../utils/cn';

export default function Appointments() {
    const { appointments, patients, doctors, bookAppointment, updateAppointment } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [formData, setFormData] = useState({
        patient: '',
        doctor: '',
        date: '',
        time: '',
        status: 'Pending',
    });

    const filteredAppointments = appointments.filter(app => {
        const matchesSearch = app.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.doctor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = statusFilter === 'All' || app.status === statusFilter;
        return matchesSearch && matchesFilter;
    });

    const handleBook = (e) => {
        e.preventDefault();
        bookAppointment(formData);
        setFormData({ patient: '', doctor: '', date: '', time: '', status: 'Pending' });
        setIsModalOpen(false);
    };

    const handleStatusChange = (id, status) => {
        updateAppointment(id, { status });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white">Appointments Management</h2>
                    <p className="text-gray-400 mt-1">Schedule and manage patient-doctor consultations.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-neon-green text-black font-bold px-6 py-3 rounded-2xl flex items-center gap-2 hover:opacity-90 transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Book Appointment
                </button>
            </div>

            {/* Filters */}
            <div className="bg-card-bg border border-white/5 rounded-[32px] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by patient or doctor..."
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
                        <option value="All">All Appointments</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Appointments Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAppointments.map(app => (
                    <div key={app.id} className="bg-card-bg/40 backdrop-blur-md border border-white/5 rounded-[40px] p-8 flex flex-col gap-6 group card-hover relative overflow-hidden">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-neon-green/10 flex items-center justify-center border border-neon-green/20">
                                    <CalendarIcon className="text-neon-green w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-white">{app.patient}</h4>
                                    <p className="text-sm text-neon-green font-medium underline underline-offset-4 decoration-neon-green/30">{app.doctor}</p>
                                </div>
                            </div>
                            <StatusBadge status={app.status} />
                        </div>

                        <div className="flex items-center gap-6 py-4 border-y border-white/5">
                            <div className="flex items-center gap-2 text-gray-400">
                                <CalendarIcon className="w-4 h-4 text-neon-green" />
                                <span className="text-sm">{app.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Clock className="w-4 h-4 text-neon-green" />
                                <span className="text-sm">{app.time}</span>
                            </div>
                        </div>

                        {app.status === 'Pending' && (
                            <div className="flex gap-3 mt-2">
                                <button
                                    onClick={() => handleStatusChange(app.id, 'Confirmed')}
                                    className="flex-1 bg-neon-green/10 text-neon-green hover:bg-neon-green hover:text-black font-bold py-3 rounded-2xl transition-all flex items-center justify-center gap-2 text-sm"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    Confirm
                                </button>
                                <button
                                    onClick={() => handleStatusChange(app.id, 'Cancelled')}
                                    className="flex-1 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white font-bold py-3 rounded-2xl transition-all flex items-center justify-center gap-2 text-sm"
                                >
                                    <XCircle className="w-4 h-4" />
                                    Cancel
                                </button>
                            </div>
                        )}

                        {app.status === 'Confirmed' && (
                            <p className="text-xs text-center text-gray-500 italic py-2">Appointment is confirmed. Doctor has been notified.</p>
                        )}

                        {app.status === 'Cancelled' && (
                            <p className="text-xs text-center text-red-500/50 italic py-2">This appointment has been cancelled.</p>
                        )}
                    </div>
                ))}

                {filteredAppointments.length === 0 && (
                    <div className="col-span-full py-20 text-center text-gray-500 italic bg-card-bg/30 border border-dashed border-white/10 rounded-[40px]">
                        No appointments found.
                    </div>
                )}
            </div>

            {/* Booking Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Book Appointment"
            >
                <form onSubmit={handleBook} className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Select Patient</label>
                        <select
                            value={formData.patient}
                            onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-neon-green/50 transition-colors outline-none"
                            required
                        >
                            <option value="">Choose Patient</option>
                            {patients.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Select Doctor</label>
                        <select
                            value={formData.doctor}
                            onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-neon-green/50 transition-colors outline-none"
                            required
                        >
                            <option value="">Choose Doctor</option>
                            {doctors.map(d => <option key={d.id} value={d.name}>{d.name} ({d.spec})</option>)}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Date</label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-neon-green/50 transition-colors"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Time</label>
                            <input
                                type="time"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-neon-green/50 transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-neon-green text-black font-bold py-4 rounded-2xl hover:opacity-90 transition-opacity active:scale-[0.98]"
                    >
                        Confirm Booking
                    </button>
                </form>
            </Modal>
        </div>
    );
}

function StatusBadge({ status }) {
    const styles = {
        'Confirmed': 'text-neon-green bg-neon-green/10',
        'Pending': 'text-yellow-500 bg-yellow-500/10',
        'Cancelled': 'text-red-500 bg-red-500/10',
    }[status] || 'text-gray-400 bg-gray-400/10';

    const Icon = {
        'Confirmed': CheckCircle,
        'Pending': Clock4,
        'Cancelled': XCircle,
    }[status] || Clock4;

    return (
        <div className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider", styles)}>
            <Icon className="w-3 h-3" />
            {status}
        </div>
    );
}
