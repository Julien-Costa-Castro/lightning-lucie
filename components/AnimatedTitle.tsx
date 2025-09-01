"use client";
import React from "react";
import { SparklesCore } from "./ui/sparkles";

export function AnimatedTitle() {
  return (
    <div className="relative w-full">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black relative z-10 text-center">
        <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
          Lightning Lucie
        </span>
      </h1>
      <div className="w-full absolute -bottom-6 h-24">
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
