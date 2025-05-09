import React, { useRef, useEffect } from 'react';

const PARTICLE_COUNT = 70;
const PARTICLE_SIZE = 2.2;
const PARTICLE_COLOR = 'rgba(120, 180, 255, 0.7)';
const LINE_COLOR = 'rgba(120, 180, 255, 0.18)';
const LINE_DISTANCE = 110;
const MAGNET_RADIUS = 120;
const MAGNET_FORCE = 0.13;
const SPEED = 4.4;
const MOUSE_DOT_SIZE = 2.2;
const MOUSE_WEB_DISTANCE = 110;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const ClassicParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Initialize particles
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
    }));

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw lines between close particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINE_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = LINE_COLOR;
            ctx.lineWidth = 1;
            ctx.globalAlpha = 1 - dist / LINE_DISTANCE;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
      // Draw spider web lines from mouse-dot to nearby particles (thicker, no magnet)
      const mouse = mouseRef.current;
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_WEB_DISTANCE) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = LINE_COLOR;
          ctx.lineWidth = 3;
          ctx.shadowColor = 'rgba(120, 180, 255, 0.18)';
          ctx.shadowBlur = 6;
          ctx.globalAlpha = 1 - dist / MOUSE_WEB_DISTANCE;
          ctx.stroke();
          ctx.globalAlpha = 1;
          ctx.restore();
        }
      }
      // Draw and update particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        const particle = particlesRef.current[i];
        // Remove magnet attraction to mouse
        // Move particle
        particle.x += particle.vx;
        particle.y += particle.vy;
        // Slow down velocity
        particle.vx *= 0.999;
        particle.vy *= 0.999;
        // Never stop: if velocity is too low, nudge it
        if (Math.abs(particle.vx) < 0.2) particle.vx += (Math.random() - 0.5) * 0.4;
        if (Math.abs(particle.vy) < 0.2) particle.vy += (Math.random() - 0.5) * 0.4;
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        // Draw particle
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, PARTICLE_SIZE, 0, Math.PI * 2);
        ctx.fillStyle = PARTICLE_COLOR;
        ctx.shadowColor = 'rgba(120, 180, 255, 0.18)';
        ctx.shadowBlur = dist < MOUSE_WEB_DISTANCE ? 6 : 0;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      // Draw the mouse-dot
      if (
        mouse.x >= 0 && mouse.x <= canvas.width &&
        mouse.y >= 0 && mouse.y <= canvas.height
      ) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, MOUSE_DOT_SIZE, 0, Math.PI * 2);
        ctx.fillStyle = PARTICLE_COLOR;
        ctx.shadowColor = 'rgba(120, 180, 255, 0.18)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ClassicParticlesBackground; 