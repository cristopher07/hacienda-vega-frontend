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

export default function FormIngresos({
  onCancelar,
  fnGuardar,
  fnEditar,
  data,
  titulo = "",
  enqueueSnackbar,
}) {
  const [formulario, setFormulario] = useState({
    tipoIngreso: "",
    habitacion: "",
    huespedes: "",
    precio: "",
    estado: "",
    ...data,
  });
  console.log("formularioooo ", formulario);

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

    if (!formulario.tipoIngreso || !formulario.habitacion) {
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

        <Grid container spacing={2} sx={{ marginBottom: 2}}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="tipo-habitacion-label">
                Tipo de Ingreso
              </InputLabel>
              <Select
                labelId="tipo-habitacion-label"
                id="tipoIngreso"
                name="tipoIngreso"
                required
                value={formulario.tipoIngreso}
                onChange={handleInputChange}
                label="Tipo de Ingreso"
              >
                <MenuItem value="Hotel">Hotel</MenuItem>
                <MenuItem value="Piscina">Piscina</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>


        {formulario.tipoIngreso === "Hotel" ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="habitacion"
                name="habitacion"
                label="Habitación"
                type="number"
                value={formulario.habitacion}
                onChange={handleInputChange}
                placeholder=" Habitación"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="descripcion"
                name="descripcion"
                label="Descripción"
                type="text"
                value={formulario.descripcion}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="monto"
                name="monto"
                label="Monto"
                type="number"
                value={formulario.monto}
                onChange={handleInputChange}
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
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="habitacion"
                name="habitacion"
                label="Pisicina"
                type="number"
                value={formulario.habitacion}
                onChange={handleInputChange}
                placeholder=" Piscina"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="descripcion"
                name="descripcion"
                label="Descripción"
                type="text"
                value={formulario.descripcion}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="monto"
                name="monto"
                label="Monto"
                type="number"
                value={formulario.monto}
                onChange={handleInputChange}
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
        )}
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
