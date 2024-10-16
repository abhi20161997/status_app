import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// API Requests
export const loginRequest = (username: string, password: string) =>
  axios.post(`${API_BASE_URL}/login/`, { username, password });

export const signupRequest = (
  username: string,
  email: string,
  password: string
) => axios.post(`${API_BASE_URL}/signup/`, { username, email, password });

export const verifyTokenRequest = (token: string) =>
  axios.post(`${API_BASE_URL}/verify-token/`, { token });

// Token Management
export const setAccessToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem("refreshToken", token);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refreshToken");
};

export const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// Axios instance with auth header
export const authAxios = axios.create({
  baseURL: API_BASE_URL,
});

authAxios.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
