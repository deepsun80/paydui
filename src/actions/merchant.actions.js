import { Merchant } from "../agent.js";

export const GET_MERCHANT_LOADING = "GET_MERCHANT_LOADING";
export const GET_MERCHANT_SUCCESS = "GET_MERCHANT_SUCCESS";
export const GET_MERCHANT_ERROR = "GET_MERCHANT_ERROR";

export const getMerchantInfo = payId => {
  return dispatch => {
    dispatch({
      type: GET_MERCHANT_LOADING
    });
    Merchant.search(payId)
      .then(result => {
        dispatch({
          type: GET_MERCHANT_SUCCESS,
          payload: result
        });
      })
      .catch(error => {
        dispatch({
          type: GET_MERCHANT_ERROR
        });
      });
  };
};
