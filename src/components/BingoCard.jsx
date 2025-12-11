import React from 'react';

const BingoCard = ({ card, serialNumber, header, cardsPerSheet = 1 }) => {
  const getTextSizeClass = () => {
    switch (cardsPerSheet) {
      case 2:
        return 'text-4xl';
      case 3:
        return 'text-3xl';
      case 4:
        return 'text-2xl';
      default:
        return 'text-3xl';
    }
  };

  const getHeaderSizeClass = () => {
    switch (cardsPerSheet) {
      case 2:
        return 'text-2xl mb-3';
      case 3:
        return 'text-xl mb-2';
      case 4:
        return 'text-lg mb-1';
      default:
        return 'text-xl mb-2';
    }
  };

  const getPaddingClass = () => {
    switch (cardsPerSheet) {
      case 2:
        return 'p-4';
      case 3:
        return 'p-3';
      case 4:
        return 'p-2';
      default:
        return 'p-4';
    }
  };

  return (
    <div className={`bingo-card border-2 border-gray-900 ${getPaddingClass()} bg-white h-full w-full flex flex-col`}>
      {header && (
        <h3 className={`text-center font-bold ${getHeaderSizeClass()}`}>{header}</h3>
      )}
      <div className="flex-grow flex flex-col border-2 border-gray-900">
        {card.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-grow">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`flex-1 border border-gray-900 flex items-center justify-center ${getTextSizeClass()} font-semibold`}
              >
                {cell || ''}
              </div>
            ))}
          </div>
        ))}
      </div>
      {serialNumber && (
        <p className={`text-center mt-3 text-gray-600 ${cardsPerSheet === 3 ? 'text-xs' : 'text-sm'}`}>
          Serial: {serialNumber}
        </p>
      )}
    </div>
  );
};

export default BingoCard;