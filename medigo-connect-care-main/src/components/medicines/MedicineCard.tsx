import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface MedicineCardProps {
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  image: string;
  isPrescriptionRequired: boolean;
  discount?: number;
  inStock: boolean;
}

export default function MedicineCard({
  id,
  name,
  manufacturer,
  price,
  image,
  isPrescriptionRequired,
  discount = 0,
  inStock
}: MedicineCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = () => {
    setIsAdding(true);

    // Get existing cart
    const existingCart = localStorage.getItem('cart');
    const cart = existingCart ? JSON.parse(existingCart) : [];

    // Check if item already exists in cart
    const existingItem = cart.find((item: any) => item.id === id);

    let newCart;
    if (existingItem) {
      // Update quantity if item exists
      newCart = cart.map((item: any) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // Add new item if it doesn't exist
      newCart = [...cart, {
        id,
        name,
        price,
        image,
        discount,
        quantity: 1
      }];
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(newCart));

    setTimeout(() => {
      setIsAdding(false);
      toast({
        title: "Added to cart",
        description: `${name} has been added to your cart.`,
      });
    }, 500);
  };

  const discountedPrice = price - (price * discount) / 100;

  return (
    <Card className="overflow-hidden h-full flex flex-col card-hover">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
        {isPrescriptionRequired && (
          <Badge variant="secondary" className="absolute top-2 right-2 bg-orange-100 text-orange-700 hover:bg-orange-200">
            Prescription Required
          </Badge>
        )}
        {discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-green-100 text-green-700 hover:bg-green-200">
            {discount}% OFF
          </Badge>
        )}
      </div>
      <CardContent className="py-4 flex-grow">
        <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">{manufacturer}</p>
        <div className="flex items-center mt-2">
          <span className="font-bold text-lg text-gray-900">
            ${discountedPrice.toFixed(2)}
          </span>
          {discount > 0 && (
            <span className="text-sm text-gray-500 line-through ml-2">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
        {!inStock && (
          <Badge variant="secondary" className="mt-2 bg-red-100 text-red-700 hover:bg-red-200">
            Out of Stock
          </Badge>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={!inStock || isAdding || isPrescriptionRequired}
          className="w-full bg-medigo-500 hover:bg-medigo-600"
        >
          {isAdding ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding...
            </span>
          ) : (
            <span className="flex items-center">
              <ShoppingCart className="mr-2 h-4 w-4" />
              {isPrescriptionRequired
                ? "Upload Prescription"
                : "Add to Cart"}
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
