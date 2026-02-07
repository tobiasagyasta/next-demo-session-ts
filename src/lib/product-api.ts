import type { Product, ProductResponse } from "@/types/product";

export function unwrapProductResponse(response: ProductResponse): Product {
  if ("data" in response) {
    return response.data;
  }
  return response;
}
