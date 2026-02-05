"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/helpers";
import { useCartStore } from "@/store/cart.store";

export function CartDialog() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalItems = useCartStore((state) => state.totalItems());
  const totalPrice = useCartStore((state) => state.totalPrice());

  const handleRemove = (name: string) => {
    removeItem(name);
    toast.success("Removed from cart");
  };

  const handleClear = () => {
    clearCart();
    toast.success("Cart cleared");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          <span className="sr-only">Open cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 rounded-full bg-primary px-1.5 text-[10px] font-semibold leading-5 text-primary-foreground">
              {totalItems}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Cart</DialogTitle>
        </DialogHeader>
        <Separator />

        {items.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            Your cart is empty
          </div>
        ) : (
          <ScrollArea className="max-h-72 pr-4">
            <div className="grid gap-4">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-start justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item.name, item.quantity - 1)
                      }
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-6 text-center text-sm">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item.name, item.quantity + 1)
                      }
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(item.name)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        <Separator />

        <div className="grid gap-2 text-sm">
          <div className="flex items-center justify-between">
            <span>Total items</span>
            <span>{totalItems}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Total price</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
        </div>

        {items.length === 0 ? (
          <Button disabled>Checkout</Button>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <Button variant="outline" onClick={handleClear}>
              Clear cart
            </Button>
            <Button asChild>
              <Link href="/checkout">Checkout</Link>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
