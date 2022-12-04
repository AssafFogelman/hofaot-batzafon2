import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
/* import bootstrap to react*/
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
/* import react-router-dom */
import { BrowserRouter } from "react-router-dom";
/* import redux */
import { Provider } from "react-redux";
import store from "./store/index";
/* import toastify */
import "react-toastify/dist/ReactToastify.css";

/* config axios */
axios.defaults.baseURL = `${process.env.REACT_APP_DOMAIN}/api`;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    //the token exists. the user is logged in
    config.headers["x-auth-token"] = token;
    //for every axios request, if there is a token, add a header line named "x-auth-token" with a value of the token.
  }
  return config;
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
