type ProductCartButtonProps = {
  label: string;
  onClick?: () => void;
};

export default function ProductCartButton({ label, onClick }: ProductCartButtonProps) {
  return (
    <div>
      <button
        onClick={onClick}
        className="px-0 py-2 border-b-1 border-gray-700 bg-transparent font-medium text-gray-800 hover:border-gray-900 hover:text-gray-900 transition-all duration-300 cursor-pointer"
      >
        {label}
      </button>
    </div>
  );
}
