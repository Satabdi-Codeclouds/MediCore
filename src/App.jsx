import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy loading pages for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Patients = lazy(() => import('./pages/Patients'));
const Doctors = lazy(() => import('./pages/Doctors'));
const Appointments = lazy(() => import('./pages/Appointments'));
const Staff = lazy(() => import('./pages/Staff'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Settings = lazy(() => import('./pages/Settings'));
const Login = lazy(() => import('./pages/Login'));

// Simple loading spinner
const LoadingScreen = () => (
    <div className="min-h-screen bg-dashboard-bg flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-neon-green/30 border-t-neon-green rounded-full animate-spin"></div>
    </div>
);

function App() {
    return (
        <Router>
            <AuthProvider>
                <DataProvider>
                    <Suspense fallback={<LoadingScreen />}>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/login" element={<Login />} />

                            {/* Protected Protected Layout Routes */}
                            <Route path="/" element={
                                <ProtectedRoute>
                                    <Layout />
                                </ProtectedRoute>
                            }>
                                <Route index element={<Dashboard />} />
                                <Route path="patients" element={<Patients />} />
                                <Route path="doctors" element={<Doctors />} />
                                <Route path="appointments" element={<Appointments />} />
                                <Route path="staff" element={<Staff />} />
                                <Route path="reviews" element={<Reviews />} />
                                <Route path="settings" element={<Settings />} />

                                {/* Fallback to Dashboard */}
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Route>
                        </Routes>
                    </Suspense>
                </DataProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
