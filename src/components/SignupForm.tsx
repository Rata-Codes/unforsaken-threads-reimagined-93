
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { createCustomer, getCustomerByUsername } from "@/lib/airtable";
import { useAuth } from "@/contexts/AuthContext";

const SignupForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    username: "",
    password: "",
    confirmPassword: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Check if username already exists
      const existingUser = await getCustomerByUsername(formData.username);
      
      if (existingUser) {
        toast({
          title: "Username already exists",
          description: "Please choose another username",
          variant: "destructive"
        });
        return;
      }
      
      // Create new customer
      await createCustomer({
        fields: {
          Name: formData.name,
          Phone: formData.phone,
          Address: formData.address,
          Username: formData.username,
          Password: formData.password,
          OrderID: "" // Empty string for initial order IDs
        }
      });
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully!"
      });
      
      // Auto login after signup
      await login(formData.username, formData.password);
      
      // Call onSuccess callback
      onSuccess();
      
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Error creating account",
        description: "An error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input 
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input 
          id="phone"
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <Label htmlFor="address">Address</Label>
        <Input 
          id="address"
          name="address"
          required
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <Label htmlFor="username">Username</Label>
        <Input 
          id="username"
          name="username"
          required
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <Label htmlFor="password">Password</Label>
        <Input 
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input 
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignupForm;
