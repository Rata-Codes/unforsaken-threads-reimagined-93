
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoreEntrance from "@/components/StoreEntrance";
import VideoBackground from "@/components/VideoBackground";
import FeaturedProducts from "@/components/FeaturedProducts";
import CollectionBanner from "@/components/CollectionBanner";
import CharitySection from "@/components/CharitySection";
import Newsletter from "@/components/Newsletter";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [showEntrance, setShowEntrance] = useState(true);
  const [entranceCompleted, setEntranceCompleted] = useState(false);
  const isMobile = useIsMobile();
  
  // Skip entrance animation if the page is refreshed (using sessionStorage)
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisitedBefore");
    if (hasVisited) {
      setShowEntrance(false);
      setEntranceCompleted(true);
    } else {
      sessionStorage.setItem("hasVisitedBefore", "true");
    }
  }, []);
  
  const handleEntranceComplete = () => {
    setShowEntrance(false);
    setEntranceCompleted(true);
  };
  
  if (showEntrance) {
    return <StoreEntrance onComplete={handleEntranceComplete} />;
  }

  return (
    <div className={`min-h-screen flex flex-col ${entranceCompleted ? "animate-fade-in" : ""}`}>
      <Navbar />
      
      {/* Hero Section */}
      {!isMobile ? (
        <VideoBackground videoSrc="https://res.cloudinary.com/dgbv7qyir/video/upload/v1747583794/2516162-hd_1920_1080_24fps_iasv6w.mp4" />
      ) : (
        <div className="h-screen flex items-center justify-center bg-black">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in">TBE</h1>
            <p className="text-xl mb-8 animate-slide-in" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
              Minimalist Fashion. Maximum Impact.
            </p>
            <button 
              className="px-8 py-3 bg-white text-black uppercase tracking-wider font-medium animate-slide-in"
              style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
            >
              Shop Now
            </button>
          </div>
        </div>
      )}
      
      {/* Featured Products */}
      <FeaturedProducts />
      
      {/* Collection Banner */}
      <CollectionBanner 
        title="New Arrivals"
        subtitle="Discover our latest collection of minimalist designs."
        buttonText="Shop the Collection"
        buttonLink="/shop"
        imageSrc="/placeholder.svg"
        altText="New Arrivals Collection"
      />
      
      {/* Charity Section */}
      <CharitySection />
      
      {/* Second Collection Banner */}
      <CollectionBanner 
        title="Limited Edition"
        subtitle="Exclusive designs available for a limited time only."
        buttonText="Explore Now"
        buttonLink="/limited-edition"
        imageSrc="/placeholder.svg"
        altText="Limited Edition Collection"
        reverse={true}
      />
      
      {/* Newsletter */}
      <Newsletter />
      
      <Footer />
    </div>
  );
};

export default Index;
