
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  MessageCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <nav className="medigo-container flex items-center justify-between py-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/1e93bca0-843d-4dab-bc78-b1c8f60a8ebc.png" 
              alt="MediGo Logo" 
              className="h-10" 
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/medicines" className="text-gray-700 hover:text-medigo-500 font-medium">
            Medicines
          </Link>
          <Link to="/doctors" className="text-gray-700 hover:text-medigo-500 font-medium">
            Consult Doctor
          </Link>
          <Link to="/appointments" className="text-gray-700 hover:text-medigo-500 font-medium">
            Book Appointment
          </Link>
          <Link to="/ai-assistant" className="text-gray-700 hover:text-medigo-500 font-medium">
            AI Assistant
          </Link>
        </div>

        {/* Right Navigation Items */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Link to="/cart">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 top-[65px] z-50 bg-white md:hidden transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="medigo-container py-4 flex flex-col space-y-4">
          <Link to="/medicines" className="text-lg font-medium p-2">
            Medicines
          </Link>
          <Link to="/doctors" className="text-lg font-medium p-2">
            Consult Doctor
          </Link>
          <Link to="/appointments" className="text-lg font-medium p-2">
            Book Appointment
          </Link>
          <Link to="/ai-assistant" className="text-lg font-medium p-2">
            AI Assistant
          </Link>
          <div className="flex items-center justify-around pt-4 border-t">
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                <span className="ml-2">Cart</span>
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="ml-2">Account</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
