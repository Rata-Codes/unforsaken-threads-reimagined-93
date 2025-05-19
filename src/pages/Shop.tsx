
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import BarrelCarousel from "@/components/BarrelCarousel";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useCart } from "@/contexts/CartContext";

// Define mock product data
const productData = [
  {
    id: "1",
    name: "Minimal Heavyweight Hoodie",
    price: 65,
    originalPrice: 74,
    imageDefault: "/lovable-uploads/b9ef63f9-198a-44f4-9d09-475b2e17ac6c.png",
    imageHover: "/lovable-uploads/4e8347fd-85f2-4e6b-a943-d0a3da0b4f56.png",
    discount: 12,
    category: "hoodies"
  },
  {
    id: "2",
    name: "Modern Oversized Tee",
    price: 42,
    originalPrice: 53,
    imageDefault: "/lovable-uploads/bddb910d-c3d0-45f1-9131-cfcbc4f56ec1.png",
    imageHover: "/lovable-uploads/4e8347fd-85f2-4e6b-a943-d0a3da0b4f56.png",
    discount: 21,
    category: "tees"
  },
  {
    id: "3",
    name: "Iconic Washed Oversized Tee",
    price: 47,
    originalPrice: 57,
    imageDefault: "/lovable-uploads/e6888aba-7c47-4b1a-8b66-1ebca0b77420.png",
    imageHover: "/lovable-uploads/4e8347fd-85f2-4e6b-a943-d0a3da0b4f56.png",
    discount: 18,
    category: "tees"
  },
  {
    id: "4",
    name: "Celestial 2.0 Heavyweight Tee",
    price: 45,
    originalPrice: 53,
    imageDefault: "/lovable-uploads/4e8347fd-85f2-4e6b-a943-d0a3da0b4f56.png",
    imageHover: "/lovable-uploads/4e8347fd-85f2-4e6b-a943-d0a3da0b4f56.png",
    discount: 15,
    category: "tees"
  },
  {
    id: "5",
    name: "Essential Black Tee",
    price: 35,
    originalPrice: null,
    imageDefault: "/placeholder.svg",
    imageHover: "/placeholder.svg",
    discount: null,
    category: "tees"
  },
  {
    id: "6",
    name: "Urban Design Tee",
    price: 40,
    originalPrice: 50,
    imageDefault: "/placeholder.svg",
    imageHover: "/placeholder.svg",
    discount: 20,
    category: "tees"
  },
  {
    id: "7",
    name: "Monochrome Series Tee",
    price: 39,
    originalPrice: 45,
    imageDefault: "/placeholder.svg",
    imageHover: "/placeholder.svg",
    discount: 13,
    category: "tees"
  },
  {
    id: "8",
    name: "Limited Edition Heavyweight Hoodie",
    price: 70,
    originalPrice: 85,
    imageDefault: "/placeholder.svg",
    imageHover: "/placeholder.svg",
    discount: 18,
    category: "hoodies"
  }
];

// Define carousel products with more details
const carouselProducts = [
  {
    id: "1",
    name: "Minimal Heavyweight Hoodie",
    price: 65,
    originalPrice: 74,
    defaultImage: "/lovable-uploads/b9ef63f9-198a-44f4-9d09-475b2e17ac6c.png",
    hoverImage: "/lovable-uploads/4e8347fd-85f2-4e6b-a943-d0a3da0b4f56.png",
    description: "Our minimal heavyweight hoodie offers premium comfort and style with its high-quality fabric and minimalist design.",
    sizes: ["S", "M", "L", "XL"],
    stock: 25
  },
  {
    id: "2",
    name: "Modern Oversized Tee",
    price: 42,
    originalPrice: 53,
    defaultImage: "/lovable-uploads/bddb910d-c3d0-45f1-9131-cfcbc4f56ec1.png",
    hoverImage: "/lovable-uploads/4e8347fd-85f2-4e6b-a943-d0a3da0b4f56.png",
    description: "Our modern oversized tee combines comfort with contemporary style. The relaxed fit makes it perfect for any casual occasion.",
    sizes: ["S", "M", "L", "XL"],
    stock: 42
  },
  {
    id: "3",
    name: "Iconic Washed Oversized Tee",
    price: 47,
    originalPrice: 57,
    defaultImage: "/lovable-uploads/e6888aba-7c47-4b1a-8b66-1ebca0b77420.png",
    hoverImage: "/lovable-uploads/4e8347fd-85f2-4e6b-a943-d0a3da0b4f56.png",
    description: "The iconic washed oversized tee features a vintage look and ultra-soft fabric. Each piece has a unique wash pattern.",
    sizes: ["S", "M", "L", "XL"],
    stock: 18
  },
  {
    id: "4",
    name: "Celestial 2.0 Heavyweight Tee",
    price: 45,
    originalPrice: 53,
    defaultImage: "/lovable-uploads/4e8347fd-85f2-4e6b-a943-d0a3da0b4f56.png",
    hoverImage: "/lovable-uploads/4e8347fd-85f2-4e6b-a943-d0a3da0b4f56.png",
    description: "The celestial 2.0 heavyweight tee is crafted from premium cotton with a substantial feel and perfect drape.",
    sizes: ["S", "M", "L", "XL"],
    stock: 35
  }
];

type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

const Shop = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [activeView, setActiveView] = useState<'grid' | 'barrel'>('barrel');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToCart } = useCart();
  
  // Filter products based on selected filters
  const filteredProducts = productData.filter(product => {
    // Apply category filter
    if (categoryFilter && product.category !== categoryFilter) {
      return false;
    }
    
    // Apply price filter
    if (product.price < priceRange.min || product.price > priceRange.max) {
      return false;
    }
    
    return true;
  });
  
  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "newest":
        // For mock data, we'll just sort by id
        return parseInt(b.id) - parseInt(a.id);
      default:
        // featured - default sort
        return 0;
    }
  });
  
  // Handle price range change
  const handlePriceChange = (values: number[]) => {
    setPriceRange({ min: values[0], max: values[1] });
  };

  // Handle add to cart from grid view
  const handleGridAddToCart = (product: any, defaultSize = "M") => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageDefault,
      size: selectedSize || defaultSize,
      quantity: 1
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Shop Banner */}
        <div className="bg-neutral-100 py-12 text-center">
          <div className="container">
            <h1 className="text-3xl font-medium">Shop All</h1>
          </div>
        </div>
        
        {/* View Toggle */}
        <div className="container px-4 py-6 flex justify-center">
          <div className="inline-flex border border-black">
            <Button
              variant={activeView === 'grid' ? "default" : "outline"}
              onClick={() => setActiveView('grid')}
              className="rounded-none bg-transparent hover:bg-black/5 text-black border-r border-black"
            >
              Grid View
            </Button>
            <Button
              variant={activeView === 'barrel' ? "default" : "outline"}
              onClick={() => setActiveView('barrel')}
              className="rounded-none bg-transparent hover:bg-black/5 text-black"
            >
              Barrel View
            </Button>
          </div>
        </div>
        
        {/* Barrel Carousel View */}
        {activeView === 'barrel' && (
          <BarrelCarousel products={carouselProducts} />
        )}
        
        {/* Grid View with Filters */}
        {activeView === 'grid' && (
          <div className="container px-4 py-8">
            {/* Filter Bar */}
            <div className="flex justify-between items-center mb-8 border-b pb-4">
              <Button 
                variant="ghost" 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filter
                {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="border-none bg-transparent focus:outline-none text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
            
            {/* Filters Panel */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-6 border-b animate-fade-in">
                {/* Category Filter */}
                <div>
                  <h3 className="font-medium mb-3">Category</h3>
                  <div className="space-y-2">
                    <button
                      className={`text-sm ${categoryFilter === null ? 'font-medium' : 'text-muted-foreground'}`}
                      onClick={() => setCategoryFilter(null)}
                    >
                      All
                    </button>
                    <div className="space-y-2">
                      <button
                        className={`block text-sm ${categoryFilter === 'tees' ? 'font-medium' : 'text-muted-foreground'}`}
                        onClick={() => setCategoryFilter('tees')}
                      >
                        T-Shirts
                      </button>
                      <button
                        className={`block text-sm ${categoryFilter === 'hoodies' ? 'font-medium' : 'text-muted-foreground'}`}
                        onClick={() => setCategoryFilter('hoodies')}
                      >
                        Hoodies
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Price Filter */}
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="flex flex-col gap-2 px-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">₹{priceRange.min}</span>
                      <span className="text-sm text-muted-foreground">₹{priceRange.max}</span>
                    </div>
                    <Slider
                      defaultValue={[priceRange.min, priceRange.max]}
                      max={100}
                      step={5}
                      onValueChange={handlePriceChange}
                      className="w-full"
                    />
                  </div>
                </div>
                
                {/* Size Filter */}
                <div>
                  <h3 className="font-medium mb-3">Size</h3>
                  <div className="flex gap-2 flex-wrap">
                    {['S', 'M', 'L', 'XL'].map((size) => (
                      <button
                        key={size}
                        className={`w-10 h-10 flex items-center justify-center ${
                          selectedSize === size
                            ? "bg-black text-white"
                            : "border border-black hover:bg-black hover:text-white"
                        } transition-colors`}
                        onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <div key={product.id} className="group relative">
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice || undefined}
                    imageDefault={product.imageDefault}
                    imageHover={product.imageHover}
                    discount={product.discount || undefined}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleGridAddToCart(product)}
                      className="w-full py-1 text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Empty State */}
            {sortedProducts.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-lg">No products match your filters.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setCategoryFilter(null);
                    setPriceRange({ min: 0, max: 100 });
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
