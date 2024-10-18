import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance"; // Adjust path if needed

// Initial state
const initialState = {
  departments: [],
  currentDepartment: null,
  loading: false,
  error: null,
};

// Async actions

// Fetch all departments
export const fetchAllDepartments = createAsyncThunk(
  "departments/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/department");
      return response.data.data; // Assuming the data is under `data.data`
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create department
export const createDepartment = createAsyncThunk(
  "departments/create",
  async (newDepartmentData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/department",
        newDepartmentData
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update department
export const updateDepartment = createAsyncThunk(
  "departments/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/department/${id}`,
        updatedData
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch department details
export const showDepartment = createAsyncThunk(
  "departments/show",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/department/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete department
export const deleteDepartment = createAsyncThunk(
  "departments/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/department/${id}`);
      return { id };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all departments
      .addCase(fetchAllDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(fetchAllDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create department
      .addCase(createDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departments.push(action.payload);
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update department
      .addCase(updateDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.departments.findIndex(
          (dept) => dept.id === action.payload.id
        );
        if (index !== -1) {
          state.departments[index] = action.payload;
        }
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Show department details
      .addCase(showDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDepartment = action.payload;
      })
      .addCase(showDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete department
      .addCase(deleteDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = state.departments.filter(
          (dept) => dept.id !== action.payload.id
        );
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default departmentSlice.reducer;
