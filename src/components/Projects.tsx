
import React, { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollArea } from "@/components/ui/scroll-area";
import projectsData from '@/data/projects.json';

type Category = 'All' | 'Web' | 'App' | 'Design';

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const { t, language } = useLanguage();
  
  const filteredProjects = activeCategory === 'All' 
    ? projectsData.projects 
    : projectsData.projects.filter(project => project.category === activeCategory);

  const categories: Category[] = ['All', 'Web', 'App', 'Design'];

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = parseInt(entry.target.id.split('-')[1]);
          setVisibleItems(prev => [...prev, id]);
        }
      });
    };

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(observerCallback, options);
    
    document.querySelectorAll('.project-card').forEach(card => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [filteredProjects]);

  const isRtl = language === 'ar';

  return (
    <section id="projects" className="py-20 bg-secondary/30 dark:bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="section-title">
          <h2>{t('projects.title')}</h2>
          <p className="max-w-2xl mx-auto">{t('projects.subtitle')}</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-md text-sm transition-all ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary dark:bg-muted hover:bg-primary/10'
              }`}
            >
              {t(`projects.${category.toLowerCase()}`)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              id={`project-${project.id}`}
              className={`project-card rounded-xl overflow-hidden shadow-lg bg-card
                ${visibleItems.includes(project.id) ? 'animate-fade-in' : 'opacity-0'}
              `}
            >
              <div className="h-72 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="project-card-overlay"></div>
                <div className="project-card-content">
                  <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ScrollArea className="project-description h-24 mb-4">
                  <p className="text-muted-foreground">{project.description}</p>
                </ScrollArea>
                <div className="flex gap-3">
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`flex items-center text-sm hover:text-primary transition-colors ${isRtl ? 'ml-auto' : ''}`}
                  >
                    {!isRtl && <ExternalLink size={16} className="mr-1" />}
                    {t('projects.liveDemo')}
                    {isRtl && <ExternalLink size={16} className="ml-1" />}
                  </a>
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-sm hover:text-primary transition-colors"
                    >
                      {!isRtl && <Github size={16} className="mr-1" />}
                      {t('projects.sourceCode')}
                      {isRtl && <Github size={16} className="ml-1" />}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
