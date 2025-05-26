import React from 'react';
import { BarChart2, List, Settings, Clock, Search } from 'lucide-react';

// SubscribedModules Component
const SubscribedModules = () => {
  const tabs = [
    { name: "Overview", icon: <BarChart2 className="w-5 h-5 mr-2" /> },
    { name: "Comparison", icon: <List className="w-5 h-5 mr-2" /> },
    { name: "Utilization", icon: <Settings className="w-5 h-5 mr-2" /> },
    { name: "Current Status", icon: <Clock className="w-5 h-5 mr-2" /> },
    { name: "What-if Analysis", icon: <Search className="w-5 h-5 mr-2" /> },
  ];

  return (
    <div className="mx-4 bg-indigo-100 mb-2">
      <div className="flex items-center px-6 py-2">
        <h2 className=" font-semibold text-blue-600">Subscribed Modules:</h2>
        <div className="flex space-x-4 mx-10">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`flex items-center px-4 py-2 font-normal rounded-md transition-colors duration-200 text-blue-600`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// App Component to wrap SubscribedModules
const App = () => {
  return (
     
      <SubscribedModules />    
  );
};

export default App;