import './components/Typography/Typography.css';
import { WhyChooseGlue } from './components/Why choose Glue Section/WhyChooseGlue';
import React, { useEffect, useRef, memo, Suspense, lazy } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import './Home.css';

// Lazy load below-the-fold components
const GlueSyntax = lazy(() => import('./components/Glue syntax section/GlueSyntax').then(module => ({ 
  default: module.GlueSyntax 
})));
const WhatMakesGlueInnovative = lazy(() => import('./components/Innovation Spotlight section/WhatMakesGlueInnovative').then(module => ({ 
  default: module.WhatMakesGlueInnovative 
})));
const MCP = lazy(() => import('./components/MCP Section/MCP').then(module => ({ 
  default: module.MCP 
})));
const Waitlist = lazy(() => import('./components/Waitlist section/Waitlist').then(module => ({ 
  default: module.Waitlist 
})));

// Define props interface for Section component
interface SectionProps {
  children: React.ReactNode;
  style: React.CSSProperties;
}

// Loading fallback component
const LoadingFallback = memo(() => (
  <div className="flex justify-center items-center p-12">
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-white/10 h-12 w-12"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-white/10 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded"></div>
          <div className="h-4 bg-white/10 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  </div>
));

// Memoized section component with typed props
const Section = memo(({ children, style }: SectionProps) => (
  <section style={style}>{children}</section>
));

// Base section styles with proper typing
const sectionContainerStyle: React.CSSProperties = {
  width: '100%',
  minHeight: 'min-content',
  padding: '4rem 0',
  position: 'relative',
};

// Memoized gradient background component (first gradient)
const GradientBackground = memo(() => (
  <div className="gradient-bg">
    <svg xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="goo">
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
    <div className="gradients-container" style={{ filter: 'url(#goo) blur(17px)' }}>
      <div className="g1"></div>
      <div className="g2"></div>
      <div className="g3"></div>
    </div>
  </div>
));

// Memoized second gradient background component (no animation)
const SecondsGradientBackground = memo(() => (
  <div className="gradient-bg">
    <svg xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="goo2">
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 5 -1"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
    <div className="gradients-container" style={{ filter: 'url(#goo2) blur(6px)' }}>
      <div className="g1-2nd"></div>
      <div className="g2-2nd"></div>
    </div>
  </div>
));

const Home: React.FC = () => {
  const featuresRef = useRef<HTMLElement>(null);
  const waitlistRef = useRef<HTMLElement>(null);

  // Scroll handler with corrected targetRef type
  const scrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetRef: React.RefObject<HTMLElement | null>
  ) => {
    e.preventDefault();
    if (!targetRef.current) return;

    const targetPosition = targetRef.current.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1300;
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);

      const ease = (t: number) =>
        t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

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
            <h1 className="header-line">
              <span className="block">Generative-AI Linking &</span>
              <span className="block">Unification Engine</span>
            </h1>
            <span className="tagline">The GLUE framework</span>
            <span className="glue-line">unifies tools, AI agents, and processes</span>
            <span className="glue-line">so you connect, streamline, and succeed.</span>
            <div className="cta-container">
              <a
                href="#waitlist"
                onClick={(e) => scrollTo(e, waitlistRef)}
                className="cta-primary"
                aria-label="Get early access to GLUE"
                role="button"
              >
                Get Early Access
              </a>
              <a
                href="#features"
                onClick={(e) => scrollTo(e, featuresRef)}
                className="cta-secondary"
                aria-label="View GLUE features"
                role="button"
              >
                Explore Features
              </a>
            </div>
          </section>
        </div>
      </header>

      <div
        className="divider"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 0,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <svg width="80%" height="3" viewBox="0 0 100 3" preserveAspectRatio="none">
          <line x1="0" y1="1.1" x2="100" y2="1.1" stroke="#FDFAFE" strokeWidth="2.2" opacity={0.1} />
        </svg>
      </div>

      <section ref={featuresRef} id="features" style={sectionContainerStyle}>
        <WhyChooseGlue />
      </section>

      <Section style={sectionContainerStyle}>
        <Suspense fallback={<LoadingFallback />}>
          <GlueSyntax />
        </Suspense>
      </Section>

      {/* SecondsGradientBackground placed in WhatMakesGlueInnovative section */}
      <Section style={sectionContainerStyle}>
        <SecondsGradientBackground />
        <Suspense fallback={<LoadingFallback />}>
          <WhatMakesGlueInnovative />
        </Suspense>
      </Section>

      <Section style={sectionContainerStyle}>
        <Suspense fallback={<LoadingFallback />}>
          <MCP />
        </Suspense>
      </Section>

      <section ref={waitlistRef} id="waitlist" style={sectionContainerStyle}>
        <Suspense fallback={<LoadingFallback />}>
          <Waitlist />
        </Suspense>
      </section>
    </div>
  );
};

export default memo(Home);