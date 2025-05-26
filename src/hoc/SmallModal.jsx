import React from "react";

const SmallModal = ({ children, onClose }) => {
  return (
    <div className="bg-indigo-100 fixed inset-0 bg-opacity-50 flex justify-center z-50 overflow-auto">
      <div className="bg-white p-6 w-full flex">
        <div className="bg-indigo-100  p-10 m-10 w-[70%] m-auto  min-h-[40vh]">{children}</div>
      </div>
    </div>
  );
};

export default SmallModal;
