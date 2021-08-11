import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from 'axios';
export const postOrder = createAsyncThunk("orders/postOrder", async (data) => {
  const response = await Axios.post("http://localhost:8080/api/v1/uploadOrderFile", data,                
  {
    headers: {
        "Content-type": "multipart/form-data;boundary=----------287032381131322",
    },                    
}
);
  const order = await response.data;
  return order;
});

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    uploading: false,
    order: null,
  },
  reducers: {
    orderDeleted(state, action) {

    },
  },
  extraReducers: {
    [postOrder.pending]: (state, action) => {
      state.uploading = true;
    },
    [postOrder.fulfilled]: (state, action) => {
      state.uploading = false;
      state.order = action.payload;
    },
    [postOrder.rejected]: (state, action) => {
      state.uploading = false;
    },
  },
});

export const { orderDeleted } = ordersSlice.actions;
export default ordersSlice.reducer;