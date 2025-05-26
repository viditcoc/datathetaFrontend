import { useMemo } from "react";
import { Title } from "@hoc/UI";
import EquipmentCard from "@hoc/EquipmentCard";
import { useEquipmentStore } from "@store/equipmentStore";

const EquipmentOverview = ({ selectedEquipment }) => {
  const { equipments } = useEquipmentStore();

  const filteredItems = useMemo(() => {
    if (!equipments || !selectedEquipment) return [];
    return equipments.filter((x) => x.equipment_id === selectedEquipment);
  }, [equipments, selectedEquipment]);

  const itemsToRender = filteredItems.flatMap((equipment) =>
    equipment.items?.map((item) => ({
      id: item.item_id,
      name: item.item_name,
      location: item.location_name,
      loc_id: item.loc_id, // Separate prop for loc_id
      status: "Active",
      performance: "77.88",
      utilization: "256",
    })) || []
  );

  return (
    <div className="flex-1 p-4">
      <div className="flex justify-between items-center mb-4">
        <Title content="Equipment Performance Overview" />
        <a href="/dashboard" className="text-sm">Show All</a>
      </div>
      <div className="grid grid-cols-1 gap-4 space-y-2 max-h-[90%] overflow-y-auto">
        {itemsToRender.length > 0 ? (
          itemsToRender.map((item) => (
            <EquipmentCard
              key={item.id}
              id={item.id}
              name={item.name}
              status={item.status}
              location={item.location}
              loc_id={item.loc_id} // Pass loc_id if needed
              performance={item.performance}
              utilization={item.utilization}
            />
          ))
        ) : (
          <div>No Items</div>
        )}
      </div>
    </div>
  );
};

export default EquipmentOverview;