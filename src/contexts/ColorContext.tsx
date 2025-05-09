import React, { createContext, useContext, useState, useEffect } from 'react';

type ColorPalette = {
  primary: string;
  name: string;
};

const defaultPalettes: ColorPalette[] = [
  { primary: '#10b981', name: 'Emerald' },
  { primary: '#3b82f6', name: 'Blue' },
  { primary: '#8b5cf6', name: 'Purple' },
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
    const root = document.documentElement;
    const colorValue = currentPalette.primary;
    
    // Convert hex to HSL for CSS variable
    const r = parseInt(colorValue.slice(1, 3), 16) / 255;
    const g = parseInt(colorValue.slice(3, 5), 16) / 255;
    const b = parseInt(colorValue.slice(5, 7), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    // Convert to the format used in CSS variables
    const hue = Math.round(h * 360);
    const saturation = Math.round(s * 100);
    const lightness = Math.round(l * 100);
    
    root.style.setProperty('--primary', `${hue} ${saturation}% ${lightness}%`);
    
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
