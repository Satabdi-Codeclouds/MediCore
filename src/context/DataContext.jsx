import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialPatients, initialDoctors, initialAppointments, initialStaff, initialReviews } from '../data/mockData';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [patients, setPatients] = useState(() => {
        const saved = localStorage.getItem('medicore_patients');
        return saved ? JSON.parse(saved) : initialPatients;
    });

    const [doctors, setDoctors] = useState(() => {
        const saved = localStorage.getItem('medicore_doctors');
        return saved ? JSON.parse(saved) : initialDoctors;
    });

    const [appointments, setAppointments] = useState(() => {
        const saved = localStorage.getItem('medicore_appointments');
        return saved ? JSON.parse(saved) : initialAppointments;
    });

    const [staff, setStaff] = useState(() => {
        const saved = localStorage.getItem('medicore_staff');
        return saved ? JSON.parse(saved) : initialStaff;
    });

    const [reviews, setReviews] = useState(() => {
        const saved = localStorage.getItem('medicore_reviews');
        return saved ? JSON.parse(saved) : initialReviews;
    });

    useEffect(() => {
        localStorage.setItem('medicore_patients', JSON.stringify(patients));
        localStorage.setItem('medicore_doctors', JSON.stringify(doctors));
        localStorage.setItem('medicore_appointments', JSON.stringify(appointments));
        localStorage.setItem('medicore_staff', JSON.stringify(staff));
        localStorage.setItem('medicore_reviews', JSON.stringify(reviews));
    }, [patients, doctors, appointments, staff, reviews]);

    // CRUD Operations
    const addPatient = (patient) => setPatients([...patients, { ...patient, id: Date.now() }]);
    const updatePatient = (id, updatedPatient) => setPatients(patients.map(p => p.id === id ? { ...p, ...updatedPatient } : p));
    const deletePatient = (id) => setPatients(patients.filter(p => p.id !== id));

    const addDoctor = (doctor) => setDoctors([...doctors, { ...doctor, id: Date.now() }]);
    const updateDoctor = (id, updatedDoctor) => setDoctors(doctors.map(d => d.id === id ? { ...d, ...updatedDoctor } : d));
    const deleteDoctor = (id) => setDoctors(doctors.filter(d => d.id !== id));

    const bookAppointment = (appointment) => setAppointments([...appointments, { ...appointment, id: Date.now() }]);
    const updateAppointment = (id, updated) => setAppointments(appointments.map(a => a.id === id ? { ...a, ...updated } : a));

    const updateStaff = (id, updated) => setStaff(staff.map(s => s.id === id ? { ...s, ...updated } : s));

    const updateReview = (id, updated) => setReviews(reviews.map(r => r.id === id ? { ...r, ...updated } : r));

    return (
        <DataContext.Provider value={{
            patients, addPatient, updatePatient, deletePatient,
            doctors, addDoctor, updateDoctor, deleteDoctor,
            appointments, bookAppointment, updateAppointment,
            staff, updateStaff,
            reviews, updateReview
        }}>
            {children}
        </DataContext.Provider>
    );
};
