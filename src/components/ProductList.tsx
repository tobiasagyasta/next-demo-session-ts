import { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";

type ProductListProps = {
  products: Product[];
};

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          className="block transition-transform hover:-translate-y-1"
        >
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}
