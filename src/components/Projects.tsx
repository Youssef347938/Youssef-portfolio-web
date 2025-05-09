
import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import projectsData from '@/data/projects.json';

type Category = 'All' | 'Web' | 'App' | 'Design';

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  
  const filteredProjects = activeCategory === 'All' 
    ? projectsData.projects 
    : projectsData.projects.filter(project => project.category === activeCategory);

  const categories: Category[] = ['All', 'Web', 'App', 'Design'];

  return (
    <section id="projects" className="py-20 bg-secondary/30 dark:bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="section-title">
          <h2>My Projects</h2>
          <p className="max-w-2xl mx-auto">Some of my recent work</p>
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
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="project-card rounded-xl overflow-hidden shadow-lg bg-card animate-fade-in"
            >
              <div className="h-60 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
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
                <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                <div className="flex gap-3">
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-sm hover:text-primary transition-colors"
                  >
                    <ExternalLink size={16} className="mr-1" />
                    Live Demo
                  </a>
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-sm hover:text-primary transition-colors"
                    >
                      <Github size={16} className="mr-1" />
                      Source Code
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
