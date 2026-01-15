"use client";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/cartStore";
import {useOrderStore} from "@/store/orderStore";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import CartItem from "@/components/common/Cart"; // make sure your CartItem accepts onIncrease, onDecrease, onRemove

export default function CartPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const cart = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleUpdateQuantity = (id: string | number, qty: number) => {
  updateQuantity(String(id), qty - cart.find((i) => i.id === id)!.quantity);
};

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  // Cart totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // example 10%
  const shipping = subtotal > 0 ? 9.99 : 0;
  const total = subtotal + tax + shipping;
  const setfullOrder = useOrderStore((state) => state.setFullOrder);
  
  const proceedToCheckout = () => {
    if (!session || !session.user) {
  router.push(`/login?callbackUrl=/cart`);
  return;
}

    const today = new Date().toISOString().split('T')[0];
    const lineItems = cart.map(item => ({
      item_id: item.id,
      name: item.name.length > 100 ? item.name.substring(0, 97) + "..." : item.name,
      rate: item.price,
      quantity: item.quantity,
      description: item.description || "",
    }));
    console.log("Session User Data:", session.user);
    setfullOrder({
      customer_id: session?.user?.zohoCusID,
      date: today,
      shipment_date: today,
      line_items: lineItems,
      billing_address: {
        address: session.user.address!,
        city: session.user.city!,
        zip: session.user.zip!,
        country: session.user.country!,
      },
      shipping_address: {
        address: session.user.address!,
        city: session.user.city!,
        zip: session.user.zip!,
        country: session.user.country!,
      },
      shipping_charge: shipping,
      total,
    });

    router.push("/payment");
  };

  return (
   <section
  className="min-h-screen py-20 px-4 sm:px-6 md:px-20 bg-gray-50 flex flex-col items-center relative"
  data-header-theme="light"
>
  <h1 className="text-2xl md:text-3xl font-bold text-black text-center mt-18 mb-8 md:mb-12">
    Your Cart
  </h1>

  {/* Empty Cart - Improved centering and sizing */}
  {cart.length === 0 && (
    <div className="flex flex-col items-center justify-center flex-grow text-center px-4">
      <ShoppingCartIcon className="w-32 h-32 md:w-56 md:h-56 text-gray-400 mx-auto mb-6" />
      <h2 className="text-xl font-medium text-black mb-6">Your cart is empty</h2>
      <button
        onClick={() => router.push("/")}
        className="w-full sm:w-auto px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition active:scale-95"
      >
        Continue Shopping
      </button>
    </div>
  )}

  {/* Cart Items - Adjusted max-width and bottom padding to clear the sticky bar */}
  {cart.length > 0 && (
    <div className="w-full max-w-4xl space-y-4 md:space-y-6 pb-48 md:pb-40">
      {cart.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          onQuantityChange={(id, qty) => handleUpdateQuantity(id as string, Number(qty))}
          onRemove={() => handleRemoveItem(item.id)}
        />
      ))}
    </div>
  )}

  {/* Sticky Bottom Summary - Mobile Optimized */}
  {cart.length > 0 && (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.1)] border-t border-gray-200 p-4 md:p-6 z-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Breakdown - Grid on mobile, flex on desktop */}
        <div className="grid grid-cols-2 md:flex md:gap-8 text-black">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase">Subtotal</span>
            <span className="font-semibold text-sm md:text-base">QAR {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase">Shipping</span>
            <span className="font-semibold text-sm md:text-base">QAR {shipping.toFixed(2)}</span>
          </div>
          <div className="flex flex-col col-span-2 mt-2 md:mt-0 pt-2 border-t md:border-t-0 border-gray-100">
            <span className="text-xs text-gray-500 uppercase font-bold">Total Amount</span>
            <span className="text-xl font-bold text-yellow-600">QAR {total.toFixed(2)}</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={proceedToCheckout}
          className="w-full md:w-auto px-10 py-4 bg-yellow-400 text-black font-bold rounded-xl shadow-lg hover:bg-yellow-500 transition-all transform active:scale-95"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )}
</section>
  );
}
