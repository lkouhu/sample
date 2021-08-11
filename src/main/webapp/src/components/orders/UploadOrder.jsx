import React from 'react';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Button } from 'react-bootstrap';
import {  useSelector } from "react-redux";
import { postOrder } from "./OrdersSlice";

export function UploadOrder() {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const {uploading} = useSelector((state) => state.orders);
    const {order} = useSelector((state) => state.orders);
    const handleFileChange = e => setFile(e.target.files[0]);
    const handleFileUpload = () => {
        const formData = new FormData();
        formData.append(
          "file",
          file,
          file.name
        );
        dispatch(postOrder(formData));
    };

    return (
      <div className="container">
        <div >
          <h1>Upload Order</h1>
        </div>
        <div>
        <div className="divider"></div>
          </div>
        <div>
            <h3>Please upload spreadsheet: </h3>
            <div>
                <input type="file" onChange={handleFileChange} />
                <Button onClick={handleFileUpload}>
                  Upload
                </Button>
            </div>
        </div>
        <div >
        {uploading ? (
          "Uploading..."
        ) :(
            order &&
          (
          <div className="row">
          <div>Order ID: {order.id}</div>
          <br></br>
          <div>Order Amount: {order.amount}</div>
          <br></br>
          <div>Order created date: {order.created_date}</div>
          <br></br>
          <h5>Order Items</h5>
          <br></br>
          <table>
            <thead>
              <tr>
                <th>Order_Item_ID</th>
                <th>Sold_Quantity</th>
                <th>Unit_Price</th>
              </tr>
            </thead>
            <tbody>
            {order.orderItems && order.orderItems.length &&
                order.orderItems.map(({ order_item_id, sold_quantity, unit_price }, i) => (
                  <tr key={i}>
                    <td>{order_item_id}</td>
                    <td>{sold_quantity}</td>
                    <td>{unit_price}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          </div>))}
        </div>
      </div>
    );
  }