import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import departmentReducer from "./slices/departmentSlice";
import departmentCategoryReducer from "./slices/departmentCategorySlice";
import roomReducer from "./slices/roomSlice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    user: userReducer,
    department: departmentReducer,
    departmentCategory: departmentCategoryReducer,
    room: roomReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
