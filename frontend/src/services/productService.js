import API from "./api";

export const getProducts = (search = "") =>
  API.get(`/products${search ? `?search=${encodeURIComponent(search)}` : ""}`);