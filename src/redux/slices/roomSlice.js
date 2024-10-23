import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// Async actions

// Create room
export const createRoom = createAsyncThunk(
  "room/createRoom",
  async (roomData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/room", roomData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update room
export const updateRoom = createAsyncThunk(
  "room/updateRoom",
  async ({ id, roomData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/room/${id}`, roomData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Show one room by ID
export const fetchRoom = createAsyncThunk(
  "room/fetchRoom",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/room/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch all rooms
export const fetchRooms = createAsyncThunk(
  "room/fetchRooms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/room");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete room
export const deleteRoom = createAsyncThunk(
  "room/deleteRoom",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/room/${id}`);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Room slice
const roomSlice = createSlice({
  name: "room",
  initialState: {
    rooms: [],
    room: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create room
      .addCase(createRoom.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms.push(action.payload.data);
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update room
      .addCase(updateRoom.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.rooms.findIndex(
          (room) => room.id === action.payload.data.id
        );
        if (index !== -1) {
          state.rooms[index] = action.payload.data;
        }
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch room by ID
      .addCase(fetchRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.room = action.payload.data;
      })
      .addCase(fetchRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch all rooms
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload.data;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete room
      .addCase(deleteRoom.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = state.rooms.filter(
          (room) => room.id !== action.payload.data.id
        );
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default roomSlice.reducer;
