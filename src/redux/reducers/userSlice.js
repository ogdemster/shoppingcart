import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseurl = "http://127.0.0.1:5000";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const { data } = await axios.get(`${baseurl}/users`);
  return data.users;
});

export const addUser = createAsyncThunk("users/addUser", async (userData) => {
  const response = await axios
    .post(`${baseurl}/users`, userData, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.data);
  return response;
});

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userData) => {
    const response = await axios
      .put(
        `${baseurl}/users/${userData.id}`,
        {
          body: JSON.stringify({
            ...userData,
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

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  const response = await axios
    .delete(`${baseurl}/users/${id}`)
    .then((res) => res.data);
  return response;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addMatcher(
        (action) => {
          return [addUser.pending, updateUser.pending, deleteUser.pending].some(
            (thunk) => action.type === thunk.type
          );
        },
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => {
          return [addUser.fulfilled, updateUser.fulfilled].some(
            (thunk) => action.type === thunk.type
          );
        },
        (state, action) => {
          state.loading = false;
          state.users.push(action.payload);
        }
      )
      .addMatcher(
        (action) => {
          return [deleteUser.fulfilled].some(
            (thunk) => action.type === thunk.type
          );
        },
        (state, action) => {
          state.loading = false;
          state.users = state.users.filter(
            (user) => user.id !== action.payload.id
          );
        }
      )
      .addMatcher(
        (action) => {
          return [
            addUser.rejected,
            updateUser.rejected,
            deleteUser.rejected,
          ].some((thunk) => action.type === thunk.type);
        },
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export default userSlice.reducer;
