import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function AddHomestay() {
    const { addPendingHomestay } = useContext(AppContext);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        lat: '',
        lng: '',
        amount: '',
        rooms: '',
        category: 'single bedroom'
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Insert into global contextual state
        addPendingHomestay({
            ...formData,
            amount: Number(formData.amount),
            rooms: Number(formData.rooms),
            lat: Number(formData.lat),
            lng: Number(formData.lng)
        });
        alert(`Success!\nHomestay "${formData.name}" sent to the Admin Portal for approval.`);
        setFormData({ name: '', description: '', location: '', lat: '', lng: '', amount: '', rooms: '', category: 'single bedroom' });
    };

    return (
        <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center', color: 'var(--text-dark)' }}>
                Add Your Homestay
            </h2>

            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                background: 'var(--white)',
                padding: '2.5rem',
                borderRadius: '1rem',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid #f3f4f6'
            }}>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Name of Homestay</label>
                        <input
                            required name="name" value={formData.name} onChange={handleChange}
                            placeholder="e.g. Sunset Paradise Villa"
                            style={{ padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>City / Location Name</label>
                        <input
                            required name="location" value={formData.location} onChange={handleChange}
                            placeholder="e.g. Mumbai, Paris"
                            style={{ padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Description</label>
                    <textarea
                        required name="description" value={formData.description} onChange={handleChange} rows="3"
                        placeholder="Describe the homestay, amenities, and nearby attractions..."
                        style={{ padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', resize: 'vertical', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }}
                    ></textarea>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Latitude</label>
                        <input required type="number" step="any" name="lat" value={formData.lat} onChange={handleChange} placeholder="e.g. 34.0522" style={{ padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Longitude</label>
                        <input required type="number" step="any" name="lng" value={formData.lng} onChange={handleChange} placeholder="e.g. -118.2437" style={{ padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Amount (₹)</label>
                        <input required type="number" min="0" name="amount" value={formData.amount} onChange={handleChange} placeholder="Price per night" style={{ padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>No. of Rooms</label>
                        <input required type="number" min="1" name="rooms" value={formData.rooms} onChange={handleChange} placeholder="Total rooms" style={{ padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600, color: 'var(--text-dark)' }}>Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} style={{ padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', fontSize: '1rem', fontFamily: 'inherit', background: 'white' }}>
                            <option value="single bedroom">Single Bedroom</option>
                            <option value="double bedroom">Double Bedroom</option>
                            <option value="triple bedroom">Triple Bedroom</option>
                        </select>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '1rem', fontSize: '1.125rem', marginTop: '1rem', width: '100%' }}>
                    Submit Homestay Listing
                </button>
            </form>
        </div>
    );
}
