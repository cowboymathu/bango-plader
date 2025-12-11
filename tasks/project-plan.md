# Danish Bingo Card Printing Website - Project Plan

## Project Overview
A web application for generating and printing Danish-style bingo cards (bankoplader) with customizable layouts for A4 paper printing.

## Core Features
- Danish bingo cards (3x9 grid, 15 numbers, 90-number system)
- Multiple cards per sheet options (1, 2, 3, or 4 cards)
- Batch generation with no duplicates
- PDF export functionality
- Preview before printing
- Custom headers/titles
- Unique serial numbers per card
- Minimalist, print-optimized design

## Technical Stack
- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS
- **PDF Generation**: jsPDF
- **Build Tool**: Vite
- **Additional Libraries**: 
  - crypto-js (for serial number generation)
  - react-modal (for preview modal)

## Danish Bingo Rules Implementation

### Card Structure
- **Grid**: 3 rows × 9 columns (27 cells total)
- **Numbers**: 15 numbers per card, 12 empty cells
- **Distribution**: Each row must have exactly 5 numbers and 4 blanks

### Column Rules
- Column 1: Numbers 1-9
- Column 2: Numbers 10-19
- Column 3: Numbers 20-29
- Column 4: Numbers 30-39
- Column 5: Numbers 40-49
- Column 6: Numbers 50-59
- Column 7: Numbers 60-69
- Column 8: Numbers 70-79
- Column 9: Numbers 80-90

### Number Placement Algorithm
1. For each column, determine how many numbers to place (0-3)
2. Ensure total numbers per row = 5
3. Ensure total numbers per card = 15
4. Random selection within column ranges
5. No duplicate numbers on a single card

## Component Architecture

### 1. App.jsx
- Main application container
- State management for settings and generated cards
- Coordination between components

### 2. SettingsPanel.jsx
- Cards per sheet selector (1, 2, 3, 4)
- Total cards input
- Custom header/title input
- Generate button
- Export to PDF button

### 3. BingoCard.jsx
- Individual card rendering
- 3x9 grid layout
- Serial number display
- Optional header display
- Print-optimized styling

### 4. CardPreview.jsx
- Full-screen preview modal
- Page navigation for multiple sheets
- Print button
- Close button

### 5. PrintLayout.jsx
- A4 layout optimization
- Card arrangement based on cards-per-sheet setting
- Cutting guides (subtle lines)
- Page breaks for printing

## Utility Modules

### cardGenerator.js
```javascript
// Core functions:
- generateCard() - Creates single Danish bingo card
- generateBatch(count) - Creates multiple unique cards
- validateCard(card) - Ensures card follows all rules
- checkDuplicate(card1, card2) - Compares cards
```

### serialGenerator.js
```javascript
// Core functions:
- generateSerial(card) - Creates unique serial from card data
- formatSerial(hash) - Formats as XXXX-XXXX
- validateSerial(serial) - Checks serial format
```

### pdfGenerator.js
```javascript
// Core functions:
- generatePDF(cards, settings) - Creates PDF document
- layoutCards(cards, perPage) - Arranges cards on pages
- addHeaders(pdf, settings) - Adds custom headers
```

## User Flow

1. **Initial Load**
   - Display settings panel
   - Show empty preview area

2. **Configuration**
   - Select cards per sheet
   - Enter total number of cards
   - Optional: Add custom header

3. **Generation**
   - Click "Generate Cards"
   - System creates unique cards
   - Display in preview area

4. **Preview**
   - Click "Preview" button
   - Modal shows print layout
   - Navigate through pages

5. **Export/Print**
   - Option 1: Click "Print" for browser print
   - Option 2: Click "Save as PDF" for download

## Styling Guidelines

### Design Principles
- Clean, minimalist interface
- High contrast for printing
- No unnecessary colors or graphics
- Clear, readable typography

### Layout Specifications
- A4 dimensions: 210mm × 297mm
- Margins: 10mm all sides
- Card spacing: 5mm between cards
- Font: System default sans-serif
- Grid lines: 0.5pt black

### Responsive Considerations
- Settings panel: Mobile-friendly
- Preview: Desktop-optimized
- Print layout: Fixed A4 dimensions

## Print Optimization

### CSS Print Styles
```css
@media print {
  - Hide non-printable elements
  - Set page size to A4
  - Remove backgrounds
  - Ensure proper page breaks
  - Black text on white background
}
```

### A4 Layout Options
1. **1 card per sheet**: Centered, large format
2. **2 cards per sheet**: Vertical stack
3. **3 cards per sheet**: Vertical stack, tighter spacing
4. **4 cards per sheet**: 2×2 grid

## Development Phases

### Phase 1: Core Infrastructure
- Project setup with React and Tailwind
- Basic component structure
- Danish card generation logic

### Phase 2: UI Implementation
- Settings panel
- Card display component
- Basic styling

### Phase 3: Advanced Features
- Batch generation
- Duplicate prevention
- Serial number system

### Phase 4: Export & Print
- Preview modal
- Print CSS
- PDF generation

### Phase 5: Polish & Testing
- UI refinements
- Cross-browser testing
- Print testing
- Performance optimization

## Testing Strategy

### Unit Tests
- Card generation algorithm
- Serial number generation
- Duplicate detection

### Integration Tests
- Component interactions
- PDF generation
- Print layout

### Manual Testing
- Physical printing on A4 paper
- Different browser print dialogs
- Various card configurations

## Performance Considerations

### Optimization Areas
- Card generation algorithm efficiency
- PDF generation for large batches
- React component re-renders
- Memory usage for large card sets

### Target Metrics
- Generate 100 cards in < 1 second
- PDF export in < 3 seconds
- Smooth UI interactions
- Support up to 1000 cards per batch

## Future Enhancements (Post-MVP)
- Save/load card sets
- Different bingo variants
- QR codes on cards
- Online game coordination
- Multiple language support
- Custom number ranges
- Theme customization