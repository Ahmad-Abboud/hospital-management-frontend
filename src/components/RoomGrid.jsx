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

// Mock Data for rooms and categories
const mockRooms = [
  { id: 1, name: "Room A", room_category_id: 1, status: "available" },
  { id: 2, name: "Room B", room_category_id: 2, status: "occupied" },
  { id: 3, name: "Room C", room_category_id: 3, status: "maintenance" },
];

const mockRoomCategories = [
  { id: 1, name: "ICU" },
  { id: 2, name: "General" },
  { id: 3, name: "Maternity" },
];

const RoomsGrid = () => {
  const [rooms, setRooms] = useState([]);
  const [categories, setCategories] = useState([]);
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
    status: "",
  });

  useEffect(() => {
    // Simulate data fetching
    setRooms(mockRooms);
    setCategories(mockRoomCategories);
  }, []);

  // Columns for the CommonTable component
  const columns = [
    { id: "name", label: "Room Name" },
    { id: "room_category_id", label: "Category" },
    { id: "status", label: "Status" },
    { id: "actions", label: "Actions", disableSorting: true },
  ];

  // Handle search filter
  const filteredRooms = rooms.filter((room) =>
    room ? room.name.toLowerCase().includes(searchValue.toLowerCase()) : ""
  );

  // Handle open/close modals
  const handleOpenModal = (room) => {
    setSelectedRoom(room);
    setFormData(room || { name: "", room_category_id: "", status: "" });
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
      // Update room in mock data
      const updatedRooms = rooms.map((room) =>
        room.id === selectedRoom.id ? { ...room, ...formData } : room
      );
      setRooms(updatedRooms);
      setOpenModal(false);
    } else {
      // Create new room in mock data
      const newRoom = { ...formData, id: rooms.length + 1 };
      setRooms([...rooms, newRoom]);
      setOpenModal(false);
    }
  };

  // Handle room deletion
  const handleDeleteRoom = () => {
    const updatedRooms = rooms.filter((room) => room.id !== selectedRoom.id);
    setRooms(updatedRooms);
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
            { label: "Room Name", name: "name" },
            {
              label: "Category",
              name: "room_category_id",
              type: "select",
              options: categories.map((cat) => ({
                label: cat.name,
                value: cat.id,
              })),
            },
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
        message={`Are you sure you want to delete the room "${selectedRoom?.name}"?`}
      />
    </Box>
  );
};

export default RoomsGrid;
