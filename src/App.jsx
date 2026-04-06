import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import Maps from './pages/Maps';
import AddHomestay from './pages/AddHomestay';
import Guides from './pages/Guides';
import BecomeGuide from './pages/BecomeGuide';
import AdminPortal from './pages/AdminPortal';
import UserPortal from './pages/UserPortal';
import Auth from './pages/Auth';
import GuidePortal from './pages/GuidePortal';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/search" element={<Search />} />
              <Route path="/maps" element={<Maps />} />
              <Route path="/add-homestay" element={<AddHomestay />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/become-guide" element={<BecomeGuide />} />
              <Route path="/admin" element={<AdminPortal />} />
              <Route path="/user-dashboard" element={<UserPortal />} />
              <Route path="/guide-portal" element={<GuidePortal />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
