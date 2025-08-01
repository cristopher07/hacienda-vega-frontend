import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function FormMenus({
  onCancelar,
  fnGuardar,
  fnEditar,
  data,
  titulo = "",
  enqueueSnackbar,
}) {
  const [formulario, setFormulario] = useState({
    tipo_menu: "",
    descripcion: "",
    precio: "",
    estado: "",
    ...data,
  });

  useEffect(() => {
    if (data) {
      setFormulario((prev) => ({
        ...prev,
        ...data,
      }));
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formulario.tipo_menu || !formulario.precio) {
      enqueueSnackbar("Por favor complete todos los campos obligatorios.", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
      return;
    }

    if (data) {
      fnEditar(formulario);
    } else {
      fnGuardar(formulario);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" color="primary" fontWeight="bold">
          {data ? `EDITAR ${titulo}` : `CREAR ${titulo}`}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="tipo-menu-label">Tipo de Menú</InputLabel>
              <Select
                labelId="tipo-menu-label"
                id="tipo_menu"
                name="tipo_menu"
                required
                value={formulario.tipo_bebida}
                onChange={handleInputChange}
                label="Tipo de Menú"
              >
                <MenuItem value="Desayunos/cenas">Desayunos y Cenas</MenuItem>
                <MenuItem value="Almuerzos">Almuerzos</MenuItem>
                <MenuItem value="Refacciones">Refacciones</MenuItem>
                <MenuItem value="Otros">Otros</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="descripcion"
              name="descripcion"
              label="Descripción"
              value={formulario.descripcion}
              onChange={handleInputChange}
              placeholder="Descripción breve de el menú"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="precio"
              name="precio"
              label="Precio"
              type="number"
              value={formulario.precio}
              onChange={handleInputChange}
              placeholder="Ej. 10.50"
              variant="outlined"
              inputProps={{ step: "0.01" }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="estado-label">Estado</InputLabel>
              <Select
                labelId="estado-label"
                id="estado"
                name="estado"
                required
                value={formulario.estado}
                onChange={handleInputChange}
                label="Estado"
              >
                <MenuItem value={1}>Activo</MenuItem>
                <MenuItem value={0}>Inactivo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          color="secondary"
          type="button"
          sx={{
            backgroundColor: "#ffffff",
            color: "black",
            mx: 1,
            "&:hover": {
              backgroundColor: "#ffffff",
              boxShadow: "none",
            },
          }}
          onClick={() => onCancelar(false)}
        >
          CANCELAR
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mx: 1 }}
        >
          GUARDAR
        </Button>
      </Box>
    </Box>
  );
}
