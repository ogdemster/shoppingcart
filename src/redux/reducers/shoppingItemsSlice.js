import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseurl = "http://127.0.0.1:5000";

const initialState = {
  shoppingItems: [],
  loading: false,
  error: null,
};
export const fetchShoppingItems = createAsyncThunk(
  "shoppingItems/fetchShoppingItems",
  async ({ user_id }) => {
    const { data } = await axios.get(`${baseurl}/shoppingitems/${user_id}`, {
      headers: { "content-type": "application/json" },
    });

    return data;
  }
);

export const addShoppingItems = createAsyncThunk(
  "shoppingItems/addShoppingItems",
  async (shoppingItemsData) => {
    const response = await axios
      .post(`${baseurl}/shoppingitems`, shoppingItemsData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => res.data);
    return response;
  }
);

export const updateShoppingItems = createAsyncThunk(
  "shoppingItems/updateShoppingItems",
  async (shoppingItemsData) => {
    const response = await axios
      .put(
        `${baseurl}/shoppingitems/${shoppingItemsData.id}`,
        shoppingItemsData,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => res.data);
    return response;
  }
);

export const deleteShoppingItems = createAsyncThunk(
  "shoppingItems/deleteShoppingItems",
  async (id) => {
    const response = await axios
      .delete(`${baseurl}/soppingitems/${id}`)
      .then((res) => res.data);
    return response;
  }
);

const shoppingItemsSlice = createSlice({
  name: "shoppingItems",
  initialState,
  reducers: {
    clearShoppingItems: (state) => {
      state.shoppingItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoppingItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShoppingItems.fulfilled, (state, action) => {
        state.loading = false;
        state.shoppingItems = action.payload;
      })
      .addCase(fetchShoppingItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addMatcher(
        (action) => {
          return [
            addShoppingItems.pending,
            updateShoppingItems.pending,
            deleteShoppingItems.pending,
          ].some((thunk) => action.type === thunk.type);
        },
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => {
          return [
            addShoppingItems.fulfilled,
            updateShoppingItems.fulfilled,
          ].some((thunk) => action.type === thunk.type);
        },
        (state, action) => {
          state.loading = false;
          state.shoppingItems.push(action.payload);
        }
      )
      .addMatcher(
        (action) => {
          return [deleteShoppingItems.fulfilled].some(
            (thunk) => action.type === thunk.type
          );
        },
        (state, action) => {
          state.loading = false;
          state.shoppingItems = state.shoppingItems.filter(
            (item) => item.id !== action.payload.id
          );
        }
      )
      .addMatcher(
        (action) => {
          return [
            addShoppingItems.rejected,
            updateShoppingItems.rejected,
            deleteShoppingItems.rejected,
          ].some((thunk) => action.type === thunk.type);
        },
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export const { clearShoppingItems } = shoppingItemsSlice.actions;
export default shoppingItemsSlice.reducer;
