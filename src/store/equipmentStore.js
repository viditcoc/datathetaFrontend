
import { create } from 'zustand';



const isCacheFresh = (timestamp) => {
  const oneDay = 24 * 60 * 60 * 1000; 
  return Date.now() - timestamp < oneDay;
};


export const useEquipmentStore = create((set) => ({
  equipments: [],
  loading: false,
  error: null,

  fetchEquipments: async (force = false) => {
    set({ loading: true, error: null });
    try {
      if (!force) {
 
        const cachedData = localStorage.getItem('equipments');
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          if (isCacheFresh(timestamp)) {
            set({ equipments: data, loading: false });
            return;
          }
        }
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/equipment`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'User-Agent': 'PostmanRuntime/7.42.0',
          'ngrok-skip-browser-warning': 'true',
        },
        mode: 'cors',
        credentials: 'omit',
      });

      if (!response.ok) throw new Error('Failed to fetch equipments');
      const data = await response.json();

      set({ equipments: data, loading: false });

      localStorage.setItem(
        'equipments',
        JSON.stringify({ data, timestamp: Date.now() })
      );
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error(error)
    }
  },
}));