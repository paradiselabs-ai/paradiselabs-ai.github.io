import './components/Typography/Typography.css'
import { WhyChooseGlue } from './components/Why choose Glue Section/WhyChooseGlue';
import { HowDoesGlueWork } from './components/How does Glue work Section/HowDoesGlueWork';
import { GlueKeyFeatures } from './components/Key features section/GlueKeyFeatures';
import { GlueSyntax } from './components/Glue syntax section/GlueSyntax';
import { WhatMakesGlueInnovative } from './components/Innovation Spotlight section/WhatMakesGlueInnovative';
import { MCP } from './components/MCP Section/MCP';
import { Waitlist } from './components/Waitlist section/Waitlist';
import React, { useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos';
import './Home.css';

// Memoized section components to prevent unnecessary re-renders
const Section = memo(({ children, style }: { children: React.ReactNode; style: React.CSSProperties }) => (
  <section style={style}>{children}</section>
));

// Base section styles moved outside component to prevent recreation on each render
const sectionContainerStyle: React.CSSProperties = {
  width: '100%',
  minHeight: 'min-content',
  padding: '4rem 0',
  position: 'relative',
};

// Memoized gradient background component
const GradientBackground = memo(() => (
  <div className="gradient-bg">
    <svg xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -7"
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
    </div>
  </div>
));

const Home: React.FC = () => {
  const waitlistRef = useRef<HTMLDivElement>(null);

  // Keeping the original scroll handler to maintain exact scrolling behavior
  const scrollToWaitlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!waitlistRef.current) return;

    const targetPosition = waitlistRef.current.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1300; // Duration in milliseconds
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);

      // Easing function for smooth acceleration and deceleration
      const ease = (t: number) => {
        return t < 0.5
          ? 4 * t * t * t
          : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      window.scrollTo(0, startPosition + distance * ease(progress));

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  useEffect(() => {
    let isSubscribed = true;

    const timer = setTimeout(() => {
      if (isSubscribed) {
        AOS.init({
          duration: 800,
          once: true,
          offset: 30,
          easing: 'ease-in-out-quad',
          startEvent: 'DOMContentLoaded',
          disableMutationObserver: false,
          throttleDelay: 99,
        });
      }
    }, 100);

    const handleLoad = () => {
      if (isSubscribed) {
        AOS.refresh();
      }
    };

    window.addEventListener('load', handleLoad);

    return () => {
      isSubscribed = false;
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div className="home-container">
      <header className="header-section">
        <GradientBackground />
        <div className="content-container">
          <section className="hero-section">
            <p>From ParadiseLabs</p>
            <span className="header-line">Generative-AI Linking &</span>
            <span className="header-line">Unification Engine</span>
            <span className="tagline">The GLUE framework</span>
            <span className="glue-line">unifies tools, AI agents, and processes</span>
            <span className="glue-line">so you can connect, streamline, and win.</span>
            <div className="cta-container">
              <a href="#waitlist" onClick={scrollToWaitlist} className="cta-primary">
                Sign Up For Early Access
              </a>
              <Link to="https://github.com/paradiselabs-ai/glue-framework" className="cta-secondary">
                View on Github
              </Link>
            </div>
          </section>
        </div>
      </header>

      <div className="divider" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        margin: 0, 
        position: 'relative', 
        zIndex: 1 
      }}>
        <svg width="80%" height="3" viewBox="0 0 100 3" preserveAspectRatio="none">
          <line x1="0" y1="1.1" x2="100" y2="1.1" stroke="#d6ddf4" strokeWidth="2.2" />
        </svg>
      </div>

      <Section style={sectionContainerStyle}>
        <WhyChooseGlue />
      </Section>
      
      <Section style={sectionContainerStyle}>
        <HowDoesGlueWork />
      </Section>
      
      <Section style={sectionContainerStyle}>
        <GlueKeyFeatures />
      </Section>
      
      <Section style={sectionContainerStyle}>
        <GlueSyntax />
      </Section>
      
      <Section style={sectionContainerStyle}>
        <WhatMakesGlueInnovative />
      </Section>
      
      <Section style={sectionContainerStyle}>
        <MCP />
      </Section>
      
      {/* Use a regular section for the waitlist to properly handle the ref */}
      <section ref={waitlistRef} id="waitlist" style={sectionContainerStyle}>
        <Waitlist />
      </section>
    </div>
  );
};

export default memo(Home);