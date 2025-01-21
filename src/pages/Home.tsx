import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  // Refs for storing DOM elements and animation frame
  const interactiveRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  const THROTTLE_MS = 33; // Approx. 30fps

  // Memoized mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    
    // Throttle updates
    if (now - lastUpdateRef.current < THROTTLE_MS) {
      return;
    }

    if (interactiveRef.current && containerRef.current) {
      // Cancel any pending animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Schedule new update
      animationFrameRef.current = requestAnimationFrame(() => {
        const rect = containerRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Use transform instead of left/top
        interactiveRef.current!.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });

      lastUpdateRef.current = now;
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        // Cleanup
        container.removeEventListener('mousemove', handleMouseMove);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [handleMouseMove]);

  return (
    <div className="root-container">
      <div className="gradient-bg" ref={containerRef}>
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
          <div className="interactive" ref={interactiveRef}></div>
        </div>
      </div>
      <main className="content-container">
        <header className="hero-section">
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
        </header>
        <section className="features-section">
          <div className="feature-card">
            <h2>Adhesive Binding System</h2>
            <p>
              TAPE, VELCRO, and GLUE bindings for flexible component relationships
            </p>
          </div>
          <div className="feature-card">
            <h2>Magnetic Coordination</h2>
            <p>
              Components self-organize based on magnetic field orchestration
            </p>
          </div>
          <div className="feature-card">
            <h2>Declarative DSL</h2>
            <p>
              Configure workflows using our intuitive domain-specific language
            </p>
          </div>
        </section>
        <section className="demo-section">
          <h2>See Glue in Action</h2>
          <div className="demo-container">
            <div className="demo-placeholder">
              Drag-and-drop demo coming soon
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}