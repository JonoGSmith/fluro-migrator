import axios from "axios";

export const client = axios.create({
  baseURL: "https://api.fluro.io/",
  timeout: 1000,
  headers: { Authorization: `Bearer ${process.env.FLURO_API_TOKEN}` },
});
