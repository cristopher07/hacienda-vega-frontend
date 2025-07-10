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
import { listMarca } from "../areas/services/areaService";

export default function FormInventarios({
  onCancelar,
  fnGuardar,
  fnEditar,
  data,
  titulo = "",
  enqueueSnackbar,
}) {
 
  const [formulario, setFormulario] = useState({
    producto: "",
    categoria: "",
    stock: "",
    costo: "",
    precio_vta: "",
    estado: "",
    id_area: "",
 
  });

  const [areas, setAreas] = useState([]);
  const [observacionLength, setObservacionLength] = useState(
    250 - (typeof data?.producto === "string" ? data.producto.length : 0)
  );

  useEffect(() => {
    if (data?.producto) {
      setObservacionLength(250 - data.producto.length);
    }
    if (data) {
      // Si existe data, haz una copia sin password
      const { password, confirmarPassword, ...rest } = data;

      setFormulario((prev) => ({
        ...prev,
        ...rest, // copia todo lo demás
        password: "", // explícitamente vacío
        confirmarPassword: "",
        id_area: data.idArea, // Si necesitas mapearlo
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    getListAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getListAreas = async () => {
    // Lógica para obtener la lista de áreas
    const response = await listMarca();
    if (response.valid) {
      setAreas(response.data);
    } else {
      enqueueSnackbar("Error al obtener las áreas.", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "producto") {
      setObservacionLength(250 - value.length);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (observacionLength < 0) {
      alert("Máximo permitido: 250 caracteres.");
      return;
    }

    if (!formulario.producto) return;

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
              id="producto"
              name="producto"
              label={`Producto `}
              value={formulario.producto}
              onChange={handleInputChange}
              placeholder="Producto"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="categoria"
              name="categoria"
              label={`Categoría`}
              value={formulario.categoria}
              onChange={handleInputChange}
              placeholder="Categoría"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="stock"
              name="stock"
              label={`Stock`}
              value={formulario.stock}
              onChange={handleInputChange}
              placeholder="Stock"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="area-label">Áreas</InputLabel>
              <Select
                labelId="area-label"
                id="id_area"
                name="id_area"
                required
                value={formulario.id_area}
                placeholder="Seleccione un área"
                onChange={handleInputChange}
                label="Áreas"
                variant="outlined"
              >
                {areas.map((area) => (
                  <MenuItem key={area.id_area} value={area.id_area}>
                    {area.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
 
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="precio_vta"
              name="precio_vta"
              label={`Precio de Venta `}
              value={formulario.precio_vta}
              onChange={handleInputChange}
              placeholder="Precio de Venta"
              variant="outlined"
              type="text"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="costo"
              name="costo"
              label={`Costo `}
              value={formulario.costo}
              onChange={handleInputChange}
              placeholder="Costo"
              variant="outlined"
              type="text"
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
                placeholder="Seleccione un estado"
                label="Estado"
                variant="outlined"
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
