import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseurl = "http://127.0.0.1:5000";

const initialState = {
  shoopingTracks: [],
  loading: false,
  error: null,
};
export const fetchShoppingTracks = createAsyncThunk(
  "shoppingTracks/fetchShoppingTracks",
  async ({ user_id }) => {
    const { data } = await axios.get(
      `${baseurl}/shoppingtracks/user_id=${user_id}`,
      {
        headers: { "content-type": "application/json" },
      }
    );
    return data;
  }
);

export const addShoppingTracks = createAsyncThunk(
  "shoppingTracks/addShoppingTracks",
  async (shoppingTracksData) => {
    const response = await axios
      .post(`${baseurl}/shoppingtracks`, shoppingTracksData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => res.data);
    return response;
  }
);

export const updateShoppingTracks = createAsyncThunk(
  "shoppingTracks/updateShoppingTracks",
  async (shoppingTracksData) => {
    const response = await axios
      .put(
        `${baseurl}/shoppingtracks/${shoppingTracksData.id}`,
        shoppingTracksData,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => res.data);
    return response;
  }
);

export const deleteShoppingTracks = createAsyncThunk(
  "shoppingTracks/deleteShoppingTracks",
  async (id) => {
    const response = await axios
      .delete(`${baseurl}/soppingtracks/${id}`)
      .then((res) => res.data);
    return response;
  }
);

const shoppingTracksSlice = createSlice({
  name: "shoppingTracks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoppingTracks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShoppingTracks.fulfilled, (state, action) => {
        state.loading = false;
        state.shoopingTracks = action.payload;
      })
      .addCase(fetchShoppingTracks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addMatcher(
        (action) => {
          return [
            addShoppingTracks.pending,
            updateShoppingTracks.pending,
            deleteShoppingTracks.pending,
          ].some((thunk) => action.type === thunk.type);
        },
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => {
          return [
            addShoppingTracks.fulfilled,
            updateShoppingTracks.fulfilled,
          ].some((thunk) => action.type === thunk.type);
        },
        (state, action) => {
          state.loading = false;
          state.shoopingTracks.push(action.payload);
        }
      )
      .addMatcher(
        (action) => {
          return [deleteShoppingTracks.fulfilled].some(
            (thunk) => action.type === thunk.type
          );
        },
        (state, action) => {
          state.loading = false;
          state.shoopingTracks = state.shoopingTracks.filter(
            (track) => track.id !== action.payload.id
          );
        }
      )
      .addMatcher(
        (action) => {
          return [
            addShoppingTracks.rejected,
            updateShoppingTracks.rejected,
            deleteShoppingTracks.rejected,
          ].some((thunk) => action.type === thunk.type);
        },
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export default shoppingTracksSlice.reducer;
