// components/Tile.js
import React from 'react';

const Tile = ({ value, fixed, onToggle }) => {
  const displayValue = value === null ? '' : value;

  const handleClick = () => {
    if (!fixed) {
      onToggle();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-12 h-12 border flex items-center justify-center 
        text-lg font-bold ${fixed ? 'bg-gray-200' : 'bg-white'} 
        ${value === 1 ? 'text-blue-600' : 'text-red-600'}`}
    >
      {displayValue}
    </button>
  );
};

export default Tile;
