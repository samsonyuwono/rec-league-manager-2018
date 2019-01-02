import React from "react";
import ReactDOM from "react-dom";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import "./assets/index.scss";
import App from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store.js";
import setAuthToken from "./utils/setAuthToken";

setAuthToken(localStorage.jwtToken);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
