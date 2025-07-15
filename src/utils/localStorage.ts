// utils/localStorage.ts

/**
 * Safe localStorage operations that handle SSR/hydration issues
 */

export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') {
      return null;
    }
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },

  removeItem: (key: string): void => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  clear: (): void => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },

  getJSON: <T>(key: string): T | null => {
    const item = safeLocalStorage.getItem(key);
    if (!item) return null;
    
    try {
      return JSON.parse(item);
    } catch (error) {
      console.error('Error parsing JSON from localStorage:', error);
      return null;
    }
  },

  setJSON: (key: string, value: any): void => {
    try {
      const jsonString = JSON.stringify(value);
      safeLocalStorage.setItem(key, jsonString);
    } catch (error) {
      console.error('Error stringifying JSON for localStorage:', error);
    }
  }
};

export default safeLocalStorage;
