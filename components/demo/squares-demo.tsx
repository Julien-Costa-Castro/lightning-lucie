'use client';

import { Squares } from "@/components/ui/squares-background"

export function SquaresDemo() {
  return (
    <div className="relative h-screen w-full">
      <Squares 
        direction="diagonal"
        speed={0.5}
        squareSize={40}
        borderColor="#333" 
        hoverFillColor="#222"
        className="fixed inset-0 -z-10"
      />
      <div className="relative z-10 h-full w-full overflow-auto">
        {/* Your page content will go here */}
        <div className="container mx-auto p-8 text-white">
          <h1 className="text-4xl font-bold mb-8">Your Content Here</h1>
          {/* Add your page content */}
        </div>
      </div>
    </div>
  )
}
