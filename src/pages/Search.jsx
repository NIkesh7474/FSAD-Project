import React, { useState, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Navigation, CalendarCheck } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';

export default function Search() {
    const { homestays: globalHomestays, touristPlaces: globalTouristPlaces, currentUser, addBooking } = useContext(AppContext);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const navigate = useNavigate();

    const [paymentItem, setPaymentItem] = useState(null);

    const homestays = globalHomestays.filter(h => h.location.toLowerCase().includes(query.toLowerCase()) || h.name.toLowerCase().includes(query.toLowerCase()));
    const touristPlaces = globalTouristPlaces.filter(t => t.location.toLowerCase().includes(query.toLowerCase()) || t.name.toLowerCase().includes(query.toLowerCase()));

    const displayHomestays = query ? homestays : [];
    const displayPlaces = query ? touristPlaces : [];

    const openDirections = (lat, lng) => {
        window.open(`https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${lat},${lng}`, '_blank');
    };

    const handleBook = (item, type) => {
        if (!currentUser) {
            alert('Please sign in or sign up to securely book a place.');
            navigate('/auth');
            return;
        }
        setPaymentItem({ item, type });
    };

    const handlePaymentSuccess = (item, type, amount) => {
        addBooking(item.id, type, amount);
        alert(`Payment Successful! Your booking for ${item.name} is confirmed.`);
        setPaymentItem(null);
    };

    const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(query || "New York")}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

    return (
        <div className="container" style={{ padding: '2rem 1.5rem', position: 'relative' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Search Results {query ? `for "${query}"` : ''}</h2>

            {!query && <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Please enter a destination to see homestays and tourist places.</p>}

            {query && (
                <div style={{ borderRadius: '1rem', overflow: 'hidden', height: '450px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e5e7eb', boxShadow: 'var(--shadow-md)', marginBottom: '3rem' }}>
                    <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        src={mapUrl}>
                    </iframe>
                </div>
            )}

            {query && (
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Homestays</h3>
                        {displayHomestays.length === 0 && <p style={{ color: 'var(--text-light)' }}>No homestays found for this location.</p>}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {displayHomestays.map(item => (
                                <div key={item.id} style={{ padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '0.75rem', boxShadow: 'var(--shadow-sm)' }}>
                                    <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>{item.name}</h4>
                                    <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>{item.location}</p>
                                    <p style={{ color: 'var(--text-dark)', marginBottom: '0.5rem' }}>{item.description}</p>
                                    <p style={{ fontWeight: 500, marginBottom: '1rem', color: 'var(--primary-color)' }}>₹{item.amount} / night • {item.rooms} Rooms ({item.category})</p>

                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button onClick={() => openDirections(item.lat, item.lng)} className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Navigation size={16} /> Directions
                                        </button>
                                        <button onClick={() => handleBook(item, 'homestay')} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <CalendarCheck size={16} /> Book (₹{item.amount})
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Tourist Places</h3>
                        {displayPlaces.length === 0 && <p style={{ color: 'var(--text-light)' }}>No tourist places found for this location.</p>}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {displayPlaces.map(item => (
                                <div key={item.id} style={{ padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '0.75rem', boxShadow: 'var(--shadow-sm)' }}>
                                    <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>{item.name}</h4>
                                    <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>{item.location}</p>
                                    <p style={{ color: 'var(--text-dark)', marginBottom: '1rem' }}>{item.description}</p>

                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button onClick={() => openDirections(item.lat, item.lng)} className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Navigation size={16} /> Directions
                                        </button>
                                        <button onClick={() => handleBook(item, 'tourist place ticket')} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#059669' }}>
                                            <CalendarCheck size={16} /> Book Ticket (₹{item.amount})
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {paymentItem && (
                <PaymentModal
                    item={paymentItem.item}
                    type={paymentItem.type}
                    onClose={() => setPaymentItem(null)}
                    onSuccess={handlePaymentSuccess}
                />
            )}
        </div>
    );
}
