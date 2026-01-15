'use client'
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline"; // Make sure you have heroicons installed

interface CartItemProps {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  image: string;
  quantity: number;
  onRemove?: (id: string | number) => void;
  onQuantityChange?: (id: string | number, qty: number) => void;
}

export default function CartItem({
  id,
  name,
  description,
  price,
  image,
  quantity,
  onRemove,
  onQuantityChange,
}: CartItemProps) {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange?.(id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange?.(id, quantity + 1);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200 text-black w-full">
  
  {/* Product Image - Slightly smaller on mobile */}
  <div className="relative flex-shrink-0">
    <Image
      src={image}
      alt={name}
      width={90}
      height={90}
      className="rounded-lg object-cover w-20 h-20 sm:w-[90px] sm:h-[90px]"
    />
  </div>

  {/* Product Details - Expands to fill space */}
  <div className="flex flex-col flex-1 min-w-0"> {/* min-w-0 is critical here for truncation to work in flex */}
  <div className="flex justify-between items-start gap-2">
    <h1 className="text-base sm:text-lg font-medium text-black leading-tight line-clamp-2 sm:line-clamp-1">
      {name}
    </h1>
    
    {/* Remove Button Mobile */}
    <button
      onClick={() => onRemove?.(id)}
      className="text-red-500 hover:text-red-700 p-1 sm:hidden flex-shrink-0"
      aria-label="Remove item"
    >
      <TrashIcon className="h-5 w-5" />
    </button>
  </div>

    {description && (
      <p className="text-sm text-gray-600 line-clamp-2 mt-0.5">{description}</p>
    )}

    <span className="mt-2 font-semibold text-yellow-700">
      {price.toFixed(2)} QAR
    </span>
  </div>

  {/* Actions Wrapper - Moves to full width or side depending on screen */}
  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 gap-4">
    
    {/* Quantity Controls */}
    <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
      <button
        onClick={handleDecrease}
        className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:bg-white rounded-md transition-colors"
      >
        −
      </button>
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) =>
          onQuantityChange?.(id, Math.max(1, parseInt(e.target.value, 10) || 1))
        }
        className="w-10 bg-transparent text-center text-sm font-semibold focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        onClick={handleIncrease}
        className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:bg-white rounded-md transition-colors"
      >
        +
      </button>
    </div>

    {/* Remove Button - Desktop version */}
    <button
      onClick={() => onRemove?.(id)}
      className="hidden sm:flex items-center gap-1 text-sm text-red-600 hover:text-red-800 transition-colors"
      aria-label="Remove item"
    >
      <TrashIcon className="h-4 w-4" />
      <span>Remove</span>
    </button>
  </div>
</div>
  );
}
