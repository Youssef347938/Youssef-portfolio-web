import React from 'react';
import { Calendar, BookOpen } from 'lucide-react';
import timelineData from '@/data/timeline.json';

const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="py-20">
      <div className="container mx-auto px-4">
        <div className="section-title">
          <h2>My Journey</h2>
          <p className="max-w-2xl mx-auto">Education & professional experience</p>
        </div>
        
        <div className="max-w-5xl mx-auto timeline-container">
          {timelineData.events.map((event) => (
            <div key={event.id} className="timeline-item animate-fade-in">
              <div className="bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/10 shadow-md rounded-lg p-6 relative">
                <div className="absolute top-6 left-0 transform -translate-x-1/2 bg-primary text-primary-foreground rounded-full p-2 md:left-1/2">
                  {event.type === 'work' ? (
                    <Calendar className="h-5 w-5" />
                  ) : (
                    <BookOpen className="h-5 w-5" />
                  )}
                </div>
                
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-primary mb-1">{event.date}</span>
                  <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                  <span className="text-muted-foreground text-sm mb-3">{event.organization}</span>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
