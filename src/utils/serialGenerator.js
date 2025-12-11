import CryptoJS from 'crypto-js';

export const generateSerial = (card) => {
  // Create a string representation of the card's numbers and positions
  let cardData = '';
  
  for (let row = 0; row < card.length; row++) {
    for (let col = 0; col < card[row].length; col++) {
      if (card[row][col] !== null) {
        // Include both the number and its position for uniqueness
        cardData += `${row}${col}:${card[row][col]};`;
      }
    }
  }
  
  // Generate SHA256 hash of the card data
  const hash = CryptoJS.SHA256(cardData).toString();
  
  // Format the hash as XXXX-XXXX (taking first 8 characters)
  return formatSerial(hash);
};

export const formatSerial = (hash) => {
  // Take first 8 characters of the hash and format as XXXX-XXXX
  const shortHash = hash.substring(0, 8).toUpperCase();
  return `${shortHash.substring(0, 4)}-${shortHash.substring(4, 8)}`;
};

export const generateBatchSerials = (cards) => {
  return cards.map(card => generateSerial(card));
};

export const validateSerial = (serial) => {
  // Check if serial matches the format XXXX-XXXX
  const serialPattern = /^[A-F0-9]{4}-[A-F0-9]{4}$/;
  return serialPattern.test(serial);
};