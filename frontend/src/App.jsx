import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Map from './components/Map.jsx';
import Team from './components/Team.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx'; // Import the new Login component
import InventoryPage from './components/InventoryPage.jsx'; // Import the new Login component

// Import all the new CSS files 
import './css/style.css'; 
import './css/Header.css';
import './css/Hero.css';
import './css/About.css';
import './css/Services.css';
import './css/Team.css';
import './css/Forms.css';
import './css/Contact.css';
import './css/Register.css';
import './css/Login.css';
// import './css/InventoryPage.css';

// Define Home as a standalone component outside of App
const Home = ({ fires, loading, error }) => {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      {loading && <p className="loading-message">Loading map data...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && <Map fireData={fires} />}
      <Team />
      <Contact />
    </main>
  );
};

function App() {
  const [fires, setFires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/fires")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setFires(data.preview || []);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching fire data:", err);
        setError("Failed to load fire data. Please check the server connection.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible-section');
        } else {
          entry.target.classList.remove('visible-section');
        }
      });
    }, {
      threshold: 0.1
    });

    document.querySelectorAll('.hidden-section').forEach(section => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

   return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home fires={fires} loading={loading} error={error} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inventory" element={<InventoryPage />} /> {/* Add this line */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;