import jsPDF from 'jspdf';

export const generatePDF = (cards, serialNumbers, settings) => {
  // A4 dimensions in mm
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 5;
  const contentWidth = pageWidth - (2 * margin);
  const contentHeight = pageHeight - (2 * margin);
  
  // Create new PDF document
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  const cardsPerPage = settings.cardsPerSheet;
  const cardLayouts = getCardLayouts(cardsPerPage, contentWidth, contentHeight);
  
  // Process cards in batches according to cardsPerPage
  for (let pageIndex = 0; pageIndex < Math.ceil(cards.length / cardsPerPage); pageIndex++) {
    if (pageIndex > 0) {
      pdf.addPage();
    }
    
    const startIdx = pageIndex * cardsPerPage;
    const endIdx = Math.min(startIdx + cardsPerPage, cards.length);
    
    for (let cardIdx = startIdx; cardIdx < endIdx; cardIdx++) {
      const layoutIndex = cardIdx - startIdx;
      const layout = cardLayouts[layoutIndex];
      
      if (layout) {
        drawCard(
          pdf,
          cards[cardIdx],
          serialNumbers[cardIdx],
          settings.header,
          layout.x + margin,
          layout.y + margin,
          layout.width,
          layout.height
        );
      }
    }
  }
  
  return pdf;
};

const getCardLayouts = (cardsPerPage, contentWidth, contentHeight) => {
  const layouts = [];
  const gap = 2; // 2mm gap between cards for cutting
  
  switch (cardsPerPage) {
    case 2:
      // Two cards split the page vertically
      const height2 = (contentHeight - gap) / 2;
      layouts.push(
        { x: 0, y: 0, width: contentWidth, height: height2 },
        { x: 0, y: height2 + gap, width: contentWidth, height: height2 }
      );
      break;
      
    case 3:
      // Three cards split the page vertically
      const height3 = (contentHeight - (2 * gap)) / 3;
      for (let i = 0; i < 3; i++) {
        layouts.push({
          x: 0,
          y: i * (height3 + gap),
          width: contentWidth,
          height: height3
        });
      }
      break;
      
    case 4:
      // Four cards in a single column
      const height4 = (contentHeight - (3 * gap)) / 4;
      for (let i = 0; i < 4; i++) {
        layouts.push({
          x: 0,
          y: i * (height4 + gap),
          width: contentWidth,
          height: height4
        });
      }
      break;
  }
  
  return layouts;
};

const drawCard = (pdf, card, serialNumber, header, x, y, width, height) => {
  // Determine font sizes based on card size
  const cardArea = width * height;
  const fullPageArea = 200 * 287; // Full page content area with minimal margins
  const sizeRatio = cardArea / fullPageArea;
  
  const headerSize = Math.max(12, Math.floor(28 * Math.sqrt(sizeRatio)));
  const numberSize = Math.max(16, Math.floor(40 * Math.sqrt(sizeRatio)));
  const serialSize = Math.max(8, Math.floor(14 * Math.sqrt(sizeRatio)));
  
  // Draw header if provided
  let currentY = y;
  let headerHeight = 0;
  if (header) {
    headerHeight = headerSize * 0.8;
    pdf.setFontSize(headerSize);
    pdf.setFont(undefined, 'bold');
    pdf.text(header, x + width / 2, currentY + headerHeight, { align: 'center' });
    currentY += headerHeight + 4;
    height -= (headerHeight + 4);
  }
  
  // Calculate cell dimensions
  const serialHeight = serialSize + 4;
  const gridHeight = height - serialHeight;
  const cellWidth = width / 9;
  const cellHeight = gridHeight / 3;
  
  // Draw the grid with thicker outer border
  pdf.setLineWidth(1);
  pdf.rect(x, currentY, width, gridHeight);
  
  // Draw cells and numbers with thinner lines
  pdf.setLineWidth(0.3);
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 9; col++) {
      const cellX = x + (col * cellWidth);
      const cellY = currentY + (row * cellHeight);
      
      // Draw cell border (except outer edges)
      if (col > 0) pdf.line(cellX, cellY, cellX, cellY + cellHeight);
      if (row > 0) pdf.line(cellX, cellY, cellX + cellWidth, cellY);
      
      // Draw number if exists
      const value = card[row][col];
      if (value) {
        pdf.setFontSize(numberSize);
        pdf.setFont(undefined, 'bold');
        const textX = cellX + cellWidth / 2;
        const textY = cellY + cellHeight / 2 + (numberSize * 0.35);
        pdf.text(value.toString(), textX, textY, { align: 'center' });
      }
    }
  }
  
  // Draw serial number
  if (serialNumber) {
    pdf.setFontSize(serialSize);
    pdf.setFont(undefined, 'normal');
    const serialY = currentY + gridHeight + serialHeight - 2;
    pdf.text(`Serial: ${serialNumber}`, x + width / 2, serialY, { align: 'center' });
  }
};

export const exportToPDF = (cards, serialNumbers, settings) => {
  const pdf = generatePDF(cards, serialNumbers, settings);
  pdf.save('bingo-cards.pdf');
};