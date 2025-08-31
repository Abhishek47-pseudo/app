import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isNavActive, setIsNavActive] = useState(false);

  const handleNavToggle = () => {
    setIsNavActive(!isNavActive);
  };

  // Add scroll event listener for smooth scrolling
  useEffect(() => {
    const handleScroll = (e) => {
      const targetId = e.target.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
        setIsNavActive(false); // Close menu after clicking a link
      }
    };

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.addEventListener('click', handleScroll));

    return () => {
      navLinks.forEach(link => link.removeEventListener('click', handleScroll));
    };
  }, []);

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

export default Header;