'use client';
import React, { useState } from "react";
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-6xl px-4">

        {/* ===== Desktop (hover) ===== */}
        <div className="hidden md:flex justify-center gap-6">
          {categories.map((cat) => (
            <div key={cat.name} className="relative group">
              <button className="flex items-center gap-1 px-4 py-2 text-gray-800 hover:bg-yellow-50 rounded-lg transition font-medium">
                {cat.name}
                <ChevronDownIcon className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 transition" />
              </button>

              {cat.subcategories && (
                <div className="absolute text-black top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition z-50 p-2 flex gap-2">
                  {cat.subcategories.map((sub) => (
                    <span
                      key={sub}
                      className="px-3 py-1 rounded-lg hover:bg-yellow-100 cursor-pointer font-medium whitespace-nowrap"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ===== Mobile / Tablet (tap) ===== */}
        <div className="md:hidden flex flex-col gap-3">
          {categories.map((cat, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={cat.name} className="border rounded-xl bg-white shadow-sm">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-800 font-medium"
                >
                  {cat.name}
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${
                      isOpen ? "rotate-180 text-yellow-500" : "text-gray-400"
                    }`}
                  />
                </button>

                {isOpen && cat.subcategories && (
                  <div className="px-4 pb-3 flex flex-wrap gap-2">
                    {cat.subcategories.map((sub) => (
                      <span
                        key={sub}
                        className="px-3 py-1 bg-yellow-50 rounded-lg text-gray-800 font-medium"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
