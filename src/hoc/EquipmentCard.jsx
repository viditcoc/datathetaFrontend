const EquipmentCard = ({ id, name, status, performance, utilization }) => (
  <div className="bg-white p-4 border border-gray-200 rounded-md">
    <div className="flex justify-between gap-6 text-left">
      {/* Reactor */}
      <div className="flex flex-col">
        <div>
          <p className="text-blue-800 font-semibold text-lg">{name}</p>
          <p className="text-gray-500 text-sm mt-3">Current Status: <span className="text-orange-400 font-semibold uppercase">{status}</span></p>
        </div>
        {/* <button className="mt-4 text-gray-500 text-sm hover:underline flex">View Target</button> */}
      </div>

      {/* Current Status */}
      {/* <div className="flex flex-col">
        <p className="text-gray-500 text-sm">Current Status</p>
        <p className="text-blue-800 font-normal text-3xl">{status}</p>
        <button className="mt-4 text-gray-500 text-sm hover:underline flex">View Actual</button>
      </div> */}

      {/* Average Performance */}
      <div className="grid grid-cols-2 gap-6">
      <div className="flex flex-col">
        <p className="text-gray-500 text-sm">Average Performance</p>
        <p className="text-blue-800 font-bold text-3xl">{performance}%</p>
        {/* <button className="mt-4 text-gray-500 text-sm hover:underline flex">Compare</button> */}
      </div>

      {/* Total Utilization */}
      <div className="flex flex-col">
        <p className="text-gray-500 text-sm">Total Utilization</p>
        <p className="text-blue-800 font-semibold text-3xl">{utilization} Hrs</p>
        {/* <button className="mt-4 text-gray-500 text-sm hover:underline flex">View Utilization</button> */}
      </div>
      </div>
    </div>
  </div>
);

export default EquipmentCard;
