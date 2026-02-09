import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import { Users, Stethoscope, Calendar, DollarSign, Facebook, Twitter, Instagram, Star } from 'lucide-react';
import Chart from 'react-apexcharts';

// Data for Recent Patients
const recentPatients = [
    { id: 1, name: 'John Doe', age: 45, status: 'Recovered', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Sarah Wilson', age: 34, status: 'On Recovery', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Robert Fox', age: 29, status: 'Pending', avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: 4, name: 'Emma Vance', age: 52, status: 'Rejected', avatar: 'https://i.pravatar.cc/150?u=4' },
];

const doctors = [
    { id: 1, name: 'Dr. John Doe', spec: 'Cardiologist', rating: 4.8, img: 'https://i.pravatar.cc/150?u=d1' },
    { id: 2, name: 'Dr. Sarah Wilson', spec: 'Neurologist', rating: 4.9, img: 'https://i.pravatar.cc/150?u=d2' },
    { id: 3, name: 'Dr. Robert Fox', spec: 'Surgeon', rating: 4.7, img: 'https://i.pravatar.cc/150?u=d3' },
    { id: 4, name: 'Dr. Emma Vance', spec: 'Pediatrician', rating: 4.6, img: 'https://i.pravatar.cc/150?u=d4' },
];

function App() {
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

    return (
        <div className="flex bg-dashboard-bg min-h-screen text-white">
            <Sidebar />

            <main className="flex-1 ml-64 overflow-x-hidden">
                <Header />

                <div className="p-8 space-y-8">
                    {/* Welcome Section */}
                    <section className="bg-neon-green/5 border border-neon-green/10 rounded-3xl p-8 relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-2">Welcome to MediCore!</h2>
                            <p className="text-gray-400">Hospital Admin Dashboard Template</p>
                        </div>
                        {/* Background elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green/10 blur-[80px] -mr-32 -mt-32 rounded-full"></div>
                    </section>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard title="Total Patient" value="783k" trend="+4%" isUp={true} icon={Users} variant="pink" />
                        <StatCard title="Doctor" value="76" trend="-4%" isUp={false} icon={Stethoscope} variant="green" />
                        <StatCard title="Appointment" value="76" trend="-4%" isUp={false} icon={Calendar} variant="blue" />
                        <StatCard title="Hospital Earning" value="$56k" trend="+4%" isUp={true} icon={DollarSign} variant="purple" />
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-card-bg border border-white/5 rounded-3xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold">Revenue</h3>
                                <select className="bg-white/5 border border-white/10 rounded-lg py-1 px-3 text-sm outline-none focus:border-neon-green">
                                    <option>2022</option>
                                    <option>2023</option>
                                </select>
                            </div>
                            <Chart options={revenueOptions} series={revenueSeries} type="bar" height={300} />
                        </div>

                        <div className="bg-card-bg border border-white/5 rounded-3xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold">Patient Statistics</h3>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 bg-neon-green text-black rounded-lg text-xs font-bold">Monthly</button>
                                    <button className="px-3 py-1 bg-white/5 text-gray-400 rounded-lg text-xs font-bold hover:bg-white/10 transition-colors">Weekly</button>
                                    <button className="px-3 py-1 bg-white/5 text-gray-400 rounded-lg text-xs font-bold hover:bg-white/10 transition-colors">Today</button>
                                </div>
                            </div>
                            <Chart options={patientOptions} series={patientSeries} type="line" height={300} />
                        </div>
                    </div>

                    {/* Top Rated Doctors */}
                    <section>
                        <h3 className="text-2xl font-bold mb-6">Top Rated Doctors</h3>
                        <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
                            {doctors.map(doctor => (
                                <div key={doctor.id} className="min-w-[280px] bg-card-bg border border-white/5 rounded-3xl p-6 flex flex-col items-center gap-4 group hover:border-neon-green/30 transition-all">
                                    <div className="w-24 h-24 rounded-full border-4 border-neon-green/20 overflow-hidden">
                                        <img src={doctor.img} alt={doctor.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="text-center">
                                        <div className="flex justify-center gap-1 text-yellow-500 mb-1">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span className="text-xs font-bold">{doctor.rating}</span>
                                        </div>
                                        <h4 className="font-bold text-lg">{doctor.name}</h4>
                                        <p className="text-sm text-gray-500">{doctor.spec}</p>
                                    </div>
                                    <div className="flex gap-3">
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
                                    {recentPatients.map(patient => (
                                        <tr key={patient.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={patient.avatar} className="w-10 h-10 rounded-full" alt="" />
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
                        <p>Copyright © Designed & Developed by DexignZone 2023</p>
                    </footer>
                </div>
            </main>
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

export default App;
