import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Timeline from '@/components/Timeline';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import Settings from '@/components/Settings';

const Index: React.FC = () => {
  useEffect(() => {
    // Handle smooth scrolling for anchor links and buttons
    const handleAnchorClick = (e: MouseEvent) => {
      let target = e.target as HTMLElement;
      // Traverse up to find <a> or <button data-scroll-to>
      while (target && target !== document.body) {
        if (target.tagName === 'A' && (target as HTMLAnchorElement).getAttribute('href')?.startsWith('#')) {
          e.preventDefault();
          const id = (target as HTMLAnchorElement).getAttribute('href')?.substring(1);
          const element = document.getElementById(id || '');
          if (element) {
            const yOffset = -80; // Adjust for navbar height
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
          break;
        }
        if (target.tagName === 'BUTTON' && target.hasAttribute('data-scroll-to')) {
          e.preventDefault();
          const id = target.getAttribute('data-scroll-to');
          const element = document.getElementById(id || '');
          if (element) {
            const yOffset = -80;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
          break;
        }
        target = target.parentElement as HTMLElement;
      }
    };

    // Add scroll animation with Intersection Observer for better performance
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target); // Stop observing once animated
            }
          });
        }, {
          root: null,
          rootMargin: '0px',
          threshold: 0.1
        });
        
        elements.forEach(element => {
          observer.observe(element);
        });
      } else {
        // Fallback for older browsers
        elements.forEach(element => {
          element.classList.add('visible');
        });
      }
    };

    // Initialize animations on load
    animateOnScroll();

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Timeline />
      <Contact />
      <Footer />
      <ScrollToTop />
      <Settings />
    </div>
  );
};

export default Index;
