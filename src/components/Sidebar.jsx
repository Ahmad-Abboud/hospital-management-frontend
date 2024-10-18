// src/components/Sidebar.js
import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <List sx={{ width: "250px", bgcolor: "background.paper" }}>
      <ListItem component={Link} to="/home">
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem component={Link} to="/department">
        <ListItemText primary="Departments" />
      </ListItem>
      <ListItem component={Link} to="/doctors">
        <ListItemText primary="Doctors" />
      </ListItem>
      <ListItem component={Link} to="/patients">
        <ListItemText primary="Patients" />
      </ListItem>
      <ListItem component={Link} to="/inventory">
        <ListItemText primary="Inventory" />
      </ListItem>
    </List>
  );
};

export default Sidebar;
