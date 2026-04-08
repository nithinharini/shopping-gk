import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [search, setSearch] = useState("");
  const [imgError, setImgError] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(search)}`);
  };

  return (
    <div className="flex flex-col gap-4 border-b px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
      
     <Link to="/" className="flex items-center gap-3">
        {!imgError ? (
          <img
            src={logo}
            alt="GK Electronic"
            className="h-12 w-auto object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-xl font-bold text-slate-900">
            GK Electronic
          </span>
        )}
      </Link>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex w-full max-w-md gap-2">
        <input
          type="text"
          placeholder="Search electronics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-slate-500"
        />
        <button className="rounded-xl bg-slate-900 px-4 py-2 text-white">
          Search
        </button>
      </form>

      {/* Links */}
      <div className="flex items-center gap-4">
        <Link to="/" className="text-sm">Home</Link>
        <Link to="/products" className="text-sm">Products</Link>
        <Link to="/cart" className="text-sm">Cart</Link>

        {token ? (
          <button
            onClick={handleLogout}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="text-sm">Login</Link>
            <Link to="/register" className="text-sm">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}