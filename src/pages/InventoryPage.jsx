import { useState, useEffect } from "react";
import { Box, Button, Select, MenuItem, Typography } from "@mui/material";
import CommonTable from "../components/CommonTable";
import SearchBar from "../components/SearchBar";
import StatusBadge from "../components/StatusBadge";
import ActionButtons from "../components/ActionButtons";

// Mock Data for Inventory
const mockInventory = [
  {
    id: 1,
    item: "Surgical Masks",
    category: "PPE",
    qtyInStock: 500,
  },
  {
    id: 2,
    item: "Gloves",
    category: "PPE",
    qtyInStock: 50,
  },
  {
    id: 3,
    item: "Hand Sanitizer",
    category: "Sanitizer",
    qtyInStock: 200,
  },
  {
    id: 4,
    item: "Face Shields",
    category: "PPE",
    qtyInStock: 0,
  },
  // Add more mock data if needed
];

const InventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    setInventory(mockInventory); // Set mock data
    // You can later fetch data from API or Redux store here
  }, []);

  // Table Columns
  const columns = [
    { id: "item", label: "Item" },
    { id: "category", label: "Department" },
    { id: "qtyInStock", label: "Qty in Stock" },
    { id: "actions", label: "Actions" },
  ];

  // Filter Logic
  const filteredInventory = inventory
    .filter((item) =>
      item.item.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) =>
      categoryFilter ? item.category === categoryFilter : true
    )
    .filter((item) =>
      availabilityFilter ? item.availability === availabilityFilter : true
    );

  // Map Data to Table Rows
  const rows = filteredInventory.map((item) => ({
    ...item,
    actions: (
      <ActionButtons
        onEdit={() => console.log(`Edit item: ${item.id}`)}
        onDelete={() => console.log(`Reorder item: ${item.id}`)}
      />
    ),
  }));

  return (
    <Box p={2}>
      <Typography variant="h4" component="h1" gutterBottom>
        Inventory Management
      </Typography>

      {/* Search and Filters */}
      <Box mb={2}>
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          displayEmpty
          variant="outlined"
        >
          <MenuItem value="">
            <em>Department</em>
          </MenuItem>
          <MenuItem value="PPE">PPE</MenuItem>
          <MenuItem value="Sanitizer">Sanitizer</MenuItem>
        </Select>

        <Button variant="contained" color="primary">
          Add Item
        </Button>
      </Box>

      {/* Table */}
      <CommonTable
        columns={columns}
        rows={rows}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </Box>
  );
};

export default InventoryPage;
