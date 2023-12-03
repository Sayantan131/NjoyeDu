import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from './app/store.redux.js';
import { ChakraProvider, theme } from "@chakra-ui/react";
// import ColorModeSwitcher from "./components/ColorModeSwitcher.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
      ,
    </ChakraProvider>
  </React.StrictMode>
);
