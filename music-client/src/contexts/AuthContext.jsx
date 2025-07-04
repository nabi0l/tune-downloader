import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Signup function
  const signup = async (email, password, displayName) => {
    const response = await fetch('https://tune-downloader.onrender.com/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, displayName })
    });
    const data = await response.json();
    if (!response.ok) {
      console.error('Signup error:', data);
      throw new Error(data.message || data.error || 'Signup failed');
    }
    // After signup, login automatically
    return await signin(email, password);
  };

  // Signin function
  const signin = async (email, password) => {
    const response = await fetch('https://tune-downloader.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (!response.ok) {
      console.error('Login error:', data);
      throw new Error(data.message || data.error || 'Login failed');
    }
    localStorage.setItem('token', data.token);
    setCurrentUser(data.user);
    setIsAdmin(data.user.role === 'admin');
    return data.user;
  };

  // Signout function
  const signout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setIsAdmin(false);
  };

  // Check admin status (from user object)
  const checkAdminStatus = (user) => {
    if (!user) return false;
    return user.role === 'admin';
  };

  // On mount, check for token and fetch user info if needed
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user info from backend using token
      const fetchUserInfo = async () => {
        try {
          const response = await fetch('https://tune-downloader.onrender.com/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setCurrentUser(userData);
            setIsAdmin(userData.role === 'admin');
          } else {
            // Token is invalid, clear it
            localStorage.removeItem('token');
            setCurrentUser(null);
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
          // Token is invalid, clear it
          localStorage.removeItem('token');
          setCurrentUser(null);
          setIsAdmin(false);
        } finally {
          setLoading(false);
        }
      };
      
      fetchUserInfo();
    } else {
      setLoading(false);
    }
  }, []);

  const value = {
    currentUser,
    isAdmin,
    signup,
    signin,
    signout,
    checkAdminStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 