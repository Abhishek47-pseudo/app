import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isNavActive, setIsNavActive] = useState(false);
  const [theme, setTheme] = useState('dark');
  const navigate = useNavigate();
  const handleNavToggle = () => setIsNavActive(!isNavActive);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.className = newTheme;
  };

  const handleScroll = (id) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    setIsNavActive(false);
  };

  return (
    <header className="header">
      <div className="container header-container">

        {/* Left Section: Logo */}
        <Link to="/" className="logo">
          <img src="/imgs/AidFlow Logo.png" alt="AidFlow AI Logo" className="logo-img" />
        </Link>

        {/* Center Section: Main Nav Links */}
        <nav className={`nav centered-nav ${isNavActive ? 'active' : ''}`}>
          <ul className="nav-list">
            <li><a href="#about" onClick={() => handleScroll('about')} className="nav-link">About</a></li>
            <li><a href="#services" onClick={() => handleScroll('services')} className="nav-link">Services</a></li>
            <li><a href="#team" onClick={() => handleScroll('team')} className="nav-link">Team</a></li>
            <li><a href="#contact" onClick={() => handleScroll('contact')} className="nav-link">Contact</a></li>
          </ul>
        </nav>

        {/* Right Section: Auth & Theme Toggle */}
        <nav className={`nav right-nav ${isNavActive ? 'active' : ''}`}>
          <ul className="nav-list">
            <li className="auth-dropdown">
              <span className="nav-link">Account</span>
              <div className="dropdown-menu">
                <Link to="/login" className="dropdown-item">Login</Link>
                <Link to="/register" className="dropdown-item">Register</Link>
              </div>
            </li>
            <li>
              <button onClick={toggleTheme} className="theme-toggle">
                Light
              </button>
            </li>
          </ul>
        </nav>

        {/* Toggle button for mobile */}
        <button className="nav-toggle" aria-label="Toggle navigation" onClick={handleNavToggle}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;