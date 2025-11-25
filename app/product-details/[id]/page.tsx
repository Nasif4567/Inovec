'use client';

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const products = [
  { 
    id: 16, 
    name: "LLE FLEX G2 8 mm ADV", 
    description: "High‑efficacy 24 V LED strip, ideal for architectural lighting …", 
    price: 160, 
    imageUrls: [
      "/resources/led‑lle‑flex-g2‑1.jpg", 
      "/resources/led‑lle‑flex-g2‑2.jpg",
      "/resources/led‑lle‑flex-g2‑3.jpg"
    ],
    specs: {
      voltage: "24 V",
      lengthCut: "10 cm increments",
      lumen: "600 / 1,200 / 1,800 lm/m",
      life: "50,000 hours",
      guarantee: "5 years"
    }
  },
  // ... other products
];

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const productId = Number(params.id);
  const product = products.find(p => p.id === productId);

  const [mainImage, setMainImage] = useState<string | null>(
    product?.imageUrls[0] ?? null
  );

  if (!product) {
    return <div className="p-10 text-center text-xl font-semibold">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb / Back */}
      <div className="max-w-6xl mx-auto py-4 px-6">
        <button onClick={() => router.back()} className="text-blue-600 hover:underline">
          ← Back
        </button>
      </div>

      {/* Hero / Image + Title */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6 mt-16">
        <div className="flex flex-col">
          {/* Main Image */}
          <div className="w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-lg">
            <img
              src={mainImage!}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="mt-4 flex space-x-4">
            {product.imageUrls.map((url, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(url)}
                className={`w-20 h-20 border ${mainImage === url ? "border-blue-500" : "border-gray-300"} overflow-hidden rounded-md`}
              >
                <img src={url} alt={`${product.name} view ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{product.name}</h1>
            <p className="text-gray-700 ">{product.description}</p>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-2xl font-bold">${product.price}</span>
            </div>

            {/* Specification / Details */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-3">Specifications</h2>
              <ul className="space-y-2 text-gray-800">
                {Object.entries(product.specs).map(([label, value]) => (
                  <li key={label} className="flex">
                    <span className="w-32 font-medium">{label.charAt(0).toUpperCase() + label.slice(1)}:</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                Add to Cart
              </button>
              <button className="border border-gray-700 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                Request Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* More Details / Tabs Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">More Details</h2>
          {/* Here you can add accordion or tabs for specs, datasheet, download link */}
          <div>
            <button className="text-blue-600 hover:underline">Download Datasheet (PDF)</button>
          </div>
          <div className="mt-4">
            <p className="text-gray-700">
              {/* A longer technical description or installation guidance */}
              This module is a 24 V SELV, etc. It’s ideal for decorative lighting, has a 10 cm cut‑option, and is backed by a 5‑year guarantee…
            </p>
          </div>
        </div>
      </div>

      {/* Related Products / Accessories */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-semibold mb-6">Related Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Map related products here */}
          {/* Example: */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img src="/resources/other-led.jpg" alt="Other product" className="w-full h-40 object-cover rounded-md" />
            <h4 className="mt-4 font-bold">Other LED Module</h4>
            <button className="mt-2 text-blue-600 hover:underline">View</button>
          </div>
        </div>
      </div>
    </div>
  );
}
