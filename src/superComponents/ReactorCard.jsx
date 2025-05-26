import React from "react";
import { Info, Pin, Star, Trash2 } from "lucide-react"; // Optional, for checkbox
import reactor from "../assets/reactor.png";
const ReactorCard = ({
  key,
  name,
  averagePerformance,
  status,
  week,
  weeklyData = [],
  isHighlighted = false,
}) => {
  const performanceColor =
    averagePerformance >= 75
      ? "text-blue-700"
      : averagePerformance >= 40
      ? "text-orange-600"
      : "text-red-600";

  return (
    <div className=" w-[300px] flex-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-medium text-blue-900">{name}</h3>

        <div className="flex gap-2">
          <Pin stroke="#555" size={18} strokeWidth={1.2} />{" "}
          <Star stroke="#555" size={18} strokeWidth={1.2} />{" "}
          <Trash2 stroke="#555" size={18} strokeWidth={1.2} />
        </div>
      </div>

      <div className="bg-white p-5 shadow">
        {/* Average Performance */}
        <div className="flex gap-4">
          <div>
            <img src={reactor} className="h-18" />
          </div>
          <div className="text-left w-full">
            <p className="text-sm text-gray-500 flex justify-between items-center">
              Average Performance
              <Info size={15} />
            </p>
            <p className={`text-5xl font-bold ${performanceColor}`}>
              {averagePerformance.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Status + Week */}
        <div className="mt-4  flex justify-between">
          <div>
          <p className="text-sm text-gray-600">Current Status</p>
          <p className="font-medium text-lg text-blue-800">{status}</p>
          </div>
          <div>
          <p className="text-sm text-gray-600">Week</p>

          <p className="font-medium text-lg  text-blue-800">{week}</p>
          </div>
        </div>

        {/* Weekly Performance */}
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-1">Weekly Performance</p>
          <div className="space-y-1 max-h-[200px] overflow-y-auto">
            {weeklyData.map((item, idx) => (
              <div key={idx} className="flex items-center">
                <span className="w-[65px] text-xs text-gray-500">{item.week}</span>
                <div className="flex-1">
                <div
                  className={` bg-gray-900 text-white text-right text-xs p-1`}
                  style={{ width: item.value < 15 ? `15%` : item.value <= 100 ? `${item.value}%` : `100%`  }}
                >
                    {Math.round(item.value).toFixed(0)}%
                    </div>
                </div>
                {/* <span className="text-xs text-white bg-blue-900 px-1 rounded">
                  {item.value.toFixed(2)}%
                </span> */}
              </div>
            ))}
          </div>
        </div>

        {/* Add to Comparison */}
        <div className="mt-4 bg-indigo-50 p-2 rounded flex items-center space-x-2">
          <input
            type="checkbox"
            name={key}             
            className="accent-indigo-500"
          />
          <span className="text-sm text-indigo-900 font-medium">
            Add to Comparison
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReactorCard;
