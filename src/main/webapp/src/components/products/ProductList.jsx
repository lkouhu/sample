import { Button } from 'react-bootstrap';
import './ProductList.css';
import { useDispatch, useSelector } from "react-redux";
import { productDeleted } from "./ProductsSlice";
import { Link } from "react-router-dom";
import React from 'react';
export function ProductList() {
  const dispatch = useDispatch();

  const { entities } = useSelector((state) => state.products);
  const {loading} = useSelector((state) => state.products);

  const handleDelete = (sku) => {
    dispatch(productDeleted({ sku }));
  };
    return (
      <div className="container">
        <div>
          <h1>Inventory Management</h1>
        </div>
        <div>
        <div className="divider"></div>
          <Link to="/add-product">
            <Button className="button-primary">Add product</Button>
          </Link>
          </div>
        <div className="row">
        {loading ? (
          "Loading..."
        ) :(
          <table>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>UnitPrice</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
            {entities.length &&
                entities.map(({ sku, name, quantity, unit_price }, i) => (
                  <tr key={i}>
                    <td>{sku}</td>
                    <td>{name}</td>
                    <td>{quantity}</td>
                    <td>{unit_price}</td>
                    <td>
                      <Button onClick={() => handleDelete(sku)}>Delete</Button>
                      <div className="divider"></div>
                      <Link to={`/edit-product/${sku}`}>
                        <Button>Edit</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>)}
        </div>
      </div>
    );
  }