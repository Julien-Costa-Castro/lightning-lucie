'use client';

import React, { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// --- Types ---
type GlowColor = 'white' | 'gray' | 'silver' | 'black';

interface PlanetConfig {
  id: string;
  name: string;
  orbitRadius: number;
  size: number;
  speed: number;
  phaseShift: number;
  glowColor: GlowColor;
  description: string;
}

interface OrbitingPlanetProps {
  config: PlanetConfig;
  angle: number;
}

// --- Configuration des planètes ---
const planetsConfig: PlanetConfig[] = [
  {
    id: 'kora',
    name: 'Kora',
    orbitRadius: 100,
    size: 50,
    speed: 0.5,
    phaseShift: 0,
    glowColor: 'white',
    description: 'Étoile principale du système Kora',
  },
  {
    id: 'amazonia',
    name: 'Amazonia',
    orbitRadius: 180,
    size: 40,
    speed: -0.4,
    phaseShift: 0,
    glowColor: 'gray',
    description: 'Planète jungle luxuriante',
  },
  {
    id: 'aourora',
    name: 'Aourora',
    orbitRadius: 180,
    size: 45,
    speed: -0.4,
    phaseShift: Math.PI,
    glowColor: 'silver',
    description: 'Monde des aurores éternelles',
  },
  {
    id: 'void',
    name: 'The Void',
    orbitRadius: 260,
    size: 35,
    speed: 0.3,
    phaseShift: Math.PI / 2,
    glowColor: 'black',
    description: 'Zone de non-droit spatial',
  },
  {
    id: 'arena',
    name: 'Arène Spatiale',
    orbitRadius: 260,
    size: 40,
    speed: 0.3,
    phaseShift: (3 * Math.PI) / 2,
    glowColor: 'silver',
    description: 'Arènes de combat interstellaires',
  },
];

// --- Composant Planète ---
const Planet = memo(({ config, angle }: OrbitingPlanetProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, name, glowColor, description } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  const glowColors = {
    white: 'rgba(255, 255, 255, 0.6)',
    gray: 'rgba(156, 163, 175, 0.4)',
    silver: 'rgba(209, 213, 219, 0.5)',
    black: 'rgba(0, 0, 0, 0.5)',
  };

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative w-full h-full rounded-full flex items-center justify-center 
          transition-all duration-300 cursor-pointer ${
            isHovered ? 'scale-125' : 'hover:scale-110'
          }`}
        style={{
          boxShadow: isHovered
            ? `0 0 30px ${glowColors[glowColor]}, 0 0 60px ${glowColors[glowColor]}`
            : `0 0 15px ${glowColors[glowColor]}`,
          background: `radial-gradient(circle at 30% 30%, white, ${glowColor === 'white' ? '#ffffff' : glowColor === 'gray' ? '#9ca3af' : glowColor === 'silver' ? '#d1d5db' : '#1f2937'})`,
        }}
      >
        {isHovered && (
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900/90 backdrop-blur-sm rounded text-xs text-white whitespace-nowrap pointer-events-none">
            <div className="font-bold">{name}</div>
            <div className="text-gray-300 text-xs">{description}</div>
          </div>
        )}
      </div>
    </div>
  );
});
Planet.displayName = 'Planet';

// --- Composant d'orbite ---
const OrbitPath = memo(({ radius, color = 'rgba(255, 255, 255, 0.1)' }: { radius: number; color?: string }) => (
  <div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
    style={{
      width: `${radius * 2}px`,
      height: `${radius * 2}px`,
      border: `1px solid ${color}`,
    }}
  />
));
OrbitPath.displayName = 'OrbitPath';

// --- Composant Principal ---
export function PlanetaryOrbit() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      setTime((prevTime) => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    <div className="relative w-full flex items-center justify-center -mt-20 mb-24">
      <div 
        className="relative w-full max-w-3xl aspect-square"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Logo central - Kora */}
        <div className="absolute top-[53%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] flex items-center justify-center z-30">
          <div className="relative w-full h-full">
            <Image 
              src="/images/logo-Lightning-Lucie.png" 
              alt="Logo Lightning Lucie" 
              fill 
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Orbites */}
        <OrbitPath radius={100} color="rgba(255, 255, 255, 0.2)" />
        <OrbitPath radius={180} color="rgba(209, 213, 219, 0.15)" />
        <OrbitPath radius={260} color="rgba(156, 163, 175, 0.1)" />

        {/* Planètes */}
        {planetsConfig.map((planet) => {
          const angle = time * planet.speed + planet.phaseShift;
          return <Planet key={planet.id} config={planet} angle={angle} />;
        })}

        {/* Légende */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-gray-400 text-center">
          Survolez les planètes pour en savoir plus
        </div>
      </div>
    </div>
  );
}
