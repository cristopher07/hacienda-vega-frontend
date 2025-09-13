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

export default function FormBrazalete({
  onCancelar,
  fnGuardar,
  fnEditar,
  data,
  titulo = "",
  enqueueSnackbar,
}) {
  const [formulario, setFormulario] = useState({
    tipo_brazalete: "",
    precio: "",
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

    if (!formulario.tipo_brazalete) {
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
              <InputLabel id="tipo-brazalete-label">Tipo de Brazalete</InputLabel>
              <Select
                labelId="tipo-brazalete-label"
                id="tipo_brazalete"
                name="tipo_brazalete"
                required
                value={formulario.tipo_brazalete}
                onChange={handleInputChange}
                label="Tipo de Brazalete"
              >
                <MenuItem value="Niño">Niño</MenuItem>
                <MenuItem value="Adulto">Adulto</MenuItem>
              </Select>
            </FormControl>
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
