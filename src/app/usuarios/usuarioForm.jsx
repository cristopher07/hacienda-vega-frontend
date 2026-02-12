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
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import { listMarca } from "../areas/services/areaService";

export default function FormUsuarios({
  onCancelar,
  fnGuardar,
  fnEditar,
  data,
  titulo = "",
  enqueueSnackbar,
}) {
  const [formulario, setFormulario] = useState({
    nombre: "",
    usuario: "",
    password: "",
    confirmarPassword: "",
    rol: "",
    id_area: "",
    estado: "",
    ...data,
  });

  const [areas, setAreas] = useState([]);
  const [observacionLength, setObservacionLength] = useState(
    250 - (typeof data?.nombre === "string" ? data.nombre.length : 0)
  );

  useEffect(() => {
    if (data?.nombre) {
      setObservacionLength(250 - data.nombre.length);
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
      if (formulario.password !== formulario.confirmarPassword) {
        enqueueSnackbar("Las contraseñas no coinciden.", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        return;
      } else {
        fnEditar(formulario);
      }
    } else {
        if (!formulario.password || !formulario.confirmarPassword) {
        enqueueSnackbar("Debe ingresar una contraseña.", {
            variant: "error",
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
            },
        });
        return;
        }
      if (formulario.password !== formulario.confirmarPassword) {
        enqueueSnackbar("Las contraseñas no coinciden.", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        return;
      } else {
        fnGuardar(formulario);
      }
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
              label={`Nombre `}
              value={formulario.nombre}
              onChange={handleInputChange}
              placeholder="Nombre"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="usuario"
              name="usuario"
              label={`Usuario`}
              value={formulario.usuario}
              onChange={handleInputChange}
              placeholder="Usuario"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="rol-label">Rol</InputLabel>
              <Select
                labelId="rol-label"
                id="rol"
                name="rol"
                required
                value={formulario.rol}
                onChange={handleInputChange}
                placeholder="Seleccione un rol"
                label="Rol "
                variant="outlined"
              >
                {/* <MenuItem value="superAdmin">Súper Admin</MenuItem> */}
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="recepcionista">Recepcionista</MenuItem>
                <MenuItem value="cajera">Cajera</MenuItem>
              </Select>
            </FormControl>
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
              id="password"
              name="password"
              label={`Contraseña `}
              value={formulario.password}
              onChange={handleInputChange}
              placeholder="Contraseña"
              variant="outlined"
              type="password"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="confirmarPassword"
              name="confirmarPassword"
              label={`Confirmar Contraseña `}
              value={formulario.confirmarPassword}
              onChange={handleInputChange}
              placeholder="confirmar contraseña"
              variant="outlined"
              type="password"
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
