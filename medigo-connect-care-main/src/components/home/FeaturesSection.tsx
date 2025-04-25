
import { 
  Clock, 
  Video, 
  Calendar, 
  MessageCircle, 
  ShoppingCart,
  Upload,
  User
} from "lucide-react";

const features = [
  {
    icon: <ShoppingCart className="h-8 w-8 text-medigo-500" />,
    title: "Medicine Delivery",
    description: "Order prescribed and over-the-counter medicines online with doorstep delivery within hours."
  },
  {
    icon: <Video className="h-8 w-8 text-medigo-500" />,
    title: "Instant Consultations",
    description: "Connect with doctors instantly via video calls for quick medical advice and prescriptions."
  },
  {
    icon: <Calendar className="h-8 w-8 text-medigo-500" />,
    title: "Book Appointments",
    description: "Schedule in-person appointments with top specialists in your area at convenient times."
  },
  {
    icon: <Upload className="h-8 w-8 text-medigo-500" />,
    title: "Prescription Upload",
    description: "Upload prescriptions securely for verification and quick medicine ordering."
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-medigo-500" />,
    title: "AI Health Assistant",
    description: "Get instant answers about symptoms, medicines, and alternatives from our AI assistant."
  },
  {
    icon: <Clock className="h-8 w-8 text-medigo-500" />,
    title: "24/7 Availability",
    description: "Access healthcare services anytime, day or night, for all your medical needs."
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="medigo-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800">
            Healthcare Made Simple
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of healthcare with our comprehensive digital solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm card-hover"
            >
              <div className="bg-medigo-50 p-3 rounded-lg inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
