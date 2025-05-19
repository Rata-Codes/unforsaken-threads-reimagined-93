
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const StoreEntrance = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState(1);
  
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStage(2);
    }, 1500);
    
    const timer2 = setTimeout(() => {
      setStage(3);
    }, 3000);
    
    const timer3 = setTimeout(() => {
      onComplete();
    }, 4500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);
  
  return (
    <div className="fixed inset-0 z-50 bg-black perspective-container">
      <div 
        className={cn(
          "w-full h-full transition-all duration-1500 ease-in-out transform-gpu",
          stage === 1 && "scale-[0.6] translate-z-0",
          stage === 2 && "scale-[0.8] translate-z-24",
          stage === 3 && "scale-100 translate-z-48 opacity-0"
        )}
      >
        {/* Store Front */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative perspective-container">
            {/* Store Logo */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <h1 className="text-6xl md:text-9xl text-white font-bold">TBE</h1>
            </div>
            
            {/* Store Structure */}
            <div className="bg-neutral-800 h-[60vh] w-[80vw] max-w-4xl relative">
              {/* Store Display */}
              <div className="absolute inset-x-0 top-0 h-24 bg-white/10"></div>
              
              {/* Store Front */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 border border-white/20 flex items-center justify-center">
                  <div className="w-1/2 h-full border-l border-r border-white/20"></div>
                </div>
              </div>
              
              {/* Store Entrance */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-full">
                <div className="w-full h-full border-l border-r border-white/20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreEntrance;
