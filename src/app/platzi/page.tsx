"use client"; //0. Jangan lupa buat client component!

import React from "react";
import { useState, useEffect } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category?: any;
  images?: string[];
}

interface Category {
  id: number;
  name: string;
  image?: string;
}

const PlatziPage = () => {
  //1. Buat state untuk API response
  const [productList, setProductList] = useState<Product[] | null>(null);
  const [oneProduct, setOneProduct] = useState<Product | null>(null);
  const [categoryList, setCategoryList] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //2. Buat fetching function
  const fetchProductList = async () => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/products");
      const data = await response.json();
      console.log(data);
      setProductList(data);
      setOneProduct(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategoryList = async () => {
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/categories",
      );
      const data = await response.json(); //closure / scope
      console.log(data);
      setCategoryList(data);
    } catch (error) {}
  };

  //3. Run fetching function di dalam useEffect (supaya berjalan saat page load)

  useEffect(() => {
    fetchProductList();
  }, []);

  useEffect(() => {
    if (productList) {
      fetchCategoryList();
    }
  }, [productList]); // Jika ada dependency, contoh : jika ada productList, maka baru jalankan fetchCategoryList

  return (
    <>
      <p>Product List Platzi</p>
      <code>Map untuk display data yang lebih dari satu</code>
      {productList &&
        productList.map((elem: any) => (
          <div className="p-4 m-5 flex flex-col border border-r-2">
            <p>{elem.title}</p>
            <p>{elem.price}</p>
            <p>{elem.description}</p>
          </div>
        ))}
      <p>Category List Platzi</p>
      {categoryList &&
        categoryList.map((category: any) => {
          return (
            <div className="p-4 m-5 flex flex-col border border-r-2 bg-amber-200">
              <p>{category.id}</p>
              <p>{category.name}</p>
            </div>
          );
        })}

      <p>One Product</p>
      {oneProduct && (
        <div className="p-4 m-5 border border-r-2 bg-green-200">
          <p>{oneProduct.title}</p>
          <p>{oneProduct.price}</p>
          <p>{oneProduct.description}</p>
        </div>
      )}
    </>
  );
};

export default PlatziPage;
