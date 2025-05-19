
import React from "react";

interface LogoProps {
  color?: string;
}

const Logo = ({ color = "#000000" }: LogoProps) => {
  return (
    <div className="text-2xl font-bold tracking-tighter" style={{ color }}>
      TBE
    </div>
  );
};

export default Logo;
