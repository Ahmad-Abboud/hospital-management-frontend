import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// Initial state
const initialState = {
  employees: [],
  currentEmployee: null,
  loading: false,
  error: null,
};

// Async actions

// Fetch all departments
export const fetchAllEmployees = createAsyncThunk(
  "employees/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admin/employee");
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
export const createEmployee = createAsyncThunk(
  "employees/create",
  async (newDepartmentData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/admin/employee",
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
export const updateEmployee = createAsyncThunk(
  "employees/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/admin/employee/${id}`,
        updatedData
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch department details
export const showEmployee = createAsyncThunk(
  "employees/show",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/employee/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete department
export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/admin/employee/${id}`);
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
const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all departments
      .addCase(fetchAllEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchAllEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create department
      .addCase(createEmployee.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload.data);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update department
      .addCase(updateEmployee.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.employees.findIndex(
          (dept) => dept.id === action.payload.data.id
        );

        if (index !== -1) {
          state.employees[index] = action.payload.data;
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Show department details
      .addCase(showEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEmployee = action.payload;
      })
      .addCase(showEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete department
      .addCase(deleteEmployee.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter(
          (dept) => dept.id !== action.payload.id
        );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;
