import './App.css';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ProductList } from "./components/products/ProductList";
import React from "react";
import { AddProduct } from './components/products/AddProduct';
import { EditProduct } from './components/products/EditProduct';
import { UploadOrder } from './components/orders/UploadOrder';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <ProductList />
            <hr></hr>
            <UploadOrder></UploadOrder>
          </Route>
          <Route path="/add-product" component="AddProduct">
            <AddProduct></AddProduct>
          </Route>
          <Route path="/edit-product" component="EditProduct">
            <EditProduct></EditProduct>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
