import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { fetchProducts } from "./components/products/ProductsSlice";

store.dispatch(fetchProducts());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);