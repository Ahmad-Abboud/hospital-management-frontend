import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import departmentReducer from "./slices/departmentSlice";
import departmentCategoryReducer from "./slices/departmentCategorySlice";
import roomCategorySliceReducer from "./slices/roomCategorySlice";
import roomReducer from "./slices/roomSlice";
import logger from "redux-logger";
import employeeSliceReducer from "./slices/employeeSlice";
import employeeLoginSliceReducer from "./slices/employeeLoginSlice";
import doctorReducer from "./slices/doctorSlice";
import doctorLoginReducer from "./slices/doctorLogin";

const store = configureStore({
  reducer: {
    user: userReducer,
    department: departmentReducer,
    departmentCategory: departmentCategoryReducer,
    room: roomReducer,
    roomCategory: roomCategorySliceReducer,
    employee: employeeSliceReducer,
    employeeUser: employeeLoginSliceReducer,
    doctor: doctorReducer,
    doctorLoginSlice: doctorLoginReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
