export const isLoggedIn = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token && !isTokenExpired(token);
}

const isTokenExpired = (token: string): boolean => {
  const expirationDate = getTokenExpirationDate(token);
  return !!expirationDate && expirationDate < new Date();
}

const getTokenExpirationDate = (token: string): Date | null => {
  const decodedToken = decodeToken(token);
  if (!decodedToken || !decodedToken.exp) return null;

  const expirationDate = new Date(0);
  expirationDate.setUTCSeconds(decodedToken.exp);
  return expirationDate;
}

const decodeToken = (token: string): { [key: string]: any } | null => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}
