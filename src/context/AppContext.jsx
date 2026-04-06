import React, { createContext, useState } from 'react';
import { mockData } from '../data/mockData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // Application Data
    const [homestays, setHomestays] = useState(mockData.homestays);
    const [touristPlaces, setTouristPlaces] = useState(mockData.touristPlaces);
    const [guides, setGuides] = useState(mockData.guides);

    const [pendingHomestays, setPendingHomestays] = useState([]);
    const [pendingGuides, setPendingGuides] = useState([]);

    // Users & Auth
    const [users, setUsers] = useState([
        { id: 101, name: 'Alice Admin', email: 'admin@test.com', password: 'password', role: 'admin' },
        { id: 102, name: 'Bob User', email: 'user@test.com', password: 'password', role: 'user', phone: '', address: '' },
        { id: 1, name: 'Ravi Shankar', email: 'guide@test.com', password: 'password', role: 'guide', phone: '+91-9876543210' } // Seed dummy auth linking mockData guide
    ]);
    const [currentUser, setCurrentUser] = useState(null);

    // Bookings
    const [bookings, setBookings] = useState([
        { id: 1001, userId: 102, itemId: 1, type: 'homestay', amount: 4500, date: '2026-05-10' },
        { id: 1002, userId: 102, itemId: 1, type: 'guide', amount: 3000, date: '2026-05-12' }
    ]);

    // Auth Methods
    const registerUser = (userData) => {
        const newId = Date.now();
        const newUser = { ...userData, id: newId };
        setUsers([...users, newUser]);
        setCurrentUser(newUser);

        if (userData.role === 'guide') {
            const newGuideProfile = {
                id: newId,
                name: userData.name,
                qualification: 'Local Certified Guide',
                experience: 'Less than 1 Year',
                amount: 1500,
                contact: userData.phone || 'N/A',
                location: 'Flexible'
            };
            setGuides([...guides, newGuideProfile]);
        }
    };

    const loginUser = (email, password) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            setCurrentUser(user);
            return true;
        }
        return false;
    };

    const logoutUser = () => setCurrentUser(null);

    const updateUserProfile = (id, updates) => {
        setUsers(users.map(u => u.id === id ? { ...u, ...updates } : u));
        if (currentUser?.id === id) setCurrentUser({ ...currentUser, ...updates });

        // Link updates if the user is a guide
        if (currentUser?.role === 'guide') {
            setGuides(guides.map(g => g.id === id ? { ...g, contact: updates.phone || g.contact } : g));
        }
    };

    const addBooking = (itemId, type, amount) => {
        if (!currentUser) return;
        const newBooking = {
            id: Date.now(),
            userId: currentUser.id,
            itemId,
            type,
            amount,
            date: new Date().toLocaleDateString()
        };
        setBookings([...bookings, newBooking]);
        return newBooking;
    };

    // Approvals
    const addPendingHomestay = (hs) => setPendingHomestays([...pendingHomestays, { ...hs, id: Date.now() }]);
    const approveHomestay = (id) => {
        const hs = pendingHomestays.find(h => h.id === id);
        if (hs) setHomestays([...homestays, hs]);
        setPendingHomestays(pendingHomestays.filter(h => h.id !== id));
    };
    const rejectHomestay = (id) => setPendingHomestays(pendingHomestays.filter(h => h.id !== id));

    const addPendingGuide = (g) => setPendingGuides([...pendingGuides, { ...g, id: Date.now() }]);
    const approveGuide = (id) => {
        const g = pendingGuides.find(x => x.id === id);
        if (g) setGuides([...guides, g]);
        setPendingGuides(pendingGuides.filter(x => x.id !== id));
    };
    const rejectGuide = (id) => setPendingGuides(pendingGuides.filter(x => x.id !== id));

    return (
        <AppContext.Provider value={{
            homestays, touristPlaces, guides,
            pendingHomestays, addPendingHomestay, approveHomestay, rejectHomestay,
            pendingGuides, addPendingGuide, approveGuide, rejectGuide,
            users, bookings, addBooking,
            currentUser, registerUser, loginUser, logoutUser, updateUserProfile
        }}>
            {children}
        </AppContext.Provider>
    );
};
