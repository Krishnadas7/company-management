import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" });

export const login = (credentials) => API.post("/api/auth/login", credentials);
