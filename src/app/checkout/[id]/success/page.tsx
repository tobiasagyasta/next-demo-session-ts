"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams, useParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Spinner from "@/components/Spinner";
import { Product, ProductResponse } from "@/types/product";
import { unwrapProductResponse } from "@/lib/product-api";
import {
  calculateOrderTotal,
  calculateSubtotal,
  calculateTax,
  formatCurrency,
  normalizeQuantity,
} from "@/lib/helpers";
import { TAX_RATE, SHIPPING_COST } from "@/lib/helpers";

export default function SuccessPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const quantity = normalizeQuantity(searchParams.get("qty"));
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const { data } = await axios.get<ProductResponse>(
          `https://tobys-fakestore.up.railway.app/products/${params.id}`,
        );
        setProduct(unwrapProductResponse(data));
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";
        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [params.id]);

  const subtotal = product ? calculateSubtotal(product.price, quantity) : 0;
  const tax = calculateTax(subtotal, TAX_RATE);
  const total = calculateOrderTotal(subtotal, SHIPPING_COST, tax);

  return (
    <>
      <Header title="Order Confirmed" showBack />
      <main className="mx-auto max-w-3xl px-4 py-12">
        {isLoading && <Spinner label="Loading order details..." />}
        {errorMessage && <p className="text-red-600">Error: {errorMessage}</p>}
        {!isLoading && !errorMessage && product && (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
            <CheckCircle2
              className="mx-auto h-12 w-12 text-green-600"
              aria-hidden="true"
            />
            <h1 className="mt-4 text-2xl font-bold">Payment Successful</h1>
            <p className="mt-2 text-sm text-gray-600">
              Your order for {quantity} × {product.title} is confirmed.
            </p>

            <div className="mt-6 rounded-md border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span>Shipping</span>
                <span>{formatCurrency(SHIPPING_COST)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span>Tax ({Math.round(TAX_RATE * 100)}%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3 font-semibold">
                <span>Total paid</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Link
                href="/"
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
