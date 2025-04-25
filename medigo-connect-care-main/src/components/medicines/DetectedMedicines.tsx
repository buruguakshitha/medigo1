
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";

interface Medicine {
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  image: string;
  isPrescriptionRequired: boolean;
  discount: number;
  inStock: boolean;
}

interface DetectedMedicinesProps {
  isOpen: boolean;
  onClose: () => void;
  detectedMedicines: Medicine[];
}

export default function DetectedMedicines({
  isOpen,
  onClose,
  detectedMedicines,
}: DetectedMedicinesProps) {
  const { toast } = useToast();

  const handleAddToCart = (medicine: Medicine) => {
    const existingCart = localStorage.getItem('cart');
    const cart = existingCart ? JSON.parse(existingCart) : [];

    const existingItem = cart.find((item: any) => item.id === medicine.id);
    let newCart;

    if (existingItem) {
      newCart = cart.map((item: any) =>
        item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cart, {
        id: medicine.id,
        name: medicine.name,
        price: medicine.price,
        image: medicine.image,
        discount: medicine.discount,
        quantity: 1
      }];
    }

    localStorage.setItem('cart', JSON.stringify(newCart));
    toast({
      title: "Added to cart",
      description: `${medicine.name} has been added to your cart.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detected Medicines from Prescription</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {detectedMedicines.length === 0 ? (
            <p className="text-center text-gray-500">
              No medicines were detected in the prescription.
            </p>
          ) : (
            <div className="grid gap-4">
              {detectedMedicines.map((medicine) => (
                <div
                  key={medicine.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={medicine.image}
                      alt={medicine.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-medium">{medicine.name}</h4>
                      <p className="text-sm text-gray-500">
                        {medicine.manufacturer}
                      </p>
                      <p className="text-sm font-medium">
                        ${medicine.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleAddToCart(medicine)}
                    className="bg-medigo-500 hover:bg-medigo-600"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
