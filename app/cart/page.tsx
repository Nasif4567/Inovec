"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CartItem from "@/components/common/Cart";

export default function CartPage() {
  const router = useRouter();

  // Sample initial cart data
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Sample Product A",
      description: "Demo product description.",
      price: 49.99,
      image: "/resources/product-16.jpg",
      quantity: 1,
    },
    {
      id: 2,
      name: "Sample Product B",
      description: "Another demo product description.",
      price: 89.99,
      image: "/resources/product-16.jpg",
      quantity: 2,
    },
  ]);

  // Quantity controls
  const updateQuantity = (id, change) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
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
      <h1 className="text-xl font-bold text-black text-center">
        Your Cart
      </h1>

      {/* Empty Cart State */}
      {cart.length === 0 && (
        <div className="text-center mt-20">
          <img src="/empty-cart.png" alt="Empty Cart" className="w-56 mx-auto mb-6 opacity-80" />
          <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
          >
            Continue Shopping
          </button>
        </div>
      )}

      {/* Cart List */}
      <div className="space-y-6 w-full max-w-3xl">
        {cart.map((item) => (
          <div
            key={item.id}
            className="p-4 flex items-center "
          >
            <CartItem {...item} />
          </div>
        ))}
      </div>

      {/* Sticky Bottom Summary Bar */}
      {cart.length > 0 && (
        <div className="fixed text-black bottom-0 left-0 w-full bg-white shadow-xl border-t p-4 flex flex-col md:flex-row md:items-center md:justify-end gap-12">
          <div>
            <p className="text-lg font-semibold">Subtotal: QAR {subtotal.toFixed(2)}</p>
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
