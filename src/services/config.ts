import axios from "axios";

const api = axios.create({
  baseURL: "https://unpkg.com",
});

export default api;
