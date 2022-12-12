import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./REDUX/Store/ReduxStore.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Menu/Header/Header";

const myApp = (
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(myApp, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
