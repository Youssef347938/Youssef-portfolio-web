import React, { useEffect, useRef } from 'react';

interface FloatingElementsProps {
  className?: string;
  color?: string;
  elementCount?: number;
  size?: number;
  speed?: number;
  interactive?: boolean;
  style?: 'geometric' | 'organic' | 'mixed';
}

const FloatingElements: React.FC<FloatingElementsProps> = ({
  className = '',
  color = 'hsla(200, 70%, 60%, 0.15)',
  elementCount = 8,
  size = 100,
  speed = 0.5,
  interactive = true,
  style = 'geometric',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements: HTMLDivElement[] = [];
    const positions = Array.from({ length: elementCount }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      scale: 0.8 + Math.random() * 0.4,
      shape: Math.floor(Math.random() * 4), // 0: circle, 1: square, 2: triangle, 3: hexagon
    }));

    // Create elements
    for (let i = 0; i < elementCount; i++) {
      const element = document.createElement('div');
      element.className = 'absolute transition-transform duration-1000 ease-out';
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.backgroundColor = color;
      
      // Apply different shapes based on style
      if (style === 'geometric') {
        switch (positions[i].shape) {
          case 0: // Circle
            element.style.borderRadius = '50%';
            break;
          case 1: // Square
            element.style.borderRadius = '0%';
            break;
          case 2: // Triangle
            element.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
            break;
          case 3: // Hexagon
            element.style.clipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
            break;
        }
      } else if (style === 'organic') {
        element.style.borderRadius = '30% 70% 70% 30% / 30% 30% 70% 70%';
      } else {
        // Mixed style
        if (positions[i].shape % 2 === 0) {
          element.style.borderRadius = '30% 70% 70% 30% / 30% 30% 70% 70%';
        } else {
          element.style.clipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
        }
      }

      element.style.filter = 'blur(15px)';
      element.style.transform = `translate(${positions[i].x}%, ${positions[i].y}%) rotate(${positions[i].rotation}deg) scale(${positions[i].scale})`;
      container.appendChild(element);
      elements.push(element);
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      mouse.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      elements.forEach((element, i) => {
        const pos = positions[i];
        
        // Calculate distance to mouse
        const dx = mouse.current.x - pos.x / 100;
        const dy = mouse.current.y - pos.y / 100;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Update position
        if (interactive && distance < 0.5) {
          const force = (0.5 - distance) * 0.15;
          pos.x += dx * force * 100;
          pos.y += dy * force * 100;
          pos.rotation += dx * force * 20; // Add rotation on mouse interaction
        } else {
          // Dynamic floating movement
          const time = Date.now() * 0.001 * speed;
          pos.x += Math.sin(time + i) * 0.15;
          pos.y += Math.cos(time + i * 0.5) * 0.15;
          pos.rotation += Math.sin(time * 0.5 + i) * 0.3;
          
          // Add subtle scale animation
          pos.scale = 0.8 + Math.sin(time + i) * 0.1;
        }

        // Keep elements within bounds with bounce effect
        if (pos.x < 0) pos.x = 0;
        if (pos.x > 100) pos.x = 100;
        if (pos.y < 0) pos.y = 0;
        if (pos.y > 100) pos.y = 100;

        // Apply transform with smooth transitions
        element.style.transform = `translate(${pos.x}%, ${pos.y}%) rotate(${pos.rotation}deg) scale(${pos.scale})`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    animate();

    return () => {
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
      elements.forEach(element => element.remove());
    };
  }, [color, elementCount, size, speed, interactive, style]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    />
  );
};

export default FloatingElements; 