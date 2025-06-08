import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { BrowserRouter, Route } from "react-router";
import Home from "./Home";
import Register from "./Register";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer/>
        <App />
        
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
