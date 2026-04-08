import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/button";
import ProductGrid from "../components/features/ProductGrid";
import { getProducts } from "../services/productService";
import HeroSlider from "../components/features/HeroSlider";

export default function Home() {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await getProducts();
        // take first 4 as featured
        setFeaturedProducts(res.data.data.slice(0, 4));
      } catch (err) {
        console.error(err);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="space-y-12 p-6">
      <HeroSlider />

      {/* FEATURED PRODUCTS */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            Featured Products
          </h2>

          <button
            onClick={() => navigate("/products")}
            className="text-sm text-slate-600 underline"
          >
            View All
          </button>
        </div>

        <ProductGrid products={featuredProducts} />
      </div>

      {/* WHY US */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border p-6 text-center bg-[aquamarine]">
          <h3 className="mb-2 font-semibold text-lg">
            ⚡ Fast Delivery
          </h3>
          <p className="text-sm text-slate-500">
            Get your products delivered quickly and safely.
          </p>
        </div>

        <div className="rounded-xl border p-6 text-center bg-[lightyellow]">
          <h3 className="mb-2 font-semibold text-lg">
            🔒 Secure Checkout
          </h3>
          <p className="text-sm text-slate-500">
            Safe and secure payment process for all orders.
          </p>
        </div>

        <div className="rounded-xl border p-6 text-center bg-[blanchedalmond]">
          <h3 className="mb-2 font-semibold text-lg">
            ⭐ Trusted Products
          </h3>
          <p className="text-sm text-slate-500">
            Only high-quality electronics from trusted brands.
          </p>
        </div>
      </div>

       {/* HERO */}
      <div className="rounded-2xl bg-slate-900 px-6 py-12 text-white text-center">
        <h1 className="mb-4 text-4xl font-bold">
          GK Electronic
        </h1>
        <p className="mb-6 text-lg text-slate-300">
          Your one-stop shop for latest electronics
        </p>

        <div className="flex justify-center gap-4">
          <Button onClick={() => navigate("/products")}>
            Shop Now
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/products")}
            className="bg-white text-slate-900"
          >
            Browse Products
          </Button>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl bg-slate-100 p-10 text-center">
        <h2 className="mb-3 text-2xl font-semibold">
          Ready to upgrade your tech?
        </h2>
        <p className="mb-6 text-slate-600">
          Explore our latest collection now.
        </p>

        <Button onClick={() => navigate("/products")}>
          Start Shopping
        </Button>
      </div>
    
      {/* Footer */}
    </div>
  );
}