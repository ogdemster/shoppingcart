import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseurl = "http://127.0.0.1:5000";

const initialState = {
  user: {},
  loading: false,
  error: null,
};

export const loginUser2 = createAsyncThunk(
  "auth/LoginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      await axios
        .post(
          `${baseurl}/auth2/api/token`,
          {
            username: username,
            password: password,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((result) => {
          console.log("here start!!!!!!!!!!!!!!!!!!!!!!!!");
          console.log(result.headers);
          console.log("here end!!!!!!!!!!!!!!!!!!!!!!!!");
          if (!result) {
            return;
          }
          //CHECK RESULT SET-COOKIE DEFINED
          if (
            result &&
            result.data.headers &&
            result.data.headers["set-cookie"]
          ) {
            const token = result.headers["set-cookie"][0]
              .split("=")[1]
              .split(";")[0];
            document.cookie = `jwt=${token}; Secure; HttpOnly`;
            return result;
          }
        });
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

const authCookieSlice = createSlice({
  name: "auth2",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser2.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser2.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser2.rejected, (state, action) => {
        state.loading = false;
        state.error = action;
      });
  },
});

export const { logout } = authCookieSlice.actions;

export default authCookieSlice.reducer;
