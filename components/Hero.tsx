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
    <section className="relative min-h-[80vh] md:min-h-[85vh] flex items-center justify-center px-4 pt-24 md:pt-32 pb-20 md:pb-40 overflow-hidden">
      {/* Hero Content */}
      <div className="max-w-6xl mx-auto text-center space-y-12">
        {/* Couverture BD avec effet 3D amélioré */}
        <div className="relative w-48 h-72 md:w-64 md:h-96 mx-auto mb-12 md:mb-20" style={{ perspective: '1000px' }}>
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
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              },
              boxShadow: {
                duration: 30,
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
              className="absolute w-full h-full backface-hidden overflow-hidden"
              style={{
                borderRadius: '0.5rem',
                transform: 'rotateY(180deg) translateZ(25px)',
                boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.5)',
              }}
            >
              <div className="relative w-full h-full">
                <Image 
                  src="/images/Couverture-arriere-BD.png" 
                  alt="Dos de la BD Lightning Lucie" 
                  fill 
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{
                    objectPosition: 'center',
                  }}
                  priority
                />
              </div>
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
          <div className="h-8"></div>
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed">
            En 2601, dans le système Kora, une héroïne aux pouvoirs électriques 
            affronte les arènes de combat interplanétaires
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="/boutique">
            <Button 
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/5 px-8 py-4 rounded-xl group chrome-border hover:chrome-glow transition-all duration-300"
            >
              <span className="flex items-center text-lg">
                Acheter maintenant
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>
          
          <a 
            href="https://youtu.be/T2vUjtPyLiY" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center"
          >
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/20 text-white hover:bg-white/5 px-8 py-4 rounded-xl group chrome-border hover:chrome-glow transition-all duration-300"
            >
              <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-lg">Bande-annonce</span>
            </Button>
          </a>
        </div>

        {/* Système Planétaire */}
        <div className="mt-32 relative z-10">
          <div className="text-center mb-12">
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