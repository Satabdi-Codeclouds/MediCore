import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Search, Star, CheckCircle, XCircle, MoreVertical, Filter, MessageSquare } from 'lucide-react';
import { cn } from '../utils/cn';

export default function Reviews() {
    const { reviews, updateReview } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredReviews = reviews.filter(review => {
        const matchesSearch = review.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.doctor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = statusFilter === 'All' || review.status === statusFilter;
        return matchesSearch && matchesFilter;
    });

    const handleStatusChange = (id, status) => {
        updateReview(id, { status });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white">Patient Reviews</h2>
                    <p className="text-gray-400 mt-1">Monitor and manage feedback from patients regarding doctors and services.</p>
                </div>
                <div className="flex items-center gap-3 bg-neon-green/10 px-4 py-2 rounded-2xl border border-neon-green/20">
                    <Star className="w-5 h-5 text-neon-green fill-current" />
                    <span className="text-neon-green font-bold">4.8 Avg Rating</span>
                </div>
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
                        <option value="All">All Reviews</option>
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReviews.map(review => (
                    <div key={review.id} className="bg-card-bg/40 backdrop-blur-md border border-white/5 rounded-[40px] p-8 flex flex-col gap-5 group card-hover relative overflow-hidden">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.patient}`} alt={review.patient} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{review.patient}</h4>
                                    <p className="text-xs text-gray-500">{review.date}</p>
                                </div>
                            </div>
                            <StatusBadge status={review.status} />
                        </div>

                        <div className="flex items-center gap-1 text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={cn("w-4 h-4", i < review.rating ? "fill-current" : "text-gray-700")} />
                            ))}
                            <span className="ml-2 text-sm font-bold text-white">{review.rating}.0</span>
                        </div>

                        <div className="bg-white/5 p-4 rounded-3xl relative">
                            <MessageSquare className="absolute -top-2 -left-2 w-6 h-6 text-neon-green/20" />
                            <p className="text-sm text-gray-400 leading-relaxed italic">"{review.comment}"</p>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Doctor Reviewed</p>
                                <p className="text-sm font-bold text-neon-green">{review.doctor}</p>
                            </div>

                            {review.status === 'Pending' && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleStatusChange(review.id, 'Approved')}
                                        className="p-2 rounded-xl bg-neon-green/10 text-neon-green hover:bg-neon-green hover:text-black transition-all"
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(review.id, 'Rejected')}
                                        className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                    >
                                        <XCircle className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {filteredReviews.length === 0 && (
                    <div className="col-span-full py-20 text-center text-gray-500 italic bg-card-bg/30 border border-dashed border-white/10 rounded-[40px]">
                        No reviews found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
}

function StatusBadge({ status }) {
    const styles = {
        'Approved': 'text-neon-green bg-neon-green/10',
        'Pending': 'text-yellow-500 bg-yellow-500/10',
        'Rejected': 'text-red-500 bg-red-500/10',
    }[status] || 'text-gray-400 bg-gray-400/10';

    return (
        <div className={cn("px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider", styles)}>
            {status}
        </div>
    );
}
