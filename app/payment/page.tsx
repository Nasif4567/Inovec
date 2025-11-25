// pages/payment.js
'use client';
import { useState } from "react";

export default function PaymentPage() {
  const [form, setForm] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Processing payment...", form);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Secure Payment
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Name on Card
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300 placeholder-gray-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              name="number"
              placeholder="1234 5678 9012 3456"
              value={form.number}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300 placeholder-gray-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={form.expiry}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300 placeholder-gray-300"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">CVV</label>
              <input
                type="password"
                name="cvv"
                placeholder="•••"
                value={form.cvv}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300 placeholder-gray-300"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Pay Now
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Your payment information is encrypted and secure.
        </p>
      </div>
    </div>
  );
}