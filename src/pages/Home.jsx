import React, { useState } from 'react';
import { MapPin, Search as SearchIcon, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        } else {
            // Just go to search page with all generic results if empty
            navigate(`/search?q=`);
        }
    };

    return (
        <>
            <section className="hero">
                <MapPin className="hero-icon" size={64} strokeWidth={2} />
                <h1 className="hero-title">Discover Your Perfect Stay</h1>
                <p className="hero-subtitle">
                    Connect with unique homestays, hotels, and local experiences worldwide
                </p>

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search for a destination..."
                        className="search-input"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button className="btn search-btn" onClick={handleSearch}>
                        <SearchIcon size={18} strokeWidth={2.5} />
                        Search
                    </button>
                </div>
            </section>

            <div className="chat-bubble" onClick={() => alert("Connecting to an agent...")}>
                <MessageCircle size={24} />
            </div>
        </>
    );
}
