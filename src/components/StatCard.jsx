import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../utils/cn';

export default function StatCard({ title, value, trend, isUp, icon: Icon, variant }) {
    const gradientClass = {
        pink: 'stat-card-pink',
        green: 'stat-card-green',
        blue: 'stat-card-blue',
        purple: 'stat-card-purple'
    }[variant];

    const iconColor = {
        pink: 'text-pink-500',
        green: 'text-neon-green',
        blue: 'text-blue-500',
        purple: 'text-purple-500'
    }[variant];

    return (
        <div className={cn("p-6 rounded-3xl border border-white/5 flex flex-col gap-4 group card-hover bg-card-bg/40 backdrop-blur-md", gradientClass)}>
            <div className="flex items-center justify-between">
                <div className={cn("w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors", iconColor)}>
                    <Icon className="w-6 h-6" />
                </div>
                <div className={cn("flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-lg", isUp ? "text-neon-green bg-neon-green/10" : "text-red-500 bg-red-500/10")}>
                    {isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {trend}
                </div>
            </div>

            <div>
                <p className="text-gray-400 text-sm font-medium">{title}</p>
                <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
            </div>
        </div>
    );
}
