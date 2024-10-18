import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// Async action for login
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      return response.data; // Assuming the response contains the user data and token
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Return error data from API
      }
      return rejectWithValue(error.message);
    }
  }
);

// Initial state for user information
const initialState = {
  token: null,
  role: null,
  permissions: [],
  name: "",
  id: null,
  profilePicture: "",
  isLoading: false,
  error: null,
};

// Create user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Clear user information (on logout)
    clearUserInfo: (state) => {
      state.token = null;
      state.role = null;
      state.permissions = [];
      state.name = "";
      state.id = null;
      state.profilePicture = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { token, role, permissions, name, id, profilePicture } =
          action.payload;
        state.token = token;
        state.role = role;
        state.permissions = permissions;
        state.name = name;
        state.id = id;
        state.profilePicture = profilePicture;
        state.isLoading = false;

        // Save the token to localStorage for persistence
        localStorage.setItem("token", token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

// Export the actions
export const { clearUserInfo } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
