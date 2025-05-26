import React, { useState } from "react";
import SmallModal from "@hoc/SmallModal";
import useFetchEquipment from "@hooks/useFetchEquipment";
import LoadingSpinner from "@components/common/LoadingSpinner";
import { InputText,CloseButton } from "@hoc/UI";

const EquipmentModal = ({ onClose }) => {
  const { equipmentItems, loading, error } = useFetchEquipment();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter equipment items based on search term
  const filteredItems = equipmentItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <SmallModal onClose={onClose}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl">Select Equipment</h1>
        <div className="w-2xs flex gap-10">
          <InputText
            type="text"
            placeholder="search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border-gray-400"
          />
     
            <CloseButton onClick={onClose}/>
            </div>
        
      </div>
      <div className=" pt-6 w-full">
        {loading ? (
          <LoadingSpinner className="col-span-3" />
        ) : (
          <>
            {error && <p className="text-red-500 mb-4">Error: {error}</p>}
            <div className=" rounded-lg">
              <div className="space-y-2 grid grid-cols-3 gap-4">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <div key={index} className=" w-full h-12 text-blue-900">
                      {item.title}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-3">
                    No equipment found.
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </SmallModal>
  );
};

export default EquipmentModal;