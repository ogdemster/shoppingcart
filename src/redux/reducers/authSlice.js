import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseurl = "http://127.0.0.1:5000";

const initialState = {
  user: {},
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/LoginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseurl}/login`, {
        username,
        password,
      });
      return response.data;
    } catch (err) {
      // Handle the case where the user is not found
      if (
        err.response.status === 200 &&
        err.response.data === "User not found"
      ) {
        return rejectWithValue("User not found");
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
