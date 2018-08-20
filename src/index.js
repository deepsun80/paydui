import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router";
import { Provider } from "react-redux";
import { configureStore } from "./store";

import history from "./myHistory";
import { Header, Footer, Loader } from "./components";
import indexRoutes from "./routes";
import registerServiceWorker from "./registerServiceWorker";

require("./index.css");
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Fragment>
      <Header />
      <Loader />
      <Router history={history}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return (
              <Route
                exact
                path={prop.path}
                key={key}
                component={prop.component}
              />
            );
          })}
        </Switch>
      </Router>
      <Footer />
    </Fragment>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
