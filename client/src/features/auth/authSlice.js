import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, getCurrentUser } from "./authAPI";

const initialState = {
  user: null,
  isLoggedIn: false,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk("auth/login", async (credentials) => {
  const response = await login(credentials);
  localStorage.setItem("accessToken", response.data.accessToken);
  const currentUserResponse = await getCurrentUser();
  return currentUserResponse.data;
});

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData) => {
    const response = await register(userData);
    return response.data;
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async () => {
    const response = await getCurrentUser();
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("accessToken");
      state.isLoggedIn = false;
      state.user = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
