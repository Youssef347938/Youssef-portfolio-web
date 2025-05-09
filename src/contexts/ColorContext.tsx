
import React, { createContext, useContext, useState, useEffect } from 'react';

type ColorPalette = {
  primary: string;
  name: string;
};

const defaultPalettes: ColorPalette[] = [
  { primary: '#10b981', name: 'Emerald' },
  { primary: '#3b82f6', name: 'Blue' },
  { primary: '#8b5cf6', name: 'Purple' },
  { primary: '#ec4899', name: 'Pink' },
  { primary: '#f97316', name: 'Orange' },
  { primary: '#ef4444', name: 'Red' },
];

interface ColorContextType {
  currentPalette: ColorPalette;
  palettes: ColorPalette[];
  setCurrentPalette: (palette: ColorPalette) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [palettes] = useState<ColorPalette[]>(defaultPalettes);
  const [currentPalette, setCurrentPaletteState] = useState<ColorPalette>(palettes[0]);

  useEffect(() => {
    // Check if user has previously set color preference
    const storedPalette = localStorage.getItem('colorPalette');
    if (storedPalette) {
      try {
        const parsed = JSON.parse(storedPalette);
        setCurrentPaletteState(parsed);
      } catch (e) {
        console.error("Error parsing stored color palette", e);
      }
    }
  }, []);

  useEffect(() => {
    // Update CSS variables when palette changes
    document.documentElement.style.setProperty('--primary', currentPalette.primary);
    
    // Store palette preference
    localStorage.setItem('colorPalette', JSON.stringify(currentPalette));
  }, [currentPalette]);

  const setCurrentPalette = (palette: ColorPalette) => {
    setCurrentPaletteState(palette);
  };

  return (
    <ColorContext.Provider value={{ currentPalette, palettes, setCurrentPalette }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = (): ColorContextType => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColor must be used within a ColorProvider');
  }
  return context;
};
