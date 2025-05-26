import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { CircleChevronLeft, UserPlus, Search, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToggleSwitch } from "@hoc/UI";

const NotificationPreference = ({ onClose }) => {
  const navigate = useNavigate();

  const isNotificationPreference =
    location.pathname === "/landingpage/notificationPreference";
  const [onlineNotifications, setOnlineNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [reactorSettings, setReactorSettings] = useState([
    {
      name: "Agitators",
      frequency: "Daily",
      communication: { online: true, email: true },
    },
  ]);

  const handleFrequencyChange = (index, value) => {
    const updatedSettings = [...reactorSettings];
    updatedSettings[index].frequency = value;
    setReactorSettings(updatedSettings);
  };

  const handleCommunicationChange = (index, type) => {
    const updatedSettings = [...reactorSettings];
    updatedSettings[index].communication[type] =
      !updatedSettings[index].communication[type];
    setReactorSettings(updatedSettings);
  };

  const handleSelectAll = () => {
    const updatedSettings = reactorSettings.map((setting) => ({
      ...setting,
      communication: { online: true, email: true },
    }));
    setReactorSettings(updatedSettings);
  };

  const handleSave = () => {
    console.log("Saving settings:", {
      onlineNotifications,
      emailNotifications,
      reactorSettings,
    });
    // Add API call here later
    onClose();
  };

  return (
    <>
      {isNotificationPreference ? (
        <div className="w-screen h-screen z-50 flex ">
          <div className="bg-white  rounded-lg shadow-lg p-6 relative">
            {/* Header */}
            <div className="flex justify-between items-center  pb-2 mb-4">
            <div className="flex items-center space-x-4">
              <button className="text-gray-400" onClick={() => navigate('/landingpage')}>
                <CircleChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl">Notification Preferences</h1>
               
            </div>
            
              <div className="flex space-x-4">
                <button className="text-gray-600 font-medium">Overview</button>
                <button className="text-gray-600 font-medium">
                  Comparison
                </button>
                <button className="text-blue-600 font-medium border-b-2 border-blue-600">
                  Utilization
                </button>
                <button className="text-gray-600 font-medium">
                  Current Status
                </button>
              </div>
              <button onClick={onClose} className="text-gray-600 text-xl">
                ×
              </button>
            </div>

            {/* Body */}
            <div className="flex">
              {/* Left Section: Toggles */}
              <div className="w-1/3 pr-4 border-r">
                <p className="text-sm text-gray-500 mb-4">
                  Online notifications are enabled by default for the selected
                  attributes. You can completely disable or enable with the
                  toggle button.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Online notifications</span>
                    
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={onlineNotifications}
                        onChange={() =>
                          setOnlineNotifications(!onlineNotifications)
                        }
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600">
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                            onlineNotifications
                              ? "translate-x-5"
                              : "translate-x-1"
                          }`}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        {onlineNotifications ? "Enable" : "Disable"}
                      </span>
                    </label>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Email notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={emailNotifications}
                        onChange={() =>
                          setEmailNotifications(!emailNotifications)
                        }
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600">
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                            emailNotifications
                              ? "translate-x-5"
                              : "translate-x-1"
                          }`}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        {emailNotifications ? "Enable" : "Disable"}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Section: Table */}
              <div className="w-2/3 pl-4">
                <div className="flex justify-between items-center mb-2">
                  <button
                    onClick={handleSelectAll}
                    className="text-blue-600 font-medium"
                  >
                    Select ALL
                  </button>
                  <div className="flex space-x-4">
                    <span className="text-gray-700 font-medium">Frequency</span>
                    <span className="text-gray-700 font-medium">
                      Communication
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  <span>
                    Select frequency: Daily, Weekly or Monthly from dropdown
                  </span>
                  <span className="ml-12">Select mode of communication</span>
                </div>
                <div className="border-t pt-2">
                  {reactorSettings.map((reactor, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b"
                    >
                      <div className="w-1/3">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-gray-700">{reactor.name}</span>
                      </div>
                      <div className="w-1/3">
                        <select
                          value={reactor.frequency}
                          onChange={(e) =>
                            handleFrequencyChange(index, e.target.value)
                          }
                          className="border rounded p-1 text-sm"
                        >
                          <option value="Daily">Daily</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>
                      <div className="w-1/3 flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={reactor.communication.online}
                            onChange={() =>
                              handleCommunicationChange(index, "online")
                            }
                            className="mr-1"
                          />
                          <span className="text-blue-600">Online</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={reactor.communication.email}
                            onChange={() =>
                              handleCommunicationChange(index, "email")
                            }
                            className="mr-1"
                          />
                          <span className="text-blue-600">Email</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSave}
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              © DataTheta 2025. All rights reserved. Reach out to{" "}
              <a
                href="mailto:support@xyz@datatheta.com"
                className="text-red-600"
              >
                support@xyz@datatheta.com
              </a>{" "}
              for technical support.
            </div>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default NotificationPreference;
