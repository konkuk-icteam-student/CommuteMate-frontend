const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const getStoredToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getStoredRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const storeTokens = (accessToken: string, refreshToken?: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

export const removeStoredToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getAuthHeader = (): Record<string, string> => {
  const token = getStoredToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
