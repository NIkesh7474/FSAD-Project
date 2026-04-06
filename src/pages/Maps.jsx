import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Navigation } from 'lucide-react';

export default function Maps() {
    const { homestays, touristPlaces } = useContext(AppContext);
    const [location, setLocation] = useState(null);
    const [error, setError] = useState('');

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => setLocation({ lat: position.coords.latitude, lng: position.coords.longitude }),
                (err) => setError('Unable to retrieve your location. Try again or check permissions.')
            );
        } else {
            setError('Geolocation is not supported by your browser.');
        }
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    const openDirections = (lat, lng) => {
        window.open(`https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${lat},${lng}`, '_blank');
    };

    const mapCenter = location ? `${location.lat},${location.lng}` : "tourist places";

    return (
        <div className="container" style={{ padding: '2rem 1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem' }}>Nearby Places & Maps</h2>
                <button className="btn btn-primary" onClick={getUserLocation}>
                    <Navigation size={18} style={{ marginRight: '0.5rem' }} /> Use My Location
                </button>
            </div>

            {error && <p style={{ color: '#ef4444', marginBottom: '1rem', fontWeight: 500 }}>{error}</p>}

            {location ? (
                <p style={{ marginBottom: '1rem', fontWeight: 500, color: 'var(--primary-color)' }}>
                    Showing map based on your location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </p>
            ) : (
                <p style={{ marginBottom: '1rem', color: 'var(--text-light)' }}>
                    Please allow location access to see specific places near you. Defaulting to general tourist places map.
                </p>
            )}

            <div style={{ borderRadius: '1rem', overflow: 'hidden', height: '400px', marginBottom: '3rem', border: '1px solid #e5e7eb', boxShadow: 'var(--shadow-md)' }}>
                <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(mapCenter)}&t=&z=12&ie=UTF8&iwloc=&output=embed`}>
                </iframe>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '2rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Homestays DB</h3>
                    {homestays.map(item => (
                        <div key={item.id} style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', marginBottom: '1rem', transition: 'var(--transition)' }}>
                            <h4 style={{ fontWeight: 600, fontSize: '1.125rem' }}>{item.name}</h4>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>{item.location} • ₹{item.amount}/night</p>
                            <button onClick={() => openDirections(item.lat, item.lng)} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--primary-color)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                <Navigation size={14} /> Directions
                            </button>
                        </div>
                    ))}
                </div>
                <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Tourist Places DB</h3>
                    {touristPlaces.map(item => (
                        <div key={item.id} style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', marginBottom: '1rem', transition: 'var(--transition)' }}>
                            <h4 style={{ fontWeight: 600, fontSize: '1.125rem' }}>{item.name}</h4>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>{item.location} • {item.description}</p>
                            <button onClick={() => openDirections(item.lat, item.lng)} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--primary-color)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                <Navigation size={14} /> Directions
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
