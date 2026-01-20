"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types/product";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";

export default function ProductDetailsPage() {
  const params = useParams<{ number: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log("the params is " + params.number);
    async function loadProduct() {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${params.number}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data: Product = await response.json();
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
          <ProductCard product={product} />
        )}
      </main>
    </>
  );
}
