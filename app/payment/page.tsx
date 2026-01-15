'use client';
import { useState, useEffect } from "react";
import { useOrderStore } from "@/store/orderStore"; 
import useCartStore from "@/store/cartStore";
import Link from "next/link"; // For navigation

export default function PaymentPage() {
  const orderData = useOrderStore((state) => state.order);
  const clearOrder = useOrderStore((state) => state.clearOrder);
  const clearCart = useCartStore((state) => state.clearCart);

  const [loading, setLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // New Success State
  
  const [form, setForm] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const finalPayload = {
        payment_token: "dummy_token_123", 
        zoho_order_details: orderData,
      };

      const response = await fetch("/api/inventory/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload),
      });

      const result = await response.json();

      if (response.ok) {
        // Handle Success
        setIsSuccess(true);
        clearCart();  
        clearOrder(); 
      } else {
        const errorDetail = result.details?.message || result.error || "Failed to create order.";
        setErrorMessage(errorDetail);
      }
    } catch (err) {
      setErrorMessage("Network error. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  if (!isHydrated) return null;

  // 1. SUCCESS VIEW
  if (isSuccess) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Placed!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been successfully recieved.
          </p>
          <Link 
            href="/product" 
            className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md active:scale-95"
          >
            Back to Browsing
          </Link>
        </div>
      </div>
    );
  }

  // 2. PAYMENT FORM VIEW (Logic for totals)
  const itemsTotal = orderData.line_items?.reduce((acc, item) => acc + (item.item_total || 0), 0) || 0;
  const grandTotal = itemsTotal + (orderData.shipping_charge || 0);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md mt-12">
        <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">Secure Payment</h2>
        
        <p className="text-center text-blue-600 font-bold mb-6">
          Amount to Pay: QAR {grandTotal.toFixed(2)}
        </p>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
            <p className="font-bold">Zoho API Error:</p>
            <p>{errorMessage}</p>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* ... Card inputs remain the same ... */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Name on Card</label>
            <input
              type="text"
              name="name"
              required
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-300 outline-none transition-all"
            />
          </div>
          
          <div>
            <label className="block mb-1 font-medium text-gray-700">Card Number</label>
            <input
              type="text"
              name="number"
              required
              placeholder="1234 5678 9012 3456"
              value={form.number}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-300 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Expiry</label>
              <input
                type="text"
                name="expiry"
                required
                placeholder="MM/YY"
                value={form.expiry}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-300 outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">CVV</label>
              <input
                type="password"
                name="cvv"
                required
                placeholder="•••"
                value={form.cvv}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-300 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-lg font-semibold text-white transition-all shadow-md ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
            }`}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-6 uppercase tracking-widest">
          🔒 SSL Encrypted Payment
        </p>
      </div>
    </div>
  );
}