import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MedicineCard from "@/components/medicines/MedicineCard";
import UploadPrescription from "@/components/medicines/UploadPrescription"; // updated here
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";

// Mock data
const medicines = [
  {
    id: "1",
    name: "Metformin 500mg",
    manufacturer: "Johnson & Johnson",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    isPrescriptionRequired: true,
    discount: 5,
    inStock: true,
    category: "diabetes"
  },
  {
    id: "2",
    name: "Lisinopril 10mg",
    manufacturer: "Pfizer",
    price: 15.49,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    isPrescriptionRequired: true,
    discount: 0,
    inStock: true,
    category: "heart"
  },
  {
    id: "3",
    name: "Acetaminophen 500mg",
    manufacturer: "GSK",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    isPrescriptionRequired: false,
    discount: 10,
    inStock: true,
    category: "pain"
  },
  {
    id: "4",
    name: "Amoxicillin 250mg",
    manufacturer: "Roche",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1603807008857-ad66b70431aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    isPrescriptionRequired: true,
    discount: 0,
    inStock: false,
    category: "antibiotics"
  },
  {
    id: "5",
    name: "Ibuprofen 200mg",
    manufacturer: "Bayer",
    price: 7.49,
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    isPrescriptionRequired: false,
    discount: 15,
    inStock: true,
    category: "pain"
  },
  {
    id: "6",
    name: "Loratadine 10mg",
    manufacturer: "Merck",
    price: 11.29,
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    isPrescriptionRequired: false,
    discount: 0,
    inStock: true,
    category: "allergy"
  },
];

export default function Medicines() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         medicine.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "prescription") return matchesSearch && medicine.isPrescriptionRequired;
    if (activeTab === "otc") return matchesSearch && !medicine.isPrescriptionRequired;
    
    return false;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="medigo-container py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Medicines</h1>
              <p className="text-gray-600 mt-1">
                Browse our extensive collection of prescription and over-the-counter medicines
              </p>
            </div>
            <div className="mt-4 md:mt-0 relative w-full md:w-auto">
              <Input
                type="search"
                placeholder="Search medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 w-full md:w-64"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left sidebar - Filters & UploadPrescription */}
            <div className="md:col-span-1 space-y-6">
              <UploadPrescription /> {/* <-- This is the new component */}

              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Filters</h3>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Reset All
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Categories</h4>
                    <div className="space-y-1">
                      {["Pain Relief", "Antibiotics", "Diabetes", "Heart", "Allergy"].map((category) => (
                        <div key={category} className="flex items-center">
                          <input 
                            type="checkbox" 
                            id={category} 
                            className="rounded border-gray-300 text-medigo-500 focus:ring-medigo-500"
                          />
                          <label htmlFor={category} className="ml-2 text-sm text-gray-600">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Brands</h4>
                    <div className="space-y-1">
                      {["Johnson & Johnson", "Pfizer", "GSK", "Bayer", "Merck"].map((brand) => (
                        <div key={brand} className="flex items-center">
                          <input 
                            type="checkbox" 
                            id={brand} 
                            className="rounded border-gray-300 text-medigo-500 focus:ring-medigo-500"
                          />
                          <label htmlFor={brand} className="ml-2 text-sm text-gray-600">
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Price Range</h4>
                    <div className="flex items-center space-x-2">
                      <Input type="number" placeholder="Min" className="w-full" />
                      <span>-</span>
                      <Input type="number" placeholder="Max" className="w-full" />
                    </div>
                  </div>

                  <Button className="w-full bg-medigo-500 hover:bg-medigo-600">
                    <Filter className="mr-2 h-4 w-4" />
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Right content - Medicine listings */}
            <div className="md:col-span-2">
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Medicines</TabsTrigger>
                  <TabsTrigger value="prescription">Prescription</TabsTrigger>
                  <TabsTrigger value="otc">Over-the-Counter</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                  {filteredMedicines.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredMedicines.map((medicine) => (
                        <MedicineCard key={medicine.id} {...medicine} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                      <p className="text-gray-500">No medicines found matching your search.</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="prescription" className="mt-0">
                  {filteredMedicines.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredMedicines.map((medicine) => (
                        <MedicineCard key={medicine.id} {...medicine} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                      <p className="text-gray-500">No prescription medicines found matching your search.</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="otc" className="mt-0">
                  {filteredMedicines.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredMedicines.map((medicine) => (
                        <MedicineCard key={medicine.id} {...medicine} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                      <p className="text-gray-500">No over-the-counter medicines found matching your search.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
