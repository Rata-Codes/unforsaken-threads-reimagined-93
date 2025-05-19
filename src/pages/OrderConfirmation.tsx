
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Truck } from "lucide-react";

const OrderConfirmation = () => {
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [orderDate] = useState<string>(new Date().toLocaleDateString());
  
  useEffect(() => {
    // Get order ID from session storage
    const storedOrderId = sessionStorage.getItem("lastOrderId");
    if (storedOrderId) {
      setOrderNumber(storedOrderId);
      // Clear it after reading
      sessionStorage.removeItem("lastOrderId");
    } else {
      // If no order ID, use a fallback
      setOrderNumber("TBE-" + Math.floor(10000 + Math.random() * 90000));
    }
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container px-4 py-12 max-w-3xl mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <CheckCircle className="w-16 h-16 mx-auto text-black mb-4 beat-animation" />
            <h1 className="text-3xl font-medium mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for your purchase. We're getting your order ready to be shipped.
            </p>
          </div>
          
          <div className="bg-neutral-50 p-8 mb-8 text-left card-hover animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-lg font-medium mb-4">Order Information</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2">
                <div>
                  <p className="text-gray-500">Order Number</p>
                  <p className="font-medium">{orderNumber}</p>
                </div>
                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="font-medium">{orderDate}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <h2 className="text-lg font-medium mb-4 text-left">Delivery Process</h2>
            
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="h-1 flex-grow bg-black"></div>
              <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <div className="h-1 flex-grow bg-gray-200"></div>
              <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
            </div>
            
            <div className="grid grid-cols-3 text-center">
              <div>
                <p className="font-medium">Order Confirmed</p>
                <p className="text-sm text-gray-500">We've received your order</p>
              </div>
              <div>
                <p className="font-medium">Order Processing</p>
                <p className="text-sm text-gray-500">We're preparing your items</p>
              </div>
              <div>
                <p className="font-medium">Out for Delivery</p>
                <p className="text-sm text-gray-500">Your items are on the way</p>
              </div>
            </div>
          </div>
          
          <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <p className="mb-4">
              We'll send you shipping confirmation when your items are on the way!
              If you have any questions, please email us at
              <a href="mailto:support@tbe.com" className="text-black font-medium hover:underline ml-1">
                support@tbe.com
              </a>
            </p>
          </div>
          
          <div className="flex gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <Button asChild className="hover:scale-105 transition-transform">
              <Link to="/">Return to Home</Link>
            </Button>
            <Button variant="outline" asChild className="hover:scale-105 transition-transform">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
