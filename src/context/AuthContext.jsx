import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('medicore_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (email, password) => {
        // Dummy authentication logic
        if (email === 'admin@medicore.com' && password === 'admin123') {
            const userData = { email, role: 'Admin', name: 'Roberto' };
            setUser(userData);
            localStorage.setItem('medicore_user', JSON.stringify(userData));
            return { success: true };
        } else if (email === 'doctor@medicore.com' && password === 'doctor123') {
            const userData = { email, role: 'Doctor', name: 'Dr. John' };
            setUser(userData);
            localStorage.setItem('medicore_user', JSON.stringify(userData));
            return { success: true };
        }
        return { success: false, message: 'Invalid credentials' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('medicore_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
