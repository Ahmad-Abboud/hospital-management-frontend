import React, { useState } from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";

const CommonForm = ({
  formFields,
  handleSubmit,
  formData,
  setFormData,
  pressed,
  setPressed,
}) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setPressed(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxHeight: "70vh", // Define a fixed maximum height
        maxWidth: "500px", // Define a fixed width
        overflowY: "auto", // Enable vertical scrolling for overflow
        padding: 2,
        boxShadow: 3,
        backgroundColor: "background.paper",
        borderRadius: 2,
        margin: "auto", // Center the form horizontally
      }}
    >
      {formFields.map((field) => (
        <TextField
          key={field.name}
          label={field.label}
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
          fullWidth
          select={field.type === "select"}
          margin="normal"
        >
          {field.type === "select" &&
            field.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
      ))}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={pressed === true}
      >
        Submit
        {/* {pressed ? "Submit" : "Submit"} */}
      </Button>
    </Box>
  );
};

export default CommonForm;
