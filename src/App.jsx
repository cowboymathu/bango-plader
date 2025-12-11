import { useState } from 'react';
import SettingsPanel from './components/SettingsPanel';
import PrintLayout from './components/PrintLayout';
import CardPreview from './components/CardPreview';
import { generateBatch } from './utils/cardGenerator';
import { generateBatchSerials } from './utils/serialGenerator';
import { exportToPDF } from './utils/pdfGenerator';

function App() {
  const [settings, setSettings] = useState({
    cardsPerSheet: 2,
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
      <div className="min-h-screen bg-gray-50 py-8 no-print">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-4xl font-bold text-center mb-8 no-print">Danish Bingo Card Generator</h1>
        
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
                className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors no-print"
              >
                Preview Cards
              </button>
            )}
          </div>
          
          <div className="lg:col-span-2">
            {cards.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md p-4 no-print">
                <h2 className="text-xl font-semibold mb-4">Generated Cards Preview</h2>
                <p className="text-sm text-gray-600 mb-4">
                  {cards.length} cards generated • {Math.ceil(cards.length / settings.cardsPerSheet)} pages
                </p>
                <div className="border rounded-lg p-4 overflow-auto" style={{ maxHeight: '600px' }}>
                  <PrintLayout
                    cards={cards}
                    serialNumbers={serialNumbers}
                    cardsPerSheet={settings.cardsPerSheet}
                    header={settings.header}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
                <p className="text-lg">No cards generated yet.</p>
                <p className="mt-2">Configure your settings and click "Generate Cards" to begin.</p>
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