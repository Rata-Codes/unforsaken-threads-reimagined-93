
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Trash } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import AccountDialog from "@/components/AccountDialog";
import { useToast } from "@/components/ui/use-toast";

const Cart = () => {
  const { isAuthenticated } = useAuth();
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  
  const shipping = cartTotal >= 100 ? 0 : 10;
  const total = cartTotal + shipping;
  
  const handleCheckoutClick = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }
    
    // Store cart items in sessionStorage for checkout page access
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    sessionStorage.setItem("cartTotal", total.toString());
    
    // Proceed to checkout if authenticated
    navigate("/checkout");
  };
  
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
                    <div key={`${item.id}-${item.size}`} className="flex gap-6 card-hover p-4">
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
                          <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        
                        <div className="flex justify-between mt-4">
                          <div className="flex items-center border border-gray-300">
                            <button 
                              className="px-3 py-1 text-gray-500 hover:bg-gray-100"
                              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="px-3 py-1 border-l border-r border-gray-300">
                              {item.quantity}
                            </span>
                            <button 
                              className="px-3 py-1 text-gray-500 hover:bg-gray-100"
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          
                          <button 
                            className="text-gray-500 hover:text-black transition-colors flex items-center"
                            onClick={() => removeFromCart(item.id, item.size)}
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
                <div className="bg-neutral-50 p-6 card-hover">
                  <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full py-6 bg-black text-white hover:bg-black/90 beat-animation"
                    onClick={handleCheckoutClick}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Free shipping on orders over ₹100
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
      
      <AccountDialog 
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        redirectAfterLogin="/checkout"
      />
    </div>
  );
};

export default Cart;
