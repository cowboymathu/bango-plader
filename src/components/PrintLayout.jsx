import React from 'react';
import BingoCard from './BingoCard';

const PrintLayout = ({ cards, serialNumbers, cardsPerSheet, header }) => {
  const getLayoutClass = () => {
    switch (cardsPerSheet) {
      case 2:
        return 'grid-cols-1 gap-2';
      case 3:
        return 'grid-cols-1 gap-2';
      case 4:
        return 'grid-cols-1 gap-2';
      default:
        return 'grid-cols-1 gap-2';
    }
  };

  const getCardHeightClass = () => {
    switch (cardsPerSheet) {
      case 2:
        return 'h-[142.5mm]'; // (287 - 2) / 2
      case 3:
        return 'h-[94.33mm]'; // (287 - 4) / 3
      case 4:
        return 'h-[70.25mm]'; // (287 - 6) / 4
      default:
        return 'h-[142.5mm]';
    }
  };

  const cardsPerPage = cardsPerSheet;
  const pages = [];
  
  for (let i = 0; i < cards.length; i += cardsPerPage) {
    pages.push(cards.slice(i, i + cardsPerPage));
  }

  return (
    <div className="print-layout">
      {pages.map((pageCards, pageIndex) => (
        <div
          key={pageIndex}
          className={`page bg-white ${pageIndex > 0 ? 'break-before-page' : ''}`}
          style={{ height: '297mm', width: '210mm', padding: '5mm', boxSizing: 'border-box' }}
        >
          <div className={`grid ${getLayoutClass()} h-[287mm]`}>
            {pageCards.map((card, cardIndex) => {
              const globalIndex = pageIndex * cardsPerPage + cardIndex;
              return (
                <div key={globalIndex} className={`${getCardHeightClass()} flex`}>
                  <BingoCard
                    card={card}
                    serialNumber={serialNumbers[globalIndex]}
                    header={header}
                    cardsPerSheet={cardsPerSheet}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrintLayout;