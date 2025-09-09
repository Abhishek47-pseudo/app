
const Hero = () => {

  return (
    <section id="hero" className={`hero-section`}>
      <div className="container hero-content">
        <h1 className="hero-title">AidFlow AI</h1>
        <p className="hero-subtitle">Intelligent Logistics and Proactive Resource Allocation During Disasters</p>
        <div className="scroll-to-know-more">
          Scroll To Know More
          <div className="scroll-down-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="scroll-down-svg">
              <path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
