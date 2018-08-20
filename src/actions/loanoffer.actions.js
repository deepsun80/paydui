import { Loan, Token } from "../agent.js";

export const LOAN_OFFERS_LOADING = "LOAN_OFFERS_LOADING";
export const LOAN_OFFERS_SUCCESS = "LOAN_OFFERS_SUCCESS";
export const LOAN_OFFERS_ERROR = "LOAN_OFFERS_ERROR";

export const loanOffers = () => {
  const localStorageOffer = {
    merchant: {
      code: JSON.parse(localStorage.getItem("merchantInfo"))
        ? JSON.parse(localStorage.getItem("merchantInfo")).code
        : ""
    },
    personal: JSON.parse(localStorage.getItem("personal")),
    address: JSON.parse(localStorage.getItem("address")),
    loan: JSON.parse(localStorage.getItem("loan")),
    financial: JSON.parse(localStorage.getItem("financial")),
    legal: JSON.parse(localStorage.getItem("legal"))
  };

  return dispatch => {
    dispatch({
      type: LOAN_OFFERS_LOADING
    });
    Token.set(localStorage.getItem("jwt"));
    Loan.create(localStorageOffer)
      .then(result => {
        dispatch({
          type: LOAN_OFFERS_SUCCESS
        });
      })
      .catch(error => {
        dispatch({
          type: LOAN_OFFERS_ERROR
        });
      });
  };
};
