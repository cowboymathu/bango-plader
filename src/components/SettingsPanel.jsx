import React from 'react';

const SettingsPanel = ({ settings, onSettingsChange, onGenerate, onExportPDF, onPrint, showPrintButtons }) => {
  const handleInputChange = (field, value) => {
    onSettingsChange({ ...settings, [field]: value });
  };

  return (
    <div className="settings-panel bg-white p-8 rounded-3xl shadow-lg no-print border border-purple-100">
      <h2 className="text-2xl font-bold mb-6 text-[#2D2A4A]">Card Settings</h2>

      <div className="mb-5">
        <label className="block text-sm font-semibold mb-2 text-[#6B6B8D]">
          Cards per sheet
        </label>
        <select
          value={settings.cardsPerSheet}
          onChange={(e) => handleInputChange('cardsPerSheet', parseInt(e.target.value))}
          className="w-full p-3 border-2 border-purple-100 rounded-xl bg-[#F0EBF8] focus:border-[#7C5CBF] focus:outline-none transition-colors text-[#2D2A4A]"
        >
          <option value={2}>2 cards</option>
          <option value={3}>3 cards</option>
          <option value={4}>4 cards</option>
        </select>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold mb-2 text-[#6B6B8D]">
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
          className="w-full p-3 border-2 border-purple-100 rounded-xl bg-[#F0EBF8] focus:border-[#7C5CBF] focus:outline-none transition-colors text-[#2D2A4A]"
        />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-semibold mb-2 text-[#6B6B8D]">
          Custom header (optional)
        </label>
        <input
          type="text"
          value={settings.header}
          onChange={(e) => handleInputChange('header', e.target.value)}
          placeholder="e.g., Christmas Bingo 2024"
          className="w-full p-3 border-2 border-purple-100 rounded-xl bg-[#F0EBF8] focus:border-[#7C5CBF] focus:outline-none transition-colors text-[#2D2A4A] placeholder:text-[#6B6B8D]/50"
        />
      </div>

      <div className="space-y-4">
        <button
          onClick={onGenerate}
          className="w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #7C5CBF 0%, #9B7ED9 100%)' }}
        >
          Generate Cards
        </button>

        {showPrintButtons && (
          <div className="flex gap-3">
            <button
              onClick={onPrint}
              className="flex-1 py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #5D3FA3 0%, #7C5CBF 100%)' }}
            >
              Print
            </button>

            <button
              onClick={onExportPDF}
              className="flex-1 py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #FF8A65 0%, #FFB088 100%)' }}
            >
              Export PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPanel;