// Regex patterns for card types
const CARD_TYPES = {
  VISA: /^4/,
  MASTERCARD: /^5[1-5]/,
  AMERICAN_EXPRESS: /^3[47]/,
  DISCOVER: /^6(?:011|5)/,
};

export const getCardType = (cardNumber) => {
  // Remove non-numeric characters from the card number
  const numericCardNumber = cardNumber.replace(/\s/g, "");

  // Loop through the card types and check for a match
  for (const cardType in CARD_TYPES) {
    if (CARD_TYPES[cardType].test(numericCardNumber)) {
      return cardType;
    }
  }

  // If no match is found, return null or a default card type
  return null;
};
