import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    category: "",
    ID: null
  },
  reducers: {
    changeCategory: (state, action) => {
      state.category = action.payload;
    },
    productID: (state, action) => {
      state.ID = action.payload
    }
  },
});


export const { changeCategory, productID } = productsSlice.actions

export default productsSlice.reducer
