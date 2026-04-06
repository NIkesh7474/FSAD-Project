import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { UserCircle, Map, Settings, Edit3 } from 'lucide-react';

export default function UserPortal() {
    const { currentUser, bookings, updateUserProfile } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        phone: currentUser?.phone || '',
        address: currentUser?.address || '',
        age: currentUser?.age || '',
        preferences: currentUser?.preferences || ''
    });

    if (!currentUser || currentUser.role !== 'user') {
        return (
            <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
                <h3>Access Denied. Please log in as a registered user to view this portal.</h3>
            </div>
        );
    }

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSave = (e) => {
        e.preventDefault();
        updateUserProfile(currentUser.id, formData);
        setIsEditing(false);
    };

    const myBookings = bookings.filter(b => b.userId === currentUser.id);

    return (
        <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                <UserCircle size={48} color="var(--primary-color)" />
                <div>
                    <h2 style={{ fontSize: '2.5rem', margin: 0, lineHeight: 1.2 }}>User Portal</h2>
                    <p style={{ color: 'var(--text-light)', margin: 0 }}>Welcome back, {currentUser.name}!</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '2rem' }}>
                <div style={{ padding: '2rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', boxShadow: 'var(--shadow-md)', background: 'white', alignSelf: 'start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <Map color="var(--primary-color)" />
                        <h3 style={{ fontSize: '1.5rem', margin: 0 }}>My Bookings</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {myBookings.map(b => (
                            <div key={b.id} style={{ padding: '1.25rem', background: '#f9fafb', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                                <p style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}><strong>Booking Reference #{b.id}</strong></p>
                                <p>Service Type: <strong style={{ textTransform: 'capitalize' }}>{b.type}</strong></p>
                                <p>Amount Paid: <strong>₹{b.amount}</strong></p>
                                <p>Scheduled Date: <strong>{b.date}</strong></p>
                            </div>
                        ))}
                        {myBookings.length === 0 && <p style={{ color: 'var(--text-light)' }}>You do not have any active bookings.</p>}
                    </div>
                </div>

                <div style={{ padding: '2rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', boxShadow: 'var(--shadow-md)', background: 'white', alignSelf: 'start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Settings color="var(--primary-color)" />
                            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>My Profile</h3>
                        </div>
                        {!isEditing && <button onClick={() => setIsEditing(true)} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}><Edit3 size={16} /> Edit Details</button>}
                    </div>

                    {!isEditing ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <p><strong>Name:</strong> {currentUser.name}</p>
                            <p><strong>Email Address:</strong> {currentUser.email}</p>
                            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '0.5rem 0' }} />
                            <p><strong>Phone Number:</strong> {currentUser.phone || <em style={{ color: 'var(--text-light)' }}>Not provided</em>}</p>
                            <p><strong>Age:</strong> {currentUser.age || <em style={{ color: 'var(--text-light)' }}>Not provided</em>}</p>
                            <p><strong>Location Address:</strong> {currentUser.address || <em style={{ color: 'var(--text-light)' }}>Not provided</em>}</p>
                            <p><strong>Travel Preferences:</strong> {currentUser.preferences || <em style={{ color: 'var(--text-light)' }}>Not provided</em>}</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Phone Number</label>
                                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890" style={{ padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid #d1d5db', outline: 'none' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Age</label>
                                <input name="age" type="number" min="18" value={formData.age} onChange={handleChange} placeholder="e.g. 25" style={{ padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid #d1d5db', outline: 'none' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Location Address</label>
                                <input name="address" value={formData.address} onChange={handleChange} placeholder="e.g. 123 Main St, New York" style={{ padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid #d1d5db', outline: 'none' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Travel Preferences</label>
                                <textarea name="preferences" value={formData.preferences} onChange={handleChange} rows="3" placeholder="e.g. I prefer quiet hill stations and homestays..." style={{ padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid #d1d5db', outline: 'none', resize: 'vertical' }}></textarea>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', flex: 1 }}>Save Changes</button>
                                <button type="button" onClick={() => setIsEditing(false)} className="btn" style={{ background: '#f3f4f6', padding: '0.75rem 1.5rem', flex: 1 }}>Cancel</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
