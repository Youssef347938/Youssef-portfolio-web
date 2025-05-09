import React, { useEffect, useRef } from 'react';

interface DynamicBackgroundProps {
  className?: string;
  color?: string;
  elementCount?: number;
  size?: number;
  speed?: number;
  interactive?: boolean;
  style?: 'geometric' | 'organic' | 'mixed';
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({
  className = '',
  color = 'hsla(200, 70%, 60%, 0.15)',
  elementCount = 6,
  size = 100,
  speed = 0.3,
  interactive = true,
  style = 'mixed'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; rotation: number; scale: number }>>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();

    // Initialize elements with random positions and velocities
    elementsRef.current = Array.from({ length: elementCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed * 2,
      vy: (Math.random() - 0.5) * speed * 2,
      rotation: Math.random() * 360,
      scale: 0.8 + Math.random() * 0.4
    }));

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const animate = () => {
      if (!containerRef.current) return;

      const { width, height } = container.getBoundingClientRect();
      const elements = elementsRef.current;
      const mouse = mouseRef.current;

      elements.forEach((element, index) => {
        // Update position with velocity
        element.x += element.vx;
        element.y += element.vy;
        element.rotation += speed * 2;

        // Mouse interaction
        if (interactive) {
          const dx = mouse.x - element.x;
          const dy = mouse.y - element.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = size * 2;

          if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * speed * 2;
            element.vx -= (dx / distance) * force;
            element.vy -= (dy / distance) * force;
            element.scale = Math.min(1.2, element.scale + 0.01);
          } else {
            element.scale = Math.max(0.8, element.scale - 0.01);
          }
        }

        // Bounce off walls with smooth deceleration
        if (element.x < 0 || element.x > width) {
          element.vx *= -0.8;
          element.x = Math.max(0, Math.min(width, element.x));
        }
        if (element.y < 0 || element.y > height) {
          element.vy *= -0.8;
          element.y = Math.max(0, Math.min(height, element.y));
        }

        // Apply friction
        element.vx *= 0.98;
        element.vy *= 0.98;

        // Update element style
        const el = container.children[index] as HTMLElement;
        if (el) {
          el.style.transform = `translate(${element.x}px, ${element.y}px) rotate(${element.rotation}deg) scale(${element.scale})`;
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    container.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [elementCount, speed, interactive, size]);

  const getShapeStyle = (index: number) => {
    const baseStyle = {
      position: 'absolute',
      width: `${size}px`,
      height: `${size}px`,
      background: color,
      borderRadius: style === 'geometric' ? '0%' : style === 'organic' ? '50%' : index % 2 === 0 ? '50%' : '0%',
      filter: 'blur(8px)',
      transition: 'transform 0.1s ease-out',
      willChange: 'transform',
    };

    if (style === 'geometric') {
      return {
        ...baseStyle,
        clipPath: index % 3 === 0 ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' :
                 index % 3 === 1 ? 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' :
                 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
      };
    }

    return baseStyle;
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {Array.from({ length: elementCount }).map((_, index) => (
        <div
          key={index}
          style={getShapeStyle(index)}
        />
      ))}
    </div>
  );
};

export default DynamicBackground; 