
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/components/ui/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  defaultImage: string;
  hoverImage: string;
  description: string;
  sizes: string[];
  stock: number;
}

interface BarrelCarouselProps {
  products: Product[];
}

const BarrelCarousel = ({ products }: BarrelCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    // Reset selections when active product changes
    setSelectedSize("");
    setQuantity(1);
    
    // Show details animation after product transitions
    const timer = setTimeout(() => {
      setShowDetails(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setShowDetails(false);
    
    setTimeout(() => {
      setActiveIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 300);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setShowDetails(false);
    
    setTimeout(() => {
      setActiveIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 300);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0 && newQuantity <= products[activeIndex].stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;
    
    // Add the product to the cart
    addToCart({
      id: products[activeIndex].id,
      name: products[activeIndex].name,
      price: products[activeIndex].price,
      image: products[activeIndex].defaultImage,
      size: selectedSize,
      quantity
    });
    
    // Reset selections
    setSelectedSize("");
    setQuantity(1);
    
    toast({
      title: "Added to cart",
      description: `${products[activeIndex].name} (${selectedSize}) added to cart.`
    });
  };

  const activeProduct = products[activeIndex];
  const prevIndex = activeIndex === 0 ? products.length - 1 : activeIndex - 1;
  const nextIndex = activeIndex === products.length - 1 ? 0 : activeIndex + 1;

  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col lg:flex-row items-center">
        {/* Barrel Carousel */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0 relative perspective-3d">
          <div className="carousel-container h-[500px] relative perspective-container">
            {/* Previous Product (Left) */}
            <div 
              className={cn(
                "carousel-item absolute top-1/2 left-0 -translate-y-1/2 w-[80%] h-[80%] transform -translate-x-1/4 scale-75 z-10",
                "transition-all duration-500 ease-in-out opacity-70 rotate-y-[-30deg]"
              )}
            >
              <img 
                src={products[prevIndex].defaultImage}
                alt={products[prevIndex].name} 
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Active Product (Center) */}
            <div 
              className={cn(
                "carousel-item absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-20",
                "transition-all duration-500 ease-in-out transform-gpu"
              )}
            >
              <img 
                src={activeProduct.defaultImage}
                alt={activeProduct.name}
                className="w-full h-full object-contain cursor-pointer transition-all duration-500"
                onMouseEnter={(e) => e.currentTarget.src = activeProduct.hoverImage}
                onMouseLeave={(e) => e.currentTarget.src = activeProduct.defaultImage}
              />
            </div>
            
            {/* Next Product (Right) */}
            <div 
              className={cn(
                "carousel-item absolute top-1/2 right-0 -translate-y-1/2 w-[80%] h-[80%] transform translate-x-1/4 scale-75 z-10",
                "transition-all duration-500 ease-in-out opacity-70 rotate-y-[30deg]"
              )}
            >
              <img 
                src={products[nextIndex].defaultImage}
                alt={products[nextIndex].name}
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Navigation Controls */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-1/2 -left-12 -translate-y-1/2 rounded-full bg-black text-white hover:bg-black/80 z-30"
              onClick={handlePrev}
            >
              <ChevronLeft />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-1/2 -right-12 -translate-y-1/2 rounded-full bg-black text-white hover:bg-black/80 z-30"
              onClick={handleNext}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
        
        {/* Product Details */}
        <div 
          className={cn(
            "w-full lg:w-1/2 lg:pl-12 space-y-6",
            showDetails ? "animate-fade-in" : "opacity-0"
          )}
        >
          <h2 className="text-3xl font-medium">{activeProduct.name}</h2>
          
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-medium">₹{activeProduct.price.toFixed(2)}</span>
            {activeProduct.originalPrice && (
              <span className="text-lg text-gray-500 line-through">₹{activeProduct.originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          <p className="text-gray-700">{activeProduct.description}</p>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Select Size</h3>
            <div className="flex gap-3">
              {activeProduct.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={cn(
                    "w-12 h-12 border flex items-center justify-center text-sm transition-colors",
                    selectedSize === size 
                      ? "bg-black text-white border-black" 
                      : "border-gray-300 hover:border-black"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <p className="mt-2 text-sm text-red-500">Please select a size</p>
            )}
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Quantity</h3>
            <div className="flex items-center border border-gray-300 inline-flex">
              <button 
                onClick={() => handleQuantityChange(-1)}
                className="px-4 py-2 text-gray-500 hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-2 border-l border-r border-gray-300">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
                className="px-4 py-2 text-gray-500 hover:bg-gray-100"
                disabled={quantity >= activeProduct.stock}
              >
                +
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {activeProduct.stock} in stock
            </p>
          </div>
          
          <Button 
            className="w-full py-6 bg-black text-white hover:bg-black/90"
            onClick={handleAddToCart}
            disabled={!selectedSize}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BarrelCarousel;
