
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, Calendar, Video, MessageCircle } from "lucide-react";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-gradient-to-r from-medigo-50 to-white">
      <div className="medigo-container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Your Health, <span className="text-medigo-500">Delivered</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Order medicines, consult doctors online, book appointments, and get AI assistance
              for all your healthcare needs - all in one place.
            </p>

            <div className="mt-8 flex w-full max-w-md rounded-full border border-gray-300 bg-white px-4 shadow-sm focus-within:ring-2 focus-within:ring-medigo-500 focus-within:border-medigo-500">
              <input
                type="search"
                className="flex-1 border-0 bg-transparent py-3 px-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                placeholder="Search medicines, doctors, symptoms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="button"
                size="icon"
                className="bg-medigo-500 hover:bg-medigo-600 rounded-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button className="bg-medigo-500 hover:bg-medigo-600">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Order Medicines
              </Button>
              <Button variant="outline" className="border-medigo-500 text-medigo-500 hover:bg-medigo-50">
                <Video className="h-4 w-4 mr-2" />
                Consult Doctor
              </Button>
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-medigo-100 rounded-full opacity-70"></div>
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-medigo-200 rounded-full opacity-70"></div>
              <img
                src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80"
                alt="Healthcare Professionals"
                className="relative z-10 rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
