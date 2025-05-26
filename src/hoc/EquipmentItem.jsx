import { ChartNoAxesCombined, List, BookmarkX } from 'lucide-react';
 
import { useNavigate } from 'react-router-dom';

const EquipmentItem = ({ id, title, analytics, bookmark, list, selectedEquipment, setSelectedEquipment }) => {
  const isSelected = id === selectedEquipment;
  const navigate = useNavigate();

  const handleSelect = () => {
    setSelectedEquipment(id);
  };

 
  return (
    <li
      className={`flex items-center justify-between p-2 cursor-pointer hover:bg-blue-100 ${isSelected ? 'bg-blue-100' : ''}`}
      onClick={handleSelect}
    >
      <span className="text-blue-800">{title}</span>
      <div className="flex space-x-2">
        {analytics && (
          <button className="p-1" onClick={()=> navigate(`/dashboard?equipmentId=${id}`)}>
          {/*  <button className="p-1" onClick={() => navigate("./userController", { state: { equipmentId: id } })} > */}
            <ChartNoAxesCombined className="text-blue-600" />
          </button>
        )}
        {list && (
          <button className="p-1">
            <List className="text-blue-600" />
          </button>
        )}
        {bookmark && (
          <button className="p-1">
            <BookmarkX className="text-blue-600" />
          </button>
        )}
      </div>
    </li>
  );
};

export default EquipmentItem;