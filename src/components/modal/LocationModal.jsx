import React, { useState, useEffect } from "react";
import { useLocationStore } from "@store/locationStore";
import { useNavigate } from "react-router-dom";
import {
  CircleChevronLeft,
  Search,
} from "lucide-react";
import { Checkbox } from "@hoc/UI";

const LocationModal = ({ onClose, onSelect, selectedLocations }) => {
  const navigate = useNavigate();
  const { locations } = useLocationStore();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [selectedLocationIds, setSelectedLocationIds] = useState(
    Array.isArray(selectedLocations) ? [...selectedLocations] : []
  ); 

  
  useEffect(() => {
    if (locations && locations.length > 0) {
      const uniqueCountries = [...new Set(locations.map((loc) => loc.country))].sort();
      setCountries(uniqueCountries);
      setSelectedCountry(uniqueCountries[0]);
    }
  }, [locations]);

  
  useEffect(() => {
     
    if (Array.isArray(selectedLocations)) {
      setSelectedLocationIds([...selectedLocations]); 
    } else {
      setSelectedLocationIds([]);
    }
  }, [selectedLocations]);

 
  useEffect(() => {
    if (selectedCountry) {
      const filtered = locations.filter((loc) => loc.country === selectedCountry);
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  }, [selectedCountry, locations]);

  
  const handleCheckboxChange = (locationId) => {
    setSelectedLocationIds((prev) =>
      prev.includes(locationId)
        ? prev.filter((id) => id !== locationId)
        : [...prev, locationId]
    );
  };

  
  const handleConfirmSelection = () => {
    onSelect(selectedLocationIds); 
    onClose();
  };

  return (
    <div className="fixed inset-50 z-50 flex items-center justify-center bg-black bg-indigo-100 w-screen left-0 top-20 h-screen p-10">
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <button className="text-gray-400" onClick={() => onClose()}>
              <CircleChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl">Select Location</h1>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Location"
              className="border px-3 py-2 pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Side: Countries */}
          <div className="w-[280px] bg-white p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Locations Available</h3>
            <ul className="bg-indigo-200">
              {countries.map((country) => (
                <li
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`p-2 cursor-pointer ${
                    selectedCountry === country
                      ? "bg-blue-800 text-white activeSlab relative"
                      : "hover:bg-indigo-100"
                  }`}
                >
                  {country}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Locations */}
          <div className="w-3/4 p-6 overflow-y-auto">
            <h3 className="text-sm font-normal text-gray-700 mb-3">
              Locations available
            </h3>
            {filteredLocations.length === 0 ? (
              <p className="text-gray-500 py-4">No locations available</p>
            ) : (
              <ul className="grid grid-cols-3 gap-5">
                {filteredLocations.map((location) => (
                  <li
                    key={`loc_${location.id}`} 
                    className="p-4 border border-blue-300 hover:bg-indigo-50 cursor-pointer"
                  >
                    <div className="flex justify-between flex-col">
                      <div className="flex gap-2 mb-2">
                        <Checkbox
                          id={`loc_${location.id}`}
                          checked={selectedLocationIds.includes(location.id)}
                          onChange={() => handleCheckboxChange(location.id)}
                        />
                        <p className="text-sm text-gray-500">{location.address}</p>
                      </div>
                      <p className="text-blue-600 font-medium">{location.name}</p>
                      <span className="text-gray-800">{location.id}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Footer with Save Button */}
        <div className="flex justify-end p-4 fixed bottom-0 right-0">
          <button
            onClick={handleConfirmSelection}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={selectedLocationIds.length === 0}
          >
            Save Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal; 