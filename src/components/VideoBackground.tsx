
import { useEffect, useRef } from "react";

interface VideoBackgroundProps {
  videoSrc: string;
}

const VideoBackground = ({ videoSrc }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-black z-10 mix-blend-color-dodge opacity-30"></div>
      
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 blur-[1px]"
        autoPlay
        muted
        loop
        playsInline
        poster="/placeholder.svg"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 animate-fade-in glitch">TBE</h1>
        <p className="text-xl md:text-2xl text-center max-w-2xl opacity-0 animate-slide-in" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
          Minimalist Fashion. Maximum Impact.
        </p>
        <button 
          className="mt-8 px-8 py-3 bg-white text-black uppercase tracking-wider font-medium hover:bg-opacity-90 transition-all duration-300 opacity-0 animate-slide-in"
          style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
        >
          Shop Now
        </button>
      </div>
      
      {/* Scanlines effect */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-scanlines opacity-10"></div>
    </div>
  );
};

export default VideoBackground;
