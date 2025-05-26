import { useState, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "@components/layouts/Header";
import UserGreeting from "@components/layouts/UserGreeting";
import MyEquipment from "@components/layouts/MyEquipment";
import PerformanceUpdates from "@components/layouts/PerformanceUpdates";
import EquipmentOverview from "@components/layouts/EquipmentOverview";
import { AuthContext } from "@store/context/AuthContext";
import SubscribedModules from "@components/layouts/SubscribedModules";

function LandingPage() {
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };

  const isLandingPage = location.pathname === "/landingpage";

  const [selectedEquipment, setSelectedEquipment] = useState("");
 

  return (
    <>
      <Header handleLogout={handleLogout} />

      {isLandingPage ? (
        <>
          <UserGreeting />
          <div>
            <SubscribedModules />
          </div>
          <div className="">
            <div className="flex gap-4 max-h-[60vh]">
              <MyEquipment setSelectedEquipment={setSelectedEquipment} selectedEquipment={selectedEquipment}/>
              <EquipmentOverview  selectedEquipment={selectedEquipment} />
              <PerformanceUpdates />
            </div>
          </div>
        </>
      ) : (
        <Outlet /> // Render AddEquipment for /landingpage/addEquipment
      )}
    </>
  );
}

export default LandingPage;
