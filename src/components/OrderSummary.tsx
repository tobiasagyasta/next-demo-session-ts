import { Product } from "@/types/product";
import {
  calculateOrderTotal,
  calculateSubtotal,
  calculateTax,
  formatCurrency,
} from "@/lib/helpers";

type OrderSummaryProps = {
  product: Product;
  quantity: number;
  shipping: number;
  taxRate: number;
  onQuantityChange?: (nextQuantity: number) => void;
};

export default function OrderSummary({
  product,
  quantity,
  shipping,
  taxRate,
  onQuantityChange,
}: OrderSummaryProps) {
  const subtotal = calculateSubtotal(product.price, quantity);
  const tax = calculateTax(subtotal, taxRate);
  const total = calculateOrderTotal(subtotal, shipping, tax);

  return (
    <aside className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Order Summary</h2>
      <div className="mt-4 flex gap-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-20 w-20 rounded-md border border-gray-100 object-contain"
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{product.title}</p>
          <p className="mt-1 text-sm text-gray-500">
            Unit price: {formatCurrency(product.price)}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <label className="text-sm text-gray-600" htmlFor="quantity">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(event) =>
                onQuantityChange?.(Number(event.target.value))
              }
              className="w-20 rounded-md border border-gray-300 px-2 py-1 text-sm"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Line total: {formatCurrency(subtotal)}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-900">{formatCurrency(shipping)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">
            Tax ({Math.round(taxRate * 100)}%)
          </span>
          <span className="text-gray-900">{formatCurrency(tax)}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 text-base font-semibold">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </aside>
  );
}
