"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import OrderSummary from "@/components/OrderSummary";
import CheckoutForm from "@/components/CheckoutForm";
import { Product } from "@/types/product";
import {
  calculateOrderTotal,
  calculateSubtotal,
  calculateTax,
  normalizeQuantity,
} from "@/lib/helpers";
import { TAX_RATE, SHIPPING_COST } from "@/lib/helpers";

export default function CheckoutPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const quantity = normalizeQuantity(searchParams.get("qty"));

  const productName = searchParams.get("name");

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log(productName);
    async function loadProduct() {
      try {
        const { data } = await axios.get<Product>(
          `https://fakestoreapi.com/products/${params.id}`,
        );
        setProduct(data);
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

  function handleQuantityChange(nextQuantity: number) {
    const normalized = Math.max(1, Math.floor(nextQuantity));
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("qty", normalized.toString());
    router.replace(`/checkout/${params.id}?${nextParams.toString()}`);
  }

  const subtotal = product ? calculateSubtotal(product.price, quantity) : 0;
  const tax = calculateTax(subtotal, TAX_RATE);
  const total = calculateOrderTotal(subtotal, SHIPPING_COST, tax);

  return (
    <>
      <Header title="Checkout" showBack backHref={`/product/${params.id}`} />
      <main className="mx-auto max-w-5xl px-4 py-8">
        {isLoading && <Spinner />}
        {errorMessage && <p className="text-red-600">Error: {errorMessage}</p>}
        {!isLoading && !errorMessage && product && (
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="order-2 lg:order-1">
              <CheckoutForm
                productId={product.id}
                quantity={quantity}
                unitPrice={product.price}
                subtotal={subtotal}
                shipping={SHIPPING_COST}
                tax={tax}
                total={total}
              />
            </div>
            <div className="order-1 lg:order-2">
              <OrderSummary
                product={product}
                quantity={quantity}
                shipping={SHIPPING_COST}
                taxRate={TAX_RATE}
                onQuantityChange={handleQuantityChange}
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
}
