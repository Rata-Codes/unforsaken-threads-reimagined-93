
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { getOrders, Order } from "@/lib/airtable";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronLeft } from "lucide-react";

const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/admin");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        const ordersData = response.records || [];
        setOrders(ordersData);
        setFilteredOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, isAdmin, navigate]);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = orders.filter(order => 
      order.fields?.OrderID?.toLowerCase().includes(query) || 
      order.fields?.CID?.toLowerCase().includes(query) ||
      order.fields?.Products?.toLowerCase().includes(query)
    );
    setFilteredOrders(filtered);
  }, [searchQuery, orders]);

  if (!isAuthenticated || !isAdmin) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container px-4 py-8">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" /> Back to Dashboard
            </Button>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-medium">Order Management</h1>
            
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search orders..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-[300px]"
              />
            </div>
          </div>
          
          {isLoading ? (
            <p>Loading orders...</p>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Customer ID</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <Badge variant="outline">{order.fields?.OrderID}</Badge>
                        </TableCell>
                        <TableCell className="max-w-[300px] truncate">
                          {order.fields?.Products}
                        </TableCell>
                        <TableCell>₹{Number(order.fields?.TotalAmount).toFixed(2)}</TableCell>
                        <TableCell>{order.fields?.CID}</TableCell>
                        <TableCell>
                          {order.fields?.Date} {order.fields?.Time}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        {searchQuery ? "No orders match your search." : "No orders found."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderManagement;
