import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand / About */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">GK Electronic</h2>
          <p className="text-sm leading-6 text-slate-300">
            GK Electronic is your trusted destination for mobiles, laptops,
            accessories, home electronics, and more. Shop quality products with
            a modern and secure experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="/cart" className="hover:text-white">Cart</a></li>
            <li><a href="/login" className="hover:text-white">Login</a></li>
            <li><a href="/register" className="hover:text-white">Register</a></li>
            <li><a href="/my-orders" className="hover:text-white">My Orders</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
          <div className="mb-4 flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-slate-800 p-3 transition hover:bg-blue-600"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-slate-800 p-3 transition hover:bg-pink-600"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-slate-800 p-3 transition hover:bg-sky-500"
            >
              <FaTwitter />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-slate-800 p-3 transition hover:bg-red-600"
            >
              <FaYoutube />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-slate-800 p-3 transition hover:bg-blue-700"
            >
              <FaLinkedinIn />
            </a>
          </div>

          <p className="text-sm text-slate-300">
            Stay connected for new arrivals, offers, and updates.
          </p>
        </div>

        {/* Contact + Map */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>

          <form className="space-y-3">
            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm outline-none focus:border-slate-400"
            />
            <input
              type="email"
              placeholder="Your email"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm outline-none focus:border-slate-400"
            />
            <textarea
              placeholder="Your message"
              rows="3"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm outline-none focus:border-slate-400"
            />
            <button
              type="button"
              className="w-full rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
              onClick={() => alert("This is a demo contact form for testing.")}
            >
              Send Message
            </button>
          </form>

          <div className="mt-4">
            <iframe
              title="GK Electronic Location"
              src="https://www.google.com/maps?q=Chicago&output=embed"
              className="h-32 w-full rounded-lg border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 px-6 py-4 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} GK Electronic. All rights reserved.
      </div>
    </footer>
  );
}