
import { create } from 'zustand';


const isCacheFresh = (timestamp) => {
  const oneDay = 24 * 60 * 60 * 1000; 
  return Date.now() - timestamp < oneDay;
};

export const useLocationStore = create((set) => ({
  locations: [],
  loading: false,
  error: null,

  fetchLocations: async (force = false) => {
    set({ loading: true, error: null });
    try {
      if (!force) {
      const cachedData = localStorage.getItem('locations');
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (isCacheFresh(timestamp)) {
          set({ locations: data, loading: false });
          return;
        }
      }
    }

      
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/locations`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'User-Agent': 'PostmanRuntime/7.42.0',
          'ngrok-skip-browser-warning': 'true',
        },
        mode: 'cors',
        credentials: 'omit',
      });

      if (!response.ok) throw new Error('Failed to fetch locations');
      const data = await response.json();

      
      set({ locations: data, loading: false });

      
      localStorage.setItem(
        'locations',
        JSON.stringify({ data, timestamp: Date.now() })
      );
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));