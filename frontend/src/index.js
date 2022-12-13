import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { SnackbarProvider } from "notistack";
import { Layout } from "./components/Layout";
ReactDOM.render(
  <SnackbarProvider>
    <Provider store={store}>
      <Layout>
        <App />
      </Layout>
    </Provider>
  </SnackbarProvider>,
  document.getElementById("root")
);
