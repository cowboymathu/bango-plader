import { useState } from 'react';
import SettingsPanel from './components/SettingsPanel';
import PrintLayout from './components/PrintLayout';
import CardPreview from './components/CardPreview';
import { generateBatch } from './utils/cardGenerator';
import { generateBatchSerials } from './utils/serialGenerator';
import { exportToPDF } from './utils/pdfGenerator';

function App() {
  const [settings, setSettings] = useState({
    cardsPerSheet: 3,
    totalCards: 6,
    header: ''
  });

  const [cards, setCards] = useState([]);
  const [serialNumbers, setSerialNumbers] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
  };

  const handleGenerate = () => {
    const totalCards = settings.totalCards === '' ? 0 : settings.totalCards;
    if (totalCards < 1) {
      alert('Please enter a valid number of cards (1-100)');
      return;
    }
    const newCards = generateBatch(totalCards);
    const newSerials = generateBatchSerials(newCards);
    setCards(newCards);
    setSerialNumbers(newSerials);
  };

  const handleExportPDF = () => {
    if (cards.length === 0) {
      alert('Please generate cards first!');
      return;
    }
    exportToPDF(cards, serialNumbers, settings);
  };

  const handlePrint = () => {
    if (cards.length === 0) {
      alert('Please generate cards first!');
      return;
    }
    window.print();
  };

  const handlePreview = () => {
    if (cards.length === 0) {
      alert('Please generate cards first!');
      return;
    }
    setShowPreview(true);
  };

  return (
    <>
      <div className="min-h-screen py-10 px-4 no-print">
        <div className="container mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-[#2D2A4A]">
              Bingo Card
              <span className="block bg-gradient-to-r from-[#7C5CBF] to-[#9B7ED9] bg-clip-text text-transparent">
                Generator
              </span>
            </h1>
            <p className="text-lg text-[#6B6B8D] max-w-2xl mx-auto">
              Create beautiful Danish-style bingo cards for your next game night.
              Customize, print, and play!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <SettingsPanel
                settings={settings}
                onSettingsChange={handleSettingsChange}
                onGenerate={handleGenerate}
                onExportPDF={handleExportPDF}
                onPrint={handlePrint}
                showPrintButtons={cards.length > 0}
              />

              {cards.length > 0 && (
                <button
                  onClick={handlePreview}
                  className="mt-4 w-full py-3 px-4 rounded-xl font-semibold text-[#7C5CBF] bg-white border-2 border-[#7C5CBF] transition-all duration-200 hover:bg-[#F0EBF8] hover:shadow-lg no-print"
                >
                  Preview Cards
                </button>
              )}
            </div>

            <div className="lg:col-span-2">
              {cards.length > 0 ? (
                <div className="bg-white rounded-3xl shadow-lg p-6 no-print border border-purple-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-[#2D2A4A]">Generated Cards</h2>
                    <span className="px-4 py-1 bg-[#F0EBF8] text-[#7C5CBF] rounded-full text-sm font-medium">
                      {cards.length} cards • {Math.ceil(cards.length / settings.cardsPerSheet)} pages
                    </span>
                  </div>
                  <div className="border-2 border-purple-100 rounded-2xl p-4 overflow-auto bg-[#FEF5F3]/30" style={{ maxHeight: '600px' }}>
                    <PrintLayout
                      cards={cards}
                      serialNumbers={serialNumbers}
                      cardsPerSheet={settings.cardsPerSheet}
                      header={settings.header}
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl shadow-lg p-12 text-center border border-purple-100">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#F0EBF8] flex items-center justify-center">
                    <svg className="w-10 h-10 text-[#7C5CBF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2D2A4A] mb-2">No cards yet</h3>
                  <p className="text-[#6B6B8D]">Configure your settings and click "Generate Cards" to create your bingo cards.</p>
                </div>
              )}
            </div>
          </div>

          <CardPreview
            isOpen={showPreview}
            onClose={() => setShowPreview(false)}
            cards={cards}
            serialNumbers={serialNumbers}
            settings={settings}
          />
        </div>
      </div>

      {/* Hidden print layout for actual printing - outside main container */}
      {cards.length > 0 && (
        <div className="print-only">
          <PrintLayout
            cards={cards}
            serialNumbers={serialNumbers}
            cardsPerSheet={settings.cardsPerSheet}
            header={settings.header}
          />
        </div>
      )}
    </>
  );
}

export default App;