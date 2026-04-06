import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/common/card";
import { getProducts } from "../services/productService";
import { getCartAPI } from "../services/cartService";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadCart = async () => {
      try {
        if (token) {
          const res = await getCartAPI();
          const dbCart = res?.data?.data;

          const mappedItems =
            dbCart?.items?.map((item) => ({
              productId: item.product?._id,
              name: item.product?.name,
              image: item.product?.image,
              price: item.price,
              category: item.product?.category,
              inStock: item.product?.inStock,
              stockQty: item.product?.stockQty,
              quantity: item.quantity,
            })) || [];

          setCartItems(mappedItems);
        } else {
          const localCart = JSON.parse(localStorage.getItem("cart")) || [];

          if (!localCart.length) {
            setCartItems([]);
            return;
          }

          const productsRes = await getProducts();
          const products = productsRes?.data?.data || [];

          const enrichedCart = localCart
            .map((item) => {
              const product = products.find((p) => p._id === item.productId);

              if (!product) return null;

              return {
                productId: item.productId,
                name: product.name,
                image: product.image,
                price: product.price,
                category: product.category,
                inStock: product.inStock,
                stockQty: product.stockQty,
                quantity: item.quantity,
              };
            })
            .filter(Boolean);

          setCartItems(enrichedCart);
        }
      } catch (error) {
        console.error("Error loading cart", error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [token]);

  const updateGuestCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem(
      "cart",
      JSON.stringify(
        updatedCart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        }))
      )
    );
  };

  const handleIncrease = (productId) => {
    if (token) {
      alert("Logged-in quantity update will be connected to API next.");
      return;
    }

    const updated = cartItems.map((item) =>
      item.productId === productId
        ? {
            ...item,
            quantity:
              item.quantity < item.stockQty ? item.quantity + 1 : item.quantity,
          }
        : item
    );

    updateGuestCart(updated);
  };

  const handleDecrease = (productId) => {
    if (token) {
      alert("Logged-in quantity update will be connected to API next.");
      return;
    }

    const updated = cartItems
      .map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateGuestCart(updated);
  };

  const handleRemove = (productId) => {
    if (token) {
      alert("Logged-in remove will be connected to API next.");
      return;
    }

    const updated = cartItems.filter((item) => item.productId !== productId);
    updateGuestCart(updated);
  };

  const totalAmount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const handleCheckout = () => {
    if (!token) {
      navigate("/login");
      return;
    }

    navigate("/checkout");
  };

  if (loading) {
    return <div className="p-6">Loading cart...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Your Cart</h1>
        <p className="text-sm text-slate-500">
          Review your items before checkout.
        </p>
      </div>

      {cartItems.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="mb-4 text-slate-600">Your cart is empty.</p>
            <Link to="/">
              <Button variant="primary">Continue Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.productId}>
                <CardContent className="flex flex-col gap-4 p-4 sm:flex-row">
                  <div className="h-28 w-28 overflow-hidden rounded-xl bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-slate-500">{item.category}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          {item.inStock ? `Stock: ${item.stockQty}` : "Out of stock"}
                        </p>
                      </div>

                      <div className="text-lg font-bold text-slate-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <div className="flex items-center rounded-xl border border-slate-200">
                        <button
                          className="px-3 py-2 text-sm"
                          onClick={() => handleDecrease(item.productId)}
                        >
                          -
                        </button>
                        <span className="px-4 py-2 text-sm">{item.quantity}</span>
                        <button
                          className="px-3 py-2 text-sm"
                          onClick={() => handleIncrease(item.productId)}
                        >
                          +
                        </button>
                      </div>

                      <div className="text-sm text-slate-600">
                        Price: ${item.price}
                      </div>

                      <button
                        className="text-sm font-medium text-red-600"
                        onClick={() => handleRemove(item.productId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                Checkout requires login.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between text-lg font-semibold text-slate-900">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <Button variant="primary" className="w-full" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>

              {!token && (
                <p className="text-xs text-slate-500">
                  Please login before placing your order.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}