
import React, { useState } from 'react';
import skillsData from '@/data/skills.json';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState(skillsData.categories[0].name);

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <div className="section-title">
          <h2>My Skills</h2>
          <p className="max-w-2xl mx-auto">Technologies and tools I work with</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex justify-center mb-8 flex-wrap bg-transparent">
              {skillsData.categories.map((category) => (
                <TabsTrigger 
                  key={category.name} 
                  value={category.name}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {skillsData.categories.map((category) => (
              <TabsContent 
                key={category.name} 
                value={category.name}
                className="animate-fade-in"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {category.skills.map((skill) => (
                    <Card key={skill.name} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex flex-col space-y-2">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-lg">{skill.name}</h3>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-primary to-emerald h-2 rounded-full transition-all duration-500"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Skills;
