// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Custom fire icon
// const fireIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/482/482059.png",
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32],
// });

// function App() {
//   const [fires, setFires] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/fires")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("API Response:", data);
//         setFires(data.preview || []); // ✅ use only the array
//       })
//       .catch((err) => console.error("Error fetching fire data:", err));
//   }, []);

//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//       <MapContainer
//         center={[20.5937, 78.9629]} // Center on India
//         zoom={5}
//         style={{ height: "100%", width: "100%" }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
//         />

//         {fires.map((fire, idx) => (
//           <Marker
//             key={idx}
//             position={[
//               parseFloat(fire.latitude),
//               parseFloat(fire.longitude),
//             ]}
//             icon={fireIcon}
//           >
//             <Popup>
//               <strong>🔥 Fire Alert</strong>
//               <br />
//               Brightness: {fire.brightness}
//               <br />
//               Date: {fire.acq_date} {fire.acq_time}
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect, useRef } from 'react';

// Define a custom icon for the fire markers
const fireIcon = "https://cdn-icons-png.flaticon.com/512/482/482059.png";

// A simplified version of the Map component integrated directly here for demonstration
const Map = ({ fireData }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Dynamically load Leaflet library and its CSS
    const loadLeaflet = async () => {
      try {
        await new Promise((resolve, reject) => {
          const styleLink = document.createElement('link');
          styleLink.rel = 'stylesheet';
          styleLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          styleLink.onload = resolve;
          styleLink.onerror = reject;
          document.head.appendChild(styleLink);
        });

        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });

        // Initialize map after Leaflet is loaded
        if (window.L && !mapRef.current) {
          const map = window.L.map('disaster-map').setView([20.5937, 78.9629], 5);
          window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          }).addTo(map);
          mapRef.current = map;
        }

      } catch (err) {
        console.error("Failed to load Leaflet:", err);
      }
    };

    loadLeaflet();

    // Add markers once the map is ready and data is available
    if (mapRef.current && fireData.length > 0) {
      const customIcon = window.L.icon({
        iconUrl: fireIcon,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      // Clear existing markers
      mapRef.current.eachLayer(layer => {
        if (layer instanceof window.L.Marker) {
          mapRef.current.removeLayer(layer);
        }
      });

      fireData.forEach(fire => {
        window.L.marker([parseFloat(fire.latitude), parseFloat(fire.longitude)], { icon: customIcon })
          .addTo(mapRef.current)
          .bindPopup(
            `<strong>🔥 Fire Alert</strong><br/>
             Brightness: ${fire.brightness}<br/>
             Date: ${fire.acq_date} ${fire.acq_time}`
          );
      });
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [fireData]);

  return (
    <section id="map" className="map-section hidden-section">
      <div className="map-container" style={{ width: '100%', height: '80vh' }}>
        <div id="disaster-map" style={{ height: '100%', width: '100%' }}></div>
      </div>
    </section>
  );
};

// Define all other components within this file
const Header = () => {
  const [isNavActive, setIsNavActive] = useState(false);
  const handleNavToggle = () => setIsNavActive(!isNavActive);

  return (
    <header className="header">
      <div className="container header-container">
        <a href="#" className="logo">AidFlow AI</a>
        <nav className={`nav ${isNavActive ? 'active' : ''}`}>
          <ul className="nav-list">
            <li><a href="#about" className="nav-link">About</a></li>
            <li><a href="#services" className="nav-link">Services</a></li>
            <li><a href="#team" className="nav-link">Team</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
        </nav>
        <button className="nav-toggle" aria-label="Toggle navigation" onClick={handleNavToggle}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </header>
  );
};

const Hero = () => (
  <section className="hero-section">
    <div className="container hero-content">
      <h1 className="hero-title">AidFlow AI</h1>
      <p className="hero-subtitle">Intelligent Logistics and Proactive Resource Allocation During Disasters</p>
      <a href="#about" className="cta-button">Learn More</a>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="about-section hidden-section">
    <div className="container">
      <div className="about-grid">
        <div className="about-text-container">
          <h2 className="section-title">About AidFlow AI</h2>
          <p>AidFlow AI is a next-generation disaster response platform...</p>
        </div>
        <div className="about-text-container">
          <p>By leveraging deep learning for multi-label classification...</p>
          <p>Built with scalability and frontline usability in mind...</p>
        </div>
      </div>
    </div>
  </section>
);

const Services = () => (
  <section id="services" className="services-section hidden-section">
    <div className="container">
      <h2 className="section-title text-center">Our Services</h2>
      <div className="services-grid">
        <div className="service-card" style={{ '--bg-url': 'url(imgs/live_dist.jpg)' }}>
          <div className="service-icon"><i className="fas fa-exclamation-triangle"></i></div>
          <h3 className="service-title"><a href="#map">Live Disasters</a></h3>
          <p className="service-description">Track ongoing disasters in real time...</p>
        </div>
        <div className="service-card">
          <div className="service-icon"><i className="fas fa-route"></i></div>
          <h3 className="service-title">Smart Routing</h3>
          <p className="service-description">Find the safest and fastest paths...</p>
        </div>
        <div className="service-card">
          <div className="service-icon"><i className="fas fa-box-open"></i></div>
          <h3 className="service-title">Search Inventory</h3>
          <p className="service-description">Quickly locate and request supplies...</p>
        </div>
        <div className="service-card">
          <div className="service-icon"><i className="fas fa-hand-holding-heart"></i></div>
          <h3 className="service-title">Contribute</h3>
          <p className="service-description">Upload images, share local information...</p>
        </div>
      </div>
    </div>
  </section>
);

const Team = () => (
  <section id="team" className="team-section hidden-section">
    <div className="container">
      <h2 className="section-title text-center">Meet the Team</h2>
      <div className="team-grid">
        <div className="team-member">
          <div className="member-photo"><img src='imgs/Aaditya.jpg' alt="Aaditya Arya" /></div>
          <h3 className="member-name">Aaditya Arya</h3>
        </div>
        <div className="team-member">
          <div className="member-photo"><img src='imgs/Abhishek.jpg' alt="Abhishek Kumar" /></div>
          <h3 className="member-name">Abhishek Kumar</h3>
        </div>
        <div className="team-member">
          <div className="member-photo"><img src='imgs/Parth.jpg' alt="Parth Mehta" /></div>
          <h3 className="member-name">Parth Mehta</h3>
        </div>
        <div className="team-member">
          <div className="member-photo"><img src='imgs/Sydney.jpg' alt="Sydney Sweeny" /></div>
          <h3 className="member-name">Sydney Sweeny</h3>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message.');
      }
    } catch (err) {
      console.error("Contact form submission error:", err);
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="contact-section hidden-section">
      <div className="container contact-content">
        <div className="contact-card">
          <h2 className="section-title">Ready to Revolutionize Disaster Response?</h2>
          <p>Partner with us...</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
            <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
            <button type="submit" className="cta-button-secondary">Send Message</button>
            {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="container footer-content">
      <p>&copy; 2025 AidFlow AI. All rights reserved.</p>
      <div className="social-links">
        <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
        <a href="#" aria-label="X (formerly Twitter)"><i className="fab fa-x-twitter"></i></a>
        <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
      </div>
    </div>
  </footer>
);

// Main App component
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

  // Use IntersectionObserver to handle the 'hidden-section' class
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
    <div className="app-container">
      <style>
        {`
          :root {
              --primary-bg: #000000;
              --secondary-bg: #3f698e;
              --text-color: #E6F0F3;
              --heading-color: #ffb625;
              --brand-color: #d6def5;
              --accent-color: #F7A440;
              --button-bg: #2FA8CC;
              --button-hover-bg: #2389A6;
              --card-bg: #243645;
              --shadow-color: rgba(0, 0, 0, 0.4);
          }
          body { font-family: 'Poppins', sans-serif; background-color: var(--primary-bg); color: var(--text-color); margin: 0; line-height: 1.6; scroll-behavior: smooth; }
          .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
          .header { position: fixed; top: 0; left: 0; width: 100%; background: linear-gradient(90deg, var(--primary-bg), var(--secondary-bg)); box-shadow: 0 2px 10px var(--shadow-color); z-index: 1000; padding: 1rem 0; }
          .header-container { display: flex; justify-content: space-between; align-items: center; }
          .logo { color: var(--heading-color); font-size: 1.5rem; font-weight: 700; text-decoration: none; }
          .nav-list { display: flex; list-style: none; margin: 0; padding: 0; }
          .nav-link { color: var(--text-color); text-decoration: none; font-weight: 600; padding: 0.5rem 1rem; transition: color 0.3s; }
          .nav-link:hover { color: var(--accent-color); }
          .nav-toggle { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; }
          .nav-toggle .bar { width: 25px; height: 3px; background-color: var(--text-color); border-radius: 2px; transition: all 0.3s ease-in-out; }
          @media (max-width: 768px) { .nav { display: none; position: absolute; top: 100%; left: 0; width: 100%; background-color: var(--primary-bg); text-align: center; padding: 1rem 0; box-shadow: 0 2px 10px var(--shadow-color); } .nav.active { display: block; } .nav-list { flex-direction: column; } .nav-link { display: block; padding: 1rem; } .nav-toggle { display: flex; } }
          .hero-section { min-height: 100vh; display: flex; justify-content: center; align-items: center; background: url('https://placehold.co/1920x1080/011936/F4FFFD?text=AidFlow') center/cover no-repeat; text-align: center; position: relative; padding-top: 80px; }
          .hero-section::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.2); backdrop-filter: blur(2px); }
          .hero-content { position: relative; z-index: 1; max-width: 800px; }
          .hero-title { font-size: 3rem; font-weight: 700; color: var(--heading-color); text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black; margin: 0 0 1rem; animation: fadeInDown 1s ease-out; }
          .hero-subtitle { font-size: 1.5rem; color: var(--text-color); font-family: Bebas Neue; text-shadow: -1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black; margin: 0 0 2rem; animation: fadeInUp 1s ease-out 0.5s; animation-fill-mode: both; }
          .cta-button { display: inline-block; padding: 0.75rem 2rem; background-color: var(--button-bg); color: var(--text-color); text-decoration: none; border-radius: 50px; font-weight: 600; transition: background-color 0.3s, transform 0.3s; animation: fadeInUp 1s ease-out 1s; animation-fill-mode: both; }
          .cta-button:hover { background-color: var(--button-hover-bg); transform: translateY(-3px); }
          @media (min-width: 768px) { .hero-title { font-size: 4.5rem; } .hero-subtitle { font-size: 1.8rem; } }
          .section-title { font-size: 2.5rem; font-weight: 700; color: var(--heading-color); margin-bottom: 2rem; }
          .text-center { text-align: center; }
          .about-section, .services-section, .team-section, .contact-section { padding: 4rem 0; }
          .about-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
          .about-grid p { color: var(--text-color); }
          @media (min-width: 768px) { .about-grid { grid-template-columns: repeat(2, 1fr); } }
          .services-grid { display: grid; grid-template-columns: repeat(1, 1fr); gap: 2rem; margin-top: 3rem; }
          #services a { color: var(--heading-color); text-decoration: none; }
          @media (min-width: 768px) { .services-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (min-width: 1024px) { .services-grid { grid-template-columns: repeat(2, 1fr); } }
          .service-card { position: relative; overflow: hidden; z-index: 0; background-color: rgba(41, 12, 12, 0.95); padding: 30px 20px; border-radius: 12px; }
          .service-card::before { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: var(--bg-url); background-size: cover; background-position: center; opacity: 0.1; z-index: -1; pointer-events: none; }
          .service-icon { font-size: 3rem; color: var(--brand-color); margin-bottom: 1rem; }
          .service-title { font-size: 1.5rem; font-weight: 600; color: var(--heading-color); margin-bottom: 0.5rem; }
          .service-description { color: var(--text-color); }
          .member-photo img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block; }
          .team-grid { display: grid; grid-template-columns: repeat(1, 1fr); gap: 2rem; margin-top: 3rem; }
          @media (min-width: 768px) { .team-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (min-width: 1024px) { .team-grid { grid-template-columns: repeat(4, 1fr); } }
          .team-member { text-align: center; }
          .member-photo { width: 150px; height: 150px; border-radius: 50%; background-color: var(--card-bg); border: 5px solid var(--brand-color); margin: 0 auto 1rem; display: block; }
          .member-name { font-size: 1.2rem; font-weight: 600; color: var(--heading-color); }
          .member-role { font-size: 0.9rem; color: var(--text-color); }
          .contact-section { background-color: var(--secondary-bg); padding: 6rem 0; }
          .contact-content { text-align: center; }
          .contact-card { background-color: var(--primary-bg); padding: 3rem 2rem; border-radius: 10px; box-shadow: 0 10px 15px var(--shadow-color); max-width: 600px; margin: 0 auto; }
          .cta-button-secondary { display: inline-block; padding: 0.75rem 2rem; background: none; border: 2px solid var(--brand-color); color: var(--brand-color); text-decoration: none; border-radius: 50px; font-weight: 600; transition: background-color 0.3s, color 0.3s; }
          .cta-button-secondary:hover { background-color: var(--brand-color); color: var(--primary-bg); }
          .hidden-section { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
          .visible-section { opacity: 1; transform: translateY(0); }
          @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          .footer { background-color: var(--primary-bg); padding: 2rem 0; border-top: 1px solid var(--card-bg); box-shadow: 0 -2px 10px var(--shadow-color); }
          .footer-content { display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 1rem; text-align: center; color: var(--text-color); }
          .footer-content p { margin: 0; font-size: 0.95rem; }
          .social-links a { color: var(--text-color); font-size: 1.25rem; margin: 0 0.5rem; transition: color 0.3s ease, transform 0.2s ease; }
          .social-links a:hover { color: var(--brand-color); transform: scale(1.1); }
          @media (min-width: 768px) { .footer-content { flex-direction: row; justify-content: space-between; align-items: center; } }
          .map-container { display: flex; flex-wrap: nowrap; gap: 2rem; justify-content: space-between; align-items: flex-start; width: 100%; box-sizing: border-box; }
          #disaster-map { height: 80vh; width: 45%; min-width: 300px; border-radius: 12px; box-shadow: 0 0 20px var(--shadow-color); background-color: #ccc; box-sizing: border-box; overflow: hidden; }
          #data-table-container { width: 55%; max-height: 80vh; overflow-y: auto; background-color: var(--card-bg); border-radius: 12px; box-shadow: 0 0 20px var(--shadow-color); padding: 1rem; box-sizing: border-box; }
          #data-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
          #data-table th, #data-table td { padding: 0.5rem; border: 1px solid var(--secondary-bg); text-align: left; }
          #data-table th { background-color: var(--primary-bg); color: var(--text-color); position: sticky; top: 0; z-index: 1; }
          .loading-message, .error-message { text-align: center; padding: 2rem; font-size: 1.2rem; }
        `}
      </style>
      <Header />
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
      <Footer />
    </div>
  );
}

export default App;
