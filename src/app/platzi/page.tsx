"use client"; //0. Jangan lupa buat client component!

import React from "react";
import { useState, useEffect } from "react";

const PlatziPage = () => {
  //1. Buat state untuk API response
  const [productList, setProductList] = useState(null);
  const [categoryList, setCategoryList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //2. Buat fetching function
  const fetchProductList = async () => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/products");
      const data = await response.json();
      console.log(data);
      setProductList(data);
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
    </>
  );
};

export default PlatziPage;
