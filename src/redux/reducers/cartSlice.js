import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading, setError } from "./apiSlice";
import axios from "axios";

const baseurl = "http://127.0.0.1:5000";

const initialState = {
  cartItems: [],
  cartTotal: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, title, price } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cartItems.push({ id, title, price, quantity: 1 });
      }
      state.cartTotal = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
        } else {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        }
        state.cartTotal = state.cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartTotal = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const saveCart = createAsyncThunk(
  "cart/saveCart",
  async (cartItems, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      // const response = await axios.post(`${baseurl}/shoppingitems`, cartItems, {
      //   headers: {
      //     "content-type": "application/json",
      //   },
      // });
      const response = await axios.post(`${baseurl}/shoppingitems`, cartItems, {
        headers: {
          "content-type": "application/json",
        },
      });
      // handle response if needed
      console.log(response);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      throw error;
    }
  }
);

export default cartSlice.reducer;
