import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Select,
  MenuItem,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StatusBadge from "../components/StatusBadge";
import ActionButtons from "../components/ActionButtons";
import { useNavigate } from "react-router-dom/dist";

// Mock Data for Patients
const mockPatients = [
  {
    id: 301,
    name: "Caren G. Simpson",
    age: 35,
    checkIn: "20 July 2028",
    doctor: "Dr. Petra Winsburry",
    room: "Double - 303",
    status: "Active",
  },
  {
    id: 302,
    name: "Edgar Warrow",
    age: 45,
    checkIn: "20 July 2028",
    doctor: "Dr. Olivia Martinez",
    room: "-",
    status: "Active",
  },
  {
    id: 303,
    name: "Ocean Jane Lupre",
    age: 10,
    checkIn: "20 July 2028",
    doctor: "Dr. Damian Sanchez",
    room: "Double - 303",
    status: "New Patient",
  },
  // Add more mock data here
];

const PatientsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [treatmentFilter, setTreatmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setPatients(mockPatients); // Set mock data
  }, []);

  // Table Columns
  const columns = [
    { id: "name", label: "Name" },
    { id: "age", label: "Age" },
    { id: "checkIn", label: "Check-In" },
    { id: "doctor", label: "Doctor Assigned" },
    { id: "room", label: "Room" },
    { id: "status", label: "Status" },
    { id: "actions", label: "Actions" },
  ];

  // Filter Logic
  const filteredPatients = patients
    .filter((patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((patient) =>
      treatmentFilter ? patient.treatment === treatmentFilter : true
    )
    .filter((patient) =>
      statusFilter ? patient.status === statusFilter : true
    );

  // const rows = filteredPatients.map((patient) => ({
  //     ...patient,
  //     status: <StatusBadge status={patient.status} />,
  //     actions: (
  //         <ActionButtons
  //             onEdit={() => console.log(`Edit patient: ${patient.id}`)}
  //             onDelete={() => console.log(`Delete patient: ${patient.id}`)}
  //         />
  //     ),
  // }));

  const navigate = useNavigate(); // Add this inside the PatientsPage component
  const rows = filteredPatients.map((patient) => ({
    ...patient,
    status: <StatusBadge status={patient.status} />,
    actions: (
      <Box display="flex" alignItems="center">
        <ActionButtons
          onEdit={() => console.log(`Edit patient: ${patient.id}`)}
          onDelete={() => console.log(`Delete patient: ${patient.id}`)}
        />
        <Button
          variant="outlined"
          size="small"
          sx={{ ml: 1 }} // Add a little margin-left for spacing
          onClick={() => navigate(`/patients/${patient.id}`)} // Navigate to patient details
        >
          View Details
        </Button>
      </Box>
    ),
  }));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box p={2}>
      <Typography variant="h4" component="h1" gutterBottom>
        Patients
      </Typography>

      {/* Filters and Search */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Select
          value={treatmentFilter}
          onChange={(e) => setTreatmentFilter(e.target.value)}
          displayEmpty
          variant="outlined"
          sx={{ mr: 2 }}
        >
          <MenuItem value="">
            <em>All Treatment</em>
          </MenuItem>
          <MenuItem value="Routine Check-Up">Routine Check-Up</MenuItem>
          <MenuItem value="Cardiac Consultation">Cardiac Consultation</MenuItem>
        </Select>

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          displayEmpty
          variant="outlined"
          sx={{ mr: 2 }}
        >
          <MenuItem value="">
            <em>All Status</em>
          </MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
          <MenuItem value="New Patient">New Patient</MenuItem>
        </Select>

        <TextField
          variant="outlined"
          placeholder="Search name, ID, age, etc."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1, mr: 2 }}
        />

        <Button variant="contained" color="primary">
          + Add Patient
        </Button>
      </Box>

      {/* Patient Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{row[column.id]}</TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Typography variant="body2">
          Showing {rowsPerPage} out of {filteredPatients.length} patients
        </Typography>
        <TablePagination
          component="div"
          count={filteredPatients.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default PatientsPage;
