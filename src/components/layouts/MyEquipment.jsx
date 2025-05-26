import React, { useState, useEffect } from "react";
import { Title } from "@hoc/UI";
import EquipmentItem from "@hoc/EquipmentItem";
import { Search } from "lucide-react";
import { useEquipmentStore } from "@store/equipmentStore";

const MyEquipment = ({ setSelectedEquipment, selectedEquipment }) => {
  const {
    equipments,
    loading: equipmentsLoading,
    error: equipmentsError,
  } = useEquipmentStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("equipments", equipments);
  }, [equipments]);

  // Filter equipments based on search term
  const filteredEquipments = equipments.filter((item) =>
    item.equipment_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-1/4 p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <Title content="My Equipment" />
        <button className="text-sm">Show All</button>
      </div>
      <div className="bg-gray-50 p-4 flex-1 max-h-[95%]">
        <div className="mb-4 flex items-center relative">
          <input
            type="text"
            placeholder="Search Equipment"
            className="w-full p-2 border border-blue-400 text-gray-900 placeholder-blue-200 focus:outline-none focus:ring-1 focus:ring-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="ml-2 p-2 bg-transparent text-blue-500 absolute right-0 top-1">
            <Search size={20} />
          </button>
        </div>
        <ul className="space-y-2 max-h-[90%] overflow-y-auto">
          {equipmentsLoading ? (
            <div>Loading...</div>
          ) : equipmentsError ? (
            <div>Error: {equipmentsError}</div>
          ) : filteredEquipments.length > 0 ? (
            filteredEquipments.map((item) => (
              <EquipmentItem
                key={item.equipment_id}
                title={item.equipment_name}
                id={item.equipment_id}
                analytics={true}
                bookmark={true}
                list={true}
                setSelectedEquipment={setSelectedEquipment}
                selectedEquipment={selectedEquipment}
              />
            ))
          ) : (
            <div>No equipment found</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MyEquipment;