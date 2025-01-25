import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomepageHeader.css';

const SCROLL_THRESHOLD = 100; // Minimum pixels to scroll before activating
const TOUCH_SAFETY_ZONE = 5; // Prevents jitter on touch devices

const HomepageHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show header at page top
      if (currentScrollY < SCROLL_THRESHOLD) {
        setHeaderVisible(true);
        setIsScrolled(false);
        return;
      }

      // Determine scroll direction with touch safety buffer
      const isScrollingDown = currentScrollY > lastScrollY + TOUCH_SAFETY_ZONE;
      const isScrollingUp = currentScrollY < lastScrollY - TOUCH_SAFETY_ZONE;

      // Update header visibility
      if (isScrollingDown && headerVisible) {
        setHeaderVisible(false);
        setIsScrolled(true);
      } else if (isScrollingUp && !headerVisible) {
        setHeaderVisible(true);
        setIsScrolled(true);
      }

      // Update last scroll position with debounce
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setLastScrollY(currentScrollY);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [lastScrollY, headerVisible]);

  return (
    <header 
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      style={{
        transform: headerVisible 
          ? 'translateY(0)' 
          : 'translateY(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div className="header-content">
        <Link to="/" className="logo">
          Glue
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/docs">Documentation</Link>
          <Link to="/workflow">Workflow Editor</Link>
        </nav>
      </div>
    </header>
  );
};

export default HomepageHeader;