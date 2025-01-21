import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="root-container">
      <div className="gradient-bg">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
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
      <main className="content-container">
        <header className="hero-section">
          <h1>Welcome to <span className="highlight">GLUE</span></h1>
          <p className="tagline">
            The <span className="highlight">Generative Language Unified Environment</span> for building intelligent workflows
          </p>
          <div className="cta-buttons">
            <Link to="/workflow" className="cta-primary">
              Try the Editor
            </Link>
            <Link to="/docs" className="cta-secondary">
              Learn More
            </Link>
          </div>
          <div className="value-props">
            <div className="value-card">
              <h3>Revolutionary Binding System</h3>
              <p>
                TAPE, VELCRO, and GLUE bindings provide unmatched flexibility in component relationships
              </p>
            </div>
            <div className="value-card">
              <h3>Magnetic Coordination</h3>
              <p>
                Components self-organize through intelligent magnetic field orchestration
              </p>
            </div>
            <div className="value-card">
              <h3>Declarative DSL</h3>
              <p>
                Configure complex workflows with our intuitive domain-specific language
              </p>
            </div>
          </div>
        </header>
        <section className="benefits-section">
          <h2>Why Choose GLUE?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>Accelerated Development</h3>
              <p>
                Build complex AI systems 3x faster with our intuitive framework.
                Our binding system reduces integration time by 60% compared to
                traditional approaches.
              </p>
            </div>
            <div className="benefit-card">
              <h3>Proven Reliability</h3>
              <p>
                Trusted by thousands of developers worldwide for mission-critical
                systems. With 99.99% uptime and robust error handling, GLUE
                ensures your workflows run smoothly.
              </p>
            </div>
            <div className="benefit-card">
              <h3>Future-Proof Architecture</h3>
              <p>
                Designed to evolve with your needs through flexible binding
                strengths. Easily adapt to new technologies without rewriting
                your entire system.
              </p>
            </div>
          </div>
        </section>

        <section className="use-cases-section">
          <h2>Real-World Applications</h2>
          <div className="use-cases-grid">
            <div className="use-case-card">
              <h3>Enterprise Automation</h3>
              <p>
                Streamline business processes with intelligent workflows that
                adapt to your organization's needs.
              </p>
              <ul>
                <li>Document processing pipelines</li>
                <li>Customer support automation</li>
                <li>Data integration workflows</li>
              </ul>
            </div>
            <div className="use-case-card">
              <h3>AI Research</h3>
              <p>
                Accelerate AI development with our flexible binding system and
                magnetic coordination.
              </p>
              <ul>
                <li>Model training pipelines</li>
                <li>Data preprocessing workflows</li>
                <li>Experiment tracking systems</li>
              </ul>
            </div>
            <div className="use-case-card">
              <h3>Content Creation</h3>
              <p>
                Create dynamic content workflows with intelligent coordination
                between tools and models.
              </p>
              <ul>
                <li>Automated article generation</li>
                <li>Multimedia content pipelines</li>
                <li>Personalized marketing campaigns</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="comparison-section">
          <h2>GLUE vs Traditional Frameworks</h2>
          <div className="comparison-table">
            <div className="table-header">
              <div className="header-item">Feature</div>
              <div className="header-item">GLUE</div>
              <div className="header-item">Traditional</div>
            </div>
            <div className="table-row">
              <div className="row-item">Component Relationships</div>
              <div className="row-item">Dynamic Binding</div>
              <div className="row-item">Fixed Pipelines</div>
            </div>
            <div className="table-row">
              <div className="row-item">Error Recovery</div>
              <div className="row-item">Automatic Fallbacks</div>
              <div className="row-item">Manual Intervention</div>
            </div>
            <div className="table-row">
              <div className="row-item">State Management</div>
              <div className="row-item">Context-Aware</div>
              <div className="row-item">Session-Bound</div>
            </div>
          </div>
        </section>
        <section className="demo-section">
          <h2>Experience the Power of GLUE</h2>
          <div className="demo-container">
            <div className="demo-content">
              <h3>Real-Time Workflow Visualization</h3>
              <p>
                Watch components dynamically organize through magnetic coordination.
                See how GLUE's unique binding system creates intelligent workflows
                that adapt to your needs.
              </p>
              <div className="demo-features">
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <span>Instant Component Binding</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🧲</span>
                  <span>Magnetic Field Coordination</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🔗</span>
                  <span>Dynamic Relationship Management</span>
                </div>
              </div>
              <div className="demo-placeholder">
                Interactive demo coming soon
              </div>
              <div className="demo-cta">
                <Link to="/workflow" className="cta-primary">
                  Start Building Now
                </Link>
                <Link to="/docs" className="cta-secondary">
                  Explore Documentation
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
