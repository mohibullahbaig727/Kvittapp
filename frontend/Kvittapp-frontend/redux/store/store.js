// configureStore.js

import { createStore, combineReducers } from "redux";
import {
  userReducer,
  initialState as userInitialState,
} from "../reducers/userReducer";
import {
  cardReducer,
  initialState as cardInitialState,
} from "../reducers/cardReducer";

const rootReducer = combineReducers({
  user: userReducer,
  card: cardReducer, // add the card reducer to the root reducer
});

export const configureStore = () => {
  const store = createStore(
    rootReducer, // root reducer
    {
      user: userInitialState,
      card: cardInitialState, // set the initial state for the card reducer
    }
  );

  return store;
};
