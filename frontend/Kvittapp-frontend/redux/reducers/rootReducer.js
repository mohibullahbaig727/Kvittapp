import { combineReducers } from "redux";
import userReducer from "./userReducer";
import cardNumberReducer from "./cardReducer";

const rootReducer = combineReducers({
  user: userReducer,
  cardNumber: cardNumberReducer,
});

export default rootReducer;
