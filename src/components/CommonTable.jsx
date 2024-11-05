import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
} from "@mui/material";

const CommonTable = ({
  columns,
  rows,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) => {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate the rows to display based on pagination
  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={{ borderRadius: 2, boxShadow: 1 }}>
      <TableContainer sx={{ maxHeight: "60vh", overflow: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{
                    backgroundColor: "primary.light",
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "left",
                    padding: 1.5,
                    borderRight: "1px solid rgba(224, 224, 224, 1)", // Right border for header
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      padding: 1.5,
                      borderBottom: "1px solid rgba(224, 224, 224, 1)",
                      borderRight: "1px solid rgba(224, 224, 224, 1)", // Right border for each cell
                      "&:last-child": {
                        borderRight: "none", // Remove right border for the last cell
                      },
                    }}
                  >
                    {row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          bgcolor: "background.default",
          borderTop: "1px solid rgba(224, 224, 224, 1)",
        }}
      />
    </Paper>
  );
};

export default CommonTable;
