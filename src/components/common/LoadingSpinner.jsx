import React from 'react';

const LoadingSpinner = ({
  size = '6',
  borderColor = 'blue-500',
  text = 'Loading...',
  showText = true,
  className = '',
}) => {
  const spinnerSize = `w-${size} h-${size}`;
  const borderStyle = `border-2 border-${borderColor} border-t-transparent rounded-full animate-spin`;

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="flex items-center gap-2">
        <div className={`${spinnerSize} ${borderStyle}`} />
        {showText && <p className="text-gray-500">{text}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;