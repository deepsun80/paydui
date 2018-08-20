import {
  GET_MERCHANT_LOADING,
  GET_MERCHANT_SUCCESS,
  GET_MERCHANT_ERROR
} from "../actions";

export default (merchantInfo = {}, action) => {
  switch (action.type) {
    case GET_MERCHANT_LOADING:
      return { ...merchantInfo, fetchState: "Loading" };
    case GET_MERCHANT_SUCCESS:
      return {
        ...merchantInfo,
        merchant: action.payload,
        fetchState: "Success loading"
      };
    case GET_MERCHANT_ERROR:
      return {
        ...merchantInfo,
        fetchState: "Error: Could not find merchant PayId"
      };
    default:
      return merchantInfo;
  }
};
