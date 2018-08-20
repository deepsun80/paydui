import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import merchantReducer from "./merchant.reducer";
import loanOfferReducer from "./loanoffer.reducer";
import { validationReducer, pageReducer } from "./utils.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  merchantInfo: merchantReducer,
  loanOffer: loanOfferReducer,
  validation: validationReducer,
  page: pageReducer
});

export default rootReducer;
