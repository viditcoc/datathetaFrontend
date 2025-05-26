import { useState } from "react";
import { Title } from "@hoc/UI";
import HelpFormModal from "@components/layouts/HelpFormModal";
import NotificationPanel from "@components/layouts/NotificationPanel";
import { useNavigate } from 'react-router-dom';
import UserProfileDropdown from '@components/common/userProfileDropdown'
import { ChevronDown, BellDot , SlidersHorizontal, MessageSquareWarning } from 'lucide-react';
 

 

const Header = ({handleLogout}) => {
   
  const navigate = useNavigate();
  const units = [
    { id: 1, name: "FAC MAH2659878 | Siemens Transformer Factory" },
    { id: 2, name: "TESTDFACL MAH02659 | Siemens Test Facility" },
    { id: 3, name: "PROD MAH025698 | Siemens India Limited" },
    { id: 4, name: "FAC MAH259 | Siemens Switchboard Factory" },
  ];

  const [selectedUnit, setSelectedUnit] = useState(units[0]);
  const [open, setOpen] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);

  const handleSelect = (unit) => {
    setSelectedUnit(unit);
    setOpen(false);
  };

  return (
    <>
    <header className="flex justify-between items-center p-4 bg-white h-20 border border-b border-gray-200">
      <Title content="Manufacturing Intelligence Platform v1.0" />
      {/* <h1 className="text-blue-600 font-bold">Manufacturing Intelligence Platform v1.0</h1> */}
      <div className="flex items-center space-x-4">
      <div className="relative inline-block text-left">
      <div className="flex items-center space-x-2">
        <p className="text-gray-400 font-medium text-sm">Manage Unit:</p>
        <button
          onClick={() => setOpen(!open)}
          className="text-sm flex items-center px-2 py-1 border rounded-md border-gray-300 bg-white text-blue-600 font-medium focus:outline-none gap-2"
        >
          {selectedUnit.name}
          {" "}
          <ChevronDown className="mt-1" fill="blue" stroke="0"/>

        </button>
      </div>

      {open && (
        <div className="absolute z-10 mt-0 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {units.map((unit) => (
            <div
              key={unit.id}
              onClick={() => handleSelect(unit)}
              className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
            >
              {unit.name}
            </div>
          ))}
        </div>
      )}
    </div>
        <div className="flex space-x-7 ml-10">
         
          <button onClick={()=> setIsOpenNotification(true)} className="p-1"><BellDot size={20} strokeWidth={1.5} /></button>
          <button className="p-1" onClick={()=> navigate('./userManagement')}><SlidersHorizontal size={20} strokeWidth={1.5} /></button>
          <button onClick={()=> setOpenHelp(true)} className="p-1"><MessageSquareWarning size={20} strokeWidth={1.5} /></button>
          <UserProfileDropdown handleLogout={handleLogout}/>
           
        </div>
 
      </div>
    </header>
    {openHelp && 
      <HelpFormModal onClose={()=> setOpenHelp(false)}/>
    }

    {isOpenNotification && <NotificationPanel onClose={() => setIsOpenNotification(false)} />}

    </>

  )};

  export default Header;