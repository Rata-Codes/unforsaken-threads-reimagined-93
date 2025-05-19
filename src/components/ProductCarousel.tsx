
import React, { useState } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  defaultImage: string;
  hoverImage: string;
  discount?: number;
  sizes: string[];
}

const tshirts: Product[] = [
  {
    id: "1",
    name: "Classic Black Tee",
    price: 49.99,
    defaultImage: "/lovable-uploads/b9ef63f9-198a-44f4-9d09-475b2e17ac6c.png", 
    hoverImage: "/lovable-uploads/4e8347fd-85f2-4e6b-a943-d0a3da0b4f56.png",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "2",
    name: "Minimalist White Tee",
    price: 45.99,
    defaultImage: "/lovable-uploads/bddb910d-c3d0-45f1-9131-cfcbc4f56ec1.png",
    hoverImage: "/lovable-uploads/4e8347fd-85f2-4e6b-a943-d0a3da0b4f56.png", 
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "3",
    name: "Designer Print Tee",
    price: 55.99,
    originalPrice: 65.99,
    defaultImage: "/lovable-uploads/e6888aba-7c47-4b1a-8b66-1ebca0b77420.png",
    hoverImage: "/lovable-uploads/4e8347fd-85f2-4e6b-a943-d0a3da0b4f56.png",
    discount: 15,
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "4",
    name: "YAHWEH YIREH Tee",
    price: 52.99,
    defaultImage: "/lovable-uploads/4e8347fd-85f2-4e6b-a943-d0a3da0b4f56.png",
    hoverImage: "/lovable-uploads/4e8347fd-85f2-4e6b-a943-d0a3da0b4f56.png",
    sizes: ["S", "M", "L", "XL"]
  }
];

const ProductCarousel = () => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<Record<string, string>>({});

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSize((prev) => ({
      ...prev,
      [productId]: size
    }));
  };

  return (
    <div className="container my-16">
      <h2 className="text-3xl font-medium mb-10 text-center">Featured Collection</h2>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {tshirts.map((product) => (
            <CarouselItem 
              key={product.id} 
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <div className="product-card group">
                <div 
                  className="product-image-container aspect-[3/4] bg-neutral-100 mb-4 relative overflow-hidden"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <img 
                    src={hoveredProduct === product.id ? product.hoverImage : product.defaultImage}
                    alt={product.name}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      hoveredProduct === product.id ? "scale-105" : ""
                    )}
                  />
                  
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1">
                      SAVE {product.discount}%
                    </div>
                  )}

                  <div 
                    className={cn(
                      "absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity duration-300",
                      hoveredProduct === product.id ? "opacity-100" : ""
                    )}
                  >
                    <div className="text-center px-4">
                      <div className="size-selector flex justify-center gap-2 mb-4">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => handleSizeSelect(product.id, size)}
                            className={cn(
                              "w-8 h-8 flex items-center justify-center text-sm transition-colors",
                              selectedSize[product.id] === size 
                                ? "bg-white text-black" 
                                : "bg-transparent text-white border border-white hover:bg-white/20"
                            )}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                      <button 
                        className="bg-white text-black px-4 py-2 uppercase text-sm tracking-wider hover:bg-neutral-200 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="text-left">
                  <h3 className="text-sm font-medium uppercase mb-1">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">${product.price.toFixed(2)}</p>
                    {product.originalPrice && (
                      <p className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
