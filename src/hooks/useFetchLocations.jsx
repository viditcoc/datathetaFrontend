import { useState, useEffect } from 'react';

const useFetchLocations = () => {
  const [LocationItems, setLocationsItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

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

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('Non-JSON response:', text);
          throw new Error('Response is not JSON');
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('Expected an array but received a different type');
        }

        const items = data.flatMap(locations =>
          locations.items.map(item => ({
            title: item.item_name,
            analytics: false,
            bookmark: false,
            list: false,
          }))
        );
        setLocationsItems(items);
      } catch (error) {
        console.error('Error fetching locations:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { LocationItems, loading, error };
};

export default useFetchLocations;