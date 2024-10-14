import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchPublicStatus = (orgId: string) =>
  axios.get(`${API_BASE_URL}/public-status/${orgId}/`);
