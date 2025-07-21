import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
}

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/auth/me", {
        withCredentials: true, // ✅ important if using cookies for token
      });

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Failed to fetch user",
      );
    }
  },
);

const initialState: AuthState = {
  user: null,
  loading: false,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
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

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
