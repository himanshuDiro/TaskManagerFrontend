import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in from cookies
    const loadUserFromCookies = async () => {
      const token = Cookies.get('token');
      
      if (token) {
        // Set axios default headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        try {
          const userData = Cookies.get('user');
          if (userData) {
            setUser(JSON.parse(userData));
          } else {
            // If no user data in cookie but token exists, fetch from API
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`);
            setUser(data);
            Cookies.set('user', JSON.stringify(data));
          }
        } catch (err) {
          console.error('Error loading user:', err);
          logout();
        }
      }
      
      setLoading(false);
    };

    loadUserFromCookies();
  }, []);

  const register = async (userData) => {
    try {
      setError(null);
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, userData);
      
      // Set token and user data
      setToken(data.token);
      setUser(data);
      
      // Store user data in cookie
      Cookies.set('user', JSON.stringify(data));
      
      router.push('/dashboard');
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password });
      
      // Set token and user data
      setToken(data.token);
      setUser(data);
      
      // Store user data in cookie
      Cookies.set('user', JSON.stringify(data));
      
      router.push('/dashboard');
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
      throw err;
    }
  };

  const logout = () => {
    // Remove cookies
    Cookies.remove('token');
    Cookies.remove('user');
    
    // Remove authorization header
    delete axios.defaults.headers.common['Authorization'];
    
    // Reset state
    setUser(null);
    
    // Redirect to login
    router.push('/login');
  };

  // Helper to set the token in cookies and axios headers
  const setToken = (token) => {
    Cookies.set('token', token, { expires: 7 }); // 7 days
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        loading,
        error,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);