const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);

export const setAccessToken = (token: string) =>
  localStorage.setItem(ACCESS_TOKEN, token);

export const getRefreshToken = () => localStorage.getItem(ACCESS_TOKEN);

export const setRefreshToken = (token: string) =>
  localStorage.setItem(REFRESH_TOKEN, token);

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};
