import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams  } from 'react-router-dom';
import Modal from "@hoc/Modal";
import Locations from "@components/layouts/Locations";
import Equipments from "@components/layouts/Equipments";
import TeamMembers from "@components/layouts/TeamMembers";
import {
  Search,
  LayoutPanelLeft,
  X,
  MapPin,
  Users,
  AppWindow,
} from "lucide-react";

// Reusable Tab Metric Component (clickable)
const TabMetric = ({ icon: Icon, label, value, active, onClick,  }) => (
  <button
    onClick={onClick}
    className="flex items-center border-l border-gray-300 px-6 hover:bg-gray-50 focus:outline-none"
  >
    <div>
      <div className={`text-sm font-medium ${active ? "text-blue-700" : "text-gray-500"}`}>
        {label}
      </div>
      <div className="flex items-center gap-2">
        <Icon className={active ? "text-blue-700" : "text-gray-500"} size={30} strokeWidth={1.5} />
        <div className={`text-3xl font-semibold ${active ? "text-blue-700" : "text-gray-700"}`}>
          {value}
        </div>
      </div>
    </div>
  </button>
);

const AllStats = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(() => {
    const tabFromUrl = searchParams.get('tab');
    return tabFromUrl && ['Equipments', 'Locations', 'Team'].includes(tabFromUrl)
      ? tabFromUrl
      : 'Locations';
  });
 
  useEffect(() => {
    // setSearchParams({ tab: currentTab }, { replace: false });
  }, [currentTab, setSearchParams]);


  // Determine which component to render
  const renderTabContent = () => {
    switch (currentTab) {
      case "Equipments":
        return <Equipments />;
      case "Team":
        return <TeamMembers />;
      case "Locations":
      default:
        return <Locations />;
    }
  };

  return (
     
      <div className="bg-white w-full h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div className="flex items-center space-x-8">
            <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded text-sm text-gray-700 hover:text-blue-600 hover:border-blue-400" onClick={()=> navigate(-1)}>
              <LayoutPanelLeft className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <div>
              <h1 className="text-xl font-semibold text-gray-900"></h1>
              <p className="text-sm text-gray-400">
                (#) Indicates the number of 
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <TabMetric
                icon={AppWindow}
                label="Equipment's"
                value={11}
                active={currentTab === "Equipments"}
                onClick={() => setCurrentTab("Equipments")}
              />
              <TabMetric
                icon={MapPin}
                label="Locations"
                value={23}
                active={currentTab === "Locations"}
                onClick={() => setCurrentTab("Locations")}
              />
              <TabMetric
                icon={Users}
                label="Team members"
                value={445}
                active={currentTab === "Team"}
                onClick={() => setCurrentTab("Team")}
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder={`Search ${currentTab}`}
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-2 top-2.5 w-4 h-4 text-gray-500" />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full" onClick={()=>navigate(-1)}>
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">{renderTabContent()}</div>
      </div>
 
  );
};

export default AllStats;
