
import { create } from 'zustand';


const isCacheFresh = (timestamp) => {
  const oneDay = 24 * 60 * 60 * 1000; 
  return Date.now() - timestamp < oneDay;
};

export const useRolesStore = create((set) => ({
  roles: [],
  loading: false,
  error: null,

  fetchRoles: async () => {
    set({ loading: true, error: null });
    try {
      
      const cachedData = localStorage.getItem('roles');
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (isCacheFresh(timestamp)) {
          set({ roles: data, loading: false });
          return;
        }
      }

      
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/roles`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'User-Agent': 'PostmanRuntime/7.42.0',
          'ngrok-skip-browser-warning': 'true',
        },
        mode: 'cors',
        credentials: 'omit',
      });

      if (!response.ok) throw new Error('Failed to fetch roles');
      const data = await response.json();

      
      set({ roles: data, loading: false });

      
      localStorage.setItem(
        'roles',
        JSON.stringify({ data, timestamp: Date.now() })
      );
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));