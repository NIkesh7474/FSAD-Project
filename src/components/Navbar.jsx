import React, { useContext } from 'react';
import { MapPin, ShieldAlert, User, LogOut, Compass } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function Navbar() {
    const { currentUser, logoutUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    };

    return (
        <nav className="navbar container">
            <div className="nav-left">
                <Link to="/" className="logo">
                    <MapPin size={28} strokeWidth={2.5} />
                    <span>Homestay Connect</span>
                </Link>
                <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/maps" className="nav-link">Maps</Link>
                    <Link to="/add-homestay" className="nav-link">Add a Homestay</Link>
                    <Link to="/guides" className="nav-link">Guides</Link>
                </div>
            </div>
            <div className="nav-right" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                {currentUser ? (
                    <>
                        {currentUser.role === 'admin' && (
                            <Link to="/admin" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#dc2626', fontWeight: 600 }}>
                                <ShieldAlert size={16} /> Admin Portal
                            </Link>
                        )}
                        {currentUser.role === 'user' && (
                            <Link to="/user-dashboard" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#2563eb', fontWeight: 600 }}>
                                <User size={16} /> User Portal
                            </Link>
                        )}
                        {currentUser.role === 'guide' && (
                            <Link to="/guide-portal" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#059669', fontWeight: 600 }}>
                                <Compass size={16} /> Guide Portal
                            </Link>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--primary-color)' }}>
                            <span>Hi, {currentUser.name.split(' ')[0]}</span>
                        </div>
                        <button onClick={handleLogout} className="btn" style={{ padding: '0.5rem', color: 'var(--text-light)' }} title="Sign Out">
                            <LogOut size={20} />
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/auth" className="sign-in">Sign In</Link>
                        <Link to="/auth" className="btn btn-primary">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
