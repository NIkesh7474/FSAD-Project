import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const { registerUser, loginUser } = useContext(AppContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '', email: '', password: '', phone: '', role: 'user'
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            const success = loginUser(formData.email, formData.password);
            if (success) {
                navigate('/');
            } else {
                alert('Invalid email or password.');
            }
        } else {
            registerUser({ name: formData.name, email: formData.email, password: formData.password, phone: formData.phone, role: formData.role });

            if (formData.role === 'guide') {
                alert('Registration complete! You are now listed as an active Tour Guide on the platform.');
                navigate('/guide-portal');
            } else {
                navigate('/');
            }
        }
    };

    return (
        <div className="container" style={{ padding: '6rem 1.5rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{ background: 'white', padding: '3rem', borderRadius: '1rem', boxShadow: 'var(--shadow-lg)', width: '100%', maxWidth: '450px', border: '1px solid #e5e7eb' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem', fontWeight: 800 }}>{isLogin ? 'Sign In' : 'Sign Up'}</h2>

                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600 }}>I am joining as a...</label>
                                <select name="role" value={formData.role} onChange={handleChange} style={{ padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', background: 'white', fontSize: '1rem' }}>
                                    <option value="user">Regular User (Tourist)</option>
                                    <option value="guide">Local Tour Guide</option>
                                    <option value="admin">Platform Admin</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600 }}>Name</label>
                                <input required name="name" type="text" placeholder="Your Full Name" value={formData.name} onChange={handleChange} style={{ padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600 }}>Phone Number</label>
                                <input required name="phone" type="tel" placeholder="+91 12345 67890" value={formData.phone} onChange={handleChange} style={{ padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none' }} />
                            </div>
                        </>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Email Address</label>
                        <input required name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} style={{ padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600 }}>Password</label>
                        <input required name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} style={{ padding: '0.875rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none' }} />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ padding: '1rem', marginTop: '1rem', fontSize: '1.125rem' }}>
                        {isLogin ? 'Login to Portal' : 'Create Account'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-light)' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={() => setIsLogin(!isLogin)} style={{ color: 'var(--primary-color)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                </p>
            </div>
        </div>
    );
}
