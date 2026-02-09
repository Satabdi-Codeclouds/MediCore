import React from 'react';
import { useData } from '../context/DataContext';
import StatCard from '../components/StatCard';
import { Users, Stethoscope, Calendar, DollarSign, Facebook, Twitter, Instagram, Star } from 'lucide-react';
import Chart from 'react-apexcharts';
import { clsx } from 'clsx';

export default function Dashboard() {
    const { patients, doctors, appointments } = useData();

    const revenueOptions = {
        chart: { type: 'bar', toolbar: { show: false }, background: 'transparent' },
        plotOptions: { bar: { borderRadius: 6, columnWidth: '40%' } },
        colors: ['#39FF14', '#ec4899'],
        dataLabels: { enabled: false },
        theme: { mode: 'dark' },
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], axisBorder: { show: false } },
        grid: { borderColor: 'rgba(255,255,255,0.05)' }
    };

    const revenueSeries = [
        { name: 'Income', data: [44, 55, 41, 67, 22, 43] },
        { name: 'Expenses', data: [13, 23, 20, 8, 13, 27] }
    ];

    const patientOptions = {
        chart: { type: 'line', toolbar: { show: false }, background: 'transparent' },
        stroke: { curve: 'smooth', width: 3 },
        colors: ['#39FF14', '#3b82f6'],
        theme: { mode: 'dark' },
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
        grid: { borderColor: 'rgba(255,255,255,0.05)' }
    };

    const patientSeries = [
        { name: 'Recovered Patient', data: [31, 40, 28, 51, 42, 109, 100, 120, 80, 90, 110, 95] },
        { name: 'New Patient', data: [11, 32, 45, 32, 34, 52, 41, 60, 50, 45, 70, 60] }
    ];

    // Mock revenue calculation
    const totalEarning = "$56,400";
    const confirmedAppointments = appointments.filter(a => a.status === 'Confirmed').length;

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
            {/* Welcome Section */}
            <section className="bg-neon-green/5 border border-neon-green/10 rounded-[32px] p-6 md:p-8 relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome to MediCore!</h2>
                    <p className="text-gray-400 text-sm md:text-base">Hospital Admin Dashboard Template</p>
                </div>
                <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-neon-green/10 blur-[60px] md:blur-[80px] -mr-24 -mt-24 md:-mr-32 md:-mt-32 rounded-full"></div>
            </section>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatCard title="Total Patient" value={`${patients.length}`} trend="+4%" isUp={true} icon={Users} variant="pink" />
                <StatCard title="Doctor" value={doctors.length.toString()} trend="-4%" isUp={false} icon={Stethoscope} variant="green" />
                <StatCard title="Appointment" value={appointments.length.toString()} trend={`+${confirmedAppointments}`} isUp={true} icon={Calendar} variant="blue" />
                <StatCard title="Hospital Earning" value={totalEarning} trend="+12%" isUp={true} icon={DollarSign} variant="purple" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <div className="bg-card-bg border border-white/5 rounded-[32px] p-5 md:p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg md:text-xl font-bold">Revenue</h3>
                        <select className="bg-white/5 border border-white/10 rounded-lg py-1 px-3 text-xs md:text-sm outline-none focus:border-neon-green">
                            <option>2022</option>
                            <option>2023</option>
                        </select>
                    </div>
                    <Chart options={revenueOptions} series={revenueSeries} type="bar" height={250} />
                </div>

                <div className="bg-card-bg border border-white/5 rounded-[32px] p-5 md:p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg md:text-xl font-bold">Patient Statistics</h3>
                        <div className="flex gap-2">
                            <button className="px-2 md:px-3 py-1 bg-neon-green text-black rounded-lg text-[10px] md:text-xs font-bold">Monthly</button>
                            <button className="px-2 md:px-3 py-1 bg-white/5 text-gray-400 rounded-lg text-[10px] md:text-xs font-bold hover:bg-white/10 transition-colors">Weekly</button>
                        </div>
                    </div>
                    <Chart options={patientOptions} series={patientSeries} type="line" height={250} />
                </div>
            </div>


            {/* Top Rated Doctors */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">Top Rated Doctors</h3>
                    <button className="text-neon-green text-sm font-bold hover:underline">View All Doctors</button>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar">
                    {doctors.sort((a, b) => b.rating - a.rating).slice(0, 4).map(doctor => (
                        <div key={doctor.id} className="min-w-[280px] bg-card-bg/40 backdrop-blur-md border border-white/5 rounded-[40px] p-8 flex flex-col items-center gap-6 group card-hover relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-neon-green/5 blur-[40px] rounded-full -mr-12 -mt-12 group-hover:bg-neon-green/10 transition-all"></div>

                            <div className="w-24 h-24 rounded-[30px] border-4 border-neon-green/20 overflow-hidden group-hover:border-neon-green/50 transition-all">
                                <img
                                    src={doctor.img || `https://api.dicebear.com/7.x/avataaars/svg?seed=${doctor.name}`}
                                    alt={doctor.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="text-center relative z-10">
                                <div className="flex justify-center items-center gap-1.5 text-yellow-500 mb-2">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="text-sm font-bold text-white">{doctor.rating}</span>
                                </div>
                                <h4 className="font-bold text-xl text-white group-hover:text-neon-green transition-colors">{doctor.name}</h4>
                                <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mt-1">{doctor.spec}</p>
                            </div>

                            <div className="flex gap-4">
                                <SocialIcon icon={Facebook} />
                                <SocialIcon icon={Twitter} />
                                <SocialIcon icon={Instagram} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Recent Patient List */}
            <section className="bg-card-bg border border-white/5 rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-white/5">
                    <h3 className="text-xl font-bold">Recent Patient List</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 text-gray-400 text-sm">
                                <th className="px-6 py-4 font-semibold">Patient</th>
                                <th className="px-6 py-4 font-semibold">Age</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {patients.slice(0, 5).map(patient => (
                                <tr key={patient.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.name}`} className="w-10 h-10 rounded-full" alt="" />
                                            <span className="font-medium group-hover:text-neon-green transition-colors">{patient.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">{patient.age} Years</td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={patient.status} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-gray-400 hover:text-white">...</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Footer */}
            <footer className="pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
                <p>Copyright © MediCore Dashboard System 2026</p>
            </footer>
        </div>
    );
}

function SocialIcon({ icon: Icon }) {
    return (
        <a href="#" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-neon-green hover:text-black transition-all">
            <Icon className="w-4 h-4" />
        </a>
    );
}

function StatusBadge({ status }) {
    const styles = {
        'Recovered': 'bg-green-500/10 text-green-500',
        'On Recovery': 'bg-blue-500/10 text-blue-500',
        'Pending': 'bg-yellow-500/10 text-yellow-500',
        'Rejected': 'bg-red-500/10 text-red-500',
    }[status] || 'bg-gray-500/10 text-gray-500';

    return (
        <span className={clsx("px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider", styles)}>
            {status}
        </span>
    );
}
