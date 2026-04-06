import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between border-b px-6 py-4">
      <Link to="/" className="text-lg font-bold text-slate-900">
        GK Shop Mall
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/" className="text-sm text-slate-700">
          Products
        </Link>
        <Link to="/cart" className="text-sm text-slate-700">
          Cart
        </Link>

        {token ? (
          <button
            onClick={handleLogout}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="text-sm text-slate-700">
              Login
            </Link>
            <Link to="/register" className="text-sm text-slate-700">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}