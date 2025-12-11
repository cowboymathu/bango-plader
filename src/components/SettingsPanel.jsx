import React from 'react';

const SettingsPanel = ({ settings, onSettingsChange, onGenerate, onExportPDF, onPrint, showPrintButtons }) => {
  const handleInputChange = (field, value) => {
    onSettingsChange({ ...settings, [field]: value });
  };

  return (
    <div className="settings-panel bg-gray-100 p-6 rounded-lg shadow-md no-print">
      <h2 className="text-2xl font-bold mb-4">Bingo Card Settings</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Cards per sheet
        </label>
        <select
          value={settings.cardsPerSheet}
          onChange={(e) => handleInputChange('cardsPerSheet', parseInt(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value={2}>2 cards</option>
          <option value={3}>3 cards</option>
          <option value={4}>4 cards</option>
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Total cards to generate
        </label>
        <input
          type="number"
          min="1"
          max="100"
          value={settings.totalCards}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '') {
              handleInputChange('totalCards', '');
            } else {
              const num = parseInt(value);
              if (!isNaN(num) && num >= 1 && num <= 100) {
                handleInputChange('totalCards', num);
              }
            }
          }}
          onBlur={(e) => {
            if (e.target.value === '') {
              handleInputChange('totalCards', 1);
            }
          }}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Custom header (optional)
        </label>
        <input
          type="text"
          value={settings.header}
          onChange={(e) => handleInputChange('header', e.target.value)}
          placeholder="e.g., Christmas Bingo 2024"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      
      <div className="space-y-4">
        <button
          onClick={onGenerate}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Generate Cards
        </button>
        
        {showPrintButtons && (
          <div className="flex gap-4">
            <button
              onClick={onPrint}
              className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Print
            </button>
            
            <button
              onClick={onExportPDF}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              Export to PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPanel;