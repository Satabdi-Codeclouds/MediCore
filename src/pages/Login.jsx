import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, User, Lock, AlertCircle } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = login(email, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-dashboard-bg flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-card-bg border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                {/* Abstract Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green/10 blur-[60px] rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-neon-green/5 blur-[50px] rounded-full -ml-16 -mb-16"></div>

                <div className="relative z-10">
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-16 h-16 bg-neon-green/20 rounded-2xl flex items-center justify-center border border-neon-green/30 mb-4">
                            <ShieldAlert className="text-neon-green w-10 h-10" />
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">MediCore</h1>
                        <p className="text-gray-400 text-sm mt-1 uppercase tracking-[3px]">Hospital Admin</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-neon-green/50 transition-colors"
                                    placeholder="admin@medicore.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-neon-green/50 transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-xl text-sm border border-red-500/20">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-neon-green text-black font-bold py-4 rounded-2xl hover:opacity-90 transition-opacity active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center text-gray-500 text-sm mt-8">
                        Copyright © Designed & Developed by DexignZone 2023
                    </p>
                </div>
            </div>
        </div>
    );
}
