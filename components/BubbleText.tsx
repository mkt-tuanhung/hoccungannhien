import React from 'react';

interface BubbleTextProps {
  text: string;
  className?: string;
  gradient: string;
  strokeColor?: string;
  strokeWidth?: number;
  shadowColor?: string;
  shadowDepth?: number;
}

export default function BubbleText({
  text,
  className = "",
  gradient,
  strokeColor = "white",
  strokeWidth = 8,
  shadowColor = "#000",
  shadowDepth = 6
}: BubbleTextProps) {
  return (
    <div className={`relative inline-block ${className}`} style={{ fontFamily: "'Mochiy Pop One', 'Comic Sans MS', cursive, sans-serif" }}>
      {/* Background Layer: Thick Stroke and 3D Shadow */}
      <span 
        className="absolute left-0 top-0 w-full text-center"
        style={{
          WebkitTextStroke: `${strokeWidth}px ${strokeColor}`,
          color: strokeColor,
          textShadow: `0px ${shadowDepth}px 0px ${shadowColor}, 0px ${shadowDepth + 4}px 10px rgba(0,0,0,0.4)`,
          letterSpacing: '2px',
          WebkitTextFillColor: strokeColor,
        }}
        aria-hidden="true"
      >
        {text}
      </span>
      
      {/* Foreground Layer: Gradient Text */}
      <span 
        className="relative z-10 w-full text-center"
        style={{
          backgroundImage: gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          letterSpacing: '2px',
        }}
      >
        {text}
      </span>
    </div>
  );
}
