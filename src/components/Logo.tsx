
import React from "react";

interface LogoProps {
  color?: string;
  animated?: boolean;
}

const Logo = ({ color = "#000000", animated = false }: LogoProps) => {
  return (
    <div 
      className={`text-2xl font-bold tracking-tighter ${animated ? "glitch-effect" : ""}`} 
      style={{ color }}
    >
      TBE
    </div>
  );
};

export default Logo;
