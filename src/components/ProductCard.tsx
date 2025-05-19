
import { useState } from "react";
import { Link } from "react-router-dom";

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

  return (
    <div 
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${id}`} className="block">
        <div className="product-image-container aspect-[3/4] overflow-hidden bg-neutral-100 mb-4">
          <img 
            src={imageDefault} 
            alt={name}
            className="product-image-default w-full h-full object-cover transition-all duration-700"
          />
          <img 
            src={imageHover} 
            alt={`${name} on model`}
            className="product-image-hover w-full h-full object-cover transition-all duration-700"
          />
          
          {discount && (
            <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1">
              SAVE {discount}%
            </div>
          )}
        </div>
        
        <div className="text-left">
          <h3 className="text-sm font-medium uppercase mb-1">{name}</h3>
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
