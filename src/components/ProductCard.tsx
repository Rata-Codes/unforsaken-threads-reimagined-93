
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageDefault: string;
  imageHover: string;
  discount?: number;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  imageDefault,
  imageHover,
  discount
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { toast } = useToast();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAddingToCart(true);
    
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    });
    
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  return (
    <div 
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${id}`} className="block">
        <div className="product-image-container aspect-[3/4] overflow-hidden bg-neutral-100 mb-4 relative">
          <img 
            src={imageDefault} 
            alt={name}
            className={cn(
              "product-image-default w-full h-full object-cover transition-all duration-700",
              isHovered ? "opacity-0" : "opacity-100"
            )}
          />
          <img 
            src={imageHover} 
            alt={`${name} on model`}
            className={cn(
              "product-image-hover absolute inset-0 w-full h-full object-cover transition-all duration-700",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          />
          
          {discount && (
            <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1">
              SAVE {discount}%
            </div>
          )}
          
          <div 
            className={cn(
              "absolute bottom-0 left-0 right-0 bg-black bg-opacity-0 p-3 transform translate-y-full transition-all duration-300",
              isHovered ? "translate-y-0 bg-opacity-70" : ""
            )}
          >
            <button 
              className="w-full bg-white text-black text-xs uppercase tracking-wider py-2 hover:bg-neutral-200 transition-colors"
              onClick={handleQuickAdd}
            >
              {isAddingToCart ? "Added!" : "Quick Add"}
            </button>
          </div>
        </div>
        
        <div className="text-left">
          <h3 className="text-sm font-medium uppercase mb-1 tracking-wider">{name}</h3>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">${price.toFixed(2)}</p>
            {originalPrice && (
              <p className="text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
