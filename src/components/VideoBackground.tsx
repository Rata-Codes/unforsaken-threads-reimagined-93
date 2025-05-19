
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface VideoBackgroundProps {
  videoSrc: string;
}

const VideoBackground = ({ videoSrc }: VideoBackgroundProps) => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCTA = () => {
    setHasInteracted(true);
    setTimeout(() => {
      navigate("/shop");
    }, 600);
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Video Background with filter effects */}
      <div className="absolute inset-0 video-filter">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        
        {/* Glitch overlay */}
        <div className="absolute inset-0 z-10 opacity-30 pointer-events-none">
          <div className="w-full h-full bg-black opacity-10"></div>
          <div className="absolute inset-0 mix-blend-overlay bg-gradient-to-br from-black/20 to-transparent"></div>
          <div className="absolute inset-0 mix-blend-color-burn bg-gradient-to-tr from-black/10 to-transparent"></div>
        </div>
      </div>

      {/* Content */}
      <div 
        className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="text-center text-white px-4 max-w-xl mx-auto">
          <h1 
            className={`text-6xl sm:text-7xl font-bold mb-4 tracking-tight ${
              hasInteracted ? "animate-fade-out" : "animate-fade-in"
            }`}
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
          >
            TBE
          </h1>
          
          <p 
            className={`text-xl sm:text-2xl mb-8 ${
              hasInteracted ? "animate-fade-out" : "animate-fade-in"
            }`}
            style={{ 
              animationDelay: "0.3s", 
              animationFillMode: "forwards",
              textShadow: "0 1px 5px rgba(0,0,0,0.4)" 
            }}
          >
            Minimalist Fashion. Maximum Impact.
          </p>
          
          <button 
            onClick={handleCTA}
            className={`px-8 py-3 bg-white text-black uppercase tracking-wider font-medium transition-all hover:bg-black hover:text-white glitch-effect ${
              hasInteracted ? "animate-fade-out" : "animate-fade-in"
            }`}
            style={{ 
              animationDelay: "0.6s", 
              animationFillMode: "forwards" 
            }}
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoBackground;
