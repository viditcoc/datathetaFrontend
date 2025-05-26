import React, { useState, useEffect, useRef } from "react";
import notificationsData from "./temp/notifications.json";
import { ToggleSwitch } from "@hoc/UI";
import { useNavigate } from 'react-router-dom';

const NotificationPanel = ({ onClose }) => {
  const divRef = useRef();
  const navigate = useNavigate();
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [readUnread, setreadUnread] = useState(false);


  const closeWindow =(e)=>{
    if (divRef.current && !divRef.current.contains(e.target)) {
      onClose();
    }

  }

  useEffect(() => {
    // Simulate API data fetch
    setNotifications(notificationsData);
  }, []);

  useEffect(() => {
    // Simulate API data fetch
    console.log("notifications", notifications);
  }, [notifications]);

  const toggleAccess = async (row) => {
    setreadUnread(!readUnread);
    
    // setreadUnread(null);
    
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "SEVERE":
        return "text-red-600 bg-red-100";
      case "MAJOR":
        return "text-yellow-600 bg-yellow-100";
      case "CONSIDERABLE":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const filteredNotifications = showUnreadOnly
    ? notifications.filter((notif) => !notif.isRead)
    : notifications;

  const newNotificationsCount = notifications.filter(
    (notif) => !notif.isRead
  ).length;

  const navigateToPref=()=>{
    navigate("/landingpage/notificationPreference")
    onClose();

  }

  return (
    <div className="fixed bg-gray-900/80 inset-y-0 left-0 right-0 w-screen h-scree z-50" onClick={closeWindow}>
      <div className="fixed inset-y-0 right-0 w-xl bg-blue-50 p-4 shadow-lg z-50" ref={divRef}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="cursor-pointer text-lg font-bold text-blue-700">Notifications</h2>
          <span  onClick={()=> navigateToPref()} className="cursor-pointer">Preference</span>

          <div className="flex items-center space-x-2">
            {/* <span>Only show unread</span> */}
            {/* <input
            type="checkbox"
            checked={showUnreadOnly}
            onChange={(e) => setShowUnreadOnly(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          /> */}
            <span className="ml-2 mr-2 text-sm text-blue-700 font-medium">
              Unread
            </span>
              
            <ToggleSwitch
              checked={readUnread}
              onChange={() => toggleAccess()}
              label={""}
              // loading={readUnread === 1}
            />
            <span className="ml-2 text-sm text-gray-700">Read</span>
          </div>
        </div>
        {newNotificationsCount > 0 && (
          <p className="text-sm text-blue-700 mb-4">
            You have {newNotificationsCount} new notifications since last login
          </p>
        )}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3 rounded-lg ${getTypeColor(notif.type)}`}
              >
                <strong className="block">{notif.type}</strong>
                <span className="text-sm">{notif.title}</span>
                <p className="text-xs text-gray-500">{notif.message}</p>
                <p className="text-xs text-gray-500">
                  Equip ID: {notif.equipId}
                </p>
              </div>
            ))
          ) : (
            <>
              {/* <p className="text-sm text-gray-500">{notifications.find((n) => n.type === "CONSIDERABLE").message}</p> */}
            </>
          )}
        </div>
        <button
          onClick={onClose}
          className="hidden absolute top-4 right-4 text-blue-600 text-2xl"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default NotificationPanel;
