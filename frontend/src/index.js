import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { SnackbarProvider, useSnackbar } from "notistack";
ReactDOM.render(
  <SnackbarProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </SnackbarProvider>,
  document.getElementById("root")
);
