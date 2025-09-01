'use client';

import { useEffect, useState } from 'react';

interface Lightning {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  duration: number;
  delay: number;
}

export function LightningField() {
  const [lightnings, setLightnings] = useState<Lightning[]>([]);

  useEffect(() => {
    const generateLightnings = () => {
      const newLightnings = [];
      for (let i = 0; i < 8; i++) {
        newLightnings.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          width: Math.random() * 2 + 1,
          height: Math.random() * 40 + 20,
          opacity: Math.random() * 0.4 + 0.1,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 5,
        });
      }
      setLightnings(newLightnings);
    };

    generateLightnings();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {lightnings.map((lightning) => (
        <div
          key={lightning.id}
          className="absolute bg-gradient-to-b from-blue-400 via-blue-500 to-transparent"
          style={{
            left: `${lightning.x}%`,
            top: `${lightning.y}%`,
            width: `${lightning.width}px`,
            height: `${lightning.height}px`,
            opacity: lightning.opacity,
            animation: `lightning-flash ${lightning.duration}s ease-in-out infinite`,
            animationDelay: `${lightning.delay}s`,
            filter: 'blur(1px)',
            transform: 'skew(-5deg)',
          }}
        />
      ))}
      
      {/* Ambient lightning effects */}
      <div className="absolute top-10 left-1/4 w-px h-32 bg-gradient-to-b from-blue-400 to-transparent opacity-20 lightning-animate" />
      <div className="absolute top-1/3 right-1/5 w-px h-24 bg-gradient-to-b from-blue-300 to-transparent opacity-30 lightning-animate" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/2 w-px h-40 bg-gradient-to-b from-blue-500 to-transparent opacity-25 lightning-animate" style={{ animationDelay: '2.5s' }} />
      
      {/* Electric glow effects */}
      <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-400/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
    </div>
  );
}