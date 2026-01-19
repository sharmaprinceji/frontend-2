import axios from "axios";
import { v4 as uuid } from "uuid";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const fetchExpenses = (category, sort) => {
  const params = {};
  if (category) params.category = category;
  if (sort) params.sort = sort;
  return API.get("/expenses", { params });
};

export const createExpense = (data) => {
  return API.post("/expenses", data, {
    headers: { "x-request-id": uuid() }
  });
};
