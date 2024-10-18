import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import departmentReducer from "./slices/departmentSlice";
import departmentCategoryReducer from "./slices/departmentCategorySlice";
import roomReducer from "./slices/roomSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    department: departmentReducer,
    departmentCategory: departmentCategoryReducer,
    room: roomReducer,
  },
});

export default store;
