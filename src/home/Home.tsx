import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="root-container">
      {/* Header Section */}
      <header className="header-section">
        <div className="gradient-bg">
          <svg xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                  result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>
          <div className="gradients-container">
            <div className="g1"></div>
            <div className="g2"></div>
            <div className="g3"></div>
            <div className="g4"></div>
            <div className="g5"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="content-container">
          <section className="hero-section">
            <h1>Welcome to Glue</h1>
            <p className="tagline">
              The Generative Language Unified Environment for building intelligent workflows
            </p>
            <div className="cta-buttons">
              <Link to="/workflow" className="cta-primary">
                Try the Editor
              </Link>
              <Link to="/docs" className="cta-secondary">
                Learn More
              </Link>
            </div>
          </section>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        {/* Features Section */}
        <section className="features-section">
          <h2 className="section-title">Core Capabilities</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Adhesive Binding System</h3>
              <p>
                TAPE, VELCRO, and GLUE bindings create flexible component relationships 
                with varying strength and flexibility characteristics.
              </p>
            </div>
            <div className="feature-card">
              <h3>Magnetic Coordination</h3>
              <p>
                Components dynamically self-organize through our proprietary magnetic 
                field orchestration layer, enabling emergent architectures.
              </p>
            </div>
            <div className="feature-card">
              <h3>Declarative DSL</h3>
              <p>
                Configure complex workflows using our intuitive GluonScript language, 
                combining YAML simplicity with Turing-complete expressiveness.
              </p>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="demo-section">
          <h2 className="section-title">Interactive Playground</h2>
          <div className="demo-container">
            <div className="demo-placeholder">
              <div className="demo-overlay">
                <p>Experience the Glue workflow editor</p>
                <Link to="/workflow" className="cta-primary">
                  Launch Sandbox
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;