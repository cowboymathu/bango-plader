# Danish Bingo Card Generator

A web application for generating and printing Danish-style bingo cards (bankoplader) with customizable layouts optimized for A4 paper.

## Features

- **Danish Bingo Rules**: 3x9 grid with 15 numbers following traditional Danish bingo column distribution
- **Flexible Layouts**: Choose 1, 2, 3, or 4 cards per A4 sheet
- **Batch Generation**: Generate multiple unique cards at once with no duplicates
- **Unique Serial Numbers**: Each card has a unique serial number for identification
- **Custom Headers**: Add optional custom headers to your bingo cards
- **PDF Export**: Save cards as PDF for later printing
- **Print Preview**: Preview exactly how cards will look when printed
- **Minimalist Design**: Clean, print-optimized layout

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd bango-plader
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Configure Settings**:
   - Select how many cards you want per A4 sheet (1-4)
   - Enter the total number of cards to generate
   - Optionally add a custom header

2. **Generate Cards**:
   - Click "Generate Cards" to create your bingo cards
   - Each card follows Danish bingo rules with proper number distribution

3. **Preview & Print**:
   - Click "Preview Cards" to see the print layout
   - Use "Export to PDF" to save cards as a PDF file
   - Or print directly from the preview window

## Danish Bingo Rules

The application generates cards following traditional Danish bingo (banko) rules:

- **Grid**: 3 rows × 9 columns
- **Numbers**: 15 numbers per card, 5 per row
- **Column Distribution**:
  - Column 1: 1-9
  - Column 2: 10-19
  - Column 3: 20-29
  - Column 4: 30-39
  - Column 5: 40-49
  - Column 6: 50-59
  - Column 7: 60-69
  - Column 8: 70-79
  - Column 9: 80-90

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- jsPDF (for PDF generation)
- crypto-js (for serial number generation)

## Deployment to GitHub Pages

### Method 1: Using npm scripts (Manual)

1. Update the `homepage` field in `package.json` with your GitHub username (already done)

2. Build and deploy:
```bash
npm run deploy
```

This will build the project and push to the `gh-pages` branch.

### Method 2: Using GitHub Actions (Automatic)

1. Push your code to the `main` branch of your GitHub repository

2. Go to your repository Settings → Pages

3. Under "Build and deployment", select:
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

4. The GitHub Action will automatically build and deploy when you push to `main`

### After Deployment

Your app will be available at: https://cowboymathu.github.io/bango-plader/

## License

MIT