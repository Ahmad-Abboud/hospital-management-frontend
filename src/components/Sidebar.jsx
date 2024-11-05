import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: "250px",
        height: "100vh",
        position: "sticky",
        top: 0, // Ensures the sidebar stays at the top when scrolling
        background: "linear-gradient(to bottom, #4f3cc9, #1e3a8a)",
        color: "white",
        p: 2,
      }}
    >
      {/* Sidebar title */}
      <Typography
        variant="h6"
        sx={{ mb: 2, textAlign: "center", color: "white", fontWeight: "bold" }}
      >
        Admin Panel
      </Typography>

      <List>
        {[
          { label: "Home", to: "/home" },
          { label: "Departments", to: "/department" },
          { label: "Doctors", to: "/doctors" },
          { label: "Patients", to: "/patients" },
          { label: "Inventory", to: "/inventory" },
          { label: "Rooms", to: "/room" },
          { label: "Employee Management", to: "/manageEmployee" },
        ].map((item) => (
          <ListItem
            button
            component={Link}
            to={item.to}
            key={item.label}
            sx={{
              color: "white",
              mb: 1,
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 1,
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
