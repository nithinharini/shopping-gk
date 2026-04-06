import API from "./api";

export const addToCartAPI = (data) => API.post("/cart", data);
export const getCartAPI = () => API.get("/cart");