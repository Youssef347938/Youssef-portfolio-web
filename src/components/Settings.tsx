
import React, { useState } from 'react';
import { Settings as SettingsIcon, X, Globe, Palette } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useColor } from '@/contexts/ColorContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';

const Settings: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { currentPalette, palettes, setCurrentPalette } = useColor();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="fixed bottom-20 right-8 z-40 rounded-full shadow-lg bg-card"
          aria-label="Settings"
        >
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[400px]">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex justify-between items-center">
            {t('settings.title')}
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        
        <Tabs defaultValue="language">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="language" className="flex gap-2 items-center">
              <Globe className="h-4 w-4" />
              {t('settings.language')}
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex gap-2 items-center">
              <Palette className="h-4 w-4" />
              {t('settings.colors')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="language">
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-medium">{t('settings.selectLanguage')}</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant={language === 'en' ? 'default' : 'outline'}
                  className="justify-start"
                  onClick={() => setLanguage('en')}
                >
                  <span className="mr-2">🇺🇸</span> English
                </Button>
                <Button 
                  variant={language === 'ar' ? 'default' : 'outline'}
                  className="justify-start"
                  onClick={() => setLanguage('ar')}
                >
                  <span className="mr-2">🇸🇦</span> العربية
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="colors">
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-medium">{t('settings.colorTheme')}</h3>
              <div className="grid grid-cols-3 gap-3">
                {palettes.map((palette) => (
                  <Button
                    key={palette.name}
                    variant={currentPalette.name === palette.name ? 'default' : 'outline'}
                    className="p-0 h-14 flex flex-col overflow-hidden"
                    onClick={() => setCurrentPalette(palette)}
                  >
                    <div 
                      className="w-full h-6" 
                      style={{ backgroundColor: palette.primary }}
                    ></div>
                    <span className="text-xs p-1">{palette.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default Settings;
