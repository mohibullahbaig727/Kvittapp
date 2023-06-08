// cardReducer.js

import { SET_CARD_NUMBER } from "../actions/cardActions";

const initialState = {
  cardNumber: "",
};

export const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CARD_NUMBER:
      return {
        ...state,
        cardNumber: action.payload,
      };
    default:
      return state;
  }
};
