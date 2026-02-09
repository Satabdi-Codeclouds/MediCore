import React, { useState } from 'react';
import {
    Search,
    Bell,
    Mail,
    ShoppingCart,
    Settings,
    LogOut,
    Menu,
    X,
    Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

export default function Header({ onMenuClick }) {
    const { user, logout } = useAuth();
    const [activePanel, setActivePanel] = useState(null); // 'messages' | 'cart' | 'notifications' | null

    const togglePanel = (panel) => {
        setActivePanel(activePanel === panel ? null : panel);
    };

    const messages = [
        { id: 1, sender: 'Dr. Sarah', text: 'Patient in Room 302 needs attention.', time: '2m ago' },
        { id: 2, sender: 'Admin Office', text: 'New staff meeting at 3 PM today.', time: '1h ago' },
        { id: 3, sender: 'Pharmacy', text: 'Medicine stock updated.', time: '3h ago' },
    ];

    const cartItems = [
        { id: 1, name: 'Surgical Masks (Box)', price: '$25.00', qty: 2 },
        { id: 2, name: 'Latex Gloves', price: '$15.00', qty: 5 },
    ];

    return (
        <header className="h-20 bg-card-bg/50 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-4 md:gap-8 flex-1">
                {/* Mobile Menu Toggle */}
                <button
                    onClick={onMenuClick}
                    className="p-2 lg:hidden text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <Link to="/" className="text-xl md:text-2xl font-bold text-white hidden sm:block">Dashboard</Link>

                <div className="relative max-w-md w-full ml-2 sm:ml-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 md:w-5 h-4 md:h-5" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 md:pl-12 pr-4 text-xs md:text-sm text-white focus:outline-none focus:border-neon-green/50 transition-colors"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-6 relative">
                <div className="hidden md:flex items-center gap-4 border-r border-white/10 pr-6">
                    <IconButton
                        icon={Bell}
                        badge={4}
                        active={activePanel === 'notifications'}
                        onClick={() => togglePanel('notifications')}
                    />
                    <IconButton
                        icon={Mail}
                        badge={messages.length}
                        active={activePanel === 'messages'}
                        onClick={() => togglePanel('messages')}
                    />
                    <IconButton
                        icon={ShoppingCart}
                        badge={cartItems.length}
                        active={activePanel === 'cart'}
                        onClick={() => togglePanel('cart')}
                    />
                    <Link to="/settings">
                        <IconButton icon={Settings} />
                    </Link>
                </div>

                {/* Dropdown Panels */}
                {activePanel && (
                    <div className="absolute top-16 right-48 w-80 bg-card-bg border border-white/10 rounded-3xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                            <h4 className="font-bold text-white capitalize">{activePanel}</h4>
                            <button onClick={() => setActivePanel(null)} className="text-gray-400 hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="max-h-96 overflow-y-auto custom-scrollbar">
                            {activePanel === 'messages' && (
                                <div className="divide-y divide-white/5">
                                    {messages.map(msg => (
                                        <div key={msg.id} className="p-4 hover:bg-white/5 transition-colors cursor-pointer group">
                                            <div className="flex justify-between items-start mb-1">
                                                <p className="font-bold text-sm text-neon-green">{msg.sender}</p>
                                                <span className="text-[10px] text-gray-500">{msg.time}</span>
                                            </div>
                                            <p className="text-xs text-gray-400 line-clamp-2">{msg.text}</p>
                                        </div>
                                    ))}
                                    <button className="w-full py-3 text-xs text-neon-green font-bold hover:bg-neon-green hover:text-black transition-all">View All Messages</button>
                                </div>
                            )}

                            {activePanel === 'cart' && (
                                <div className="p-4 space-y-4">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex items-center justify-between border-b border-white/5 pb-3">
                                            <div>
                                                <p className="text-sm font-bold text-white">{item.name}</p>
                                                <p className="text-xs text-gray-400">{item.qty} x {item.price}</p>
                                            </div>
                                            <button className="text-red-500 hover:text-red-400 text-xs">Remove</button>
                                        </div>
                                    ))}
                                    <div className="pt-2">
                                        <div className="flex justify-between mb-4">
                                            <span className="text-gray-400 text-sm">Total</span>
                                            <span className="text-white font-bold">$125.00</span>
                                        </div>
                                        <button className="w-full bg-neon-green text-black font-bold py-3 rounded-xl hover:opacity-90 transition-all">Checkout Now</button>
                                    </div>
                                </div>
                            )}

                            {activePanel === 'notifications' && (
                                <div className="p-4 space-y-1">
                                    {[1, 2, 3, 4].map(n => (
                                        <div key={n} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-neon-green/10 flex items-center justify-center shrink-0">
                                                <Check className="w-4 h-4 text-neon-green" />
                                            </div>
                                            <p className="text-xs text-gray-400">Appointment #{n}452 confirmed by patient.</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <Link to="/settings" className="flex items-center gap-2 md:gap-3 pl-2 group relative">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-white group-hover:text-neon-green transition-colors">
                            {user?.name || 'Guest'}
                        </p>
                        <p className="text-[10px] text-gray-400">{user?.role || 'User'}</p>
                    </div>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-neon-green/20 border border-neon-green/30 overflow-hidden group-hover:border-neon-green transition-all">
                        <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Guest'}`}
                            alt="User"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </Link>
                <div className="pl-2 border-l border-white/10">
                    <button
                        onClick={logout}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Logout"
                    >
                        <LogOut className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}


function IconButton({ icon: Icon, badge, onClick, active }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "relative p-2 rounded-xl transition-all",
                active ? "bg-neon-green/10 text-neon-green" : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
        >
            <Icon className="w-5 h-5" />
            {badge && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-neon-green text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                    {badge}
                </span>
            )}
        </button>
    );
}

