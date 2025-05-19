
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
import { getCustomers, Customer } from "@/lib/airtable";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft } from "lucide-react";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/admin");
      return;
    }

    const fetchCustomers = async () => {
      try {
        const response = await getCustomers();
        const customersData = response.records || [];
        setCustomers(customersData);
        setFilteredCustomers(customersData);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, [isAuthenticated, isAdmin, navigate]);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = customers.filter(customer => 
      customer.fields?.Name?.toLowerCase().includes(query) || 
      customer.fields?.Username?.toLowerCase().includes(query) ||
      customer.fields?.Phone?.includes(query)
    );
    setFilteredCustomers(filtered);
  }, [searchQuery, customers]);

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
            <h1 className="text-2xl font-medium">Customer Management</h1>
            
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search customers..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-[300px]"
              />
            </div>
          </div>
          
          {isLoading ? (
            <p>Loading customers...</p>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>CID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Orders</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>{customer.fields?.CID}</TableCell>
                        <TableCell>{customer.fields?.Name}</TableCell>
                        <TableCell>{customer.fields?.Username}</TableCell>
                        <TableCell>{customer.fields?.Phone}</TableCell>
                        <TableCell>{customer.fields?.Address}</TableCell>
                        <TableCell>{customer.fields?.OrderID}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        {searchQuery ? "No customers match your search." : "No customers found."}
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

export default CustomerManagement;
