import _superagent from "superagent";
import superagentPromise from "superagent-promise";

const superagent = superagentPromise(_superagent, global.Promise);

/*
 * Set this via environment variable
 *
 * Unix/Linux (in terminal): export API_ROOT=https://api.paydapp.com/api
 * Windows (in command prompt): set API_ROOT=https://api.paydapp.com/api
 */
const { API_ROOT = "https://app-staging.paydapp.com/api" } = process.env;

const responseBody = res => res.body;

// This should not be set directly
let token = null;

const Token = {
  get: () => token,
  set: newToken => {
    token = newToken;
    console.log(token);
  }
};

const tokenAuth = req => {
  if (token) {
    req.set("authorization", `JWT ${token}`);
  }
};

const refreshToken = (err, res) => {
  return new Promise(resolve => {
    if (token && err && err.status === 401) {
      Auth.refresh(token).then(() => resolve(true));
    }

    resolve(false);
  });
};

const requests = {
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenAuth)
      .retry(1, refreshToken)
      .then(responseBody),
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenAuth)
      .retry(1, refreshToken)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenAuth)
      .retry(1, refreshToken)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenAuth)
      .retry(1, refreshToken)
      .then(responseBody)
};

const Auth = {
  current: () => requests.get("/v1/users/me/"),
  login: (username, password) =>
    requests.post("/token/", { username, password }),
  register: (first_name, last_name, email, username, password) =>
    requests.post("/v1/users/", {
      first_name,
      last_name,
      email,
      username,
      password
    }),
  refresh: token => requests.post("/token/refresh/", { token })
};

const Loan = {
  create: obj => requests.post("/v1/loans/", obj)
};

const Merchant = {
  search: id => requests.get(`/v1/merchants/search/${id}/`)
};

const User = {
  save: user => requests.put("/v1/users/me/", user),
  settings: settings => requests.put("/v1/users/me/settings/", settings),
  timezones: () => requests.get("/v1/users/me/timezones/")
};

export { Auth, Loan, Merchant, Token, User };
