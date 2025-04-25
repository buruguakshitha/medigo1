
import { Link } from "react-router-dom";
import { MessageCircle, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-600">
      <div className="medigo-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img 
              src="/lovable-uploads/1e93bca0-843d-4dab-bc78-b1c8f60a8ebc.png" 
              alt="MediGo Logo" 
              className="h-10 mb-4" 
            />
            <p className="text-sm">Your Digital Pharmacy - Always On.</p>
            <p className="text-sm mt-4">
              MediGo provides 24/7 online medicine ordering, doctor consultations, 
              and healthcare assistance.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/medicines" className="text-sm hover:text-medigo-500">
                  Order Medicines
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-sm hover:text-medigo-500">
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="text-sm hover:text-medigo-500">
                  Book Appointments
                </Link>
              </li>
              <li>
                <Link to="/ai-assistant" className="text-sm hover:text-medigo-500">
                  AI Assistant
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm hover:text-medigo-500">
                  About MediGo
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm hover:text-medigo-500">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm hover:text-medigo-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-medigo-500">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-medigo-500" />
                <span className="text-sm">+1 (800) MEDIGO</span>
              </li>
              <li className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-2 text-medigo-500" />
                <span className="text-sm">support@medigo.com</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-medigo-500" />
                <span className="text-sm">123 Healthcare Blvd, Medical City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-sm">© {new Date().getFullYear()} MediGo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
