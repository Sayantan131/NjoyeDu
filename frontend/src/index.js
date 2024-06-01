import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./app/store.js";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider path='/'>
        <App />
      </CookiesProvider>
    </Provider>
  </React.StrictMode>
);
