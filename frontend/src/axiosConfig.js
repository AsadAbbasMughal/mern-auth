import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 🟢 API URL from .env
  withCredentials: true, // ✅ Allow cookies
});

export default instance;
