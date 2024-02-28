import { request } from "./httpRequest";

export const fetchProducts = (params) => request({method: "get", url: "", params });

export const productsCategories = (params) => request({method: "get", url: "categories", params });