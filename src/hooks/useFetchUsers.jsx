import { useState, useEffect } from 'react';

const useFetchUsers = () => {
  const [users, setusers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchusers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users`, {
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

        // const items = data.flatMap(users =>
        //   users.map(item => ({
        //     title: item.item_name,
        //     analytics: false,
        //     bookmark: false,
        //     list: false,
        //   }))
        // );
        setusers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchusers();
  }, []);

  return { users, loading, error };
};

export default useFetchUsers;