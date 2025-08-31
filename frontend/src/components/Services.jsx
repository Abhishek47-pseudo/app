import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faRoute, faBoxOpen, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';

const Services = () => {
  return (
    <section id="services" className="services-section hidden-section">
      <div className="container">
        <h2 className="section-title text-center">Our Services</h2>
        <div className="services-grid">
          <div className="service-card" style={{ '--bg-url': 'url(imgs/live_dist.jpg)' }}>
            <div className="service-icon"><FontAwesomeIcon icon={faExclamationTriangle} /></div>
            <h3 className="service-title"><a href="#map">Live Disasters</a></h3>
            <p className="service-description">Track ongoing disasters in real time...</p>
          </div>
          {/* Repeat for other service cards */}
        </div>
      </div>
    </section>
  );
};

export default Services;