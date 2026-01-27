"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import QuantitySelector from "@/components/QuantitySelector";

type ProductDetailsActionsProps = {
  productId: string;
  unitPrice: number;
};

export default function ProductDetailsActions({
  productId,
  unitPrice,
}: ProductDetailsActionsProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <QuantitySelector
        value={quantity}
        min={1}
        unitPrice={unitPrice}
        onChange={(nextValue) => {
          setQuantity(Math.max(1, nextValue));
        }}
      />
      <button
        type="button"
        onClick={() => {
          router.push(`/checkout/${productId}?qty=${quantity}`);
        }}
        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
      >
        Checkout
      </button>
    </div>
  );
}
