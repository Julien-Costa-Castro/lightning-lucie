'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { AnimatedTitle } from './AnimatedTitle';
import { useEffect } from 'react';
import { PlanetaryOrbit } from './PlanetaryOrbit';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-20">
      {/* Hero Content */}
      <div className="max-w-6xl mx-auto text-center space-y-12">
        {/* Couverture BD avec effet 3D amélioré */}
        <div className="relative w-64 h-96 mx-auto mb-20" style={{ perspective: '1000px' }}>
          <motion.div 
            className="relative w-full h-full"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(15deg) rotateY(15deg)'
            }}
            animate={{
              rotateY: 360,
              transform: [
                'rotateX(25deg) rotateY(0deg) rotateZ(-5deg)',
                'rotateX(25deg) rotateY(180deg) rotateZ(-5deg)',
                'rotateX(25deg) rotateY(360deg) rotateZ(-5deg)'
              ],
              boxShadow: [
                '15px 15px 30px -5px rgba(0, 0, 0, 0.3)',
                '0 0 50px 10px rgba(255, 255, 255, 0.3)',
                '15px 15px 30px -5px rgba(0, 0, 0, 0.3)'
              ]
            }}
            transition={{
              rotateY: {
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              },
              boxShadow: {
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            {/* Face avant */}
            <motion.div 
              className="absolute w-full h-full backface-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(0,0,0,0.3), rgba(255,255,255,0.05))',
                boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.5)',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                transform: 'translateZ(25px)'
              }}
            >
              <Image 
                src="/images/Couverture-BD.png" 
                alt="Couverture de la BD Lightning Lucie"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center"
                style={{
                  objectPosition: 'center 10%',
                }}
                priority
              />
            </motion.div>
            
            {/* Face arrière */}
            <motion.div 
              className="absolute w-full h-full backface-hidden"
              style={{
                background: 'white',
                borderRadius: '0.5rem',
                transform: 'rotateY(180deg) translateZ(25px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'black',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                textAlign: 'center',
                padding: '1.5rem',
                boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.5)',
              }}
            >
              <div className="space-y-2">
                <div className="text-2xl font-bold">LIGHTNING LUCIE</div>
                <div className="h-px bg-black/20 w-full"></div>
                <div className="text-sm text-black/70">Tome 1</div>
                <div className="text-sm text-black/60 mt-4">Une aventure électrisante dans l'univers de Kora</div>
              </div>
              <div className="absolute inset-0 border border-black/10 rounded-lg" />
            </motion.div>
            
            {/* Tranche du livre */}
            <motion.div 
              className="absolute inset-0 rounded-lg bg-white"
              style={{
                transform: 'translateZ(-1px)',
                border: '1px solid rgba(0,0,0,0.1)',
                boxShadow: '0 0 20px 5px rgba(255, 255, 255, 0.3)'
              }}
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-black/10"></div>
              <div className="absolute inset-y-0 right-0 w-1 bg-black/5"></div>
            </motion.div>
          </motion.div>
          
          {/* Ombre portée dynamique */}
          <motion.div 
            className="absolute -bottom-6 left-1/2 w-4/5 h-4 bg-black/40 rounded-full"
            style={{
              filter: 'blur(10px)',
              x: '-50%',
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              width: ['70%', '90%', '70%'],
            }}
            transition={{
              duration: 7.5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
        </div>
        
        {/* Animated Title */}
        <div className="space-y-8">
          <div className="relative">
            <AnimatedTitle />
          </div>
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/60"></div>
            <Zap className="h-6 w-6 text-white/80" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/60"></div>
          </div>
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed">
            En 2601, dans le système Kora, une héroïne aux pouvoirs électriques 
            affronte les arènes de combat interplanétaires
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="/boutique">
            <Button 
              size="lg" 
              className="relative overflow-hidden group chrome-effect hover:chrome-glow transition-all duration-300"
            >
              <span className="relative z-10 flex items-center text-lg font-medium">
                Acheter maintenant
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-white/20 text-white hover:bg-white/5 px-8 py-4 rounded-xl group chrome-border hover:chrome-glow transition-all duration-300"
          >
            <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="text-lg">Bande-annonce</span>
          </Button>
        </div>

        {/* Système Planétaire */}
        <div className="mt-32 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Lightning Lucie</h2>
            <p className="text-xl text-white/80">Aperçu de l'univers électrisant</p>
          </div>
          <div className="mx-auto w-full max-w-4xl h-[500px] relative">
            <PlanetaryOrbit />
          </div>
        </div>
      </div>
    </section>
  );
}