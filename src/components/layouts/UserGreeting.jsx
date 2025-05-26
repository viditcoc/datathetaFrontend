import { useState } from "react";
import { useNavigate } from 'react-router-dom';
// import AddNewEquipmentModal from "@components/layouts/AddNewEquipmentModal"; 

import {Plus,   MapPin,
  Users,
  AppWindow } from 'lucide-react';
const UserGreeting = () => {
  const [isOpenGreetingModal, setIsOpenGreetingModal] = useState(false);
  const [isOpenLocation, setIsLocationOpen] = useState(false);
  const [isOpenEquipment, setIsOpenEquipment] = useState(false);
  const [isOpenTeam, setIsOpenTeam] = useState(false);
  const [isOpenAddNewEq, setIsOpenAddNewEq] = useState(false);
  const navigate = useNavigate();

  const handleTabNavigation = (tab)=>{
    // navigate('allStats');
    navigate(`allStats?tab=${tab}`);
  }
  return (
    <>
      <div className="px-4">
      {/* bg-gradient-to-r from-blue-900 to-blue-800  */}
        <div className="bg-greeting text-white p-6  flex justify-between items-center">
          <div className="flex  space-x-4 flex-col">
            <div className="h-15 flex">
              <span className="text-teal-400 font-bold text-2xl">SIEMENS</span>
            </div>
            <div>
              <p className="text-xl font-normal">Welcome back,</p>
              <h2 className="text-4xl font-bold">JONATHAN</h2>
              <p className="text-xl font-thin">Director</p>
            </div>
          </div>
          <div className="flex space-x-20 text-left">
            <div>
              <p>Equipment</p>
              <p className="text-6xl font-light font-extrabold my-2">86</p>
              <button  onClick={() => {
                  handleTabNavigation('Equipments');
                }}
  className="mt-4 px-2 py-1 bg-transparent border border-white rounded-lg flex gap-2 h-10 items-center">
                <AppWindow strokeWidth={1}/> See All
              </button>
            </div>
            <div>
              <p>Locations</p>

              <p className="text-6xl font-light font-extrabold my-2">10</p>
              <button onClick={()=> { handleTabNavigation('Locations')}} className="mt-4 px-2 py-1 bg-transparent border border-white rounded-lg flex gap-2 h-10 items-center">
               <MapPin  strokeWidth={1}/> See All
              </button>
            </div>
            <div>
              <p>Team</p>

              <p className="text-6xl font-light font-extrabold my-2">26</p>
              <button onClick={() => {
                  handleTabNavigation('Team');
                }} className="mt-4 px-2 py-1 bg-transparent border border-white rounded-lg flex gap-2 h-10 items-center">
               <Users  strokeWidth={1}/> See All
              </button>
            </div>
          </div>
          <div className="text-right">
            <div className="flex flex-col gap-2 items-center bg-blue-100/70 text-blue-700 py-6 p-10 rounded-lg cursor-pointer" onClick={()=> navigate('addEquipment')}>
              <Plus size={30}/>
              <h3 className="text-xl font-light">Add Equipment & Item</h3>
              <p className="text-sm text-gray-500">Click here to onboard new equipment</p>


            </div>
            {/* <p className="font-bold mb-6">SUPER ADMIN</p>
            <p className="text-sm mb-2">UTC 2025-03-17T09:36:34Z</p>
            <p className="text-sm mb-2">2nd Shift: 09:00:00 - 21:00:00</p>
            <p className="text-sm mb-2">Shift Time Left: 19:05:03</p> */}
          </div>
        </div>
      </div>
      
      

 
      {/* {isOpenAddNewEq && 
      <AddNewEquipmentModal
        onClose={() => setIsOpenAddNewEq(false)}
     
      />
      } */}


      {/* {isOpenLocation && 
      <LocationsModal
        onClose={() => setIsLocationOpen(false)}
        title="List of Location"
        totalLocations={50}
        supervisedLocations={30}
      />
      } */}

      
       {/* {isOpenEquipment && 
      <EquipmentsModal
        onClose={() => setIsOpenEquipment(false)}
        title="List of Equipment's"
        totalLocations={50}
        supervisedLocations={30}
      />
      } */}
      
    </>
  );
};

export default UserGreeting;
