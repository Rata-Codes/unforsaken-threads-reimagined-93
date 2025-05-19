
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { Menu, X, ShoppingCart } from "lucide-react";
import AccountButton from "./AccountButton";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";

const NavbarExtended = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  // Update scrolled state on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu on location change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b",
        isScrolled
          ? "bg-white text-black py-3 border-black/10"
          : "bg-transparent text-white py-5 border-transparent"
      )}
    >
      <div className="container px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="z-50">
          <Logo 
            color={isScrolled || isMobileMenuOpen ? "#000000" : "#FFFFFF"} 
            animated={true}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link
            to="/"
            className={cn(
              "nav-link text-sm uppercase tracking-wide hover:opacity-70 transition-opacity",
              location.pathname === "/" && "font-bold"
            )}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={cn(
              "nav-link text-sm uppercase tracking-wide hover:opacity-70 transition-opacity",
              location.pathname === "/shop" && "font-bold"
            )}
          >
            Shop
          </Link>
          <Link
            to="/about"
            className={cn(
              "nav-link text-sm uppercase tracking-wide hover:opacity-70 transition-opacity",
              location.pathname === "/about" && "font-bold"
            )}
          >
            About
          </Link>
          
          {/* Account Icon */}
          <div className="flex items-center space-x-4">
            <AccountButton />
            
            {/* Cart Icon with Badge */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-black text-white rounded-full"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <AccountButton />
          
          {/* Cart Icon with Badge */}
          <Link to="/cart" className="relative">
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full"
              style={{
                color: isScrolled ? "black" : "white"
              }}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-black text-white rounded-full"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1"
            style={{
              color: isScrolled ? "black" : "white"
            }}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center text-black animate-fade-in">
            <nav className="flex flex-col items-center space-y-8">
              <Link
                to="/"
                className="text-xl uppercase tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-xl uppercase tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/about"
                className="text-xl uppercase tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/profile"
                className="text-xl uppercase tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/cart"
                className="text-xl uppercase tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cart
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavbarExtended;
