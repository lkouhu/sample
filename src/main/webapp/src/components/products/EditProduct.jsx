import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { useState } from "react";
import { productUpdated } from "./ProductsSlice";
import React from 'react';
export function EditProduct() {
  const { pathname } = useLocation();
  const productSKU = parseInt(pathname.replace("/edit-product/", ""));

  const product = useSelector((state) =>
    state.products.entities.find((product) => product.sku === productSKU)
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(product.name);
  const [quantity, setQuantity] = useState(product.quantity);
  const [unit_price, setUnitPrice] = useState(product.unit_price);
  const [error, setError] = useState(null);

  const handleName = (e) => setName(e.target.value);
  const handleQuantity = (e) => setQuantity(e.target.value);
  const handleUnitPrice = (e) => setUnitPrice(e.target.value);

  const handleClick = () => {
    if (name && quantity && unit_price) {
      dispatch(
        productUpdated({
          sku: productSKU,
          name,
          quantity,
          unit_price
        })
      );

      setError(null);
      history.push("/");
    } else {
      setError("Fill in all fields");
    }
  };

  return (
    <div>
      <div >
        <h1>Edit product</h1>
      </div>
          <br></br>
          <label htmlFor="nameInput">Name</label>
          <br></br>
          <input
            type="text"
            placeholder=""
            id="nameInput"
            onChange={handleName}
            value={name}
          />
          <br></br>
          <label htmlFor="quantityInput">Quantity</label>
          <br></br>
          <input
            type="text"
            placeholder=""
            id="quantityInput"
            onChange={handleQuantity}
            value={quantity}
          />
          <br></br>
          <label htmlFor="unitPriceInput">Unit Price</label>
          <br></br>
          <input
            type="text"
            placeholder=""
            id="unitPriceInput"
            onChange={handleUnitPrice}
            value={unit_price}
          />
          <br></br>
          {error && error}
          <br></br>
          <Button onClick={handleClick} >
            Save product
          </Button>
    </div>
  );
}