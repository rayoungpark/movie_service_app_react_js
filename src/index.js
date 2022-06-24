import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

import { Provider } from "react-redux";
import store from "./store/config";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
