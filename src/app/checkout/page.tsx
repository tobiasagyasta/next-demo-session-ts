"use client";

import Header from "@/components/Header";
import CheckoutForm from "@/components/CheckoutForm";
import {
  calculateOrderTotal,
  calculateSubtotal,
  calculateTax,
  formatCurrency,
  TAX_RATE,
  SHIPPING_COST,
} from "@/lib/helpers";
import { useCartStore } from "@/store/cart.store";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const subtotal = items.reduce(
    (total, item) => total + calculateSubtotal(item.price, item.quantity),
    0,
  );
  const tax = calculateTax(subtotal, TAX_RATE);
  const shipping = items.length > 0 ? SHIPPING_COST : 0;
  const total = calculateOrderTotal(subtotal, shipping, tax);
  const unitPrice = totalItems > 0 ? subtotal / totalItems : 0;
  const hasItems = items.length > 0;

  return (
    <>
      <Header title="Checkout" showBack backHref="/" />
      <main className="mx-auto max-w-5xl px-4 py-8">
        {!hasItems ? (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-sm text-gray-500 shadow-sm">
            Your cart is empty.
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="order-2 lg:order-1">
              <CheckoutForm
                productId={0}
                quantity={totalItems}
                unitPrice={unitPrice}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
              />
            </div>
            <div className="order-1 lg:order-2">
              <aside className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold">Order Summary</h2>
                <div className="mt-4 space-y-4">
                  {items.map((item) => {
                    const lineTotal = calculateSubtotal(
                      item.price,
                      item.quantity,
                    );
                    return (
                      <div
                        key={item.name}
                        className="flex items-start justify-between gap-4"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            Unit price: {formatCurrency(item.price)}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">
                          {formatCurrency(lineTotal)}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">
                      {formatCurrency(shipping)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">
                      Tax ({Math.round(TAX_RATE * 100)}%)
                    </span>
                    <span className="text-gray-900">
                      {formatCurrency(tax)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 text-base font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </aside>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
