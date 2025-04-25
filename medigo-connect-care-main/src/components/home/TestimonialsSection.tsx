
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Regular Customer",
    avatar: "SJ",
    content: "MediGo has revolutionized how I manage my healthcare. The medicine delivery is prompt, and the doctor consultations have saved me numerous trips to the clinic.",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "General Physician",
    avatar: "MC",
    content: "As a doctor on the MediGo platform, I can efficiently connect with patients and provide remote consultations. The interface is user-friendly for both doctors and patients.",
  },
  {
    id: 3,
    name: "Alex Rodriguez",
    role: "Pharmacy Partner",
    avatar: "AR",
    content: "Partnering with MediGo has significantly increased our reach. The prescription verification system is robust and ensures compliance with regulations.",
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="medigo-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800">
            What People Say About Us
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by thousands of users and healthcare professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-t-4 border-t-medigo-500 card-hover">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <Avatar className="h-12 w-12 border-2 border-medigo-100">
                    <AvatarFallback className="bg-medigo-100 text-medigo-700">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
