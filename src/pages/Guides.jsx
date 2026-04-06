import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Phone, MessageSquare, UserPlus, CalendarCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PaymentModal from '../components/PaymentModal';

export default function Guides() {
    const { guides, currentUser, addBooking } = useContext(AppContext);
    const [activeChat, setActiveChat] = useState(null);
    const [paymentItem, setPaymentItem] = useState(null);
    const navigate = useNavigate();

    const handleBook = (guide) => {
        if (!currentUser) {
            alert('Please sign in to securely book a professional guide.');
            navigate('/auth');
            return;
        }
        setPaymentItem({ item: guide, type: 'guide' });
    };

    const handlePaymentSuccess = (item, type, amount) => {
        addBooking(item.id, type, amount);
        alert(`Payment Successful!\n${item.name} has been secured as your local tour guide!`);
        setPaymentItem(null);
    };

    return (
        <div className="container" style={{ padding: '2rem 1.5rem', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem' }}>Local Tour Guides</h2>
                <Link to="/become-guide" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <UserPlus size={18} /> Become a Guide
                </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)', gap: '2rem' }}>
                {guides.map(guide => (
                    <div key={guide.id} style={{ padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '0.75rem', boxShadow: 'var(--shadow-sm)', background: 'white' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--primary-color)' }}>{guide.name}</h3>
                        <p style={{ color: 'var(--text-light)', marginBottom: '0.25rem' }}><strong>Location:</strong> {guide.location || "Flexible"}</p>
                        <p style={{ color: 'var(--text-light)', marginBottom: '0.25rem' }}><strong>Qualification:</strong> {guide.qualification}</p>
                        <p style={{ color: 'var(--text-light)', marginBottom: '0.25rem' }}><strong>Experience:</strong> {guide.experience}</p>
                        <p style={{ fontWeight: 600, marginBottom: '1.5rem', fontSize: '1.125rem' }}>₹{guide.amount} / hour</p>

                        <div style={{ display: 'flex', gap: '0.75rem', flexDirection: 'column' }}>
                            <button onClick={() => handleBook(guide)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#2563eb' }}>
                                <CalendarCheck size={16} /> Book Guide
                            </button>

                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <a href={`tel:${guide.contact}`} className="btn" style={{ flex: 1, background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0' }}>
                                    <Phone size={16} style={{ marginRight: '0.25rem' }} /> Call
                                </a>
                                <button onClick={() => setActiveChat(guide.id)} className="btn" style={{ flex: 1, background: '#f3f4f6', color: '#4b5563', border: '1px solid #d1d5db' }}>
                                    <MessageSquare size={16} style={{ marginRight: '0.25rem' }} /> Chat
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {guides.length === 0 && <p>No guides currently available. Why not apply to be one?</p>}
            </div>

            {activeChat && (
                <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', width: '320px', background: 'white', borderRadius: '0.5rem', boxShadow: 'var(--shadow-lg)', border: '1px solid #e5e7eb', zIndex: 100 }}>
                    <div style={{ padding: '1rem', background: 'var(--primary-color)', color: 'white', borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Chat with {guides.find(g => g.id === activeChat)?.name}</h3>
                        <button onClick={() => setActiveChat(null)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.25rem' }}>&times;</button>
                    </div>
                    <div style={{ height: '250px', padding: '1rem', overflowY: 'auto', background: '#f9fafb' }}>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', textAlign: 'center' }}>Connected. Start typing your message...</p>
                    </div>
                    <div style={{ padding: '0.75rem', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '0.5rem', background: 'white', borderBottomLeftRadius: '0.5rem', borderBottomRightRadius: '0.5rem' }}>
                        <input type="text" placeholder="Type a message..." style={{ flex: 1, padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db', outline: 'none' }} />
                        <button style={{ padding: '0.5rem 1rem', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>Send</button>
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
