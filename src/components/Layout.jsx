// src/components/Layout.js
import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
// import MyAppBar from "./AppBar";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* <MyAppBar /> */}
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* {children} */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
