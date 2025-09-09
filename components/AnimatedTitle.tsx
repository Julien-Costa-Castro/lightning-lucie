"use client";
import React from "react";
import { SparklesCore } from "./ui/sparkles";
import Image from "next/image";

export function AnimatedTitle() {
  return (
    <div className="relative w-full">
      <div className="relative w-full max-w-4xl h-40 mx-auto px-4 z-10 -mt-12">
        <Image 
          src="/images/titre.png" 
          alt="Lightning Lucie" 
          fill 
          className="object-contain"
          sizes="(max-width: 768px) 90vw, 80vw"
          priority
        />
      </div>
      <div className="w-full absolute top-4 h-40 z-0">
        <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-[1px] w-3/4 blur-sm mx-auto" />
        
        <SparklesCore
          background="transparent"
          minSize={0.2}
          maxSize={0.6}
          particleDensity={600}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
        
        <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(200px_100px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
