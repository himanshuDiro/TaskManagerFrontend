import Cookies from 'js-cookie';
import Router from 'next/router';

// Check if the user is authenticated on client side
export const isAuthenticated = () => {
  const token = Cookies.get('token');
  return !!token;
};

// Redirect if not authenticated (for protected pages)
export const redirectIfNotAuthenticated = () => {
  if (typeof window !== 'undefined' && !isAuthenticated()) {
    Router.push('/login');
    return false;
  }
  return true;
};

// Redirect if authenticated (for public pages like login, register)
export const redirectIfAuthenticated = () => {
  if (typeof window !== 'undefined' && isAuthenticated()) {
    Router.push('/dashboard');
    return false;
  }
  return true;
};

// Get auth token from cookies
export const getToken = () => {
  return Cookies.get('token');
};

// Get user from cookies
export const getUser = () => {
  const userData = Cookies.get('user');
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (error) {
      return null;
    }
  }
  return null;
};

// Clear auth data on logout
export const clearAuthData = () => {
  Cookies.remove('token');
  Cookies.remove('user');
};