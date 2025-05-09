
import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import aboutData from '@/data/about.json';

const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute blob top-1/4 -left-48 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute blob top-1/2 -right-48 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute blob -bottom-8 left-20 w-80 h-80 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className={`md:w-1/2 mb-12 md:mb-0 text-center ${isRtl ? 'md:text-right' : 'md:text-left'}`}>
          <h1 className="mb-4 tracking-tight">
            <span className="block text-lg md:text-xl font-medium text-muted-foreground mb-2">
              {t('hero.hello')}
            </span>
            <span className="block font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald to-primary pb-2">
              <Typewriter
                words={[aboutData.name]}
                loop={1}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h1>
          
          <h2 className="text-xl md:text-2xl mb-6 text-muted-foreground">
            <Typewriter
              words={["Full Stack Developer", "Creative Designer"]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h2>
          
          <div className={`flex flex-col sm:flex-row gap-4 ${isRtl ? 'justify-center md:justify-end' : 'justify-center md:justify-start'}`}>
            <Button asChild size="lg">
              <a href="#contact">
                {!isRtl && (
                  <>
                    {t('hero.getInTouch')} <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
                {isRtl && (
                  <>
                    <ArrowRight className="mr-2 h-4 w-4 rotate-180" /> {t('hero.getInTouch')}
                  </>
                )}
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#projects">{t('hero.seeMyWork')}</a>
            </Button>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=687&auto=format&fit=crop"
                alt="Youssef Khalaf"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-background rounded-lg py-2 px-4 shadow-lg">
              <p className="text-sm font-medium flex items-center">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                {t('hero.available')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
