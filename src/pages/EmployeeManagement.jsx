import React, { useEffect, useState } from "react";
import { Alert, Box, Button } from "@mui/material";
import CommonTable from "../components/CommonTable";
import CommonModal from "../components/CommonModal";
import CommonForm from "../components/CommonForm";
import ActionButtons from "../components/ActionButtons";
import BreadcrumbsNav from "../components/BreadcrumbsNav";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { fetchAllDepartments } from "../redux/slices/departmentSlice";
import {
  createEmployee,
  deleteEmployee,
  fetchAllEmployees,
  updateEmployee,
} from "../redux/slices/employeeSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";

const EmployeeManagement = () => {
  const dispatch = useDispatch();

  const [pressed, setPressed] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "Nurse",
    email: "",
    password: "",
    job_title: "",
    department_id: "",
    hire_date: "",
    salary: "",
    phone_number: "",
    employment_status: "",
    gender: "",
  });

  useEffect(() => {
    dispatch(fetchAllDepartments());
    dispatch(fetchAllEmployees());
  }, [dispatch]);

  const {
    departments,
    loading: departmentsLoading,
    error: departmentsError,
  } = useSelector((state) => state.department);

  const {
    employees,
    loading: employeesLoading,
    error: employeesError,
  } = useSelector((state) => state.employee);

  if (departmentsLoading || employeesLoading) {
    return <LoadingSpinner />;
  }
  if (departmentsError || employeesError) {
    return <Alert severity="error">{employeesError.data.message}</Alert>;
  }

  const columns = [
    { id: "first_name", label: "first_name" },
    { id: "last_name", label: "last_name" },
    { id: "email", label: "Email" },
    { id: "job_title", label: "job_title" },
    { id: "department", label: "department" },
    { id: "salary", label: "salary" },
    { id: "phone_number", label: "phone_number" },
    { id: "gender", label: "gender" },
    { id: "employment_status", label: "employment_status" },
    { id: "actions", label: "Actions", disableSorting: true },
  ];
  console.log(employees);
  const filteredEmployees = employees.filter((emp) => {
    return emp
      ? emp.first_name.toLowerCase().includes(searchValue.toLowerCase())
      : "";
  }); //TODO: change to full name

  const handleOpenModal = (employee) => {
    setSelectedEmployee(employee);
    setFormData(
      employee || {
        first_name: "",
        last_name: "Nurse",
        email: "",
        password: "",
        job_title: "",
        department_id: "",
        hire_date: "",
        salary: "",
        phone_number: "",
        employment_status: "",
        gender: "",
      }
    );
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setPressed(true);
  };

  const handleOpenConfirmDialog = (employee) => {
    setSelectedEmployee(employee);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => setOpenConfirmDialog(false);

  const handleSubmitForm = (e) => {
    setPressed(true);
    e.preventDefault();
    if (selectedEmployee) {
      // Update existing employee
      dispatch(
        updateEmployee({ id: selectedEmployee.id, updatedData: formData })
      )
        .unwrap()
        .then(() => {
          setOpenModal(false);
        })
        .catch((err) => console.error("update error:", err));
    } else {
      // Add new employee
      dispatch(createEmployee(formData))
        .unwrap()
        .then((e) => {
          // console.log(e);
          setOpenModal(false);
        })
        .catch((err) => console.error("Create error:", err));
    }
  };

  const handleDeleteEmployee = () => {
    dispatch(deleteEmployee({ id: selectedEmployee.id }))
      .unwrap()
      .then(() => setOpenModal(false))
      .catch((err) => console.error("Update error:", err));
    setOpenConfirmDialog(false);
  };

  // Table columns

  return (
    <Box>
      <BreadcrumbsNav
        links={[{ name: "Home", path: "/home" }]}
        current="Employees"
      />
      <Button variant="contained" onClick={() => handleOpenModal(null)}>
        Add Employee
      </Button>
      <CommonTable
        columns={columns}
        rows={filteredEmployees.map((employee) => ({
          ...employee,
          actions: (
            <ActionButtons
              onEdit={() => handleOpenModal(employee)}
              onDelete={() => handleOpenConfirmDialog(employee)}
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
        title="Employee Form"
      >
        <CommonForm
          formFields={[
            // (first_name: ""),
            // (last_name: "Nurse"),
            // (email: ""),
            // (password: ""),
            // (job_title: ""),
            // (department_id: ""),
            // (hire_date: ""),
            // (salary: ""),
            // (phone_number: ""),
            // (employment_status: ""),
            // (gender: ""),

            { label: "first_name", name: "first_name", type: "text" },
            { label: "last_name", name: "last_name", type: "text" },

            {
              label: "gender",
              name: "gender",
              type: "select",
              options: [
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ],
            },
            {
              label: "Department",
              name: "department_id",
              type: "select",
              options: departments.map((cat) => ({
                label: cat.name,
                value: cat.id,
              })),
            },
            {
              label: "job_title",
              name: "job_title",
              type: "select",
              options: [
                { label: "Nurse", value: "Nurse" },
                { label: "Receptionist", value: "Receptionist" },
              ],
            },
            { label: "Email", name: "email", type: "email" },
            { label: "password", name: "password", type: "password" },
            { label: "hire_date", name: "hire_date", type: "text" },
            { label: "salary", name: "salary", type: "text" },
            { label: "phone_number", name: "phone_number", type: "tel" },
            {
              label: "employment_status",
              name: "employment_status",
              type: "text",
            },
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
        onConfirm={handleDeleteEmployee}
        message={`Are you sure you want to delete ${selectedEmployee?.first_name} ${selectedEmployee?.last_name}?`}
      />
    </Box>
  );
};

export default EmployeeManagement;
