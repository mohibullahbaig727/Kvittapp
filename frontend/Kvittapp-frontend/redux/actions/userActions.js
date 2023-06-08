// actions/userActions.js

export const SET_SELECTED_USER = "SET_SELECTED_USER";

export const setSelectedUser = (user) => {
  return {
    type: SET_SELECTED_USER,
    payload: user,
  };
};
