
import { CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Search for Medicines or Doctors",
    description: "Browse our extensive catalog of medicines or find doctors by specialization, location, or availability.",
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    number: "02",
    title: "Upload Prescription or Book Consultation",
    description: "Upload your prescription for verification or schedule a consultation with a doctor of your choice.",
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    number: "03",
    title: "Pay Securely and Wait for Delivery",
    description: "Make a secure payment for your medicines or consultation and wait for the delivery or appointment time.",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="medigo-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800">
            How MediGo Works
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Get medicines delivered and consult with doctors in just a few simple steps
          </p>
        </div>

        <div className="space-y-20">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8`}
            >
              <div className="md:w-1/2">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <span className="inline-block bg-medigo-100 text-medigo-700 font-bold text-lg px-4 py-1 rounded-full mb-4">
                  Step {step.number}
                </span>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  {step.description}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-medigo-500 mr-2" />
                    <span className="text-gray-700">{index === 0 ? "Easy search filters" : index === 1 ? "Secure prescription handling" : "Multiple payment options"}</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-medigo-500 mr-2" />
                    <span className="text-gray-700">{index === 0 ? "Real-time availability" : index === 1 ? "Quick verification" : "Order tracking"}</span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
