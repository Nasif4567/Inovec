'use client';
import { useState } from "react";
const categories = [
  { id: "leak", label: "Leak Detection" },
  { id: "lighting", label: "Emergency Lighting" },
  { id: "hvac", label: "HVAC" },
  { id: "automation", label: "Lightning" },
  { id: "controls", label: "Explosion Proof" },
  { id: "filtration", label: "BMS and Automation" },
];

export default function Filter({ onFilterChange }: { 
  onFilterChange: (filters: { search: string; categories: string[] }) => void; 
}) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleCategory = (id: string) => {
    const updated = selectedCategories.includes(id)
      ? selectedCategories.filter((c) => c !== id)
      : [...selectedCategories, id];

    setSelectedCategories(updated);
    onFilterChange({ search: searchTerm, categories: updated });
  };

  const updateSearch = (value: string) => {
    setSearchTerm(value);
    onFilterChange({ search: value, categories: selectedCategories });
  };

  return (
    <aside className="bg-white rounded-2xl shadow-xl p-6 w-full md:w-80 space-y-6">
      {/* Search Section */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">Search Products</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => updateSearch(e.target.value)}
          className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm"
        />
      </section>

      {/* Categories Section */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">Filter by Category</h2>
        <div className="flex flex-col space-y-2">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-all ${
                selectedCategories.includes(cat.id)
                  ? "bg-yellow-100 border border-yellow-400"
                  : "hover:bg-gray-100"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => toggleCategory(cat.id)}
                className="h-5 w-5 text-yellow-500 accent-yellow-500 rounded"
              />
              <span className="text-gray-700 font-medium">{cat.label}</span>
            </label>
          ))}
        </div>
      </section>
    </aside>
  );
}
