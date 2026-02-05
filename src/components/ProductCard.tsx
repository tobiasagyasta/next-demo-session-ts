"use client";

import Link from "next/link";
import { Product } from "@/types/product";
import { useAuthStore } from "@/store/auth.store";
import AddToCartButton from "./AddToCartButton";
import { useEffect } from "react";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return (
    <article className="rounded-lg border border-gray-200 p-4">
      <Link
        href={`/product/${product.id}`}
        className="block transition-transform hover:-translate-y-1"
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-full object-contain"
        />
        <h2 className="mt-3 text-lg font-semibold">{product.title}</h2>
        <p className="my-2 text-sm text-gray-500">{product.category}</p>
        <strong className="text-base">${product.price.toFixed(2)}</strong>
      </Link>
      {isLoggedIn && (
        <div className="mt-4">
          <AddToCartButton
            item={{ name: product.title, price: product.price }}
          />
        </div>
      )}
    </article>
  );
}
