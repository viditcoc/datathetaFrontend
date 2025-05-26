// src/components/common/CommonComponents.jsx
import React from "react";
import { ChevronDown, Check } from 'lucide-react';


export function Title({ content }) {
  return (
    <h1 className="text-blue-600 font-medium">
      {content}
    </h1>
  );
}

export function CommonButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
    >
      {label}
    </button>
  );
}

export function InputText({ value, onChange, className = '', ...props }) {
  const defaultClasses = 'w-full p-2 rounded-none border border-gray-200';
  const combinedClasses = `${defaultClasses} ${className}`.trim();

  return (
    <input
      className={combinedClasses}
      onChange={onChange}
      value={value}
      {...props}
    />
  );
}

export function Textarea({ value , onChange, ...props }) {
    return (
      <textarea className="w-full p-2 bg-gray-50 rounded-none border border-gray-200" onChange={onChange} value={value} {...props}/>               
    );
}



export function FilterDropdown({ options , onChange, ...props }) {
  return (
    <>
    <select className="w-full p-1.5 px-3 text-sm bg-transparent text-white border border-gray-500 appearance-none" onChange={onChange}>
      {options}
    </select>
    <ChevronDown className="w-4 h-4 absolute right-2 top-2 text-white pointer-events-none" />
    </>
  );
}


// =======================================================================//

export function InputText2({ value , onChange, ...props  }) {
  return (
    <input className="w-full bg-white p-1.5 px-3 text-sm bg-transparent text-gray-500 border border-indigo-200 placeholder-indigo-200 font-normal" onChange={onChange} value={value} {...props}/>               
  );
}

export function Button2({ value , onClick, addtionalClass, ...props  }) {
  return (
    <button className={`${addtionalClass} bg-white p-1.5 px-3 text-sm bg-transparent text-gray-500 border border-indigo-200 placeholder-indigo-200 font-normal`} onClick={onClick} {...props}>
      {value}
      </button>               
  );
}


export function CloseButton({ onClick  }) {
  return (
    <button onClick={onClick} className="text-blue-600 text-2xl">
    <svg
      id="fi_2961937"
      height="28"
      viewBox="0 0 64 64"
      width="28"
      fill="blue"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m4.59 59.41a2 2 0 0 0 2.83 0l24.58-24.58 24.59 24.58a2 2 0 0 0 2.83-2.83l-24.59-24.58 24.58-24.59a2 2 0 0 0 -2.83-2.83l-24.58 24.59-24.59-24.58a2 2 0 0 0 -2.82 2.82l24.58 24.59-24.58 24.59a2 2 0 0 0 0 2.82z"></path>
    </svg>
  </button>             
  );
}


export function Textarea2({ value , onChange, ...props }) {
  return (
    <textarea className="w-full bg-white p-1.5 px-3 text-sm bg-transparent text-gray-500 border border-indigo-200 placeholder-indigo-200 font-normal" onChange={onChange} value={value} {...props}/>               
  );
}
export function FilterDropdown2({ options, onChange, value, ...props }) {
  return (
    <div className="relative">
      <select
        className="w-full bg-white p-1.5 px-3 text-sm bg-transparent text-gray-700 border border-indigo-200 appearance-none"
        onChange={onChange}
        value={value || "0"} // Fallback to "0" if value is undefined or empty
        {...props}
      >
        {options}
      </select>
      <ChevronDown className="w-4 h-4 absolute right-2 top-2 text-gray-700 pointer-events-none" />
    </div>
  );
}

 

export function ToggleSwitch({ checked, onChange, loading = false }) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
        disabled={loading}
      />
     
      {loading ?  <span className="text-xl w-11 text-gray-500 flex items-center flex justify-center pb-2">
          <span className="animate-dots"></span>
        </span>  : 
      <div className=" relative w-11 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 
      peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-800 after:content-[''] after:absolute after:top-[2px] after:right-[2px] 
      after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:-translate-x-[24px]"></div>
    }  
    </label>
  );
}
 
export function Checkbox({
  id,
  onChange,
  className = '',
  checked,
  disabled = false,
}) {
  return (
    <label
      htmlFor={id}
      className={`inline-flex relative items-center cursor-pointer space-x-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <input
        id={id}
        type="checkbox"
        onChange={onChange}
        disabled={disabled}
        checked={checked}
        className="sr-only peer"
      />

      <div
        className={`
          w-5 h-5 border border-blue-400 
          flex items-center justify-center 
          peer-checked:bg-blue-600 
          peer-checked:border-blue-600
          transition duration-150 ease-in-out
        `}
      >
        {/* Only show checkmark when checked */}
        
      </div>
      
      <Check strokeWidth={4} stroke="white" className="w-3 h-3 text-white hidden peer-checked:block absolute left-1" />
  
    </label>
  );
}