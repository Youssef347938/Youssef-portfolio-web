
import React from 'react';
import { Github, Linkedin, Youtube, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';

  const socialLinks = [
    { 
      name: 'linkedin', 
      url: 'https://www.linkedin.com/in/jo-elomda-aaa59b24a/', 
      Icon: Linkedin, 
      label: t('footer.linkedin')
    },
    { 
      name: 'github', 
      url: 'https://github.com/Youssef347938', 
      Icon: Github, 
      label: t('footer.github')
    },
    { 
      name: 'youtube', 
      url: 'https://www.youtube.com/@Youssef_Khalaf1', 
      Icon: Youtube, 
      label: t('footer.youtube')
    },
    { 
      name: 'instagram', 
      url: 'https://www.instagram.com/jo_elomda/', 
      Icon: Instagram, 
      label: t('footer.instagram')
    }
  ];

  return (
    <TooltipProvider>
      <footer className="py-10 bg-secondary dark:bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center space-x-6 mb-8">
              {socialLinks.map((social) => (
                <Tooltip key={social.name}>
                  <TooltipTrigger asChild>
                    <a 
                      href={social.url}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-card hover:bg-primary hover:text-primary-foreground p-3 rounded-full transition-colors duration-300"
                      aria-label={social.label}
                    >
                      <social.Icon size={20} />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent dir={isRtl ? "rtl" : "ltr"}>
                    <p>{social.label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            
            <div className="text-muted-foreground">
              <p className="mb-2">&copy; {currentYear} Youssef Khalaf. {t('footer.rights')}</p>
              <p className="text-sm">{t('hero.title')}</p>
            </div>
          </div>
        </div>
      </footer>
    </TooltipProvider>
  );
};

export default Footer;
