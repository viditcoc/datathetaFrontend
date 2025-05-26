import React, { useState, useEffect } from 'react';
import LocationItem from "@hoc/LocationItem";

const Locations = ({ onClose, title = 'List of Locations', totalLocations = 27, supervisedLocations = 27 }) => {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch locations data from the API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true); // Ensure loading is true at the start
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

        // Ensure data is an array
        if (!Array.isArray(data)) {
          throw new Error('Expected an array but received a different type');
        }

        // Map the API data to the format expected by LocationItem
        const formattedLocations = data.map(location => ({
          id: location.id,
          name: location.name,
          location: location.address,
        }));

        setLocations(formattedLocations);
      } catch (error) {
        console.error('Error fetching locations:', error);
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false after the fetch completes
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="p-4 rounded-lg">
      {loading ? (
        <div className="flex justify-center col-span-3">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"
            />
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          {error && <p className="text-red-500 mb-4">Error: {error}</p>}
          <div className="space-y-0 grid grid-cols-3 gap-4">
            {locations.length > 0 ? (
              locations.map((loc) => (
                <div key={loc.id} className="bg-white w-full border border-gray-300">
                  <LocationItem
                    title={loc.name}
                    id={loc.id}
                    location={loc.location}
                  />
                </div>
              ))
            ) : (
              !error && <p className="text-gray-500 col-span-3">No locations available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Locations;