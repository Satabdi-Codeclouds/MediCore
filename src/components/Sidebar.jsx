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
    ShieldAlert
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: true },
    { name: 'Patient', icon: Users },
    { name: 'Patient Details', icon: UserCircle },
    { name: 'Doctor', icon: Stethoscope },
    { name: 'Doctor Detail', icon: FileText },
    { name: 'Review', icon: Star },
    { name: 'Appointment', icon: Calendar },
    { name: 'Staff', icon: UserCog },
    { name: 'Apps', icon: AppWindow },
    { name: 'Charts', icon: BarChart3 },
];

export default function Sidebar() {
    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-card-bg border-r border-white/5 flex flex-col z-50">
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-neon-green/20 rounded-xl flex items-center justify-center border border-neon-green/30">
                    <ShieldAlert className="text-neon-green w-6 h-6" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-white uppercase">MediCore</span>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
                {menuItems.map((item) => (
                    <a
                        key={item.name}
                        href="#"
                        className={cn(
                            "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group",
                            item.active
                                ? "bg-neon-green/10 text-neon-green border-r-4 border-neon-green"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <item.icon className={cn(
                            "w-5 h-5",
                            item.active ? "text-neon-green" : "group-hover:text-neon-green"
                        )} />
                        <span className="font-medium">{item.name}</span>
                    </a>
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
