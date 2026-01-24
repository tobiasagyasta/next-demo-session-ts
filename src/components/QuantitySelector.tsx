import { Minus, Plus } from "lucide-react";
import { calculateSubtotal, formatCurrency } from "@/lib/helpers";

type QuantitySelectorProps = {
  value: number;
  onChange: (value: number) => void;
  unitPrice?: number;
  min?: number;
  className?: string;
};

export default function QuantitySelector({
  value,
  onChange,
  unitPrice,
  min = 1,
  className = "",
}: QuantitySelectorProps) {
  const canDecrease = value > min;
  const total =
    typeof unitPrice === "number"
      ? calculateSubtotal(unitPrice, value)
      : null;

  function handleDecrease() {
    if (!canDecrease) return;
    onChange(Math.max(min, value - 1));
  }

  function handleIncrease() {
    onChange(value + 1);
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <button
        type="button"
        onClick={handleDecrease}
        disabled={!canDecrease}
        aria-label="Decrease quantity"
        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <span className="min-w-10 text-center text-sm font-medium text-gray-900">
        {value}
      </span>
      <button
        type="button"
        onClick={handleIncrease}
        aria-label="Increase quantity"
        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
      {total !== null && (
        <span className="text-sm text-gray-600">
          Total:{" "}
          <span className="font-semibold text-gray-900">
            {formatCurrency(total)}
          </span>
        </span>
      )}
    </div>
  );
}
