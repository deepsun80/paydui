import { Auth } from "../agent.js";

export const REGISTER_LOADING = "REGISTER_LOADING";
export const REGISTER_SUCESS = "REGISTER_SUCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const register = password => {
  const personal = JSON.parse(localStorage.getItem("personal"));
  return dispatch => {
    dispatch({
      type: REGISTER_LOADING
    });
    Auth.register(
      personal.first_name,
      personal.last_name,
      personal.email,
      password
    )
      .then(result => {
        localStorage.setItem("jwt", result.token);
        dispatch({
          type: REGISTER_SUCESS
        });
      })
      .catch(error => {
        dispatch({
          type: REGISTER_ERROR
        });
      });
  };
};

export const login = (email, password) => {
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });
    Auth.login(email, password)
      .then(result => {
        localStorage.setItem("jwt", result.token);
        dispatch({
          type: LOGIN_SUCCESS
        });
      })
      .catch(error => {
        dispatch({
          type: LOGIN_ERROR
        });
      });
  };
};
