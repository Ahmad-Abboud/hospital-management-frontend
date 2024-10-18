import { useState, useEffect } from "react";
import { Box, Button, Select, MenuItem } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
import BreadcrumbsNav from "../components/BreadcrumbsNav";
import CommonTable from "../components/CommonTable";
import SearchBar from "../components/SearchBar";
import StatusBadge from "../components/StatusBadge";
import ActionButtons from "../components/ActionButtons";
// import { fetchDoctors } from "../redux/doctorsSlice";  // Redux action

const mockDoctors = [
  {
    name: "Dr. Peter Winbury",
    department: "General Medicine",
    specialist: "Routine Check-Ups",
    status: "available",
  },
  {
    name: "Dr. Peter Winbury",
    department: "General Medicine",
    specialist: "Routine Check-Ups",
    status: "available",
  },
  {
    name: "Dr. Peter Winbury",
    department: "General Medicine",
    specialist: "Routine Check-Ups",
    status: "available",
  },
  {
    name: "Dr. Peter Winbury",
    department: "General Medicine",
    specialist: "Routine Check-Ups",
    status: "available",
  },
  {
    name: "Dr. Peter Winbury",
    department: "General Medicine",
    specialist: "Routine Check-Ups",
    status: "available",
  },
  {
    name: "Dr. Olivia Martinez",
    department: "Cardiology",
    specialist: "Heart Specialist",
    status: "unavailable",
  },
  {
    name: "Dr. Damian Sanchez",
    department: "Pediatrics",
    specialist: "Child Health",
    status: "available",
  },
  {
    name: "Dr. Chloe Harrington",
    department: "Dermatology",
    specialist: "Skin Specialist",
    status: "unavailable",
  },
  {
    name: "Dr. Emily Smith",
    department: "General Medicine",
    specialist: "Routine Check-Ups",
    status: "available",
  },
  {
    name: "Dr. Samuel Thompson",
    department: "Cardiology",
    specialist: "Heart Specialist",
    status: "unavailable",
  },
  {
    name: "Dr. Sarah Johnson",
    department: "Pediatrics",
    specialist: "Child Health",
    status: "available",
  },
];

const DoctorPage = () => {
  // const dispatch = useDispatch();
  // const { doctors, loading } = useSelector((state) => state.doctors);

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [specialistFilter, setSpecialistFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [doctors, setDoctors] = useState([]);

  // Mock data usage for now
  useEffect(() => {
    setDoctors(mockDoctors); // Set mock data
    // dispatch(fetchDoctors());  // Uncomment this when Redux is ready
  }, []);

  // Table Columns
  const columns = [
    { id: "name", label: "Name" },
    { id: "department", label: "Department" },
    { id: "specialist", label: "Specialist" },
    { id: "status", label: "Availability Status" },
    { id: "actions", label: "Actions" },
  ];

  // Filtering logic
  const filteredDoctors = doctors
    .filter((doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((doctor) =>
      departmentFilter ? doctor.department === departmentFilter : true
    )
    .filter((doctor) =>
      specialistFilter ? doctor.specialist === specialistFilter : true
    )
    .filter((doctor) => (statusFilter ? doctor.status === statusFilter : true));

  const rows = filteredDoctors.map((doctor) => ({
    ...doctor,
    status: <StatusBadge status={doctor.status} />, // Using StatusBadge
    actions: (
      <ActionButtons
        onEdit={() => console.log(`Edit doctor: ${doctor.id}`)}
        onDelete={() => console.log(`Delete doctor: ${doctor.id}`)}
      />
    ),
  }));

  return (
    <Box p={2}>
      <BreadcrumbsNav
        links={[{ name: "Home", path: "/home" }]}
        current="Doctors"
      />

      <Box mb={2}>
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          displayEmpty
          variant="outlined"
        >
          <MenuItem value="">
            <em>Department</em>
          </MenuItem>
          <MenuItem value="General Medicine">General Medicine</MenuItem>
          <MenuItem value="Cardiology">Cardiology</MenuItem>
        </Select>

        <Select
          value={specialistFilter}
          onChange={(e) => setSpecialistFilter(e.target.value)}
          displayEmpty
          variant="outlined"
        >
          <MenuItem value="">
            <em>Specialist</em>
          </MenuItem>
          <MenuItem value="Routine Check-Ups">Routine Check-Ups</MenuItem>
          <MenuItem value="Heart Specialist">Heart Specialist</MenuItem>
          <MenuItem value="Child Health">Child Health</MenuItem>
        </Select>

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          displayEmpty
          variant="outlined"
        >
          <MenuItem value="">
            <em>Status</em>
          </MenuItem>
          <MenuItem value="available">Available</MenuItem>
          <MenuItem value="unavailable">Unavailable</MenuItem>
        </Select>

        <Button variant="contained" color="primary">
          Add Doctor
        </Button>
      </Box>

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

export default DoctorPage;
