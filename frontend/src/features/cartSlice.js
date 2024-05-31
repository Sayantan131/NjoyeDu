import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const itemExists = state.cartItems.find((i) => i.id === item.id);
      if (itemExists) {
        state.cartItems = state.cartItems.map((i) =>
          i.id === item.id ? item : i
        );
      } else {
        state.cartItems.push(item);
      }
      state.cartTotal = state.cartItems.reduce(
        (acc, item) => acc + item.price,
        0
      );
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((i) => i.id !== itemId); // Change this line
      state.cartTotal = state.cartItems.reduce(
        (acc, item) => acc + item.price,
        0
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
