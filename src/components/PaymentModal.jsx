import React, { useState } from 'react';
import { CreditCard, Smartphone, Banknote, X } from 'lucide-react';

export default function PaymentModal({ item, type, onClose, onSuccess }) {
    const [method, setMethod] = useState('card');
    const amount = item.amount || 1500;

    const handlePay = (e) => {
        e.preventDefault();
        onSuccess(item, type, amount);
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', width: '100%', maxWidth: '500px', position: 'relative', boxShadow: 'var(--shadow-lg)' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }}>
                    <X size={24} />
                </button>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Complete Your Booking</h2>
                <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>Booking {item.name} • Total: <strong style={{ color: 'var(--primary-color)' }}>₹{amount}</strong></p>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
                    <button onClick={() => setMethod('card')} className="btn" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: method === 'card' ? 'var(--primary-color)' : '#f3f4f6', color: method === 'card' ? 'white' : 'black' }}>
                        <CreditCard size={18} /> Card
                    </button>
                    <button onClick={() => setMethod('upi')} className="btn" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: method === 'upi' ? 'var(--primary-color)' : '#f3f4f6', color: method === 'upi' ? 'white' : 'black' }}>
                        <Smartphone size={18} /> UPI
                    </button>
                    <button onClick={() => setMethod('netbanking')} className="btn" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: method === 'netbanking' ? 'var(--primary-color)' : '#f3f4f6', color: method === 'netbanking' ? 'white' : 'black' }}>
                        <Banknote size={18} /> Netbanking
                    </button>
                </div>

                <form onSubmit={handlePay} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {method === 'card' && (
                        <>
                            <div>
                                <label style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Card Name</label>
                                <input required type="text" placeholder="John Doe" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none' }} />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Card Number</label>
                                <input required type="text" placeholder="•••• •••• •••• ••••" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Expiry (MM/YY)</label>
                                    <input required type="text" placeholder="12/25" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none' }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>CVC</label>
                                    <input required type="password" placeholder="•••" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none' }} />
                                </div>
                            </div>
                        </>
                    )}

                    {method === 'upi' && (
                        <div>
                            <label style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>UPI ID</label>
                            <input required type="text" placeholder="username@upi" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none' }} />
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>You will receive a payment request on your UPI app.</p>
                        </div>
                    )}

                    {method === 'netbanking' && (
                        <div>
                            <label style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Select Bank</label>
                            <select required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none', background: 'white' }}>
                                <option value="">Choose your bank...</option>
                                <option value="chase">Chase Bank</option>
                                <option value="bofa">Bank of America</option>
                                <option value="hdfc">HDFC Bank</option>
                                <option value="sbi">State Bank of India</option>
                                <option value="barclays">Barclays</option>
                            </select>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>You will be redirected to your bank's secure portal.</p>
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary" style={{ padding: '1rem', fontSize: '1.125rem', marginTop: '1rem' }}>
                        Pay ₹{amount} Securely
                    </button>
                </form>
                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#9ca3af', marginTop: '1.5rem' }}>🔒 Payments are securely encrypted and processed.</p>
            </div>
        </div>
    );
}
