import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const { data } = await axios.get("https://dummyjson.com/products");
    return data.products;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData) => {
    const response = await axios
      .post(
        "https://dummyjson.com/products/add",
        {
          body: JSON.stringify({
            ...productData,
          }),
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => res.data);
    return response;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (productData) => {
    const response = await axios
      .put(
        `https://dummyjson.com/products/${productData.id}`,
        {
          body: JSON.stringify({
            ...productData,
          }),
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => res.data);
    return response;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    const response = await axios
      .delete(`https://dummyjson.com/products/${id}`)
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
        console.log(action);
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addMatcher(
        (action) => {
          return [addProduct, updateProduct, deleteProduct].some((thunk) =>
            action.type.startsWith(thunk.typePrefix)
          );
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
