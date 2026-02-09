import {
    Search,
    Bell,
    Mail,
    Gift,
    Settings,
    ChevronDown,
    LogOut,
    Menu
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Header({ onMenuClick }) {
    const { user, logout } = useAuth();

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

            <div className="flex items-center gap-2 md:gap-6">
                <div className="hidden md:flex items-center gap-4 border-r border-white/10 pr-6">
                    <IconButton icon={Bell} badge={4} />
                    <IconButton icon={Mail} badge={2} />
                    <IconButton icon={Gift} />
                    <Link to="/settings">
                        <IconButton icon={Settings} />
                    </Link>
                </div>

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


function IconButton({ icon: Icon, badge }) {
    return (
        <button className="relative p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <Icon className="w-5 h-5" />
            {badge && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-neon-green text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                    {badge}
                </span>
            )}
        </button>
    );
}
