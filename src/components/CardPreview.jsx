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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 no-print p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-purple-100">
        {/* Header */}
        <div className="p-6 border-b border-purple-100 flex justify-between items-center bg-gradient-to-r from-[#F0EBF8] to-[#FEF5F3]">
          <h2 className="text-2xl font-bold text-[#2D2A4A]">Preview Cards</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#6B6B8D] hover:text-[#7C5CBF] hover:shadow-lg transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto bg-[#FEF5F3]/30" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          <PrintLayout
            cards={currentCards}
            serialNumbers={currentSerials}
            cardsPerSheet={settings.cardsPerSheet}
            header={settings.header}
          />
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-purple-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-4 py-2 rounded-xl border-2 border-purple-200 text-[#7C5CBF] font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F0EBF8] transition-colors"
            >
              Previous
            </button>
            <span className="px-4 py-2 bg-[#F0EBF8] rounded-xl text-[#7C5CBF] font-medium">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-4 py-2 rounded-xl border-2 border-purple-200 text-[#7C5CBF] font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F0EBF8] transition-colors"
            >
              Next
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="px-6 py-2 rounded-xl font-semibold text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #7C5CBF 0%, #9B7ED9 100%)' }}
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;