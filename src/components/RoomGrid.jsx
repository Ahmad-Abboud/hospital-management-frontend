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
import {
  createRoom,
  deleteRoom,
  fetchRooms,
  updateRoom,
} from "../redux/slices/roomSlice";
import { fetchAllRoomCategories } from "../redux/slices/roomCategorySlice";
import { fetchAllDepartments } from "../redux/slices/departmentSlice";

const RoomsGrid = () => {
  const dispatch = useDispatch();
  const [pressed, setPressed] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [formData, setFormData] = useState({
    name: "",
    room_category_id: "",
    floor_id: "",
    department_id: "",
    status: "",
  });

  useEffect(() => {
    dispatch(fetchRooms());
    dispatch(fetchAllRoomCategories());
    dispatch(fetchAllDepartments());
  }, [dispatch]);

  const {
    rooms,
    loading: roomsLoading,
    error: roomsError,
  } = useSelector((state) => state.room);
  const {
    roomCategories: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state) => state.roomCategory);
  const {
    departments,
    loading: departmentsLoading,
    error: departmentsError,
  } = useSelector((state) => state.department);

  if (roomsLoading || categoriesLoading || departmentsLoading) {
    return <LoadingSpinner />;
  }

  if (roomsError || categoriesError || departmentsError) {
    return <Alert severity="error">{roomsError.data.message}</Alert>;
  }
  // Columns for the CommonTable component
  const columns = [
    { id: "room_number", label: "Room Number" },
    { id: "room_category", label: "Category" },
    { id: "floor", label: "Floor" },
    { id: "status", label: "Status" },
    { id: "department", label: "Department" },
    { id: "actions", label: "Actions", disableSorting: true },
  ];
  // Handle search filter
  const filteredRooms = rooms.filter((room) =>
    room
      ? `${room.room_number}`.toLowerCase().includes(searchValue.toLowerCase())
      : ""
  );
  //   console.log(departments);
  //   return;
  // Handle open/close modals
  const handleOpenModal = (room) => {
    setSelectedRoom(room);
    console.log(room);
    setFormData(
      room || {
        room_category_id: "",
        department_id: "",
        floor_id: "",
        status: "",
      }
    );
    setPressed(false);
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenConfirmDialog = (room) => {
    setSelectedRoom(room);
    setOpenConfirmDialog(true);
  };
  const handleCloseConfirmDialog = () => setOpenConfirmDialog(false);

  // Handle form submission (for create or update)
  const handleSubmitForm = (e) => {
    setPressed(true);
    e.preventDefault();
    if (selectedRoom) {
      // Update room
      console.log(selectedRoom, "HEREE");
      dispatch(updateRoom({ id: selectedRoom.id, roomData: formData }))
        .unwrap()
        .then(() => setOpenModal(false))
        .catch((err) => console.error("Update error:", err));
    } else {
      // Create new room
      dispatch(createRoom(formData))
        .unwrap()
        .then(() => setOpenModal(false))
        .catch((err) => console.error("Create error:", err));
    }
  };

  // Handle room deletion
  const handleDeleteRoom = () => {
    dispatch(deleteRoom({ id: selectedRoom.id }))
      .unwrap()
      .then(() => setOpenModal(false))
      .catch((err) => console.error("Delete error:", err));
    setOpenConfirmDialog(false);
  };

  return (
    <Box>
      <BreadcrumbsNav
        links={[{ name: "Home", path: "/home" }]}
        current="Rooms"
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
          Add Room
        </Button>
      </Box>

      <CommonTable
        columns={columns}
        rows={filteredRooms.map((room) => ({
          ...room,
          actions: (
            <ActionButtons
              onEdit={() => handleOpenModal(room)}
              onDelete={() => handleOpenConfirmDialog(room)}
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
        title="Room Form"
      >
        <CommonForm
          formFields={[
            {
              label: "Category",
              name: "room_category_id",
              type: "select",
              options: categories.map((cat) => ({
                label: cat.name,
                value: cat.id,
              })),
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
            { label: "Floor Num", name: "floor_id", type: "text" },
            { label: "Status", name: "status", type: "text" },
          ]}
          pressed={pressed}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmitForm}
        />
      </CommonModal>

      <ConfirmationDialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        onConfirm={handleDeleteRoom}
        message={`Are you sure you want to delete the room "${selectedRoom?.room_number}"?`}
      />
    </Box>
  );
};

export default RoomsGrid;
