'use client';

import { useState } from "react";
import Filter from "@/components/ui/Filter";
import ProductCard from "@/components/common/ProductCard";
import Pagination from "@/components/common/Pagination";
import Selector from "../../components/ui/SelectionBox";

export default function Page() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const products = [
    { id: 16, name: "Product 16", description: "High-quality premium engineered solution", price: 160, imageUrl: "/resources/product-16.jpg" },
    { id: 17, name: "Product 17", description: "High-quality premium engineered solution", price: 170, imageUrl: "/resources/product-17.jpg" },
    { id: 18, name: "Product 18", description: "High-quality premium engineered solution", price: 180, imageUrl: "/resources/product-18.jpg" },
    { id: 19, name: "Product 19", description: "High-quality premium engineered solution", price: 190, imageUrl: "/resources/product-19.jpg" },
  ];

  const itemsPerPage = 4; // adjust if you want more products per page
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col bg-gradient-to-b from-[#FFFAF0] via-[#FFF5E5] to-[#FFFDF8] items-center justify-center space-y-10 p-6 md:p-10 relative min-h-screen">
      {/* Subtle background blur for premium effect */}
      <div className="absolute inset-0 bg-white/10 blur-xl pointer-events-none"></div>

      {/* Banner */}
      <section data-header-theme="light"  className="w-full mt-24 bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFA500] rounded-2xl h-64 flex flex-col items-center justify-center text-center shadow-2xl px-6 md:px-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Our Products</h1>
        <p className="text-lg md:text-xl font-medium text-white max-w-3xl mb-6">
          Discover our comprehensive range of industrial lighting, HVAC controls, and automation solutions that empower your business with efficiency, innovation, and reliability.
        </p>
      </section>

      <div className="w-full flex justify-end">
        <Selector />
      </div>

      {/* Main Content: Filter + Products */}
      <section className="w-full flex flex-col md:flex-row gap-8">
        {/* Sidebar Filter */}
        <div className="md:w-1/4 w-full">
          <Filter />
        </div>

        {/* Product Grid + Pagination */}
        <div className="md:w-3/4 w-full flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                id={prod.id}
                name={prod.name}
                description={prod.description}
                price={prod.price}
                imageUrl={prod.imageUrl}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
