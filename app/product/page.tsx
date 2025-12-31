'use client';
import { useState, useEffect } from "react";
import Filter from "@/components/ui/Filter";
import ProductCard from "@/components/common/ProductCard";
import Pagination from "@/components/common/Pagination";
import Selector from "../../components/ui/SelectionBox";
import { ClipLoader } from "react-spinners";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<
    { id: string; name: string; description: string; price: number; imageUrl: string }[]
  >([]);

  const itemsPerPage = 9;

  const [filters, setFilters] = useState<{
    search: string;
    categories: string[];
  }>({
    search: "",
    categories: [],
  });

  // Load all items initially
  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/inventory/items");
        const data = await res.json();
        

        setProducts(
        Array.isArray(data.items)
          ? data.items.map((item: any) => ({
              id: item.item_id,
              name: item.item_name,
              description: item.description || "No description available.",
              price: item.rate || 0,
              imageUrl: `/api/inventory/images/${item.item_id}`,
            }))
          : []
      );
        
      } catch (err) {
        console.error("Error loading items:", err);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  // Filter API handler
  useEffect(() => {
  const applyFilter = async () => {
    try {
      setLoading(true); // Start loading
      const res = await fetch("/api/inventory/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });

      const data = await res.json();
      setProducts(
        Array.isArray(data.items)
          ? data.items.map((item: any) => ({
              id: item.item_id,
              name: item.item_name,
              description: item.description || "No description available.",
              price: item.rate || 0,
              imageUrl: `/api/inventory/images/${item.item_id}`,
            }))
          : []
      );
    } catch (err) {
      console.error("Error applying filters:", err);
    } finally {
      setLoading(false); // End loading
    }
  };

  const timer = setTimeout(() => applyFilter(), 500);
  return () => clearTimeout(timer);
}, [filters]);


  const totalPages = Math.ceil(products.length / itemsPerPage);

  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col bg-gradient-to-b from-[#FFFAF0] via-[#FFF5E5] to-[#FFFDF8] items-center justify-center space-y-10 p-6 md:p-10 relative min-h-screen">
      {/* Background blur */}
      <div className="absolute inset-0 bg-white/10 blur-xl pointer-events-none"></div>

      {/* Banner */}
      <section
        data-header-theme="light"
        className="w-full mt-24 animate-gradient-shimmer bg-gradient-to-r from-[#5a3f37] via-[#8c6239] to-[#c89142] rounded-2xl h-64 flex flex-col items-center justify-center text-center shadow-2xl px-6 md:px-12"
      >
        <h1 className="text-4xl md:text-5xl text-white mb-4">
          Our Products
        </h1>
        <p className="text-lg md:text-xl font-medium text-white max-w-3xl mb-6">
          Discover our comprehensive range of advanced industrial monitoring, sensors,
          automation, and control solutions tailored for high-performance environments.
        </p>
      </section>

      <div className="w-full flex justify-end">
        <Selector />
      </div>

      {/* Main Content */}
      <section className="w-full flex flex-col md:flex-row gap-8">
        {/* Sidebar Filter */}
        <div className="md:w-1/4 w-full">
          <Filter onFilterChange={(filters) => setFilters(filters)} />
        </div>

        {/* Product Grid + Pagination */}
        {/* Product Grid Area */}
<div className="md:w-3/4 w-full flex flex-col">

  {loading ? (
    /* 1. SHOW ONLY LOADER WHILE FETCHING */
    <div className="flex flex-col items-center justify-center py-28">
      <ClipLoader size={60} color="#FFA500" />
      <p className="mt-4 text-lg font-semibold text-gray-700">Loading products...</p>
    </div>
  ) : products.length === 0 ? (
    /* 2. SHOW "NOT FOUND" ONLY IF LOADING IS FINISHED AND ARRAY IS EMPTY */
    <div className="w-full text-center py-20 text-xl font-semibold text-gray-600">
      No products found
    </div>
  ) : (
    /* 3. SHOW ACTUAL PRODUCTS */
    <>
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
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  )}
</div>
      </section>
    </div>
  );
}
