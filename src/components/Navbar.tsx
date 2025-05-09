import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'nav.home', href: '#hero' },
  { name: 'nav.about', href: '#about' },
  { name: 'nav.skills', href: '#skills' },
  { name: 'nav.projects', href: '#projects' },
  { name: 'nav.timeline', href: '#timeline' },
  { name: 'nav.contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { t, language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeHash, setActiveHash] = useState<string>(window.location.hash || '#hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      // Update active hash based on scroll position
      const sections = navLinks.map(link => document.querySelector(link.href));
      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement | null;
        if (section && section.offsetTop <= scrollPos) {
          setActiveHash(navLinks[i].href);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      menuRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const isRtl = language === 'ar';

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2 bg-white/90 dark:bg-navy/90 backdrop-blur-md shadow-md'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#hero" className="text-xl md:text-2xl font-bold text-foreground">
          Youssef K<span className="text-primary">.</span>
        </a>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className={`flex space-x-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.name}>
                <NavigationMenuLink 
                  href={link.href}
                  className={cn(
                    "nav-link px-3 py-2 text-sm rounded-md transition hover:text-primary hover:bg-accent/50 relative",
                    isRtl ? 'ml-2' : 'mr-2',
                    activeHash === link.href ? 'active' : ''
                  )}
                >
                  {t(link.name)}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Theme Toggle & Mobile Menu Button */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMobileMenuToggle}
            className="md:hidden ml-2"
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-nav"
        ref={menuRef}
        tabIndex={-1}
        className={`fixed inset-0 top-16 z-40 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : isRtl ? 'translate-x-full' : '-translate-x-full'
        } md:hidden`}
        style={{ position: 'fixed', top: '4rem', left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        role="dialog"
        aria-modal="true"
      >
        {/* Overlay for consistent background effect */}
        <div className="absolute inset-0 bg-navy/95 dark:bg-navy/95 backdrop-blur-sm" />
        <nav className="flex-1 w-full flex flex-col items-center justify-center space-y-8 p-8 relative">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xl font-medium hover:text-primary transition-colors"
              onClick={handleNavLinkClick}
            >
              {t(link.name)}
            </a>
          ))}
        </nav>
      </div>

      {/* Add nav-link underline animation styles */}
      <style>{`
        .nav-link {
          position: relative;
          display: inline-block;
          padding-bottom: 4px;
          transition: color 0.3s;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 3px;
          background: linear-gradient(90deg, #00ff88 0%, #8f00ff 100%);
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(.4,0,.2,1);
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          transform: scaleX(1);
        }
      `}</style>
    </header>
  );
};

export default Navbar;
