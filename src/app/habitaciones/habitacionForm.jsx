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

export default function FormHabitaciones({
  onCancelar,
  fnGuardar,
  fnEditar,
  data,
  titulo = "",
  enqueueSnackbar,
}) {
  const [formulario, setFormulario] = useState({
    tipo_habitacion: "",
    numero_habitacion: "",
    huespedes: "",
    precio: "",
    estado: "",
    disponible: "", 
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

    if (!formulario.tipo_habitacion || !formulario.numero_habitacion) {
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
              <InputLabel id="tipo-habitacion-label">Tipo de Habitación</InputLabel>
              <Select
                labelId="tipo-habitacion-label"
                id="tipo_habitacion"
                name="tipo_habitacion"
                required
                value={formulario.tipo_habitacion}
                onChange={handleInputChange}
                label="Tipo de Habitación"
              >
                <MenuItem value="Sencilla">Sencilla</MenuItem>
                <MenuItem value="Doble">Doble</MenuItem>
                <MenuItem value="Triple">Triple</MenuItem>
                <MenuItem value="Cabania">Cabaña</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="numero_habitacion"
              name="numero_habitacion"
              label="Número de Habitación"
              type="number"
              value={formulario.numero_habitacion}
              onChange={handleInputChange}
              placeholder="Número de Habitación"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="huespedes"
              name="huespedes"
              label="Cantidad de Huespedes"
              type="number"
              value={formulario.huespedes}
              onChange={handleInputChange}
              placeholder="Ej. 1, 2, 4"
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
                        <InputLabel id="tipo-brazalete-label">Disponibilidad</InputLabel>
                        <Select
                          labelId="disponible"
                          id="disponible"
                          name="disponible"
                          required
                          value={formulario.disponible}
                          onChange={handleInputChange}
                          label="Disponibilidad"
                        >
                          <MenuItem value={1}>Disponible</MenuItem>
                          <MenuItem value={2}>Ocupada</MenuItem>
                          <MenuItem value={3}>Mantenimiento u otro</MenuItem>
                        </Select>
                      </FormControl>
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
