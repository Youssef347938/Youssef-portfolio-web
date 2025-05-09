
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
                    "px-3 py-2 text-sm rounded-md transition hover:text-primary hover:bg-accent/50",
                    isRtl ? 'ml-2' : 'mr-2'
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
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 top-16 bg-background/95 backdrop-blur-sm z-40 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : isRtl ? 'translate-x-full' : '-translate-x-full'
        } md:hidden`}
      >
        <nav className="h-full flex flex-col items-center justify-center space-y-8 p-8">
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
    </header>
  );
};

export default Navbar;
