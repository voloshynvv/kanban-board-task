export const localStorageService = {
  getItem: <T>(key: string) => {
    try {
      const saved = localStorage.getItem(key);

      if (saved) {
        return JSON.parse(saved) as T;
      }

      return null;
    } catch (e) {
      console.error('Failed to get an item', e);
      return null;
    }
  },
  setItem: <T>(key: string, data: T) => {
    try {
      const json = JSON.stringify(data);
      localStorage.setItem(key, json);
    } catch (e) {
      console.error('Failed to set an item', e);
    }
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
};
