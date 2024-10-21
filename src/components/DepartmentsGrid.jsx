import React, { useEffect, useState } from "react";
import CommonTable from "./CommonTable";
import ActionButtons from "./ActionButtons";
import CommonModal from "./CommonModal";
import CommonForm from "./CommonForm";
import BreadcrumbsNav from "./BreadcrumbsNav";
import SearchBar from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner";
import ConfirmationDialog from "./ConfirmationDialog";
import { Alert, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createDepartment,
  deleteDepartment,
  fetchAllDepartments,
  updateDepartment,
} from "../redux/slices/departmentSlice";
import { fetchAllCategories } from "../redux/slices/departmentCategorySlice";

// Mock data for departments
// const mockDepartments = [
//   { id: 1, name: "Cardiology", category: "Heart", staffCount: 10 },
//   { id: 2, name: "Neurology", category: "Brain", staffCount: 15 },
//   { id: 3, name: "Pediatrics", category: "Children", staffCount: 8 },
// ];

const DepartmentsGrid = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [formData, setFormData] = useState({
    name: "",
    department_category_id: "",
  });
  useEffect(() => {
    dispatch(fetchAllDepartments());
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const {
    departments,
    loading: departmentsLoading,
    error: departmentsError,
  } = useSelector((state) => state.department);
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state) => state.departmentCategory);

  if (departmentsLoading || categoriesLoading) {
    return <LoadingSpinner />;
  }

  if (departmentsError || categoriesError) {
    return <Alert severity="error">{departmentsError.data.message}</Alert>;
  }
  // Columns for the CommonTable component
  const columns = [
    { id: "name", label: "Department Name" },
    { id: "department_category_id", label: "Category" },
    { id: "doctors", label: "Staff Count" },
    { id: "description", label: "Description" },
    { id: "actions", label: "Actions", disableSorting: true },
  ];

  // Handle search filter
  const filteredDepartments = departments.filter((dept) => {
    return dept
      ? dept.name.toLowerCase().includes(searchValue.toLowerCase())
      : "";
  });

  // Handle open/close modals
  const handleOpenModal = (dept) => {
    setSelectedDepartment(dept);
    setFormData(dept || { name: "", department_category_id: "" });
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
      // Update department
      dispatch(
        updateDepartment({ id: selectedDepartment.id, updatedData: formData })
      )
        .unwrap()
        .then(() => setOpenModal(false))
        .catch((err) => console.error("Update error:", err));
    } else {
      // Create new department
      dispatch(createDepartment(formData))
        .unwrap()
        .then((e) => {
          // console.log(e);
          setOpenModal(false);
        })
        .catch((err) => console.error("Create error:", err));
    }
  };

  // Handle department deletion
  const handleDeleteDepartment = () => {
    dispatch(deleteDepartment({ id: selectedDepartment.id }))
      .unwrap()
      .then(() => setOpenModal(false))
      .catch((err) => console.error("Update error:", err));
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
          doctors: dept.doctors ? dept.doctors.length : 0,
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
            { label: "Description", name: "description" },
            {
              label: "Category",
              name: "department_category_id",
              type: "select",
              options: categories.map((cat) => ({
                label: cat.name,
                value: cat.id,
              })),
            },
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
