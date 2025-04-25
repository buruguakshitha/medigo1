
import { Button } from "@/components/ui/button";
import { Video, ShoppingCart } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-16 bg-medigo-500 text-white">
      <div className="medigo-container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Experience Modern Healthcare?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of satisfied users who trust MediGo for their healthcare needs.
            Get started today and enjoy the convenience of digital healthcare.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-medigo-500 hover:bg-gray-100">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Order Medicines
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-medigo-600">
              <Video className="h-4 w-4 mr-2" />
              Consult Doctor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
