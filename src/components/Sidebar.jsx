import React from 'react';
import {
    LayoutDashboard,
    Users,
    UserCircle,
    Stethoscope,
    FileText,
    Star,
    Calendar,
    UserCog,
    AppWindow,
    BarChart3,
    ShieldAlert,
    X
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../utils/cn';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Patient', icon: Users, path: '/patients' },
    { name: 'Doctor', icon: Stethoscope, path: '/doctors' },
    { name: 'Appointment', icon: Calendar, path: '/appointments' },
    { name: 'Staff', icon: UserCog, path: '/staff' },
    { name: 'Reviews', icon: Star, path: '/reviews' },
    { name: 'Settings', icon: UserCircle, path: '/settings' },
];

export default function Sidebar({ isOpen, onClose }) {
    return (
        <aside className={cn(
            "fixed left-0 top-0 h-screen w-64 bg-card-bg border-r border-white/5 flex flex-col z-[60] transition-transform duration-300 lg:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
            <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neon-green/20 rounded-xl flex items-center justify-center border border-neon-green/30">
                        <ShieldAlert className="text-neon-green w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white uppercase">MediCore</span>
                </div>
                {/* Mobile Close Button */}
                <button
                    onClick={onClose}
                    className="p-2 lg:hidden text-gray-400 hover:text-white"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        onClick={() => {
                            if (window.innerWidth < 1024) onClose();
                        }}
                        className={({ isActive }) => cn(
                            "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group",
                            isActive
                                ? "bg-neon-green/10 text-neon-green border-r-4 border-neon-green"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon className={cn(
                                    "w-5 h-5",
                                    isActive ? "text-neon-green" : "group-hover:text-neon-green"
                                )} />
                                <span className="font-medium">{item.name}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-6 border-t border-white/5">
                <div className="bg-neon-green/5 p-4 rounded-2xl border border-neon-green/10">
                    <p className="text-xs text-neon-green font-semibold uppercase tracking-wider mb-1">Upgrade Plan</p>
                    <p className="text-sm text-gray-400 mb-3">Get more features with Pro.</p>
                    <button className="w-full py-2 bg-neon-green text-black font-bold rounded-lg text-sm hover:opacity-90 transition-opacity">
                        Upgrade Now
                    </button>
                </div>
            </div>
        </aside>
    );
}

