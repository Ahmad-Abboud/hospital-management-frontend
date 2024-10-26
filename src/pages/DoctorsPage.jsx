import { useState, useEffect } from "react";
import { Box, Button, Select, MenuItem, Alert } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
import BreadcrumbsNav from "../components/BreadcrumbsNav";
import CommonTable from "../components/CommonTable";
import SearchBar from "../components/SearchBar";
import StatusBadge from "../components/StatusBadge";
import ActionButtons from "../components/ActionButtons";
import { useDispatch, useSelector } from "react-redux";
import {
  createDoctor,
  deleteDoctor,
  fetchAllDoctors,
  updateDoctor,
} from "../redux/slices/doctorSlice";
import { fetchAllDepartments } from "../redux/slices/departmentSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import CommonModal from "../components/CommonModal";
import CommonForm from "../components/CommonForm";
import ConfirmationDialog from "../components/ConfirmationDialog";

const DoctorPage = () => {
  const dispatch = useDispatch();
  // const { doctors, loading } = useSelector((state) => state.doctors);
  const [pressed, setPressed] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [specialistFilter, setSpecialistFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    specialty_id: "",
    department_id: "",
    phone_number: "",
  });

  // Mock data usage for now
  useEffect(() => {
    dispatch(fetchAllDepartments()); // Set mock data
    dispatch(fetchAllDoctors()); // Uncomment this when Redux is ready
  }, [dispatch]);
  const {
    departments,
    loading: departmentLoading,
    error: departmentError,
  } = useSelector((state) => state.department);
  const {
    doctors,
    loading: doctorsLoading,
    error: doctorsError,
  } = useSelector((state) => state.doctor);

  if (doctorsLoading || departmentLoading) {
    return <LoadingSpinner />;
  }

  if (doctorsError || departmentError) {
    return <Alert severity="error">{doctorsError.data.message}</Alert>;
  }
  // Table Columns
  const columns = [
    { id: "first_name", label: "first_name" },
    { id: "last_name", label: "last_name" },
    { id: "email", label: "Email" },
    { id: "department", label: "Department" },
    { id: "specialty", label: "specialty" },
    { id: "phone_number", label: "phone_number" },
    { id: "actions", label: "Actions" },
  ];

  // Filtering logic
  const filteredDoctors = doctors
    .filter((doctor) =>
      doctor.first_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((doctor) =>
      departmentFilter ? doctor.department === departmentFilter : true
    )
    .filter((doctor) =>
      specialistFilter ? doctor.specialist === specialistFilter : true
    )
    .filter((doctor) => (statusFilter ? doctor.status === statusFilter : true));

  const handleOpenModal = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData(
      doctor || {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        specialty_id: "",
        department_id: "",
        phone_number: "",
      }
    );
    // setPressed(false);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setPressed(true);
  };
  const handleOpenConfirmDialog = (doctor) => {
    setSelectedDoctor(doctor);
    console.log("Selected Doctor for Deletion:", doctor);
    setOpenConfirmDialog(true);
  };
  const handleCloseConfirmDialog = () => setOpenConfirmDialog(false);

  const handleSubmitForm = (e) => {
    setPressed(true);
    e.preventDefault();
    if (selectedDoctor) {
      // Update department
      console.log(formData);
      dispatch(updateDoctor({ id: selectedDoctor.id, updatedData: formData }))
        .unwrap()
        .then(() => {
          // setPressed((x) => !x);
          setOpenModal(false);
        })
        .catch((err) => console.error("Update error:", err));
    } else {
      // Create new department
      dispatch(createDoctor(formData))
        .unwrap()
        .then((e) => {
          // console.log(e);
          setOpenModal(false);
        })
        .catch((err) => console.error("Create error:", err));
    }
  };

  // Handle department deletion
  const handleDeleteDoctor = () => {
    dispatch(deleteDoctor({ id: selectedDoctor.id }))
      .unwrap()
      .then(() => setOpenModal(false))
      .catch((err) => console.error("Update error:", err));
    setOpenConfirmDialog(false);
  };

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
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal(null)}
        >
          Add Doctor
        </Button>
      </Box>

      <Box display="flex" justifyContent="space-between" mb={2}>
        {/* <Select
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
        </Select> */}

        {/* <Select
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
        </Select> */}

        {/* <Select
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
        </Select> */}
      </Box>

      <CommonTable
        columns={columns}
        rows={filteredDoctors.map((doctor) => ({
          ...doctor,
          // Using StatusBadge
          actions: (
            <ActionButtons
              onEdit={() => handleOpenModal(doctor)}
              onDelete={() => handleOpenConfirmDialog(doctor)}
            />
          ),
        }))}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
      <CommonModal
        open={openModal}
        handleClose={handleCloseModal}
        title="Doctor Form"
      >
        <CommonForm
          formFields={[
            { label: "first_name", name: "first_name", type: "text" },
            { label: "last_name", name: "last_name", type: "text" },
            {
              label: "Department",
              name: "department_id",
              type: "select",
              options: departments.map((cat) => ({
                label: cat.name,
                value: cat.id,
              })),
            },

            { label: "Email", name: "email", type: "email" },
            { label: "password", name: "password", type: "password" },
            { label: "specialty_id", name: "specialty_id", type: "text" },

            { label: "phone_number", name: "phone_number", type: "tel" },
          ]}
          pressed={pressed}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmitForm}
          setPressed={setPressed}
        />
      </CommonModal>
      <ConfirmationDialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        onConfirm={handleDeleteDoctor}
        message={`Are you sure you want to delete ${selectedDoctor?.first_name} ${selectedDoctor?.last_name}?`}
      />
    </Box>
  );
};

export default DoctorPage;
