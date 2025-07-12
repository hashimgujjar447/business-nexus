// src/redux/slices/userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser } from "../../api/auth";

// Define the user type
interface User {
  name: string;
  email: string;
  role: "investor" | "entrepreneur";
  _id: string;
}

export const fetchCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("user/fetchCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const res = await getCurrentUser(); // API returns { success, user }
    return res.user;
  } catch (err) {
    return rejectWithValue("Not authenticated");
  }
});

// userSlice.ts

interface UserState {
  name: string;
  email: string;
  role: "investor" | "entrepreneur" | "";
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  hasFetched: boolean; // NEW
  _id: string; // Add _id to the state
}

const initialState: UserState = {
  name: "",
  email: "",
  role: "",
  loading: false,
  isAuthenticated: false,
  error: null,
  hasFetched: false, // NEW
  _id: "", // Add _id to the state
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { name, email, role } = action.payload;
      state.name = name;
      state.email = email;
      state.role = role;
      state.isAuthenticated = true;
      state.hasFetched = true;
      state._id = action.payload._id; // Set _id from payload
      state.error = null;
    },
    logout: (state) => {
      state.name = "";
      state.email = "";
      state.role = "";
      state.isAuthenticated = false;
      state.hasFetched = true;
      state._id = ""; // Reset _id on logout
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.hasFetched = false;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        const { name, email, role } = action.payload;
        state.name = name;
        state.email = email;
        state.role = role;
        state.isAuthenticated = true;
        state.loading = false;
        state.hasFetched = true;
        state._id = action.payload._id; // Set _id from payload
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.hasFetched = true;
        state._id = ""; // Reset _id on error
      });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
