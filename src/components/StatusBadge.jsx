// components/StatusBadge.js
import React from "react";
import { Chip } from "@mui/material";

const StatusBadge = ({ status }) => {
  const color =
    status === "available"
      ? "success"
      : status === "occupied"
      ? "warning"
      : "error";

  return <Chip label={status} color={color} />;
};

export default StatusBadge;
