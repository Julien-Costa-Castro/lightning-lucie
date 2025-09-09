'use client';

import { Zap, Rocket, Globe } from 'lucide-react';
import Image from 'next/image';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

export function About() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardX = useSpring(0, { stiffness: 300, damping: 30 });
  const cardY = useSpring(0, { stiffness: 300, damping: 30 });

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    mouseX.set(x);
    mouseY.set(y);
    
    const rotateY = ((x - centerX) / centerX) * 10;
    const rotateX = ((centerY - y) / centerY) * 10;
    
    cardX.set(rotateX);
    cardY.set(rotateY);
  };
  
  const onMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };
  
  const transform = useMotionTemplate`perspective(1000px) rotateX(${cardX}deg) rotateY(${cardY}deg)`;
  return (
    <section className="py-32 px-4 relative">
      {/* Fond légèrement assombri pour correspondre à la section Collection */}
      <div className="absolute inset-0 -z-10 bg-black/10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-black text-white">
                L'Univers de Kora
              </h2>
            </div>
            
            <div className="space-y-8 text-white/80">
              <p className="text-xl leading-relaxed">
                En 2360, la Terre devient inhabitable. L'humanité se lance dans une quête 
                épique de deux siècles pour trouver de nouveaux mondes habitables.
              </p>
              
              <p className="text-xl leading-relaxed">
                La découverte du système solaire Kora en 2601 marque un tournant décisif. 
                Ce système parfait devient le théâtre d'aventures extraordinaires où notre 
                héroïne Lucie révèle ses pouvoirs électriques dans les arènes de combat.
              </p>
            </div>
          </div>

          <div 
            className="w-[30rem] h-[40rem] mx-auto relative group"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
            <motion.div 
              className="relative w-full h-full rounded-2xl overflow-hidden"
              style={{
                transformStyle: 'preserve-3d',
                transform,
                filter: 'drop-shadow(0 0 15px rgba(220, 220, 255, 0.2)) drop-shadow(0 0 30px rgba(200, 210, 255, 0.15))',
                boxShadow: '0 0 20px rgba(200, 210, 255, 0.2), 0 0 40px rgba(180, 200, 255, 0.15)'
              }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 30,
                filter: { duration: 0.5 }
              }}
            >
              <motion.div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'url(/images/card.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '1.5rem',
                  transform: 'translateZ(20px)'
                }}
              />
              <motion.div 
                className="absolute inset-0 bg-black/5 rounded-2xl"
                style={{
                  transform: 'translateZ(30px)'
                }}
              />
            </motion.div>
            
          </div>
        </div>
      </div>
    </section>
  );
}