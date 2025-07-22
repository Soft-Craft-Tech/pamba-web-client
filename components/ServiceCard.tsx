import Button from "@/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa";

const CartServiceCard: React.FC<{
  description: string;
  booking: boolean;
  href: string;
  price: number;
  service: string;
  duration: number;
  category?: string;
  businessData?: any;
  selected?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
  onSelected?: () => void;
}> = ({
  description,
  booking,
  href,
  price,
  service,
  duration,
  category,
  businessData,
  selected,
  onAdd,
  onRemove,
  onSelected,
}) => {
  const router = useRouter();

  const handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (selected && onRemove) {
      onRemove();
      onSelected?.();
    } else if (!selected && onAdd) {
      onAdd();
      onSelected?.();
    }
  };

  return (
    <div
      className={`w-full cursor-pointer`}
    >
      <Link href={href} className="block">
        <div
          className={`bg-white rounded-xl border transition-colors duration-150 px-6 py-4 ${
            selected
              ? "border-primary shadow-[0_0_0_2px_rgba(110,46,255,0.15)]"
              : "border-gray-200"
          } flex items-start justify-between`}
        >
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium mb-1 text-gray-900">
              {service}
            </h3>
            <p className="text-sm text-gray-500 mb-1">{duration} hrs</p>
            <p className="text-sm text-gray-600 mb-3 line-clamp-1">
              {description}
            </p>
            <p className="text-base font-medium text-gray-900">
              Ksh {price.toLocaleString()}
            </p>
          </div>
          {booking ? (
            <span
              onClick={handleIconClick}
              className={`w-9 h-9 flex items-center justify-center rounded-full border transition-colors duration-150 cursor-pointer hover:scale-105 ${
                selected
                  ? "bg-primary/10 border-primary text-primary hover:bg-primary/20"
                  : "bg-gray-100 border-gray-300 text-gray-400 hover:bg-gray-200"
              }`}
            >
              {selected ? <FaCheck size={20} /> : <FaPlus size={20} />}
            </span>
          ) : (
            <button
              className="h-9 flex items-center justify-center rounded-2xl border transition-colors duration-150 cursor-pointer hover:scale-105 bg-primary/10 border-primary text-primary hover:bg-primary/20 px-3"
              onClick={() => {
                onAdd?.();
                router.push(href);
              }}
            >
              Book
            </button>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CartServiceCard;
