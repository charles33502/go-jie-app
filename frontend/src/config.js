export const BACKEND_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:10000"
    : "https://go-jie-app.onrender.com"
