import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// Async actions

// Fetch all room categories
export const fetchAllRoomCategories = createAsyncThunk(
  "roomCategory/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/room-category");

      return response.data.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a new room category
export const createRoomCategory = createAsyncThunk(
  "roomCategory/create",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/room-category", categoryData);
      return response.data.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update a room category
export const updateRoomCategory = createAsyncThunk(
  "roomCategory/update",
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/room-category/${id}`,
        categoryData
      );
      return response.data.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a room category
export const deleteRoomCategory = createAsyncThunk(
  "roomCategory/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/room-category/${id}`);
      return response.data.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  roomCategories: [],
  status: "idle",
  error: null,
};

// Slice
const roomCategorySlice = createSlice({
  name: "roomCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all room categories
      .addCase(fetchAllRoomCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllRoomCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roomCategories = action.payload;
      })
      .addCase(fetchAllRoomCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Create room category
      .addCase(createRoomCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createRoomCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roomCategories.push(action.payload);
      })
      .addCase(createRoomCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update room category
      .addCase(updateRoomCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateRoomCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.roomCategories.findIndex(
          (cat) => cat.id === action.payload.id
        );
        if (index !== -1) {
          state.roomCategories[index] = action.payload;
        }
      })
      .addCase(updateRoomCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Delete room category
      .addCase(deleteRoomCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteRoomCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roomCategories = state.roomCategories.filter(
          (cat) => cat.id !== action.payload.id
        );
      })
      .addCase(deleteRoomCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default roomCategorySlice.reducer;
