import React, { useState } from "react";
import user from "../assets/user.png";
import {
  ChevronDown,
  BellDot,
  SlidersHorizontal,
  LayoutDashboard,
  Eye,
  BarChart,
  Gauge,
  Clock,
  Brain,
} from "lucide-react";
import UserProfileDropdown from "@components/common/userProfileDropdown";

const Header = ({ handleLogout }) => {
  const [isOpenNotification, setIsOpenNotification] = useState(false);

  return (
    <header className="bg-white p-4 flex justify-between items-center border-b border-gray-200">
      <div className="flex items-center space-x-6 w-full">
        <a href="/landingpage" className="text-teal-500 font-bold text-2xl">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </a>
        <nav className="flex space-x-4 items-center justify-between w-full px-20">
          <a
            href="#"
            className="text-blue-900 hover:underline text-sm flex items-center"
          >
            <LayoutDashboard size={16} className="mr-1" />
            Dashboard
          </a>
          <button className="bg-blue-900 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <Eye size={16} className="mr-1" />
            Overview
          </button>
          <a
            href="#"
            className="text-blue-900 hover:underline text-sm flex items-center"
          >
            <BarChart size={16} className="mr-1" />
            Comparison
          </a>
          <a
            href="#"
            className="text-blue-900 hover:underline text-sm flex items-center"
          >
            <Gauge size={16} className="mr-1" />
            Utilization
          </a>
          <a
            href="#"
            className="text-blue-900 hover:underline text-sm flex items-center"
          >
            <Clock size={16} className="mr-1" />
            Current Status
          </a>
          <a
            href="#"
            className="text-blue-900 hover:underline text-sm flex items-center"
          >
            <Brain size={16} className="mr-1" />
            What-if Analysis
          </a>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={() => setIsOpenNotification(true)} className="p-1">
          <BellDot size={20} strokeWidth={1.5} />
        </button>
        <button className="p-1">
          <SlidersHorizontal size={20} strokeWidth={1.5} />
        </button>
        <UserProfileDropdown handleLogout={handleLogout} />
      </div>
    </header>
  );
};

export default Header;
