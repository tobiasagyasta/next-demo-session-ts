"use client";

import { useEffect, useState } from "react";
import { ProductList } from "@/components/ProductList";
import { Product } from "@/types/product";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";
        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <>
      <Header title="Home" showSignUp />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold sm:text-3xl">
          Fake Store Products
        </h1>
        {isLoading && <Spinner />}
        {errorMessage && <p className="text-red-600">Error: {errorMessage}</p>}
        {!isLoading && !errorMessage && <ProductList products={products} />}

        {/*Link method routing*/}
        <button className="p-4 border rounded-3xl">
          <Link href={"/contact-form"}>To Contact</Link>
        </button>

        {/*Router method routing*/}
        <button
          className="p-4 border rounded-3xl cursor-pointer"
          onClick={() => {
            router.push("/contact-form/about");
          }}
        >
          To About Contact
        </button>
      </main>
    </>
  );
}
