import React, { useState, useEffect } from "react";
import { useEquipmentStore } from "@store/equipmentStore";
import { useLocationStore } from "@store/locationStore";

import { useNavigate } from "react-router-dom";
import { CircleChevronLeft, Search } from "lucide-react";
import { Checkbox } from "@hoc/UI";

const EquipmentModal = ({
  onClose,
  onSelect,
  selectedEquipments,
  selectedLocations,
}) => {
  const navigate = useNavigate();
  const { equipments } = useEquipmentStore();
  const { locations } = useLocationStore();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const [filteredEquipments, setFilteredEquipments] = useState([]);
  const [selectedEquipmentIds, setSelectedEquipmentIds] = useState(
    Array.isArray(selectedEquipments) ? [...selectedEquipments] : []
  );

  useEffect(() => {
    if (locations && locations.length > 0) {
      const countryMap = locations.reduce((acc, loc) => {
        if (!acc[loc.country]) {
          acc[loc.country] = { name: loc.country, locationId: loc.id };
        }
        return acc;
      }, {});
      const uniqueCountries = Object.values(countryMap).sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setCountries(uniqueCountries);
      setSelectedCountry(uniqueCountries[0]);
    }
  }, [locations]);

  useEffect(() => {
    if (Array.isArray(selectedEquipments)) {
      setSelectedEquipmentIds([...selectedEquipments]);
    } else {
      setSelectedEquipmentIds([]);
    }
  }, [selectedEquipments]);

   

  useEffect(() => {
    if (selectedCountry && selectedCountry.locationId) {
      const filtered = equipments
        .map((eq) => ({
          ...eq,
          items: eq.items.filter(
            (item) => item.loc_id === selectedCountry.locationId
          ),
        }))
        .filter((eq) => eq.items.length > 0);
      setFilteredEquipments(filtered);
    } else {
      setFilteredEquipments([]);
    }
  }, [selectedCountry, equipments]);

  const handleCheckboxChange = (equipmentId) => {
    setSelectedEquipmentIds((prev) =>
      prev.includes(equipmentId)
        ? prev.filter((id) => id !== equipmentId)
        : [...prev, equipmentId]
    );
  };

  const handleConfirmSelection = () => {
    onSelect(selectedEquipmentIds);
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
            <h1 className="text-2xl">Select Equipment</h1>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Equipment"
              className="border px-3 py-2 pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Side: Countries */}
          <div className="w-[280px] bg-white p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Equipments Available
            </h3>
            <ul className="bg-indigo-200">
              {countries.map((country) => (
                <li
                  key={country.locationId}
                  data-id={country.locationId}
                  onClick={() => setSelectedCountry(country)}
                  className={`p-2 cursor-pointer ${
                    selectedCountry?.locationId === country.locationId
                      ? "bg-blue-800 text-white activeSlab relative"
                      : "hover:bg-indigo-100"
                  }`}
                >
                  {country.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Equipments */}
          <div className="w-3/4 p-6 overflow-y-auto">
            <h3 className="text-sm font-normal text-gray-700 mb-3">
              Equipments available
            </h3>
            {filteredEquipments.length === 0 ? (
              <p className="text-gray-500 py-4">No equipments available</p>
            ) : (
              <ul className="grid grid-cols-3 gap-5">
                {filteredEquipments.map((equipment) =>
                  equipment.items.map((item) => (
                    <li
                      key={`item_${item.item_id}`}
                      className="p-4 border border-blue-300 hover:bg-indigo-50 cursor-pointer"
                    >
                      <div className="flex justify-between flex-col">
                        <div className="flex gap-2 mb-2">
                          <Checkbox
                            id={`item_${item.item_id}`}
                            checked={selectedEquipmentIds.includes(
                              item.item_id
                            )}
                            onChange={() => handleCheckboxChange(item.item_id)}
                          />
                          <p className="text-sm text-gray-500">
                            {item.location_name}
                          </p>
                        </div>
                        <p className="text-blue-600 font-medium">
                          {item.item_name}
                        </p>
                        <span className="text-gray-800">{item.item_id}</span>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>

        {/* Footer with Save Button */}
        <div className="flex justify-end p-4 fixed  bottom-0 right-0">
          <button
            onClick={handleConfirmSelection}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={selectedEquipmentIds.length === 0}
          >
            Save Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentModal;
