import React, { useState } from 'react';
import PrintLayout from './PrintLayout';

const CardPreview = ({ isOpen, onClose, cards, serialNumbers, settings }) => {
  const [currentPage, setCurrentPage] = useState(0);
  
  if (!isOpen) return null;

  const totalPages = Math.ceil(cards.length / settings.cardsPerSheet);
  const startIndex = currentPage * settings.cardsPerSheet;
  const endIndex = startIndex + settings.cardsPerSheet;
  const currentCards = cards.slice(startIndex, endIndex);
  const currentSerials = serialNumbers.slice(startIndex, endIndex);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 no-print">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Preview Cards</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          <PrintLayout
            cards={currentCards}
            serialNumbers={currentSerials}
            cardsPerSheet={settings.cardsPerSheet}
            header={settings.header}
          />
        </div>
        
        <div className="p-4 border-t flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
          
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;