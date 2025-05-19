import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageDefault: string;
  imageHover: string;
  discount?: number;
  category: string;
  stock: number;
}

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Minimal Heavyweight Hoodie",
    price: 65,
    originalPrice: 74,
    imageDefault: "/lovable-uploads/b9ef63f9-198a-44f4-9d09-475b2e17ac6c.png",
    imageHover: "/lovable-uploads/4e8347fd-85f2-4e6b-a943-d0a3da0b4f56.png",
    discount: 12,
    category: "hoodies",
    stock: 25
  },
  {
    id: "2",
    name: "Modern Oversized Tee",
    price: 42,
    originalPrice: 53,
    imageDefault: "/lovable-uploads/bddb910d-c3d0-45f1-9131-cfcbc4f56ec1.png",
    imageHover: "/lovable-uploads/4e8347fd-85f2-4e6b-a943-d0a3da0b4f56.png",
    discount: 21,
    category: "tees",
    stock: 42
  },
  {
    id: "3",
    name: "Iconic Washed Oversized Tee",
    price: 47,
    originalPrice: 57,
    imageDefault: "/lovable-uploads/e6888aba-7c47-4b1a-8b66-1ebca0b77420.png",
    imageHover: "/lovable-uploads/4e8347fd-85f2-4e6b-a943-d0a3da0b4f56.png",
    discount: 18,
    category: "tees",
    stock: 18
  },
  {
    id: "4",
    name: "Celestial 2.0 Heavyweight Tee",
    price: 45,
    originalPrice: 53,
    imageDefault: "/lovable-uploads/4e8347fd-85f2-4e6b-a943-d0a3da0b4f56.png",
    imageHover: "/lovable-uploads/4e8347fd-85f2-4e6b-a943-d0a3da0b4f56.png",
    discount: 15,
    category: "tees",
    stock: 35
  },
];

type AdminTab = 'dashboard' | 'products' | 'orders' | 'customers' | 'settings';

const Admin = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  
  // Mock data
  const salesData = {
    today: 1243,
    thisWeek: 8956,
    thisMonth: 34521,
    totalOrders: 142
  };
  
  const handleProductUpdate = (updatedProduct: Product) => {
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
    setEditProduct(null);
  };
  
  const handleProductDelete = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container px-4 py-8">
          <h1 className="text-3xl font-medium mb-8">Admin Dashboard</h1>
          
          {/* Admin Tabs */}
          <div className="flex border-b mb-6 overflow-x-auto">
            {(['dashboard', 'products', 'orders', 'customers', 'settings'] as AdminTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium capitalize ${
                  activeTab === tab 
                    ? 'border-b-2 border-black -mb-px' 
                    : 'text-muted-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Today's Sales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${salesData.today.toFixed(2)}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Weekly Sales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${salesData.thisWeek.toFixed(2)}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Monthly Sales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${salesData.thisMonth.toFixed(2)}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{salesData.totalOrders}</div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">Products</h2>
                <Button>Add New Product</Button>
              </div>
              
              <ScrollArea className="h-[600px] rounded-md border">
                <div className="p-4">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3">Product</th>
                        <th className="text-left py-3">Category</th>
                        <th className="text-left py-3">Price</th>
                        <th className="text-left py-3">Stock</th>
                        <th className="text-left py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id} className="border-b">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <img 
                                src={product.imageDefault} 
                                alt={product.name} 
                                className="w-10 h-10 object-cover bg-neutral-100" 
                              />
                              <span>{product.name}</span>
                            </div>
                          </td>
                          <td className="py-4 capitalize">{product.category}</td>
                          <td className="py-4">${product.price.toFixed(2)}</td>
                          <td className="py-4">{product.stock}</td>
                          <td className="py-4">
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setEditProduct(product)}
                              >
                                Edit
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleProductDelete(product.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ScrollArea>
              
              {/* Edit Product Modal - In a real app, this would be a proper modal */}
              {editProduct && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-md w-full max-w-md">
                    <h3 className="text-lg font-medium mb-4">Edit Product</h3>
                    
                    <form className="space-y-4" onSubmit={(e) => {
                      e.preventDefault();
                      if (editProduct) {
                        handleProductUpdate(editProduct);
                      }
                    }}>
                      <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input 
                          type="text" 
                          className="w-full border rounded-md p-2"
                          value={editProduct.name}
                          onChange={(e) => setEditProduct({...editProduct, name: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Price</label>
                        <input 
                          type="number" 
                          className="w-full border rounded-md p-2"
                          value={editProduct.price}
                          onChange={(e) => setEditProduct({...editProduct, price: parseFloat(e.target.value)})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Stock</label>
                        <input 
                          type="number" 
                          className="w-full border rounded-md p-2"
                          value={editProduct.stock}
                          onChange={(e) => setEditProduct({...editProduct, stock: parseInt(e.target.value)})}
                        />
                      </div>
                      
                      <div className="flex gap-3 justify-end">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setEditProduct(null)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Other tabs - can be expanded in future */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-medium mb-4">Orders</h2>
              <p className="text-muted-foreground">Order management will be implemented in the next phase.</p>
            </div>
          )}
          
          {activeTab === 'customers' && (
            <div>
              <h2 className="text-xl font-medium mb-4">Customers</h2>
              <p className="text-muted-foreground">Customer management will be implemented in the next phase.</p>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-medium mb-4">Settings</h2>
              <p className="text-muted-foreground">Store settings will be implemented in the next phase.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
