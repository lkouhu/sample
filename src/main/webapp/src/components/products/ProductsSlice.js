import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from 'axios';
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch("http://localhost:8080/api/v1/products");
  const products = await response.json();
  return products;
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    productAdded(state, action) {
      state.entities.push(action.payload);
      Axios.post("http://localhost:8080/api/v1/products", action.payload)
      .then(response => {
      })
      .catch(error => {
        throw(error);
      });
    },
    productUpdated(state, action) {
      const { sku, name, quantity, unit_price } = action.payload;
      const existingProduct = state.entities.find((product) => product.sku === sku);
      if (existingProduct) {
        existingProduct.name = name;
        existingProduct.quantity= quantity;
        existingProduct.unit_price= unit_price;
        Axios.put("http://localhost:8080/api/v1/products", action.payload)
        .then(response => {
        })
        .catch(error => {
          throw(error);
        });
      }
    },
    productDeleted(state, action) {
      const { sku } = action.payload;
      const existingProduct = state.entities.find((product) => product.sku=== sku);
      if (existingProduct) {
        state.entities = state.entities.filter((product) => product.sku!== sku);
        Axios.delete("http://localhost:8080/api/v1/products/"+sku)
        .then(response => {
        })
        .catch(error => {
          throw(error);
        });
      }
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = [...state.entities, ...action.payload];
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { productAdded, productUpdated, productDeleted } = productsSlice.actions;

export default productsSlice.reducer;