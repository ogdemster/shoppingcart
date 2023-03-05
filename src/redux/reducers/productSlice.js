import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const baseurl = "http://127.0.0.1:5000";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const { data } = await axios.get(`${baseurl}/products`);
    return data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData) => {
    console.log("here" + productData);
    const response = await axios
      .post(`${baseurl}/products`, productData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => res.data);
    return response;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (productData) => {
    const response = await axios
      .put(`${baseurl}/products/${productData.id}`, productData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => res.data);
    return response;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    const response = await axios
      .delete(`${baseurl}/products/${id}`, {
        headers: {},
      })
      .then((res) => res.data);
    return response;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addMatcher(
        (action) => {
          return [
            addProduct.pending,
            updateProduct.pending,
            deleteProduct.pending,
          ].some((thunk) => action.type === thunk.type);
        },
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => {
          return [addProduct.fulfilled, updateProduct.fulfilled].some(
            (thunk) => action.type === thunk.type
          );
        },
        (state, action) => {
          state.loading = false;
          state.products.push(action.payload);
        }
      )
      .addMatcher(
        (action) => {
          return [deleteProduct.fulfilled].some(
            (thunk) => action.type === thunk.type
          );
        },
        (state, action) => {
          state.loading = false;
          state.products = state.products.filter(
            (product) => product.id !== action.payload.id
          );
        }
      )
      .addMatcher(
        (action) => {
          return [
            addProduct.rejected,
            updateProduct.rejected,
            deleteProduct.rejected,
          ].some((thunk) => action.type === thunk.type);
        },
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export default productSlice.reducer;
