// cardActions.js

export const SET_CARD_NUMBER = "SET_CARD_NUMBER";

export const setCardNumber = (cardNumber) => ({
  type: SET_CARD_NUMBER,
  payload: cardNumber,
});
