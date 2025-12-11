# Danish Bingo Card Printing Website - Todo List

## Project Setup ⚙️

### Initial Setup
- [ ] Initialize React project with Vite
- [ ] Install and configure Tailwind CSS
- [ ] Install required dependencies (jsPDF, crypto-js, react-modal)
- [ ] Set up project folder structure
- [ ] Create basic component files
- [ ] Configure Tailwind for print styles
- [ ] Set up development environment

## Core Components Development 🧩

### App.jsx - Main Container
- [ ] Create basic App component structure
- [ ] Set up state management for:
  - [ ] Cards per sheet setting
  - [ ] Total cards count
  - [ ] Custom header text
  - [ ] Generated cards array
- [ ] Implement component layout
- [ ] Add state handlers and callbacks

### SettingsPanel.jsx
- [ ] Create settings panel layout
- [ ] Implement cards per sheet selector (1, 2, 3, 4)
- [ ] Add total cards input field with validation
- [ ] Create custom header/title input
- [ ] Add "Generate Cards" button
- [ ] Add "Export to PDF" button
- [ ] Style with Tailwind classes
- [ ] Add input validation and error states

### BingoCard.jsx
- [ ] Create 3x9 grid structure
- [ ] Implement cell rendering logic
- [ ] Display numbers and empty cells correctly
- [ ] Add serial number display
- [ ] Add optional header display
- [ ] Style for screen display
- [ ] Add print-specific styles
- [ ] Ensure proper grid lines

## Utility Modules 🔧

### cardGenerator.js
- [ ] Implement generateCard() function
  - [ ] Create empty 3x9 grid
  - [ ] Implement column number rules (1-9, 10-19, etc.)
  - [ ] Ensure 5 numbers per row
  - [ ] Ensure 15 total numbers
  - [ ] Random number placement algorithm
- [ ] Implement generateBatch() function
  - [ ] Generate specified number of cards
  - [ ] Implement duplicate detection
  - [ ] Ensure all cards are unique
- [ ] Create validateCard() function
  - [ ] Check row counts (5 numbers each)
  - [ ] Check total count (15 numbers)
  - [ ] Verify column rules
- [ ] Add unit tests for card generation

### serialGenerator.js
- [ ] Implement serial generation algorithm
  - [ ] Create hash from card numbers and positions
  - [ ] Use crypto-js for consistent hashing
- [ ] Create formatSerial() function
  - [ ] Format as XXXX-XXXX
  - [ ] Ensure readability
- [ ] Add serial validation function
- [ ] Test serial uniqueness

### pdfGenerator.js
- [ ] Set up jsPDF configuration
- [ ] Implement generatePDF() function
  - [ ] Create A4 sized document
  - [ ] Add page margins
- [ ] Create layoutCards() function
  - [ ] 1 card per page layout
  - [ ] 2 cards per page layout
  - [ ] 3 cards per page layout
  - [ ] 4 cards per page layout
- [ ] Implement card rendering to PDF
  - [ ] Draw grid lines
  - [ ] Add numbers
  - [ ] Add serial numbers
  - [ ] Add custom headers
- [ ] Test PDF generation

## Advanced Features 🚀

### CardPreview.jsx
- [ ] Create preview modal component
- [ ] Implement preview layout matching print layout
- [ ] Add page navigation for multiple pages
- [ ] Add print button in preview
- [ ] Add close functionality
- [ ] Style modal with Tailwind
- [ ] Ensure responsive behavior

### PrintLayout.jsx
- [ ] Create print-specific layout component
- [ ] Implement A4 page dimensions
- [ ] Add proper margins (10mm)
- [ ] Implement card spacing (5mm gaps)
- [ ] Add subtle cutting guides
- [ ] Handle page breaks correctly
- [ ] Test with actual printing

## Styling & UI Polish 🎨

### Base Styles
- [ ] Set up CSS reset for print
- [ ] Define CSS variables for dimensions
- [ ] Create utility classes for common styles
- [ ] Implement responsive breakpoints

### Print Styles
- [ ] Create @media print styles
- [ ] Hide non-printable elements
- [ ] Set A4 page size
- [ ] Remove colors/backgrounds
- [ ] Ensure black text on white
- [ ] Test on multiple browsers

### Component Styling
- [ ] Style settings panel for usability
- [ ] Polish card appearance
- [ ] Design attractive preview modal
- [ ] Add loading states
- [ ] Implement error states
- [ ] Add success feedback

## Testing & Quality Assurance ✅

### Unit Testing
- [ ] Test card generation logic
- [ ] Test serial number generation
- [ ] Test duplicate detection
- [ ] Test validation functions
- [ ] Test PDF generation

### Integration Testing
- [ ] Test full card generation flow
- [ ] Test preview functionality
- [ ] Test PDF export
- [ ] Test print functionality
- [ ] Test error handling

### Manual Testing
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on Edge
- [ ] Physical print tests on A4 paper
- [ ] Test different card quantities
- [ ] Test all layout options

### Performance Testing
- [ ] Measure card generation speed
- [ ] Test with 100+ cards
- [ ] Profile memory usage
- [ ] Optimize slow operations

## Bug Fixes & Refinements 🐛

### Known Issues
- [ ] Address any console errors
- [ ] Fix layout issues
- [ ] Resolve print inconsistencies
- [ ] Handle edge cases

### UI/UX Improvements
- [ ] Add tooltips for settings
- [ ] Improve error messages
- [ ] Add keyboard shortcuts
- [ ] Enhance accessibility

### Code Quality
- [ ] Add JSDoc comments
- [ ] Refactor complex functions
- [ ] Remove code duplication
- [ ] Optimize bundle size

## Documentation 📚

### User Documentation
- [ ] Create README.md
- [ ] Add usage instructions
- [ ] Include screenshots
- [ ] Document features

### Developer Documentation
- [ ] Document component APIs
- [ ] Explain algorithm logic
- [ ] Add contribution guidelines
- [ ] Create architecture diagram

## Deployment 🚀

### Build & Deploy
- [ ] Configure production build
- [ ] Optimize assets
- [ ] Set up hosting
- [ ] Configure domain (if needed)
- [ ] Test production build
- [ ] Deploy to hosting service

### Post-Deployment
- [ ] Monitor for errors
- [ ] Gather user feedback
- [ ] Plan future enhancements
- [ ] Create release notes

## Priority Order 📋

1. **High Priority** (MVP)
   - Project setup
   - Core components (App, SettingsPanel, BingoCard)
   - Card generation logic
   - Basic UI styling
   - Print functionality

2. **Medium Priority**
   - Serial numbers
   - Preview modal
   - PDF export
   - Polish and refinements

3. **Low Priority** (Nice to have)
   - Advanced error handling
   - Performance optimizations
   - Extended documentation
   - Additional features

## Time Estimates ⏰

- **Phase 1 (Setup & Core)**: 4-6 hours
- **Phase 2 (Features)**: 6-8 hours
- **Phase 3 (Polish & Testing)**: 4-6 hours
- **Total Estimate**: 14-20 hours

## Notes 📝

- Focus on Danish bingo rules accuracy
- Prioritize print quality over screen appearance
- Keep design minimal and functional
- Test printing early and often
- Consider mobile usage for settings only