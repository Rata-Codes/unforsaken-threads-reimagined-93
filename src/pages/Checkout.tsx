import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { generateOrderId, createOrder, updateCustomer, appendOrderId } from "@/lib/airtable";
import { useToast } from "@/components/ui/use-toast";

const Checkout = () => {
  const { isAuthenticated, user } = useAuth();
  const { cartItems, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [total, setTotal] = useState(0);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiry: "",
    cvc: ""
  });
  
  // Pre-fill form with user data if authenticated
  useEffect(() => {
    if (isAuthenticated && user?.fields) {
      const nameParts = (user.fields.Name || "").split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      
      setFormData(prev => ({
        ...prev,
        firstName,
        lastName,
        email: user.fields.Username || "",
        phone: user.fields.Phone || "",
        address: user.fields.Address || "",
        city: user.fields.City || "",
        state: user.fields.State || "",
        zipCode: user.fields.Zipcode || "",
      }));
    }
  }, [isAuthenticated, user]);
  
  // Calculate total with shipping
  useEffect(() => {
    const shipping = cartTotal >= 100 ? 0 : 10;
    setTotal(cartTotal + shipping);
  }, [cartTotal]);
  
  // If no items or not authenticated, redirect to cart
  useEffect(() => {
    if (!cartItems.length || !isAuthenticated) {
      navigate("/cart");
    }
  }, [cartItems.length, isAuthenticated, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const formatProductsString = (items: typeof cartItems) => {
    const itemsByName: Record<string, { [size: string]: number }> = {};
    
    items.forEach(item => {
      if (!itemsByName[item.name]) {
        itemsByName[item.name] = {};
      }
      
      if (!itemsByName[item.name][item.size]) {
        itemsByName[item.name][item.size] = 0;
      }
      
      itemsByName[item.name][item.size] += item.quantity;
    });
    
    return Object.entries(itemsByName).map(([name, sizes]) => {
      const sizesString = Object.entries(sizes)
        .map(([size, quantity]) => `${size} - ${quantity}N`)
        .join(", ");
      
      return `${name} [${sizesString}]`;
    }).join(", ");
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !user?.fields?.CID) {
      toast({
        title: "Authentication required",
        description: "Please log in to complete your purchase.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      console.log("Starting order creation process...");
      
      // Generate order ID
      const orderId = generateOrderId();
      console.log("Generated order ID:", orderId);
      
   
      
      const orderData = {
        OrderID: orderId,
        Products: formatProductsString(cartItems),
        TotalAmount: Number(total),
        CID: user.fields.CID,
      };
      
      console.log("Creating order with data:", orderData);
      
      await createOrder({
        fields: orderData
      });
      
      console.log("Order created successfully");
      
      // Update customer's order IDs
      if (user.id) {
        console.log("Updating customer order IDs...");
        const existingOrderIds = user.fields.OrderID;
        const updatedOrderIds = appendOrderId(existingOrderIds, orderId);
        
        await updateCustomer(user.id, {
          OrderID: updatedOrderIds,
          // Update customer address info if it has changed
          Address: formData.address,
          City: formData.city,
          State: formData.state,
          Zipcode: formData.zipCode,
          Phone: formData.phone
        });
        console.log("Customer order IDs updated");
      }
      
      // Clear cart
      clearCart();
      
      // Store order ID for confirmation page
      sessionStorage.setItem("lastOrderId", orderId);
      
      console.log("Redirecting to confirmation page...");
      // Redirect to confirmation page
      navigate("/confirmation");
      
    } catch (error) {
      console.error("Error processing order:", error);
      toast({
        title: "Order processing failed",
        description: "There was a problem processing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (cartItems.length === 0) {
    return null; // Don't render anything while redirecting or if no items
  }
  
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
                      <Input 
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required 
                        className="mt-1" 
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                      className="mt-1" 
                    />
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      type="tel" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      required 
                      className="mt-1" 
                    />
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required 
                      className="mt-1" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input 
                        id="state" 
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input 
                        id="zipCode" 
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required 
                        className="mt-1" 
                      />
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
                        <Input 
                          id="cardNumber" 
                          name="cardNumber"
                          placeholder="•••• •••• •••• ••••" 
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required 
                          className="mt-1" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input 
                            id="expiry" 
                            name="expiry"
                            placeholder="MM/YY" 
                            value={formData.expiry}
                            onChange={handleInputChange}
                            required 
                            className="mt-1" 
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvc">CVC</Label>
                          <Input 
                            id="cvc" 
                            name="cvc"
                            placeholder="•••" 
                            value={formData.cvc}
                            onChange={handleInputChange}
                            required 
                            className="mt-1" 
                          />
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
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Complete Order"}
                  </Button>
                </div>
              </form>
            </div>
            
            <div>
              <div className="bg-neutral-50 p-6 sticky top-24 card-hover">
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
                          <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{(total - (total >= 100 ? 0 : 10)).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{total >= 100 ? "Free" : "₹10.00"}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
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
