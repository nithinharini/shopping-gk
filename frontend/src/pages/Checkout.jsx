import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/button";
import Input from "../components/common/Input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/common/card";
import { getCartAPI } from "../services/cartService";
import API from "../services/api";

export default function Checkout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "card",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    const loadCart = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await getCartAPI();
        setCart(res?.data?.data || { items: [], totalAmount: 0 });
      } catch (err) {
        console.error(err);
        setError("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [token, navigate]);

  const totalItems = useMemo(() => {
    return cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  }, [cart]);

  const totalAmount = useMemo(() => {
    return cart?.totalAmount || 0;
  }, [cart]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.address ||
      !formData.city ||
      !formData.postalCode ||
      !formData.country
    ) {
      return "Please fill complete shipping address";
    }

    if (!formData.paymentMethod) {
      return "Please select payment method";
    }

    if (formData.paymentMethod === "card") {
      if (
        !formData.cardName ||
        !formData.cardNumber ||
        !formData.expiry ||
        !formData.cvv
      ) {
        return "Please fill all card details";
      }
    }

    return "";
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setPlacingOrder(true);

      await API.post("/orders", {
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
      });

      setOrderPlaced(true);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to place order"
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading checkout...</div>;
  }

  if (orderPlaced) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <Card>
          <CardContent className="py-16 text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900">
              Shopping done ✅
            </h1>
            <p className="mb-2 text-slate-600">
              Your order has been placed successfully.
            </p>
            <p className="mb-6 text-sm text-red-500">
              This is a testing portal. Payment is for demo/testing only.
            </p>

            <div className="flex justify-center gap-4">
              <Button variant="primary" onClick={() => navigate("/")}>
                Continue Shopping
              </Button>
              <Button variant="outline" onClick={() => navigate("/cart")}>
                Back to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Checkout</h1>
        <p className="text-sm text-slate-500">
          Complete your shipping and payment details.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <Card>
          <CardHeader>
            <CardTitle>Shipping & Payment</CardTitle>
            <CardDescription>
              Dummy payment form for testing only.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-6" onSubmit={handlePlaceOrder}>
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Address"
                  name="address"
                  placeholder="123 Main St"
                  value={formData.address}
                  onChange={handleChange}
                />
                <Input
                  label="City"
                  name="city"
                  placeholder="Chicago"
                  value={formData.city}
                  onChange={handleChange}
                />
                <Input
                  label="Postal Code"
                  name="postalCode"
                  placeholder="60007"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
                <Input
                  label="Country"
                  name="country"
                  placeholder="USA"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">
                  Payment Method
                </label>

                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleChange}
                    />
                    <span>Credit / Debit Card</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === "upi"}
                      onChange={handleChange}
                    />
                    <span>UPI</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleChange}
                    />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>

              {formData.paymentMethod === "card" && (
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    label="Card Holder Name"
                    name="cardName"
                    placeholder="GK User"
                    value={formData.cardName}
                    onChange={handleChange}
                  />
                  <Input
                    label="Card Number"
                    name="cardNumber"
                    placeholder="4111 1111 1111 1111"
                    value={formData.cardNumber}
                    onChange={handleChange}
                  />
                  <Input
                    label="Expiry"
                    name="expiry"
                    placeholder="12/28"
                    value={formData.expiry}
                    onChange={handleChange}
                  />
                  <Input
                    label="CVV"
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleChange}
                  />
                </div>
              )}

              {formData.paymentMethod === "upi" && (
                <Input
                  label="UPI ID"
                  name="upiId"
                  placeholder="demo@upi"
                  value={formData.upiId || ""}
                  onChange={handleChange}
                />
              )}

              <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-700">
                Payment is dummy for testing only. No real transaction will happen.
              </div>

              {error ? (
                <p className="text-sm text-red-600">{error}</p>
              ) : null}

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={placingOrder}
              >
                {placingOrder ? "Placing Order..." : "Place Order"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>
              Review before placing your order.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {cart?.items?.map((item) => (
              <div
                key={item.product?._id || item._id}
                className="flex items-center justify-between text-sm"
              >
                <div>
                  <p className="font-medium text-slate-900">
                    {item.product?.name}
                  </p>
                  <p className="text-slate-500">
                    Qty: {item.quantity}
                  </p>
                </div>
                <div className="font-medium text-slate-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            <div className="border-t border-slate-200 pt-4 space-y-2">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex items-center justify-between text-lg font-semibold text-slate-900">
                <span>Total Amount</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}