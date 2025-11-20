'use client';
import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface Category {
  name: string;
  subcategories?: string[];
}

const categories: Category[] = [
  { name: "Lighting", subcategories: ["Industrial", "Emergency", "Architectural"] },
  { name: "HVAC", subcategories: ["Air Conditioning", "Heating", "Ventilation"] },
  { name: "Automation", subcategories: ["BMS", "Smart Controls", "Sensors"] },
  { name: "Filtration", subcategories: ["Air Filters", "Dust Filters", "Water Filters"] },
];

export default function ProductCategories() {
  return (
    <div className="flex justify-center w-full">
      <div className="flex gap-6">
        {categories.map((cat) => (
          <div key={cat.name} className="relative group">
            {/* Category Button */}
            <button
              className="flex items-center gap-1 px-4 py-2 text-gray-800 hover:bg-yellow-50 rounded-lg transition-all duration-200 font-medium"
            >
              <span>{cat.name}</span>
              <ChevronDownIcon className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 transition-all duration-200" />
            </button>

            {/* Subcategories Box on Hover */}
            {cat.subcategories && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-max bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 z-50 p-2 flex gap-2">
                {cat.subcategories.map((sub) => (
                  <span
                    key={sub}
                    className="px-3 py-1 whitespace-nowrap text-gray-800 rounded-lg font-medium hover:bg-yellow-100 cursor-pointer transition-all duration-200"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
