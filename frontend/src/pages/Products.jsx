import React, { useEffect, useState } from "react";
import ProductGrid from "../components/features/ProductGrid";
import { getProducts } from "../services/productService";
import { addToCartAPI } from "../services/cartService";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.data);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");

    // guest user → localStorage
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

    // logged in user → backend API
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
      <h1 className="text-2xl font-semibold mb-6">Products</h1>

      <ProductGrid
        products={products}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}