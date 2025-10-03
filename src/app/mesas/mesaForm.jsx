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

export default function FormMesas({
  onCancelar,
  fnGuardar,
  fnEditar,
  data,
  titulo = "",
  enqueueSnackbar,
}) {
  const [formulario, setFormulario] = useState({
    tipo_de_mesa: "",
    capacidad: "",
    estado: "",
    nombre: "",
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

    if (!formulario.tipo_de_mesa || !formulario.capacidad) {
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
            <TextField
              required
              fullWidth
              id="nombre"
              name="nombre"
              label="Nombre Mesa"
              type="text"
              value={formulario.nombre}
              onChange={handleInputChange}
              placeholder="Mesa 1, Rancho 1"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="tipo-brazalete-label">Tipo de Mesa</InputLabel>
              <Select
                labelId="tipo_de_mesa"
                id="tipo_de_mesa"
                name="tipo_de_mesa"
                required
                value={formulario.tipo_de_mesa}
                onChange={handleInputChange}
                label="Tipo de Mesa"
              >
                <MenuItem value="Rancho">Rancho</MenuItem>
                <MenuItem value="Mesa">Mesa</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="capacidad"
              name="capacidad"
              label="Capacidad"
              type="number"
              value={formulario.capacidad}
              onChange={handleInputChange}
              placeholder="Ej. 1,2,4"
              variant="outlined"
            />
          </Grid>

           <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="tipo-brazalete-label">Tipo de Mesa</InputLabel>
              <Select
                labelId="estado"
                id="estado"
                name="estado"
                required
                value={formulario.estado}
                onChange={handleInputChange}
                label="Tipo de Mesa"
              >
                <MenuItem value="Disponible">Disponible</MenuItem>
                <MenuItem value="Ocupada">Ocupada</MenuItem>
                <MenuItem value="Pedido listo">Pedido Listo</MenuItem>
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
