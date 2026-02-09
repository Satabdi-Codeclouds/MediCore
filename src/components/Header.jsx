import React from 'react';
import {
    Search,
    Bell,
    Mail,
    Gift,
    Settings,
    ChevronDown
} from 'lucide-react';

export default function Header() {
    return (
        <header className="h-20 bg-card-bg/50 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-8 flex-1">
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>

                <div className="relative max-w-md w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search here"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-neon-green/50 transition-colors"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 border-r border-white/10 pr-6">
                    <IconButton icon={Bell} badge={4} />
                    <IconButton icon={Mail} badge={2} />
                    <IconButton icon={Gift} />
                    <IconButton icon={Settings} />
                </div>

                <div className="flex items-center gap-3 pl-2 cursor-pointer group">
                    <div className="text-right">
                        <p className="text-sm font-medium text-white group-hover:text-neon-green transition-colors">Hello, Roberto</p>
                        <p className="text-xs text-gray-400">Admin</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-neon-green/20 border border-neon-green/30 overflow-hidden">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto"
                            alt="User"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white" />
                </div>
            </div>
        </header>
    );
}

function IconButton({ icon: Icon, badge }) {
    return (
        <button className="relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
            <Icon className="w-6 h-6 group-hover:text-neon-green transition-colors" />
            {badge && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-neon-green text-black text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-card-bg">
                    {badge}
                </span>
            )}
        </button>
    );
}
