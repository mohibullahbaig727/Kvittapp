// reducers/userReducer.js

import { SET_SELECTED_USER } from "../actions/userActions";

export const initialState = {
  selectedUser: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
