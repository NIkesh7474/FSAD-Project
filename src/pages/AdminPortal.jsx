import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

export default function AdminPortal() {
    const { currentUser, users, bookings, pendingHomestays, approveHomestay, rejectHomestay, pendingGuides, approveGuide, rejectGuide } = useContext(AppContext);
    const [tab, setTab] = useState('dashboard');
    const [selectedUser, setSelectedUser] = useState(null);

    if (!currentUser || currentUser.role !== 'admin') {
        return (
            <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
                <h3>Access Denied. You must log in as an Admin to view this restricted portal.</h3>
            </div>
        );
    }

    const totalUsers = users.length;
    const totalAmount = bookings.reduce((sum, b) => sum + b.amount, 0);
    const totalBookings = bookings.length;

    return (
        <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '1200px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Admin Control Center</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Welcome back, Superuser {currentUser.name}</p>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', overflowX: 'auto' }}>
                <button className="btn" onClick={() => setTab('dashboard')} style={{ background: tab === 'dashboard' ? 'var(--primary-color)' : '#f3f4f6', color: tab === 'dashboard' ? 'white' : 'black' }}>Profile & Dashboard</button>
                <button className="btn" onClick={() => { setTab('users'); setSelectedUser(null); }} style={{ background: tab === 'users' ? 'var(--primary-color)' : '#f3f4f6', color: tab === 'users' ? 'white' : 'black' }}>Manage Users</button>
                <button className="btn" onClick={() => setTab('bookings')} style={{ background: tab === 'bookings' ? 'var(--primary-color)' : '#f3f4f6', color: tab === 'bookings' ? 'white' : 'black' }}>All Bookings</button>
                <button className="btn" onClick={() => setTab('approvals')} style={{ background: tab === 'approvals' ? 'var(--primary-color)' : '#f3f4f6', color: tab === 'approvals' ? 'white' : 'black' }}>
                    Approvals ({pendingHomestays.length + pendingGuides.length})
                </button>
            </div>

            {tab === 'dashboard' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
                    <div style={{ padding: '2rem', background: 'white', borderRadius: '0.5rem', boxShadow: 'var(--shadow-md)', textAlign: 'center' }}>
                        <h3 style={{ color: 'var(--text-light)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Users</h3>
                        <p style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary-color)', margin: '0.5rem 0' }}>{totalUsers}</p>
                    </div>
                    <div style={{ padding: '2rem', background: 'white', borderRadius: '0.5rem', boxShadow: 'var(--shadow-md)', textAlign: 'center' }}>
                        <h3 style={{ color: 'var(--text-light)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Revenue</h3>
                        <p style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary-color)', margin: '0.5rem 0' }}>₹{totalAmount}</p>
                    </div>
                    <div style={{ padding: '2rem', background: 'white', borderRadius: '0.5rem', boxShadow: 'var(--shadow-md)', textAlign: 'center' }}>
                        <h3 style={{ color: 'var(--text-light)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Bookings</h3>
                        <p style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary-color)', margin: '0.5rem 0' }}>{totalBookings}</p>
                    </div>
                </div>
            )}

            {tab === 'users' && !selectedUser && (
                <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>All Registered Users</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {users.map(u => (
                            <div key={u.id} style={{ padding: '1.5rem', background: 'white', borderRadius: '0.5rem', border: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <strong style={{ fontSize: '1.125rem' }}>{u.name}</strong>
                                    <span style={{ color: 'var(--text-light)', marginLeft: '0.5rem' }}>({u.email}) - {u.role.toUpperCase()}</span>
                                </div>
                                <button className="btn btn-primary" onClick={() => setSelectedUser(u)}>View Bookings</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {tab === 'users' && selectedUser && (
                <div>
                    <button className="btn" onClick={() => setSelectedUser(null)} style={{ marginBottom: '1rem', border: '1px solid #d1d5db', background: 'white' }}>← Back to Users Directory</button>
                    <div style={{ padding: '1.5rem', background: 'var(--primary-color)', color: 'white', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Showing Data for: {selectedUser.name}</h3>
                        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>Email: {selectedUser.email}</p>
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Bookings History</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {bookings.filter(b => b.userId === selectedUser.id).map(b => (
                            <div key={b.id} style={{ padding: '1.5rem', background: 'white', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                                <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}><strong>Booking Reference #{b.id}</strong></p>
                                <p>Service Type: <strong style={{ textTransform: 'capitalize' }}>{b.type}</strong></p>
                                <p>Amount Paid: <strong>₹{b.amount}</strong></p>
                                <p>Date: <strong>{b.date}</strong></p>
                            </div>
                        ))}
                        {bookings.filter(b => b.userId === selectedUser.id).length === 0 && <p style={{ color: 'var(--text-light)' }}>No bookings found for this user.</p>}
                    </div>
                </div>
            )}

            {tab === 'bookings' && (
                <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>All Global Bookings</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {bookings.map(b => {
                            const u = users.find(x => x.id === b.userId);
                            return (
                                <div key={b.id} style={{ padding: '1.5rem', background: 'white', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                                    <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}><strong>Booking Reference #{b.id}</strong></p>
                                    <p>User: <strong>{u?.name}</strong> ({u?.email})</p>
                                    <p>Service: <strong style={{ textTransform: 'capitalize' }}>{b.type}</strong></p>
                                    <p>Amount: <strong>₹{b.amount}</strong> on <strong>{b.date}</strong></p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {tab === 'approvals' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '2rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Pending Homestays</h3>
                        {pendingHomestays.length === 0 && <p style={{ color: 'var(--text-light)' }}>No pending homestays await approval.</p>}
                        {pendingHomestays.map(hs => (
                            <div key={hs.id} style={{ padding: '1.5rem', background: 'white', border: '1px solid #e5e7eb', marginBottom: '1rem', borderRadius: '0.5rem', boxShadow: 'var(--shadow-sm)' }}>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{hs.name} <span style={{ fontWeight: 400, color: 'var(--text-light)', fontSize: '1rem' }}>in {hs.location}</span></h4>
                                <p style={{ marginTop: '0.5rem', color: 'var(--text-dark)' }}>{hs.description}</p>
                                <p style={{ marginTop: '0.5rem' }}><strong>₹{hs.amount} / night</strong> • {hs.rooms} Room(s) • {hs.category}</p>
                                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                                    <button className="btn btn-primary" onClick={() => approveHomestay(hs.id)}>Accept & Publish</button>
                                    <button className="btn" style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }} onClick={() => rejectHomestay(hs.id)}>Reject</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Pending Guides</h3>
                        {pendingGuides.length === 0 && <p style={{ color: 'var(--text-light)' }}>No pending guide applications await approval.</p>}
                        {pendingGuides.map(g => (
                            <div key={g.id} style={{ padding: '1.5rem', background: 'white', border: '1px solid #e5e7eb', marginBottom: '1rem', borderRadius: '0.5rem', boxShadow: 'var(--shadow-sm)' }}>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{g.name}</h4>
                                <p style={{ marginTop: '0.5rem' }}><strong>Qualification:</strong> {g.qualification}</p>
                                <p style={{ marginTop: '0.25rem' }}><strong>Experience:</strong> {g.experience}</p>
                                <p style={{ marginTop: '0.25rem' }}><strong>Contact:</strong> {g.contact}</p>
                                <p style={{ marginTop: '0.5rem', color: 'var(--primary-color)', fontWeight: 600 }}>₹{g.amount} / hr</p>
                                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                                    <button className="btn btn-primary" onClick={() => approveGuide(g.id)}>Accept & Publish</button>
                                    <button className="btn" style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }} onClick={() => rejectGuide(g.id)}>Reject</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
