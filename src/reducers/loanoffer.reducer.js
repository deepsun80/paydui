import {
  LOAN_OFFERS_LOADING,
  LOAN_OFFERS_SUCCESS,
  LOAN_OFFERS_ERROR
} from "../actions";

export default (loanOffer = "", action) => {
  switch (action.type) {
    case LOAN_OFFERS_LOADING:
      return "Loading";
    case LOAN_OFFERS_SUCCESS:
      return "Success sending loan offer";
    case LOAN_OFFERS_ERROR:
      return "Error: Could not send loan offer";
    default:
      return loanOffer;
  }
};
