import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onAddToCart }) {
  if (!products?.length) {
    return <div className="text-center py-10">No products found</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}