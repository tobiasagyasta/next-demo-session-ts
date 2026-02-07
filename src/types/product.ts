export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export type ProductListMeta = {
  page: number;
  limit: number;
  total: number;
  pages: number;
  has_next: boolean;
};

export type ProductListResponse = {
  data: Product[];
  meta: ProductListMeta;
};

export type ProductResponse = Product | { data: Product };

export type Category = {
  id: number;
  name: string;
};

export type ProductPlatzi = {
  id: number;
  title: string;
  category: Category;
  images: string[];
};
