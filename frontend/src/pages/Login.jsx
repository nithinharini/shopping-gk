import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/button";
import Input from "../components/common/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/common/card";
import { loginAPI } from "../services/authService";
import { getCartAPI } from "../services/cartService";
import API from "../services/api";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const mergeGuestCartAfterLogin = async () => {
    const guestCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!guestCart.length) return;

    await API.post("/cart/merge", {
      items: guestCart,
    });

    localStorage.removeItem("cart");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginAPI(formData);

      const token =
        res?.data?.token ||
        res?.data?.accessToken;

      if (!token) {
        throw new Error("Token not received from login API");
      }

      localStorage.setItem("token", token);

      await mergeGuestCartAfterLogin();
      await getCartAPI();

      navigate("/cart");
    } catch (err) {
      setError(
        err?.response?.data?.message || err.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-7xl items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login to continue shopping and checkout.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />

            {error ? (
              <p className="text-sm text-red-600">{error}</p>
            ) : null}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <p className="text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="font-medium text-slate-900 underline">
                Register
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}