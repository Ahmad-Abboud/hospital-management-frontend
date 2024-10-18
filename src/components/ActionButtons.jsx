import React from "react";
import { Button, Box } from "@mui/material";

const ActionButtons = ({ onEdit, onDelete }) => {
  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={onEdit}
        sx={{ mr: 1 }}
      >
        Edit
      </Button>
      <Button variant="contained" color="error" onClick={onDelete}>
        Delete
      </Button>
    </Box>
  );
};

export default ActionButtons;
