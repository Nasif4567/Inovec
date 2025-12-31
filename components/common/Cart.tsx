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
    <div className="flex min-w-2xl items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200 text-black">
      
      {/* Product Image */}
      <Image
        src={image}
        alt={"Product Image"}
        width={90}
        height={90}
        className="rounded-lg object-cover"
      />

      {/* Product Details */}
      <div className="flex flex-col flex-1 text-black">
        <h1 className="text-lg">{name}</h1>

        {description && (
          <p className="text-sm text-black opacity-80">{description}</p>
        )}

        <span className="mt-1 text-black">
          {price.toFixed(2)} QAR
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-end gap-2">

        {/* Remove Button with Trash Icon */}
        <button
          onClick={() => onRemove?.(id)}
          className="text-red-600 hover:text-red-800"
          aria-label="Remove item"
        >
          <TrashIcon className="h-5 w-5" />
        </button>

        {/* Quantity Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleDecrease}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100"
          >
            -
          </button>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) =>
              onQuantityChange?.(id, Math.max(1, parseInt(e.target.value, 10)))
            }
            className="w-16 border border-gray-300 rounded-md px-2 py-1 text-center text-black"
          />
          <button
            onClick={handleIncrease}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
