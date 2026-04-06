import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Compass, Phone, MessageSquare, Briefcase, Activity } from 'lucide-react';

export default function GuidePortal() {
    const { currentUser, bookings, users } = useContext(AppContext);

    if (!currentUser || currentUser.role !== 'guide') {
        return (
            <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
                <h3 style={{ color: '#dc2626' }}>Access Denied. You must log in as a Local Tour Guide to view this dashboard.</h3>
            </div>
        );
    }

    // Find bookings where the itemId exactly matches the guide's unique ID representation
    const myBookings = bookings.filter(b => b.itemId === currentUser.id && b.type === 'guide');
    const totalBookings = myBookings.length;
    const totalRevenue = myBookings.reduce((sum, b) => sum + b.amount, 0);

    return (
        <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '1200px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '3rem' }}>
                <Compass size={48} color="#059669" />
                <div>
                    <h2 style={{ fontSize: '2.5rem', margin: 0, lineHeight: 1.2 }}>Guide Command Center</h2>
                    <p style={{ color: 'var(--text-light)', margin: 0 }}>Welcome back to work, {currentUser.name}</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
                <div style={{ padding: '2rem', background: 'white', borderRadius: '0.5rem', boxShadow: 'var(--shadow-md)', textAlign: 'center', borderTop: '4px solid #059669' }}>
                    <Activity color="#059669" style={{ marginBottom: '0.5rem' }} />
                    <h3 style={{ color: 'var(--text-light)', fontSize: '1rem', textTransform: 'uppercase' }}>Total Users Booked</h3>
                    <p style={{ fontSize: '3rem', fontWeight: 800, color: '#059669', margin: '0.5rem 0' }}>{totalBookings}</p>
                </div>
                <div style={{ padding: '2rem', background: 'white', borderRadius: '0.5rem', boxShadow: 'var(--shadow-md)', textAlign: 'center', borderTop: '4px solid #059669' }}>
                    <Briefcase color="#059669" style={{ marginBottom: '0.5rem' }} />
                    <h3 style={{ color: 'var(--text-light)', fontSize: '1rem', textTransform: 'uppercase' }}>Total Revenue (₹)</h3>
                    <p style={{ fontSize: '3rem', fontWeight: 800, color: '#059669', margin: '0.5rem 0' }}>₹{totalRevenue}</p>
                </div>
                <div style={{ padding: '2rem', background: 'white', borderRadius: '0.5rem', boxShadow: 'var(--shadow-md)', textAlign: 'center', borderTop: '4px solid #059669' }}>
                    <Phone color="#059669" style={{ marginBottom: '0.5rem' }} />
                    <h3 style={{ color: 'var(--text-light)', fontSize: '1rem', textTransform: 'uppercase' }}>Incoming Call Phone #</h3>
                    <p style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827', margin: '1rem 0' }}>{currentUser.phone}</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Tourists will actively call this number.</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Booking History & Clients */}
                <div style={{ padding: '2rem', background: 'white', borderRadius: '0.5rem', boxShadow: 'var(--shadow-md)' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>Active Tourist Clients</h3>
                    {myBookings.length === 0 && <p style={{ color: 'var(--text-light)' }}>No tourists have booked your guided tours recently.</p>}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {myBookings.map(b => {
                            const u = users.find(x => x.id === b.userId);
                            return (
                                <div key={b.id} style={{ padding: '1.25rem', background: '#f9fafb', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                                    <p style={{ fontSize: '1.125rem', marginBottom: '0.25rem', fontWeight: 600 }}>{u?.name || "Unknown Tourist"}</p>
                                    <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>{u?.email}</p>
                                    <p>Contract Earnings: <strong style={{ color: '#059669' }}>₹{b.amount}</strong> confirmed on <strong>{b.date}</strong></p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div style={{ padding: '2rem', background: 'white', borderRadius: '0.5rem', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <MessageSquare size={20} color="var(--primary-color)" /> Unified Communications App
                    </h3>
                    <div style={{ flex: 1, background: '#f3f4f6', borderRadius: '0.5rem', padding: '2rem', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', border: '1px dashed #d1d5db' }}>
                        <MessageSquare size={48} color="#9ca3af" style={{ marginBottom: '1rem' }} />
                        <p style={{ color: '#4b5563', fontWeight: 600, fontSize: '1.125rem' }}>Your Unified Call/Chat Router is Online.</p>
                        <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginTop: '0.5rem', lineHeight: 1.5 }}>
                            Waiting for incoming calls or messaging requests.<br /><br />
                            Any tourist initiating a chat or phone call from your public profile card over on the `/guides` directory will securely funnel into this interface connected directly to your linked device: <strong>{currentUser.phone}</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
