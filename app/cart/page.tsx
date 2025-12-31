"use client";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/cartStore";
import CartItem from "@/components/common/Cart"; // make sure your CartItem accepts onIncrease, onDecrease, onRemove

export default function CartPage() {
  const router = useRouter();

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

  return (
    <section
      className="min-h-screen py-40 px-6 md:px-20 bg-gray-50 flex flex-col items-center relative"
      data-header-theme="light"
    >
      <h1 className="text-2xl text-black text-center mb-10">
        Your Cart
      </h1>

      {/* Empty Cart */}
      {cart.length === 0 && (
        <div className="text-center mt-20">
          <img src="/empty-cart.png" alt="Empty Cart" className="w-56 mx-auto mb-6 opacity-80" />
          <h2 className="text-xl  mb-4">Your cart is empty</h2>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-yellow-400 text-black rounded-lg shadow hover:bg-yellow-500 transition"
          >
            Continue Shopping
          </button>
        </div>
      )}

      {/* Cart Items */}
      {cart.length > 0 && (
        <div className="space-y-6 w-full max-w-3xl mb-32">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              {...item}
              {...item}
             onQuantityChange={(id, qty) => handleUpdateQuantity(id as string, Number(qty))}
              onRemove={() => handleRemoveItem(item.id)}
            />
          ))}
        </div>
      )}

      {/* Sticky Bottom Summary */}
      {cart.length > 0 && (
        <div className="fixed text-black bottom-0 left-0 w-full bg-white shadow-xl border-t p-4 flex flex-col md:flex-row md:items-center md:justify-end gap-12">
          <div>
            <p className="text-lg font-semibold">Subtotal: QAR {subtotal.toFixed(2)}</p>
            <p className="text-lg mt-1">Tax: QAR {tax.toFixed(2)}</p>
            <p className="text-lg mt-1">Shipping: QAR {shipping.toFixed(2)}</p>
            <p className="text-xl font-bold mt-2">Total: QAR {total.toFixed(2)}</p>
          </div>

          <button
            onClick={() => router.push("/payment")}
            className="mt-4 md:mt-0 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </section>
  );
}
