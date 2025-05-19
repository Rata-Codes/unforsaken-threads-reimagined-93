
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Start with logo animation
    setTimeout(() => {
      setShowLogo(true);
    }, 500);
    
    // Progress bar animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500); // Complete after full progress
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      <div 
        className={cn(
          "transition-all duration-1000 transform",
          showLogo ? "opacity-100 scale-100" : "opacity-0 scale-90"
        )}
      >
        <h1 className="text-6xl md:text-9xl text-white font-bold mb-8">TBE</h1>
      </div>
      
      <div className="w-64 h-[2px] bg-white/20 mt-4">
        <div 
          className="h-full bg-white transition-all duration-300" 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="text-white/50 text-sm mt-4">
        {progress < 100 ? 'Loading...' : 'Welcome'}
      </p>
    </div>
  );
};

export default LoadingScreen;
