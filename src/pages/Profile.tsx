
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { getOrdersByCustomerId, Order } from "@/lib/airtable";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    const fetchOrders = async () => {
      if (user?.fields?.CID) {
        try {
          const response = await getOrdersByCustomerId(user.fields.CID);
          setOrders(response.records || []);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, navigate, user]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container px-4 py-8 max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-medium">Your Profile</h1>
            <Button variant="outline" onClick={logout}>Logout</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Card className="p-6 hover:shadow-md transition-shadow">
                <h2 className="font-medium text-lg mb-4">Personal Information</h2>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{user?.fields?.Name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{user?.fields?.Phone}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{user?.fields?.Address}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">City</p>
                    <p className="font-medium">{user?.fields?.City || "N/A"}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">State</p>
                    <p className="font-medium">{user?.fields?.State || "N/A"}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Zipcode</p>
                    <p className="font-medium">{user?.fields?.Zipcode || "N/A"}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Username</p>
                    <p className="font-medium">{user?.fields?.Username}</p>
                  </div>
                </div>
                
                <Button variant="outline" className="mt-6 w-full">Edit Profile</Button>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card className="p-6 hover:shadow-md transition-shadow">
                <h2 className="font-medium text-lg mb-4">Order History</h2>
                
                {isLoading ? (
                  <p>Loading orders...</p>
                ) : orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border-b pb-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Order #{order.fields?.OrderID}</span>
                            <Badge variant="secondary" className="ml-2">Delivered</Badge>
                          </div>
                          <span className="text-sm text-gray-500">
                            {order.fields?.Date && formatDistanceToNow(new Date(order.fields.Date), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-sm">{order.fields?.Products}</p>
                        <div className="flex justify-between mt-2 text-sm">
                          <span>Total: ₹{order.fields?.TotalAmount?.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>You haven't placed any orders yet.</p>
                )}
                
                <Button className="mt-6 w-full bg-black hover:bg-black/80 text-white" onClick={() => navigate("/shop")}>
                  Continue Shopping
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
