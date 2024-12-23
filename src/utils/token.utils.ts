const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const REMEMBER_ME_KEY = 'auth_remember_me';

const getStorageData = (key: string): string | null => {
  try {
    const localData = localStorage.getItem(key);
    const sessionData = sessionStorage.getItem(key);
    return localData || sessionData || null;
  } catch (error) {
    console.error(`Error accessing storage for key ${key}:`, error);
    return null;
  }
};

export const tokenUtils = {
  getToken: () => {
    return getStorageData(TOKEN_KEY);
  },
  
  setToken: (token: string, rememberMe: boolean) => {
    try {
      if (!token) return;
      
      // Clear any existing tokens first
      localStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
      
      if (rememberMe) {
        localStorage.setItem(TOKEN_KEY, token);
      } else {
        sessionStorage.setItem(TOKEN_KEY, token);
      }
    } catch (error) {
      console.error('Error setting token:', error);
    }
  },
  
  removeToken: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  },
  
  getUser: () => {
    try {
      const userStr = getStorageData(USER_KEY);
      if (!userStr) return null;
      
      const user = JSON.parse(userStr);
      if (!user || typeof user !== 'object') return null;
      
      // Validate user object structure
      if (!user.userId || !user.username) return null;
      
      return user;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },
  
  setUser: (user: any, rememberMe: boolean) => {
    try {
      if (!user) return;
      
      // Clear existing user data first
      localStorage.removeItem(USER_KEY);
      sessionStorage.removeItem(USER_KEY);
      
      const userStr = JSON.stringify(user);
      if (rememberMe) {
        localStorage.setItem(USER_KEY, userStr);
      } else {
        sessionStorage.setItem(USER_KEY, userStr);
      }
    } catch (error) {
      console.error('Error setting user:', error);
    }
  },
  
  removeUser: () => {
    try {
      localStorage.removeItem(USER_KEY);
      sessionStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Error removing user:', error);
    }
  },

  setRememberMe: (value: boolean) => {
    try {
      localStorage.setItem(REMEMBER_ME_KEY, String(value));
    } catch (error) {
      console.error('Error setting remember me:', error);
    }
  },

  getRememberMe: () => {
    try {
      return localStorage.getItem(REMEMBER_ME_KEY) === 'true';
    } catch (error) {
      console.error('Error getting remember me:', error);
      return false;
    }
  },

  clearAll: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(REMEMBER_ME_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
};
