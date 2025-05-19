
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  
  // Mock cart data - in a real app this would be from state management
  const cartItems = [
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
  ];
  
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal >= 100 ? 0 : 10;
  const total = subtotal + shipping;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the checkout process
    console.log("Processing order...");
    // Redirect to confirmation page after successful checkout
    window.location.href = "/confirmation";
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container px-4 py-8">
          <h1 className="text-3xl font-medium mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Shipping Information */}
                <div>
                  <h2 className="text-xl font-medium mb-4">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required className="mt-1" />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required className="mt-1" />
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" required className="mt-1" />
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" required className="mt-1" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input id="state" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input id="zipCode" required className="mt-1" />
                    </div>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div>
                  <h2 className="text-xl font-medium mb-4">Payment Method</h2>
                  
                  <RadioGroup 
                    defaultValue="card" 
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2 border p-4 rounded">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-grow cursor-pointer">Credit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-4 rounded">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-grow cursor-pointer">PayPal</Label>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod === "card" && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="•••• •••• •••• ••••" required className="mt-1" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" required className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="•••" required className="mt-1" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <Link to="/cart" className="text-sm flex items-center hover:underline">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back to Cart
                  </Link>
                  
                  <Button 
                    type="submit"
                    className="bg-black text-white hover:bg-black/90 px-8"
                  >
                    Complete Order
                  </Button>
                </div>
              </form>
            </div>
            
            <div>
              <div className="bg-neutral-50 p-6 sticky top-24">
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map(item => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-3">
                      <div className="w-16 h-16 bg-neutral-100 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">Size: {item.size}</p>
                        <div className="flex justify-between mt-1 text-sm">
                          <span>× {item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
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
                
                <div className="mt-4">
                  <p className="text-sm text-gray-500 text-center">
                    10% of your purchase is donated to charity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
