// components/common/ProductCard.tsx
"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ProductCartButton from "./ProductCartButton";
import Link from "next/link";

interface ProductCardProps {
  id: number;
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
  return (
    <motion.div
      className="card-hover bg-white rounded-lg shadow-lg overflow-hidden h-96"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Image
        src={imageUrl}
        alt={name}
        width={500}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold mb-2 bg-gradient-to-r from-[#2C2C2C] via-[#4B4B4B] to-[#6B6B6B] bg-clip-text text-transparent animate-gradient-shimmer">
          {name}
        </h3>
        <p className="mb-4 bg-gradient-to-r from-[#3A3A3A] via-[#5A5A5A] to-[#7A7A7A] bg-clip-text text-transparent animate-gradient-shimmer">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-[#2C2C2C] via-[#4B4B4B] to-[#6B6B6B] bg-clip-text text-transparent animate-gradient-shimmer">
            {price} QAR
          </span>
          <ProductCartButton label="Add to Cart" onClick={() => alert(`Added ${name} to cart!`)} />
          <Link
            href={`/product-details/${id}`}
            className="px-0 py-2 border-b-1 border-gray-700 bg-transparent font-medium text-gray-800 hover:border-gray-900 hover:text-gray-900 transition-all duration-300"
          >
            View More
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
