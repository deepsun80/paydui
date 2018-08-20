import * as actions from "../actions";

export default (auth = "", action) => {
  switch (action.type) {
    case actions.REGISTER_LOADING:
      return "Register user loading";
    case actions.REGISTER_SUCESS:
      return "Register user success";
    case actions.REGISTER_ERROR:
      return "Register user error";
    case actions.LOGIN_LOADING:
      return "Login user loading";
    case actions.LOGIN_SUCCESS:
      return "Login user success";
    case actions.LOGIN_ERROR:
      return "Login user error";
    default:
      return auth;
  }
};
