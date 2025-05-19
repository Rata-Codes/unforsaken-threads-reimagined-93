
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Trash } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

const Cart = () => {
  // Mock cart items - in a real app this would be stored in state management
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Minimal Heavyweight Hoodie",
      price: 65,
      image: "/lovable-uploads/b9ef63f9-198a-44f4-9d09-475b2e17ac6c.png",
      size: "M",
      quantity: 1
    },
    {
      id: "2",
      name: "Modern Oversized Tee",
      price: 42,
      image: "/lovable-uploads/bddb910d-c3d0-45f1-9131-cfcbc4f56ec1.png",
      size: "L",
      quantity: 2
    }
  ]);
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };
  
  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal >= 100 ? 0 : 10;
  const total = subtotal + shipping;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container px-4 py-8">
          <h1 className="text-3xl font-medium mb-8">Your Cart</h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="space-y-8">
                  {cartItems.map(item => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-6">
                      <div className="w-24 h-24 bg-neutral-100 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">Size: {item.size}</p>
                          </div>
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        
                        <div className="flex justify-between mt-4">
                          <div className="flex items-center border border-gray-300">
                            <button 
                              className="px-3 py-1 text-gray-500 hover:bg-gray-100"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="px-3 py-1 border-l border-r border-gray-300">
                              {item.quantity}
                            </span>
                            <button 
                              className="px-3 py-1 text-gray-500 hover:bg-gray-100"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          
                          <button 
                            className="text-gray-500 hover:text-black transition-colors flex items-center"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash className="h-4 w-4 mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <Link to="/shop" className="text-sm flex items-center hover:underline">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Continue Shopping
                  </Link>
                </div>
              </div>
              
              <div>
                <div className="bg-neutral-50 p-6">
                  <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full py-6 bg-black text-white hover:bg-black/90"
                    asChild
                  >
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                  
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Free shipping on orders over $100
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Button asChild>
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
