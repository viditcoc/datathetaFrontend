import React, { useState } from "react";
import user from '@assets/user.png';
import { ChevronDown } from 'lucide-react';

const UserProfileDropdown = ({handleLogout}) => {
     
    const [isOpenUserDropdown, setIsOpenUserDropdown] = useState(false);

    const handleUserOptions = () => {
      setIsOpenUserDropdown((prev) => !prev); 
    };

    const handleOptionClick = (action) => {
        setIsOpenUserDropdown(false); 
        switch (action) {
          case "profile":
            console.log("Navigating to My Profile");
            
            break;
          case "change-password":
            console.log("Navigating to Change Password");
            
            break;
          case "logout":
            console.log("Logging out");
            handleLogout && handleLogout()
    
            
            break;
          default:
            break;
        }
      };
    return (
        <div className="relative flex items-center space-x-2 mr-2">
        <img
          src={user}
          alt="User"
          className="w-6 h-6 rounded-full w-8 h-8 border border-gray-300"
        />
        <div
          className="cursor-pointer flex items-center gap-3 select-none"
          onClick={handleUserOptions}
        >
          <div className="flex flex-col">
            <span className="text-blue-900 text-sm">Jonathan</span>
            <span className="text-gray-500 text-xs">Admin</span>
          </div>
          <ChevronDown size={16} strokeWidth={1.5} />
        </div>
         
          <div className={`fixed top-12 right-10 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 ${!isOpenUserDropdown && 'hidden'}`}>
            <ul className="py-1">
              <li
                className="px-4 py-2 text-sm text-blue-900 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick("profile")}
              >
                My Profile
              </li>
              <li
                className="px-4 py-2 text-sm text-blue-900 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick("change-password")}
              >
                Change Password
              </li>
              <li
                className="px-4 py-2 text-sm text-blue-900 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick("logout")}
              >
                Logout
              </li>
            </ul>
          </div>
        
      </div>
    )
}
export default UserProfileDropdown;