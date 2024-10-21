import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// Async action for login
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/admin/login", {
        email,
        password,
      });
      // Check if the login was unsuccessful based on response data (e.g., `status: 'failed'`)
      if (response.data.data.status === "failed") {
        // Manually reject the value with the error message
        return rejectWithValue(response.data);
      }

      return response.data.data.data; // Assuming the response contains the user data and token
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
        const { token, role, permissions, user_name, id, img } = action.payload;
        state.token = token;
        state.role = role;
        state.permissions = permissions;
        state.name = user_name;
        state.id = id;
        state.profilePicture = img;
        state.isLoading = false;

        // Save the token to localStorage for persistence
        localStorage.setItem("token", token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.data.message || "Login failed";
      });
  },
});

// Export the actions
export const { clearUserInfo } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
