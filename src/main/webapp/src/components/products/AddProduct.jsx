import { useDispatch } from "react-redux";
import { Button } from 'react-bootstrap';
import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { productAdded } from "./ProductsSlice";

export function AddProduct() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [sku, setSKU] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit_price, setUnitPrice] = useState(0);
  const [error, setError] = useState(null);

  const handleSKU = (e) => setSKU(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleQuantity = (e) => setQuantity(e.target.value);
  const handleUnitPrice = (e) => setUnitPrice(e.target.value);

  const handleClick = () => {
    if (name && sku && quantity && unit_price) {
      dispatch(
        productAdded({
          sku,
          name,
          quantity,
          unit_price,
        })
      );

      setError(null);
      history.push("/");
    } else {
      setError("Fill in all fields");
    }

    setName("");
    setQuantity(0);
    setUnitPrice(0);
  };

  return (
    <div>
      <div>
        <h1>Add product</h1>
      </div>
          <label htmlFor="skuInput">SKU</label>
          <br></br>
          <input
            type="text"
            placeholder=""
            id="skuInput"
            onChange={handleSKU}
            value={sku}
          />
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
          <Button onClick={handleClick}>
            Add product
          </Button>
    </div>
  );
}