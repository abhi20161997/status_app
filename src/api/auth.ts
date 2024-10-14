import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const loginRequest = (username: string, password: string) =>
  axios.post(`${API_BASE_URL}/login/`, { username, password });

export const signupRequest = (
  username: string,
  email: string,
  password: string
) => axios.post(`${API_BASE_URL}/signup/`, { username, email, password });

export const verifyTokenRequest = (token: string) =>
  axios.post(`${API_BASE_URL}/verify-token/`, { token });
