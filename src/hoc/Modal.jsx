import React from 'react';

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center z-50 overflow-auto">
         {children}
    </div>
  );
};

export default Modal;