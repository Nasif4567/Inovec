// components/common/ProductCard.tsx
"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ProductCartButton from "./ProductCartButton";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
}) => {
  const safeImage =
  imageUrl && imageUrl.trim() !== ""
    ? imageUrl
    : "/public/resources/product-16.jpg";
  return (
    <motion.div
  className="card-hover bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.4 }}
>
  <Image
    src={safeImage}
    alt={name}
    width={500}
    height={300}
    unoptimized
    className="w-full h-48 object-contain p-2"
  />
  {/* This div will take the remaining space and push the bottom section down */}
  <div className="flex flex-col justify-end flex-1 p-6">
    <h3 className="font-display text-xl mb-2 bg-gradient-to-r from-[#2C2C2C] via-[#4B4B4B] to-[#6B6B6B] bg-clip-text text-transparent animate-gradient-shimmer">
      {name}
    </h3>
    <div className="flex justify-between items-center mt-auto">
      <span className="text-xl font-bold bg-gradient-to-r from-[#2C2C2C] via-[#4B4B4B] to-[#6B6B6B] bg-clip-text text-transparent animate-gradient-shimmer">
        {price} QAR
      </span>
      <div className="flex gap-2">
        <ProductCartButton label="Add to Cart" onClick={() => alert(`Added ${name} to cart!`)} />
        <Link
          href={`/product-details/${id}`}
          className="px-2 py-2 border-b border-gray-700 bg-transparent font-medium text-gray-800 hover:border-gray-900 hover:text-gray-900 transition-all duration-300"
        >
          View More
        </Link>
      </div>
    </div>
  </div>
</motion.div>

  );
};

export default ProductCard;
