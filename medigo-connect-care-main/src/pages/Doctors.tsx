
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DoctorCard from "@/components/doctors/DoctorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Search,
  Filter,
  MapPin,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data
const doctors = [
  {
    id: "1",
    name: "Sarah Johnson",
    specialty: "Cardiologist",
    experience: 12,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    fee: 75,
    isOnline: true,
    nextAvailable: "Today, 3:00 PM"
  },
  {
    id: "2",
    name: "Michael Chen",
    specialty: "Dermatologist",
    experience: 8,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    fee: 90,
    isOnline: false,
    nextAvailable: "Tomorrow, 10:00 AM"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    specialty: "Pediatrician",
    experience: 15,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    fee: 65,
    isOnline: true,
    nextAvailable: "Today, 5:30 PM"
  },
  {
    id: "4",
    name: "David Kim",
    specialty: "Orthopedic Surgeon",
    experience: 20,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    fee: 120,
    isOnline: false,
    nextAvailable: "Friday, 2:00 PM"
  },
  {
    id: "5",
    name: "Jennifer Lee",
    specialty: "Psychiatrist",
    experience: 10,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    fee: 95,
    isOnline: true,
    nextAvailable: "Today, 7:00 PM"
  },
  {
    id: "6",
    name: "Robert Wilson",
    specialty: "Neurologist",
    experience: 16,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    fee: 110,
    isOnline: false,
    nextAvailable: "Thursday, 11:30 AM"
  }
];

const specialties = [
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Orthopedic Surgeon",
  "Psychiatrist",
  "Neurologist",
  "General Physician",
  "ENT Specialist",
  "Gynecologist"
];

export default function Doctors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

  const handleSpecialtyToggle = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = selectedSpecialties.length === 0 || selectedSpecialties.includes(doctor.specialty);
    
    if (activeTab === "all") return matchesSearch && matchesSpecialty;
    if (activeTab === "online") return matchesSearch && matchesSpecialty && doctor.isOnline;
    if (activeTab === "offline") return matchesSearch && matchesSpecialty && !doctor.isOnline;
    
    return false;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="medigo-container py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Find Doctors</h1>
              <p className="text-gray-600 mt-1">
                Connect with online doctors instantly or book in-person appointments
              </p>
            </div>
            <div className="mt-4 md:mt-0 relative w-full md:w-auto">
              <Input
                type="search"
                placeholder="Search doctors, specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 w-full md:w-64"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          {/* Quick filter chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {specialties.slice(0, 6).map((specialty) => (
              <Badge
                key={specialty}
                variant={selectedSpecialties.includes(specialty) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleSpecialtyToggle(specialty)}
              >
                {specialty}
              </Badge>
            ))}
            <Badge variant="outline" className="cursor-pointer">
              + More
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Left sidebar - Filters */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Filters</h3>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Reset All
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Specialties</h4>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {specialties.map((specialty) => (
                        <div key={specialty} className="flex items-center">
                          <input 
                            type="checkbox" 
                            id={specialty}
                            checked={selectedSpecialties.includes(specialty)}
                            onChange={() => handleSpecialtyToggle(specialty)}
                            className="rounded border-gray-300 text-medigo-500 focus:ring-medigo-500"
                          />
                          <label htmlFor={specialty} className="ml-2 text-sm text-gray-600">
                            {specialty}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Consultation Type</h4>
                    <div className="space-y-1">
                      {["Video Consultation", "In-Person Visit", "Chat Consultation"].map((type) => (
                        <div key={type} className="flex items-center">
                          <input 
                            type="checkbox" 
                            id={type} 
                            className="rounded border-gray-300 text-medigo-500 focus:ring-medigo-500"
                          />
                          <label htmlFor={type} className="ml-2 text-sm text-gray-600">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Experience</h4>
                    <div className="space-y-1">
                      {["0-5 years", "5-10 years", "10+ years"].map((exp) => (
                        <div key={exp} className="flex items-center">
                          <input 
                            type="checkbox" 
                            id={exp} 
                            className="rounded border-gray-300 text-medigo-500 focus:ring-medigo-500"
                          />
                          <label htmlFor={exp} className="ml-2 text-sm text-gray-600">
                            {exp}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Fee Range</h4>
                    <div className="flex items-center space-x-2">
                      <Input type="number" placeholder="Min" className="w-full" />
                      <span>-</span>
                      <Input type="number" placeholder="Max" className="w-full" />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Location</h4>
                    <div className="relative">
                      <Input 
                        type="text" 
                        placeholder="Enter your location" 
                        className="pr-10 w-full" 
                      />
                      <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Availability</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Today", "Tomorrow", "This Week"].map((day) => (
                        <Button 
                          key={day}
                          variant="outline" 
                          size="sm"
                          className="text-xs"
                        >
                          {day}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-medigo-500 hover:bg-medigo-600">
                    <Filter className="mr-2 h-4 w-4" />
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Right content - Doctor listings */}
            <div className="md:col-span-3">
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Doctors</TabsTrigger>
                  <TabsTrigger value="online">Online Now</TabsTrigger>
                  <TabsTrigger value="offline">Book Appointment</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-0">
                  {filteredDoctors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                      {filteredDoctors.map((doctor) => (
                        <DoctorCard key={doctor.id} {...doctor} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                      <p className="text-gray-500">No doctors found matching your criteria.</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="online" className="mt-0">
                  {filteredDoctors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                      {filteredDoctors.map((doctor) => (
                        <DoctorCard key={doctor.id} {...doctor} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                      <p className="text-gray-500">No online doctors available at the moment.</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="offline" className="mt-0">
                  {filteredDoctors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                      {filteredDoctors.map((doctor) => (
                        <DoctorCard key={doctor.id} {...doctor} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                      <p className="text-gray-500">No doctors available for booking appointments.</p>
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
