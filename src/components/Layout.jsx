import React from "react";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #4f3cc9, #1e3a8a)",
      }}
    >
      <Sidebar />
      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <AppBar
          position="sticky"
          sx={{
            bgcolor: "rgba(0,0,0,0.7)",
            boxShadow: "none",
            backdropFilter: "blur(10px)",
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Hospital Managment
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            color: "black",
            backgroundColor: "white",
            minHeight: "90vh",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
