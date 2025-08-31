import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faXTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p>&copy; 2025 AidFlow AI. All rights reserved.</p>
        <div className="social-links">
          <a href="#" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedinIn} /></a>
          <a href="#" aria-label="X (formerly Twitter)"><FontAwesomeIcon icon={faXTwitter} /></a>
          <a href="#" aria-label="Facebook"><FontAwesomeIcon icon={faFacebookF} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;