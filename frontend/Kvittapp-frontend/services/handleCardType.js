// Regex patterns for card types
const CARD_TYPES = {
  VISA: /^4/,
  MASTERCARD: /^5[1-5]/,
  AMERICAN_EXPRESS: /^3[47]/,
  DISCOVER: /^6(?:011|5)/,
  JCB: /^35/,
  DINERS_CLUB: /^3(?:0[0-5]|[68])/,
  UNIONPAY: /^(62|88)/,
  MAESTRO: /^(5018|5020|5038|6304|6759|676[1-3])/,
  ELO: /^(40117[8-9]|431274|438935|45763[1-2]|457393|504175|506699|5067[0-6][0-9]|50677[0-8]|509[0-9][0-9][0-9]|636368|65003[1-3]|65003[5-9]|65004[0-9]|6504[0-9][0-9]|6505[0-9][0-9]|650[7-9][0-9][0-9]|6516[5-7]|6550[0-9][0-9]|65501[0-9]|6550[2-4][0-9]|65505[0-8])/,
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
