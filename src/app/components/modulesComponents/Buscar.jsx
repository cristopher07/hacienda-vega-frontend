import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Paper,
  Box,
  Fab,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

export default function Buscar({ setVerForm, onBusqueda, setpageFix, buscar }) {

  const [busquedaAux, setBusquedaAux] = useState(buscar + "");

  const handleNuevo = () => {
    setVerForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setpageFix(0);
    onBusqueda(busquedaAux.trim());
  };

  return (
    <Paper
      elevation={1}
      style={{
        padding: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <FormControl variant="outlined" style={{ flex: 1 }}>
          <InputLabel htmlFor="outlined-adornment-search">
            Búsqueda por cualquier criterio
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-search"
            type="search"
            name="search"
            label="Búsqueda por cualquier criterio"
            value={busquedaAux}
            onChange={(e) => {
              if (e.target.value === "" && busquedaAux.trim() !== "") {
                setpageFix(0);
                onBusqueda(e.target.value.trim());
              }
              setBusquedaAux(e.target.value);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  type="submit" // ✔️ Aquí es la clave
                  aria-label="buscar"
                  edge="end"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </form>

      <Box sx={{ marginLeft: 2 }}>
        <Fab
          title="Agregar Nuevo"
          onClick={handleNuevo}
          color="primary"
          aria-label="add"
          size="medium"
        >
          <AddIcon />
        </Fab>
      </Box>
    </Paper>
  );
}
