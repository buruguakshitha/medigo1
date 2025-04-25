
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  discount?: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const { toast } = useToast();

  const removeFromCart = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.discount 
        ? item.price - (item.price * item.discount / 100)
        : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-sm text-gray-500">Add medicines to your cart to see them here.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="medigo-container py-8">
          <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const discountedPrice = item.discount 
                    ? item.price - (item.price * item.discount / 100)
                    : item.price;

                  return (
                    <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="flex-grow">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="font-bold text-lg">
                            ${(discountedPrice * item.quantity).toFixed(2)}
                          </span>
                          {item.discount && (
                            <span className="text-sm text-gray-500 line-through">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          )}
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-auto text-red-500 hover:text-red-600"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>FREE</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-medigo-500 hover:bg-medigo-600">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
