
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { getCustomers, getOrders } from "@/lib/airtable";
import { Users, Package, DollarSign, ShoppingBag } from "lucide-react";

const Admin = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalOrders: 0,
    totalSales: 0,
    totalProducts: 4, // Hardcoded for now
  });
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // Check if the user is an admin (username: admincontrol@5678)
    if (isAuthenticated && user?.fields?.Username === "admincontrol@5678") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    if (!isAdmin) {
      navigate("/profile");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch customers
        const customersResponse = await getCustomers();
        const customers = customersResponse.records || [];
        
        // Fetch orders
        const ordersResponse = await getOrders();
        const orders = ordersResponse.records || [];
        
        // Calculate total sales
        let totalSales = 0;
        orders.forEach(order => {
          if (order.fields?.TotalAmount) {
            totalSales += order.fields.TotalAmount;
          }
        });
        
        setStats({
          totalCustomers: customers.length,
          totalOrders: orders.length,
          totalSales,
          totalProducts: 4, // Hardcoded for now
        });
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, isAdmin, navigate]);

  if (!isAuthenticated || !isAdmin || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading admin dashboard...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container px-4 py-8">
          <h1 className="text-3xl font-medium mb-8">Admin Dashboard</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Customers
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalCustomers}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Orders
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Sales
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{stats.totalSales.toFixed(2)}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Products
                  </CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProducts}</div>
              </CardContent>
            </Card>
          </div>
          
          {/* Management Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Customer Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-500">View and manage customer information including contact details and order history.</p>
                <Button asChild>
                  <Link to="/admin/customers">Manage Customers</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-500">Track and manage orders, view order details, and update order status.</p>
                <Button asChild>
                  <Link to="/admin/orders">Manage Orders</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Product Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-500">Add, edit, or remove products from your store inventory.</p>
                <Button>Manage Products</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Store Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-500">Configure your store settings including shipping, taxes, and payment methods.</p>
                <Button>Manage Settings</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
