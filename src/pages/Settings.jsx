import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Bell, Shield, Moon, Eye, Save, Trash2 } from 'lucide-react';
import { cn } from '../utils/cn';

export default function Settings() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Profile Settings', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security & Privacy', icon: Shield },
        { id: 'appearance', label: 'Appearance', icon: Moon },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold text-white">Account Settings</h2>
                <p className="text-gray-400 mt-1">Manage your account preferences and application settings.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Settings Navigation */}
                <div className="w-full lg:w-64 space-y-1">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200 group text-left",
                                activeTab === tab.id
                                    ? "bg-neon-green/10 text-neon-green border-r-4 border-neon-green"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <tab.icon className={cn("w-5 h-5", activeTab === tab.id ? "text-neon-green" : "group-hover:text-neon-green")} />
                            <span className="font-semibold">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Settings Content */}
                <div className="flex-1">
                    <div className="bg-card-bg/40 backdrop-blur-md border border-white/5 rounded-[40px] p-8 md:p-10 card-hover">
                        {activeTab === 'profile' && (
                            <div className="space-y-8">
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-[30px] overflow-hidden border-2 border-neon-green/30 group-hover:border-neon-green transition-all">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} alt="Profile" className="w-full h-full object-cover" />
                                        </div>
                                        <button className="absolute -bottom-2 -right-2 bg-neon-green text-black p-2 rounded-xl shadow-lg hover:scale-110 transition-transform">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">{user?.name}</h3>
                                        <p className="text-neon-green font-semibold uppercase tracking-widest text-sm">{user?.role} Account</p>
                                        <p className="text-gray-500 text-sm mt-1">Profile picture and role are managed by system administrator.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <SettingInput label="Display Name" defaultValue={user?.name} />
                                    <SettingInput label="Email Address" defaultValue={user?.email} />
                                    <SettingInput label="Phone Number" placeholder="+1 (555) 000-0000" />
                                    <SettingInput label="Location" placeholder="Hospital Wing B, Floor 2" />
                                </div>

                                <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4">
                                    <button className="flex-1 bg-neon-green text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95">
                                        <Save className="w-5 h-5" />
                                        Save Changes
                                    </button>
                                    <button className="flex-1 bg-white/5 text-white font-bold py-4 rounded-2xl hover:bg-white/10 transition-all">
                                        Reset to Default
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="space-y-6">
                                <ToggleSetting title="Email Notifications" description="Receive daily summaries of patient activity." defaultEnabled={true} />
                                <ToggleSetting title="In-App Alerts" description="Show real-time notifications for new appointments." defaultEnabled={true} />
                                <ToggleSetting title="System Updates" description="Notify me about hospital system maintenance." defaultEnabled={false} />
                                <ToggleSetting title="Review Alerts" description="Get notified when a patient leaves a new review." defaultEnabled={true} />
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h4 className="text-lg font-bold text-white">Change Password</h4>
                                    <div className="grid grid-cols-1 gap-4">
                                        <SettingInput label="Current Password" type="password" />
                                        <SettingInput label="New Password" type="password" />
                                        <SettingInput label="Confirm New Password" type="password" />
                                    </div>
                                    <button className="bg-neon-green/10 text-neon-green font-bold px-6 py-3 rounded-xl hover:bg-neon-green hover:text-black transition-all">
                                        Update Password
                                    </button>
                                </div>

                                <div className="pt-8 border-t border-white/5">
                                    <h4 className="text-lg font-bold text-red-500 mb-4">Danger Zone</h4>
                                    <div className="bg-red-500/5 border border-red-500/10 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                                        <div>
                                            <p className="font-bold text-white">Deactivate Account</p>
                                            <p className="text-sm text-gray-500">Temporarily disable your access to the MediCore dashboard.</p>
                                        </div>
                                        <button className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-600 transition-all flex items-center gap-2">
                                            <Trash2 className="w-4 h-4" />
                                            Deactivate
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'appearance' && (
                            <div className="space-y-6 text-center py-10 text-gray-400">
                                <Moon className="w-16 h-16 mx-auto mb-4 text-neon-green/20" />
                                <p className="text-xl font-bold text-white italic">"MediCore is currently optimized for Dark Mode."</p>
                                <p>Support for Light and High-Contrast themes is coming in the next release.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function SettingInput({ label, ...props }) {
    return (
        <div className="space-y-1 text-left">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
            <input
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white focus:outline-none focus:border-neon-green/50 transition-colors"
                {...props}
            />
        </div>
    );
}

function ToggleSetting({ title, description, defaultEnabled }) {
    const [enabled, setEnabled] = useState(defaultEnabled);
    return (
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-3xl border border-white/5 hover:border-white/10 transition-all">
            <div className="text-left pr-4">
                <p className="font-bold text-white">{title}</p>
                <p className="text-xs text-gray-500">{description}</p>
            </div>
            <button
                onClick={() => setEnabled(!enabled)}
                className={cn(
                    "relative w-12 h-6 rounded-full transition-colors",
                    enabled ? "bg-neon-green" : "bg-gray-700"
                )}
            >
                <div className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-black transition-all",
                    enabled ? "left-7" : "left-1"
                )} />
            </button>
        </div>
    );
}
