
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  removeFromCart: (id: string, size: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("tbeCart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(parsedCart);
        // Calculate initial cart count and total
        calculateCartCountAndTotal(parsedCart);
      } catch (error) {
        console.error("Failed to parse stored cart:", error);
        localStorage.removeItem("tbeCart");
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("tbeCart", JSON.stringify(cartItems));
    // Update cart count and total whenever items change
    calculateCartCountAndTotal(cartItems);
  }, [cartItems]);
  
  // Helper function to calculate cart count and total
  const calculateCartCountAndTotal = (items: CartItem[]) => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    const total = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    setCartCount(count);
    setCartTotal(total);
  };
  
  const addToCart = (newItem: CartItem) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === newItem.id && item.size === newItem.size
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        
        toast({
          title: "Cart updated",
          description: `₹${newItem.name} (${newItem.size}) quantity updated in cart.`
        });
        
        return updatedItems;
      } else {
        // Add new item
        toast({
          title: "Added to cart",
          description: `${newItem.name} (${newItem.size}) added to cart.`
        });
        
        return [...prevItems, newItem];
      }
    });
  };
  
  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        (item.id === id && item.size === size) ? { ...item, quantity } : item
      )
    );
  };
  
  const removeFromCart = (id: string, size: string) => {
    setCartItems(prevItems => 
      prevItems.filter(item => !(item.id === id && item.size === size))
    );
    
    toast({
      title: "Item removed",
      description: "Item removed from cart."
    });
  };
  
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("tbeCart");
  };
  
  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        updateQuantity, 
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
