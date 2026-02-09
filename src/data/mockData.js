export const initialPatients = [
    { id: 1, name: 'John Doe', age: 45, gender: 'Male', status: 'Recovered', admissionDate: '2023-10-15', phone: '123-456-7890', email: 'john@example.com' },
    { id: 2, name: 'Sarah Wilson', age: 34, gender: 'Female', status: 'On Recovery', admissionDate: '2023-11-02', phone: '234-567-8901', email: 'sarah@example.com' },
    { id: 3, name: 'Robert Fox', age: 29, gender: 'Male', status: 'Pending', admissionDate: '2023-11-10', phone: '345-678-9012', email: 'robert@example.com' },
    { id: 4, name: 'Emma Vance', age: 52, gender: 'Female', status: 'Rejected', admissionDate: '2023-10-20', phone: '456-789-0123', email: 'emma@example.com' },
];

export const initialDoctors = [
    { id: 1, name: 'Dr. John Doe', spec: 'Cardiologist', rating: 4.8, experience: '15 Years', patients: 1200, img: 'https://i.pravatar.cc/150?u=d1', social: { fb: '#', tw: '#', ig: '#' } },
    { id: 2, name: 'Dr. Sarah Wilson', spec: 'Neurologist', rating: 4.9, experience: '12 Years', patients: 950, img: 'https://i.pravatar.cc/150?u=d2', social: { fb: '#', tw: '#', ig: '#' } },
    { id: 3, name: 'Dr. Robert Fox', spec: 'Surgeon', rating: 4.7, experience: '10 Years', patients: 800, img: 'https://i.pravatar.cc/150?u=d3', social: { fb: '#', tw: '#', ig: '#' } },
    { id: 4, name: 'Dr. Emma Vance', spec: 'Pediatrician', rating: 4.6, experience: '8 Years', patients: 700, img: 'https://i.pravatar.cc/150?u=d4', social: { fb: '#', tw: '#', ig: '#' } },
];

export const initialAppointments = [
    { id: 1, patient: 'John Doe', doctor: 'Dr. John Doe', date: '2023-11-20', time: '10:00 AM', status: 'Confirmed' },
    { id: 2, patient: 'Sarah Wilson', doctor: 'Dr. Sarah Wilson', date: '2023-11-21', time: '11:30 AM', status: 'Pending' },
];

export const initialStaff = [
    { id: 1, name: 'Alice Smith', role: 'Nurse', status: 'Active', shift: 'Morning' },
    { id: 2, name: 'Bob Johnson', role: 'Receptionist', status: 'Inactive', shift: 'Evening' },
];

export const initialReviews = [
    { id: 1, patient: 'Mark Johnson', rating: 5, comment: 'Excellent care and very professional staff.', status: 'Approved' },
    { id: 2, patient: 'Lucy Brown', rating: 4, comment: 'Good experience, but waiting time was a bit long.', status: 'Pending' },
];
