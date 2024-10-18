import React, { useState } from "react";
import CommonTable from "./CommonTable";
import ActionButtons from "./ActionButtons";
import CommonModal from "./CommonModal";
import CommonForm from "./CommonForm";
import BreadcrumbsNav from "./BreadcrumbsNav";
import SearchBar from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner";
import ConfirmationDialog from "./ConfirmationDialog";
import { Box, Button } from "@mui/material";

// Mock data for departments
const mockDepartments = [
  { id: 1, name: "Cardiology", category: "Heart", staffCount: 10 },
  { id: 2, name: "Neurology", category: "Brain", staffCount: 15 },
  { id: 3, name: "Pediatrics", category: "Children", staffCount: 8 },
];

const DepartmentsGrid = () => {
  const [departments, setDepartments] = useState(mockDepartments);
  const [searchValue, setSearchValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    staffCount: 0,
  });

  // Columns for the CommonTable component
  const columns = [
    { id: "name", label: "Department Name" },
    { id: "category", label: "Category" },
    { id: "staffCount", label: "Staff Count" },
    { id: "actions", label: "Actions", disableSorting: true },
  ];

  // Handle search filter
  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Handle open/close modals
  const handleOpenModal = (dept) => {
    setSelectedDepartment(dept);
    setFormData(dept || { name: "", category: "", staffCount: 0 });
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenConfirmDialog = (dept) => {
    setSelectedDepartment(dept);
    setOpenConfirmDialog(true);
  };
  const handleCloseConfirmDialog = () => setOpenConfirmDialog(false);

  // Handle form submission (for create or update)
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (selectedDepartment) {
      // Update the department
      setDepartments((prevDepartments) =>
        prevDepartments.map((dept) =>
          dept.id === selectedDepartment.id
            ? { ...formData, id: dept.id }
            : dept
        )
      );
    } else {
      // Create a new department
      setDepartments((prevDepartments) => [
        ...prevDepartments,
        { ...formData, id: prevDepartments.length + 1 },
      ]);
    }
    setOpenModal(false);
  };

  // Handle department deletion
  const handleDeleteDepartment = () => {
    setDepartments((prevDepartments) =>
      prevDepartments.filter((dept) => dept.id !== selectedDepartment.id)
    );
    setOpenConfirmDialog(false);
  };

  return (
    <Box>
      <BreadcrumbsNav
        links={[{ name: "Home", path: "/home" }]}
        current="Departments"
      />
      <Box
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <SearchBar
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal(null)}
        >
          Add Department
        </Button>
      </Box>

      <CommonTable
        columns={columns}
        rows={filteredDepartments.map((dept) => ({
          ...dept,
          actions: (
            <ActionButtons
              onEdit={() => handleOpenModal(dept)}
              onDelete={() => handleOpenConfirmDialog(dept)}
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
        title="Department Form"
      >
        <CommonForm
          formFields={[
            { label: "Department Name", name: "name" },
            { label: "Category", name: "category" },
            { label: "Staff Count", name: "staffCount" },
          ]}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmitForm}
        />
      </CommonModal>

      <ConfirmationDialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        onConfirm={handleDeleteDepartment}
        message={`Are you sure you want to delete the department "${selectedDepartment?.name}"?`}
      />
    </Box>
  );
};

export default DepartmentsGrid;
