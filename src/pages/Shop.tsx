
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define mock product data
const productData = [
  {
    id: "1",
    name: "Minimal Heavyweight Hoodie",
    price: 65,
    originalPrice: 74,
    imageDefault: "/placeholder.svg",
    imageHover: "/placeholder.svg",
    discount: 12,
    category: "hoodies"
  },
  {
    id: "2",
    name: "Modern Oversized Tee",
    price: 42,
    originalPrice: 53,
    imageDefault: "/placeholder.svg",
    imageHover: "/placeholder.svg",
    discount: 21,
    category: "tees"
  },
  {
    id: "3",
    name: "Iconic Washed Oversized Tee",
    price: 47,
    originalPrice: 57,
    imageDefault: "/placeholder.svg",
    imageHover: "/placeholder.svg",
    discount: 18,
    category: "tees"
  },
  {
    id: "4",
    name: "Celestial 2.0 Heavyweight Tee",
    price: 45,
    originalPrice: 53,
    imageDefault: "/placeholder.svg",
    imageHover: "/placeholder.svg",
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

type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

const Shop = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  
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
        
        {/* Filters and Products */}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-6 border-b animate-slide-in">
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
                <h3 className="font-medium mb-3">Price</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">${priceRange.min}</span>
                    <span className="text-sm text-muted-foreground">${priceRange.max}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
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
                      className="w-10 h-10 border flex items-center justify-center text-sm hover:bg-black hover:text-white transition-colors"
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
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice || undefined}
                imageDefault={product.imageDefault}
                imageHover={product.imageHover}
                discount={product.discount || undefined}
              />
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
