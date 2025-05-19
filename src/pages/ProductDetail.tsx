
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ChevronLeft, Heart, Share, Star } from "lucide-react";
import { Link } from "react-router-dom";

// Mock product data - in a real app, this would come from an API
const productData = {
  "1": {
    id: "1",
    name: "Minimal Heavyweight Hoodie",
    price: 65,
    originalPrice: 74,
    imageDefault: "/lovable-uploads/b9ef63f9-198a-44f4-9d09-475b2e17ac6c.png",
    hoverImage: "/lovable-uploads/4e8347fd-85f2-4e6b-a943-d0a3da0b4f56.png",
    images: [
      "/lovable-uploads/b9ef63f9-198a-44f4-9d09-475b2e17ac6c.png",
      "/lovable-uploads/4e8347fd-85f2-4e6b-a943-d0a3da0b4f56.png",
      "/lovable-uploads/bddb910d-c3d0-45f1-9131-cfcbc4f56ec1.png",
    ],
    discount: 12,
    category: "hoodies",
    description: "Our minimal heavyweight hoodie offers premium comfort and style with its high-quality fabric and minimalist design. Perfect for everyday wear.",
    details: "- 100% premium cotton\n- 400 GSM heavyweight fabric\n- Ribbed cuffs and hem\n- Kangaroo pocket\n- Drawstring hood\n- Relaxed fit",
    sizes: ["S", "M", "L", "XL"],
    stock: 25,
    reviews: [
      { id: 1, user: "Alex", rating: 5, comment: "Amazing quality and fit. Absolutely love it." },
      { id: 2, user: "Jordan", rating: 4, comment: "Great hoodie. Slightly large but overall very comfortable." }
    ]
  },
  "2": {
    id: "2",
    name: "Modern Oversized Tee",
    price: 42,
    originalPrice: 53,
    imageDefault: "/lovable-uploads/bddb910d-c3d0-45f1-9131-cfcbc4f56ec1.png",
    hoverImage: "/lovable-uploads/4e8347fd-85f2-4e6b-a943-d0a3da0b4f56.png",
    images: [
      "/lovable-uploads/bddb910d-c3d0-45f1-9131-cfcbc4f56ec1.png",
      "/lovable-uploads/4e8347fd-85f2-4e6b-a943-d0a3da0b4f56.png",
      "/lovable-uploads/e6888aba-7c47-4b1a-8b66-1ebca0b77420.png",
    ],
    discount: 21,
    category: "tees",
    description: "Our modern oversized tee combines comfort with contemporary style. The relaxed fit makes it perfect for any casual occasion.",
    details: "- 100% organic cotton\n- 220 GSM midweight fabric\n- Relaxed, oversized fit\n- Ribbed neckline\n- Dropped shoulders",
    sizes: ["S", "M", "L", "XL"],
    stock: 42,
    reviews: [
      { id: 1, user: "Taylor", rating: 5, comment: "Perfect oversized fit. Will be ordering more colors!" },
      { id: 2, user: "Cameron", rating: 5, comment: "High quality material and construction. Highly recommend." }
    ]
  },
  // Add more products as needed
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = productData[id as keyof typeof productData];
  
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container my-12 text-center">
          <h2 className="text-2xl">Product not found</h2>
          <Link to="/shop" className="underline mt-4 inline-block">Return to shop</Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };
  
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedSize}) x ${quantity}`,
    });
    
    // Here you would add the product to the cart state
    console.log("Adding to cart:", {
      product,
      size: selectedSize,
      quantity
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link to="/shop" className="text-sm text-gray-500 flex items-center hover:text-black transition-colors">
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to shop
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="aspect-square bg-neutral-100 mb-4">
                <img 
                  src={product.images[currentImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button 
                    key={index}
                    className={`aspect-square bg-neutral-100 ${currentImage === index ? 'ring-2 ring-black' : ''}`}
                    onClick={() => setCurrentImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-medium mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-6">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className="h-5 w-5" 
                      fill={product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length >= star ? "black" : "none"}
                      stroke={product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length >= star ? "black" : "currentColor"}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  ({product.reviews.length} reviews)
                </span>
              </div>
              
              <div className="flex items-center mb-6">
                <span className="text-2xl font-medium">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="ml-2 text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.discount && (
                  <span className="ml-2 bg-black text-white text-xs px-2 py-1">
                    SAVE {product.discount}%
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 mb-8">{product.description}</p>
              
              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Size</h3>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      className={`w-12 h-12 border flex items-center justify-center text-sm transition-colors ${
                        selectedSize === size 
                          ? 'bg-black text-white border-black' 
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="mt-2 text-sm text-red-500">Please select a size</p>
                )}
              </div>
              
              {/* Quantity */}
              <div className="mb-8">
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
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {product.stock} in stock
                </p>
              </div>
              
              {/* Add to Cart */}
              <div className="flex gap-3">
                <Button 
                  className="flex-grow py-6 bg-black text-white hover:bg-black/90"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                
                <Button variant="outline" size="icon" className="h-[52px] w-[52px]">
                  <Heart className="h-5 w-5" />
                </Button>
                
                <Button variant="outline" size="icon" className="h-[52px] w-[52px]">
                  <Share className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="details">
              <TabsList className="w-full border-b rounded-none bg-transparent justify-start h-auto">
                <TabsTrigger 
                  value="details" 
                  className="border-b-2 border-transparent data-[state=active]:border-black rounded-none py-3 px-6 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-base"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger 
                  value="shipping" 
                  className="border-b-2 border-transparent data-[state=active]:border-black rounded-none py-3 px-6 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-base"
                >
                  Shipping
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews" 
                  className="border-b-2 border-transparent data-[state=active]:border-black rounded-none py-3 px-6 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-base"
                >
                  Reviews ({product.reviews.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="py-6">
                <div className="whitespace-pre-line">
                  {product.details}
                </div>
              </TabsContent>
              
              <TabsContent value="shipping" className="py-6">
                <h3 className="font-medium mb-4">Shipping Information</h3>
                <p className="mb-4">We ship worldwide using reliable courier services.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Domestic orders: 3-5 business days</li>
                  <li>International orders: 7-14 business days</li>
                  <li>Free shipping on orders over $100</li>
                </ul>
              </TabsContent>
              
              <TabsContent value="reviews" className="py-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="mb-6 pb-6 border-b last:border-b-0">
                    <div className="flex items-center mb-2">
                      <span className="font-medium">{review.user}</span>
                      <div className="flex ml-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star}
                            className="h-4 w-4" 
                            fill={review.rating >= star ? "black" : "none"}
                            stroke={review.rating >= star ? "black" : "currentColor"}
                          />
                        ))}
                      </div>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
