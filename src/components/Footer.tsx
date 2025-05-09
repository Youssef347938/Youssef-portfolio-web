
import React from 'react';
import { Github, Linkedin, Youtube, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 bg-secondary dark:bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-8">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-card hover:bg-primary hover:text-primary-foreground p-3 rounded-full transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-card hover:bg-primary hover:text-primary-foreground p-3 rounded-full transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-card hover:bg-primary hover:text-primary-foreground p-3 rounded-full transition-colors duration-300"
              aria-label="YouTube"
            >
              <Youtube size={20} />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-card hover:bg-primary hover:text-primary-foreground p-3 rounded-full transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
          
          <div className="text-muted-foreground">
            <p className="mb-2">&copy; {currentYear} Youssef Khalaf. All rights reserved.</p>
            <p className="text-sm">Full Stack Developer & Creative Designer</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
