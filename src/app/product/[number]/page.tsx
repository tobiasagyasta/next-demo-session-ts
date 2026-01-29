"use client"; // CSR page

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types/product";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import axios from "axios";
import QuantitySelector from "@/components/QuantitySelector";

export default function ProductDetailsPage() {
  const params = useParams<{ number: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    console.log("the params is " + params.number);
    async function loadProduct() {
      try {
        const { data } = await axios.get<Product>(
          `https://fakestoreapi.com/products/${params.number}`,
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

    if (params.number) {
      loadProduct();
    }
  }, [params.number]);

  return (
    <>
      <Header title={`Details for product ${params.number}`} showBack />
      <main className="mx-auto max-w-3xl px-4 py-8">
        {isLoading && <Spinner />}
        {errorMessage && <p className="text-red-600">Error: {errorMessage}</p>}
        {!isLoading && !errorMessage && product && (
          <div className="space-y-4">
            <ProductCard product={product} />
            <div className="flex flex-wrap items-center gap-4">
              <QuantitySelector
                value={quantity}
                min={1}
                unitPrice={product.price}
                onChange={(nextValue) => {
                  setQuantity(Math.max(1, nextValue));
                }}
              />
              <button
                type="button"
                onClick={() => {
                  router.push(
                    `/checkout/${params.number}?qty=${quantity}&?name=${product.title}`,
                  );
                }}
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
