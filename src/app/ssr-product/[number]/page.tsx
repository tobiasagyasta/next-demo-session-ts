// SSR Page
import Header from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import ProductDetailsActions from "@/components/ProductDetailsActions";
import type { ProductResponse } from "@/types/product";
import { unwrapProductResponse } from "@/lib/product-api";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    number: string;
  }>;
};

async function getProduct(number: string) {
  const res = await fetch(
    `https://tobys-fakestore.up.railway.app/products/${number}`,
    {
      cache: "no-store", // or "force-cache"
      next: { revalidate: 60 }, // ISR-style
    },
  );

  if (!res.ok) return null;
  const data = (await res.json()) as ProductResponse;
  return unwrapProductResponse(data);
}
export default async function SsrProductDetailsPage({ params }: PageProps) {
  const { number } = await params;
  const product = await getProduct(number);

  return (
    <>
      <Header title={`Details for product ${number}`} showBack />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <section className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
            SSR spotlight
          </p>
          <p className="mt-2 font-semibold text-gray-900">
            This page uses async server rendering.
          </p>
          <p className="mt-2">
            We fetch the product on the server with{" "}
            <code className="rounded bg-white px-1 py-0.5 text-xs">axios</code>{" "}
            inside an async server component, so every request gets fresh data.
          </p>
        </section>

        {!product && (
          <p className="text-red-600">Error: Unable to load product.</p>
        )}
        {product && (
          <div className="space-y-4">
            <ProductCard product={product} />
            <ProductDetailsActions
              productId={number}
              unitPrice={product.price}
            />
            {/* Di dalam page SSR, kita bisa import component CSR / client */}
          </div>
        )}
      </main>
    </>
  );
}
