// ========================================
// authSlice.ts
// ========================================

import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axiosInstance from "../../api/axiosInstance";

interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "investor" | "entrepreneur";
  avatar: string;
  createdAt: string;
  updatedAt: string;
  portfolioCompanies: string[];
  experience: string[];
  skills: string[];
  bio: string;
  startupIdea: string;
  isProfileComplete: boolean;
  location: string;
}

interface AuthState {
  user: IUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
}

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",

  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/auth/me");

      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch user",
      );
    }
  },
);

const initialState: AuthState = {
  user: null,

  loading: false,

  isAuthenticated: false,

  accessToken: localStorage.getItem("accessToken") || null,
};

export const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials: (
      state,

      action: PayloadAction<{
        user: IUser;
        accessToken: string;
      }>,
    ) => {
      state.user = action.payload.user;

      state.accessToken = action.payload.accessToken;

      state.isAuthenticated = true;

      localStorage.setItem("accessToken", action.payload.accessToken);
    },

    logout: (state) => {
      state.user = null;

      state.accessToken = null;

      state.isAuthenticated = false;

      localStorage.removeItem("accessToken");
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        fetchCurrentUser.fulfilled,

        (state, action: PayloadAction<IUser>) => {
          state.user = action.payload;

          state.isAuthenticated = true;

          state.loading = false;
        },
      )

      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;

        state.isAuthenticated = false;
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
