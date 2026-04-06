import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function BecomeGuide() {
    const { addPendingGuide } = useContext(AppContext);
    const [formData, setFormData] = useState({
        name: '',
        qualification: '',
        experience: '',
        amount: '',
        contact: ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        addPendingGuide({ ...formData, amount: Number(formData.amount) });
        alert(`Success!\nApplication sent to Admin Portal for verification.`);
        setFormData({ name: '', qualification: '', experience: '', amount: '', contact: '' });
    };

    return (
        <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center', color: 'var(--text-dark)' }}>
                Become a Local Guide
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'var(--white)', padding: '2.5rem', borderRadius: '1rem', boxShadow: 'var(--shadow-lg)' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontWeight: 600 }}>Full Name</label>
                    <input required name="name" value={formData.name} onChange={handleChange} placeholder="First and Last Name" style={{ padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontWeight: 600 }}>Highest Qualification</label>
                    <input required name="qualification" value={formData.qualification} onChange={handleChange} placeholder="e.g. Master in History" style={{ padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Experience in Years</label>
                        <input required type="text" name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g. 5 Years" style={{ padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none' }} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Amount per Hour (₹)</label>
                        <input required type="number" min="0" name="amount" value={formData.amount} onChange={handleChange} placeholder="Hourly rate" style={{ padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none' }} />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontWeight: 600 }}>Contact Details</label>
                    <input required type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Phone number or Email" style={{ padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none' }} />
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '1rem', fontSize: '1.125rem', marginTop: '1rem' }}>
                    Submit Guide Application
                </button>
            </form>
        </div>
    );
}
