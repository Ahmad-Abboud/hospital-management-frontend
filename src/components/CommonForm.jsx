import React from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";

const CommonForm = ({ formFields, handleSubmit, formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
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
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default CommonForm;
