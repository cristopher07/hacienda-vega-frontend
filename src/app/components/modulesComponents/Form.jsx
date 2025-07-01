import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Grid,
  TextField,
  Button,
} from "@mui/material";

export default function Form({
  onCancelar,
  fnGuardar,
  fnEditar,
  data,
  titulo = "",
}) {
  const [formulario, setFormulario] = useState({
    nombre: "",
    ...data,
  });

  const [observacionLength, setObservacionLength] = useState(
    250 - (typeof data?.nombre === "string" ? data.nombre.length : 0)
  );

  useEffect(() => {
    if (data?.nombre) {
      setObservacionLength(250 - data.nombre.length);
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "nombre") {
      setObservacionLength(250 - value.length);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (observacionLength < 0) {
      alert("Máximo permitido: 250 caracteres.");
      return;
    }

    if (!formulario.nombre) return;

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
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="nombre"
              name="nombre"
              label={`Descripción (${observacionLength})`}
              value={formulario.nombre}
              onChange={handleInputChange}
              placeholder="Descripción"
              variant="outlined"
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
              backgroundColor: "#ffffff", // mismo color que normal para no cambiar
              boxShadow: "none", // quitar sombra
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
