
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, Calendar, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  image: string;
  fee: number;
  isOnline: boolean;
  nextAvailable?: string;
}

export default function DoctorCard({
  id,
  name,
  specialty,
  experience,
  rating,
  image,
  fee,
  isOnline,
  nextAvailable
}: DoctorCardProps) {
  const [isBooking, setIsBooking] = useState(false);

  const handleConsult = () => {
    setIsBooking(true);
    // Simulate API call
    setTimeout(() => {
      setIsBooking(false);
      // Redirect or open modal
      console.log(`Booking consultation with doctor ${id}`);
    }, 500);
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col card-hover">
      <div className="relative">
        <img
          src={image}
          alt={`Dr. ${name}`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="font-semibold text-lg text-white">Dr. {name}</h3>
          <p className="text-sm text-white/80">{specialty}</p>
        </div>
        {isOnline && (
          <Badge className="absolute top-2 right-2 bg-green-500">
            Online Now
          </Badge>
        )}
      </div>
      <CardContent className="py-4 flex-grow">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="font-medium">{rating}</span>
            <span className="text-gray-500 text-sm ml-1">({Math.floor(Math.random() * 500) + 50} reviews)</span>
          </div>
          <span className="text-gray-600 text-sm">{experience} yrs exp</span>
        </div>

        <div className="border-t border-b py-3 my-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Consultation Fee</span>
            <span className="font-bold">${fee}</span>
          </div>
          {nextAvailable && !isOnline && (
            <div className="flex justify-between items-center mt-1">
              <span className="text-gray-600">Next Available</span>
              <span className="text-sm">{nextAvailable}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex gap-2">
        {isOnline ? (
          <Button
            onClick={handleConsult}
            disabled={isBooking}
            className={cn("flex-1", "bg-medigo-500 hover:bg-medigo-600")}
          >
            {isBooking ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connecting...
              </span>
            ) : (
              <span className="flex items-center">
                <Video className="mr-2 h-4 w-4" />
                Consult Now
              </span>
            )}
          </Button>
        ) : (
          <Button
            variant="outline"
            className="flex-1 border-medigo-500 text-medigo-500 hover:bg-medigo-50"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Book Appointment
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
