"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import useCartStore from "@/store/cartStore";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  specs?: Record<string, string>;
}

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetch(`/api/inventory/itemDetails/${id}`);
        const data = await res.json();
        console.log("Product API data:", data.item);


        if (!data?.item) {
          setLoading(false);
          return;
        }

        const mapped: Product = {
          id: data.item.item_id,
          name: data.item.name,
          description: data.item.description || "No description available.",
          price: data.item.rate || 0,
          imageUrls:
            data.item.images?.length > 0
              ? data.item.images
              : [`/api/inventory/images/${data.item.item_id}`],
          specs: {
            type: data.item.product_type || "N/A",
            sku: data.item.sku || "N/A",
            manufacturer: data.item.manufacturer || "N/A",
          },
        };

        setProduct(mapped);
        console.log("Loaded items:", mapped);
        setMainImage(mapped.imageUrls[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  return (
    <div className="min-h-screen bg-white">
      {/* Back */}
      <div className="max-w-6xl mx-auto py-4 px-6">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:underline"
        >
          ← Back
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-28">
          <ClipLoader size={60} />
          <p className="mt-4 text-lg font-semibold">Loading product…</p>
        </div>
      )}

      {/* Not Found State (INSIDE the layout) */}
      {!loading && !product && (
        <div className="flex flex-col items-center justify-center py-28">
          <p className="text-2xl font-bold">Product not found</p>
        </div>
      )}

      {/* Main Content */}
      {!loading && product && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 mt-24">

          {/* LEFT — Image Viewer */}
          <div className="flex flex-col">
            <div className="relative w-full h-[420px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl bg-white border">
              <Image
                src={mainImage!}
                alt={product.name}
                width={500}
                height={300}
                unoptimized
                className="mt-25 w-full h-48 object-contain p-2"
              />
            </div>

            {/* Thumbnails */}
            <div className="mt-4 flex space-x-3 overflow-x-auto">
              {product.imageUrls.map((url, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(url)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border ${
                    mainImage === url ? "border-blue-600" : "border-gray-300"
                  }`}
                >
                  <img src={url} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — Product Info */}
          <div className="flex flex-col space-y-6">
            <h1 className="text-4xl text-black">{product.name}</h1>
            <p className="text-gray-700">{product.description}</p>

            <span className="text-3xl text-black">
              QAR {product.price}
            </span>

            <div className="bg-white">
              <h2 className="text-xl font-semibold mb-4 text-black">
                Specifications
              </h2>
              <ul className="space-y-2 text-gray-800">
                {Object.entries(product.specs || {}).map(([key, value]) => (
                  <li key={key} className="flex text-sm md:text-base">
                    <span className="w-32 capitalize font-medium">{key}:</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button
              className="bg-yellow-400 text-white px-6 py-3 rounded-lg hover:bg-yellow-600"
              onClick={() => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.imageUrls[0], // pick the main image
      });
    }
  }}
            >
            Add to Cart
            </button>
              <button className="border border-gray-600 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100">
                Request Quote
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Additional Section */}
      {!loading && product && (
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-2xl font-bold mb-4 text-black">More Details</h2>

            <button className="text-blue-600 hover:underline">
              Download Datasheet (PDF)
            </button>

            <p className="text-gray-700 mt-4">
              More technical details, installation notes, or extended
              specifications can go here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
