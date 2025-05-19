
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white bg-opacity-95 shadow-sm backdrop-blur-sm" : "bg-transparent"
    )}>
      <div className="container flex items-center justify-between h-16 px-4 md:px-8">
        {/* Mobile menu toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        {/* Logo */}
        <div className="flex-1 md:flex-initial flex justify-center md:justify-start">
          <Link to="/" className="inline-block">
            <Logo />
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink 
            to="/shop" 
            className={({ isActive }) => 
              cn("nav-link text-sm uppercase tracking-wider hover:text-primary/80", 
              isActive && "font-medium")
            }
          >
            Shop
          </NavLink>
          <NavLink 
            to="/best-sellers" 
            className={({ isActive }) => 
              cn("nav-link text-sm uppercase tracking-wider hover:text-primary/80", 
              isActive && "font-medium")
            }
          >
            Best Sellers
          </NavLink>
          <NavLink 
            to="/clearance" 
            className={({ isActive }) => 
              cn("nav-link text-sm uppercase tracking-wider hover:text-primary/80", 
              isActive && "font-medium")
            }
          >
            Clearance
          </NavLink>
          <NavLink 
            to="/ambassador" 
            className={({ isActive }) => 
              cn("nav-link text-sm uppercase tracking-wider hover:text-primary/80", 
              isActive && "font-medium")
            }
          >
            Ambassador Portal
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              cn("nav-link text-sm uppercase tracking-wider hover:text-primary/80", 
              isActive && "font-medium")
            }
          >
            About
          </NavLink>
        </nav>
        
        {/* Action icons */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t animate-fade-in">
          <nav className="flex flex-col py-4 px-6 space-y-4">
            <NavLink 
              to="/shop" 
              className={({ isActive }) => 
                cn("py-2 text-sm uppercase", isActive && "font-medium")
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </NavLink>
            <NavLink 
              to="/best-sellers" 
              className={({ isActive }) => 
                cn("py-2 text-sm uppercase", isActive && "font-medium")
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Best Sellers
            </NavLink>
            <NavLink 
              to="/clearance" 
              className={({ isActive }) => 
                cn("py-2 text-sm uppercase", isActive && "font-medium")
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Clearance
            </NavLink>
            <NavLink 
              to="/ambassador" 
              className={({ isActive }) => 
                cn("py-2 text-sm uppercase", isActive && "font-medium")
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Ambassador Portal
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                cn("py-2 text-sm uppercase", isActive && "font-medium")
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </NavLink>
            <Button variant="ghost" size="sm" className="flex justify-start px-0 py-2">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
