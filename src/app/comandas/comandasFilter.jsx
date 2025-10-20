// Estilo para ToggleButton seleccionado en azul


import React, { useState } from "react";
import {
  Box,
  Fab,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function ComandasFilter({ setVerForm, onFiltrarTipo }) {
  const [tipoFiltro, setTipoFiltro] = useState('Todos');

  const handleNuevo = () => {
    setVerForm(true);
  };

  const handleFiltroChange = (event, newTipo) => {
    if (newTipo) {
      setTipoFiltro(newTipo);
      if (typeof onFiltrarTipo === 'function') {
        onFiltrarTipo(newTipo);
      }
    }
  };

  
const toggleButtonSx = {
  '&.Mui-selected': {
    backgroundColor: '#1976d2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#1565c0',
    },
  },
};

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "16px" }}>
      <ToggleButtonGroup
        value={tipoFiltro}
        exclusive
        onChange={handleFiltroChange}
        sx={{ marginRight: 2 }}
      >
  <ToggleButton value="Todos" sx={toggleButtonSx}>Todos</ToggleButton>
  <ToggleButton value="Mesa" sx={toggleButtonSx}>Mesa</ToggleButton>
  <ToggleButton value="Rancho" sx={toggleButtonSx}>Rancho</ToggleButton>
      </ToggleButtonGroup>
      <Box sx={{ marginLeft: 2 }}>
        <Fab
          title="Agregar Nueva Comanda"
          onClick={handleNuevo}
          color="primary"
          aria-label="add"
          size="medium"
          tooltip
        >
          <AddIcon />
        </Fab>
      </Box>
    </div>
  );
}
