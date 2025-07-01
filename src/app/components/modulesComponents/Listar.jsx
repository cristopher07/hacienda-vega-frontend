import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Listar({
  data = [],
  columns = [],
  rowsPerPage,
  setRowsPerPage,
  count,
  pageFix,
  setpageFix,
}) {
  console.log("Listar data: ", data);
  const handleChangePage = (_, newPage) => setpageFix(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setpageFix(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "10px" }}>
      <TableContainer component={Box}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.id}>{col.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row) => (
                <TableRow hover key={row.id || row.id_Area || Math.random()}>
                  {columns.map((col) => {
                    if (col.id === "actions" && Array.isArray(col.actions)) {
                      return (
                        <TableCell key="actions">
                          {col.actions.map((action, index) => (
                            <IconButton
                              key={index}
                              onClick={(e) => action.onClick(e, row)}
                            >
                              {action.iconName === "Edit" && (
                                <EditIcon fontSize="small" />
                              )}
                              {action.iconName === "Delete" && (
                                <DeleteIcon fontSize="small" color="error" />
                              )}
                              {/* Aquí puedes agregar más iconos si necesitas */}
                            </IconButton>
                          ))}
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell key={col.id}>{row[col.id]}</TableCell>
                      );
                    }
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No hay datos para mostrar.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 20]}
        count={count}
        rowsPerPage={rowsPerPage}
        page={pageFix}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
