import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decodificando token:', error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [rol, setRol] = useState(localStorage.getItem('rol') || null);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

    const login = (token) => {
        const decoded = decodeToken(token);
        const userRol = decoded?.rol || null;
    const userIdentifier = decoded?.id ?? null;
        
        localStorage.setItem('token', token);
        localStorage.setItem('rol', userRol);
    if (userIdentifier !== null && userIdentifier !== undefined) {
      localStorage.setItem('userId', String(userIdentifier));
    }
        setIsLoggedIn(true);
        setRol(userRol);
    setUserId(userIdentifier);
    };
    
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
    localStorage.removeItem('userId');
        setIsLoggedIn(false);
        setRol(null);
    setUserId(null);
    };
    
    return(
    <AuthContext.Provider value={{ isLoggedIn, rol, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};