import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favoriteItems: [],
  },
  reducers: {
    putItem: (state, action) => {
      state.favoriteItems.push(action.payload);
    },
    removeItem: (state, action) => {
        state.favoriteItems = state.favoriteItems.filter(item => item.id !== action.payload.id);
        // console.log("action =>", action.payload)
    }
  },
});



export const { putItem, removeItem } = favoriteSlice.actions

export default favoriteSlice.reducer