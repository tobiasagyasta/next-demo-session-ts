"use client";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/helpers";
import { useCartStore } from "@/store/cart.store";
import { toast } from "sonner";

type AddToCartButtonProps = {
  item: { name: string; price: number };
  quantity?: number;
  className?: string;
};

const AddToCartButton = ({
  item,
  quantity = 1,
  className,
}: AddToCartButtonProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleClick = () => {
    if (quantity <= 0) {
      toast.error("Quantity must be at least 1");
      return;
    }

    addItem(item, quantity);

    toast.success("Added to cart", {
      description: `${item.name} • qty +${quantity} • ${formatCurrency(
        item.price * quantity
      )}`,
    });
  };

  return (
    <Button type="button" onClick={handleClick} className={className}>
      Add to cart
    </Button>
  );
};

export default AddToCartButton;
