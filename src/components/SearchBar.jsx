import React from "react";
import { TextField, Box } from "@mui/material";

const SearchBar = ({ value, onChange }) => {
  return (
    <Box mb={2}>
      <TextField
        fullWidth
        label="Search"
        value={value}
        onChange={onChange}
        variant="outlined"
      />
    </Box>
  );
};

export default SearchBar;
