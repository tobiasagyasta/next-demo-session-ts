import { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article
      className="rounded-lg border border-gray-200 p-4"
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-48 w-full object-contain"
      />
      <h2 className="mt-3 text-lg font-semibold">{product.title}</h2>
      <p className="my-2 text-sm text-gray-500">{product.category}</p>
      <strong className="text-base">${product.price.toFixed(2)}</strong>
    </article>
  );
}
