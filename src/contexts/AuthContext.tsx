
import React, { createContext, useContext, useState, useEffect } from "react";
import { getCustomerByUsername, Customer } from "@/lib/airtable";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: Customer | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Derive isAuthenticated and isAdmin from user
  const isAuthenticated = !!user;
  const isAdmin = isAuthenticated && user?.fields?.Username === "admincontrol@5678";

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem("tbeUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("tbeUser");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Special case for admin
      if (username === "admincontrol@5678" && password === "admincontrol@5678") {
        const adminUser: Customer = {
          fields: {
            Username: "admincontrol@5678",
            Name: "Admin",
            CID: "admin"
          }
        };
        setUser(adminUser);
        localStorage.setItem("tbeUser", JSON.stringify(adminUser));
        toast({ 
          title: "Welcome Admin", 
          description: "You've successfully logged in as admin." 
        });
        return true;
      }

      // Regular user login
      const foundUser = await getCustomerByUsername(username);
      
      if (foundUser && foundUser.fields && foundUser.fields.Password === password) {
        setUser(foundUser);
        localStorage.setItem("tbeUser", JSON.stringify(foundUser));
        toast({ 
          title: "Welcome back", 
          description: "You've successfully logged in." 
        });
        return true;
      } else {
        toast({ 
          title: "Login failed", 
          description: "Invalid username or password.", 
          variant: "destructive" 
        });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({ 
        title: "Login error", 
        description: "An error occurred during login. Please try again.", 
        variant: "destructive" 
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("tbeUser");
    toast({ 
      title: "Logged out", 
      description: "You've been successfully logged out." 
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
