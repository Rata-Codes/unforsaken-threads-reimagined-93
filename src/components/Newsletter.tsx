
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate API call
    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter.",
    });
    
    setEmail("");
  };
  
  return (
    <section className="py-12 px-4">
      <div className="container max-w-2xl text-center">
        <h2 className="text-2xl font-medium mb-2">Stay Updated</h2>
        <p className="mb-6 text-muted-foreground">
          Subscribe to our newsletter for exclusive offers and updates on new releases.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
            required
          />
          <button 
            type="submit"
            className="px-6 py-3 bg-black text-white font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Subscribe
          </button>
        </form>
        
        <p className="mt-4 text-xs text-muted-foreground">
          By subscribing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
