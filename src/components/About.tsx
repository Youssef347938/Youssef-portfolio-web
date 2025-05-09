
import React from 'react';
import { MapPin, Phone, Mail, Calendar } from 'lucide-react';
import aboutData from '@/data/about.json';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-secondary/30 dark:bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="section-title">
          <h2>About Me</h2>
          <p className="max-w-2xl mx-auto">Get to know me better</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 animate-fade-in">
              <h3 className="text-xl font-bold mb-4">Who am I?</h3>
              <p className="mb-6 text-muted-foreground">
                {aboutData.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Location</h4>
                    <p className="text-muted-foreground">{aboutData.location}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-muted-foreground">{aboutData.phone}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-muted-foreground">{aboutData.email}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Availability</h4>
                    <p className="text-muted-foreground">{aboutData.availability}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center items-center animate-fade-in">
              <div className="relative w-full max-w-xs">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald rounded-lg blur-md opacity-75"></div>
                <div className="relative bg-card rounded-lg overflow-hidden p-6">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-r from-primary to-emerald mb-4 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">YK</span>
                    </div>
                    <h3 className="text-lg font-bold">{aboutData.name}</h3>
                    <p className="text-sm text-muted-foreground">{aboutData.title}</p>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Frontend</span>
                      <span className="font-semibold">90%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Backend</span>
                      <span className="font-semibold">80%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Design</span>
                      <span className="font-semibold">85%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
