import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./components/products/ProductsSlice";
import ordersReducer from "./components/orders/OrdersSlice";

export default configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer,
  },
});