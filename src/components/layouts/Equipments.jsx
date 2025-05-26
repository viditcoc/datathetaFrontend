import React from 'react';
import EquipmentItem from '@hoc/EquipmentItem';
import useFetchEquipment from '@hooks/useFetchEquipment';
import LoadingSpinner from '@components/common/LoadingSpinner';

const EquipmentsModal = () => {
  const { equipmentItems, loading, error } = useFetchEquipment();

  return (
    <div className="bg-white p-6 w-full">
      {loading ? (
        <LoadingSpinner className="col-span-3" />
      ) : (
        <>
          {error && <p className="text-red-500 mb-4">Error: {error}</p>}
          <div className="p-4 rounded-lg">
            <div className="space-y-2 grid grid-cols-3 gap-4">
              {equipmentItems.map((item, index) => (
                <div key={index} className="bg-white w-full h-12">
                  <EquipmentItem
                    title={item.title}
                    analytics={item.analytics}
                    bookmark={item.bookmark}
                    list={item.list}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EquipmentsModal;