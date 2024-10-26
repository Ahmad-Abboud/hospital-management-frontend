import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// Initial state
const initialState = {
  doctors: [],
  currentDoctor: null,
  loading: false,
  error: null,
};

// Async actions

// Fetch all departments
export const fetchAllDoctors = createAsyncThunk(
  "doctors/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admin/doctor");
      console.log(response);
      if (response.data.data.status === "failed") {
        // Manually reject the value with the error message
        return rejectWithValue(response.data);
      }
      return response.data.data.data; // Assuming the data is under `data.data`
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create department
export const createDoctor = createAsyncThunk(
  "doctors/create",
  async (newDepartmentData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/admin/doctor",
        newDepartmentData
      );
      if (response.data.data.status === "failed") {
        // Manually reject the value with the error message
        return rejectWithValue(response.data);
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update department
export const updateDoctor = createAsyncThunk(
  "doctors/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/admin/doctor/${id}`,
        updatedData
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch department details
export const showDoctor = createAsyncThunk(
  "doctors/show",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/doctor/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete department
export const deleteDoctor = createAsyncThunk(
  "doctors/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/admin/doctor/${id}`);
      if (response.data.data.status === "failed") {
        // Manually reject the value with the error message
        return rejectWithValue(response.data);
      }
      return { id };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all departments
      .addCase(fetchAllDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchAllDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create department
      .addCase(createDoctor.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors.push(action.payload.data);
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update department
      .addCase(updateDoctor.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.doctors.findIndex(
          (dept) => dept.id === action.payload.data.id
        );

        if (index !== -1) {
          state.doctors[index] = action.payload.data;
        }
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Show department details
      .addCase(showDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDoctor = action.payload;
      })
      .addCase(showDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete department
      .addCase(deleteDoctor.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = state.doctors.filter(
          (dept) => dept.id !== action.payload.id
        );
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default doctorSlice.reducer;
