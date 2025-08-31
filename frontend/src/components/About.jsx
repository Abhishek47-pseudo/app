import React from 'react';

const About = () => {
  return (
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
};

export default About;