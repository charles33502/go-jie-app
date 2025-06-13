export const BACKEND_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:10000"
    : import.meta.env.VITE_BACKEND_URL;
