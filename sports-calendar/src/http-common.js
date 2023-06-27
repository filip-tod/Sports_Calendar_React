import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:44380/api",
  headers: {
    "Content-type": "application/json",
  }
});

api.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorage();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token.access_token}`;
  }
  return config;
});

function getTokenFromLocalStorage() {
  const token = localStorage.getItem("token");
  return JSON.parse(token);
}

export default api;
