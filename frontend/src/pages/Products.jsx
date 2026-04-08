import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductGrid from "../components/features/ProductGrid";
import { getProducts } from "../services/productService";
import { addToCartAPI } from "../services/cartService";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search") || "";

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts(search);
      setProducts(res.data.data);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

      const itemIndex = existingCart.findIndex(
        (item) => item.productId === product._id
      );

      if (itemIndex > -1) {
        existingCart[itemIndex].quantity += 1;
      } else {
        existingCart.push({
          productId: product._id,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(existingCart));
      alert("Added to cart (guest)");
      return;
    }

    try {
      await addToCartAPI({
        productId: product._id,
        quantity: 1,
      });

      alert("Added to cart");
    } catch (error) {
      console.error("Add to cart failed", error);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-2 text-2xl font-semibold">
        {search ? `Search results for "${search}"` : "Products"}
      </h1>

      <p className="mb-6 text-sm text-slate-500">
        {products.length} product{products.length !== 1 ? "s" : ""} found
      </p>

      <ProductGrid
        products={products}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}