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
import { listUsuarios } from "../usuarios/services/usuarioService";

export default function FormSolicitudes({
  onCancelar,
  fnGuardar,
  fnEditar,
  data,
  titulo = "",
  enqueueSnackbar,
}) {
 
  const [formulario, setFormulario] = useState({
    fecha_solicitud: "",
    id_usuario: "",
    id_area: "",
    detalle: "",
    monto: "",
    documento: "",
    estado: "Pendiente",
    fecha_revision: "",
  });
  const [areas, setAreas] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [observacionLength, setObservacionLength] = useState(
    250 - (typeof data?.producto === "string" ? data.producto.length : 0)
  );
   const rol = localStorage.getItem("rol");

  useEffect(() => {
    if (data?.producto) {
      setObservacionLength(250 - data.producto.length);
    }

    if (data && data.idArea) {
      setFormulario((prev) => ({
        ...prev,
        ...data,
        id_area: data.idArea,
        estado: data.estado || "Pendiente",
      }));
    }
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    getListAreas();
    getListUsuario();
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

  const getListUsuario = async () => {
    // Lógica para obtener la lista de áreas
    const response = await listUsuarios();
    if (response.valid) {
      setUsuario(response.data);
    } else {
      enqueueSnackbar("Error al obtener los usuarios.", {
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
              id="fecha_solicitud"
              name="fecha_solicitud"
              label={`Fecha de Solicitud `}
              value={formulario.fecha_solicitud}
              onChange={handleInputChange}
              placeholder="Fecha de Solicitud"
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

             <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="usuario-label">Usuario</InputLabel>
              <Select
                labelId="usuario-label"
                id="id_usuario"
                name="id_usuario"
                required
                value={formulario.id_usuario}
                placeholder="Seleccione un usuario"
                onChange={handleInputChange}
                label="Usuarios"
                variant="outlined"
              >
                {usuario.map((usuario) => (
                  <MenuItem key={usuario.id_usuario} value={usuario.id_usuario}>
                    {usuario.nombre}
                  </MenuItem>
                ))}
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
              required
              fullWidth
              id="detalle"
              name="detalle"
              label={`Detalle`}
              value={formulario.detalle}
              onChange={handleInputChange}
              placeholder="Detalle"
              variant="outlined"
            />
          </Grid>

  
 
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="monto"
              name="monto"
              label={`Monto `}
              value={formulario.monto}
              onChange={handleInputChange}
              placeholder="Monto"
              variant="outlined"
              type="text"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="documento"
              name="documento"
              label={`Documento `}
              value={formulario.documento}
              onChange={handleInputChange}
              placeholder="Documento"
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
                disabled = {!["admin", "superAdmin"].includes(rol)}
              >
                <MenuItem value={'Aprobada'}>Aprobada</MenuItem>
                <MenuItem value={'Rechazada'}>Rechazada</MenuItem>
                <MenuItem value={'Pendiente'}>Pendiente</MenuItem>
              </Select>
            </FormControl>
          </Grid>

            <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="fecha_revision"
              name="fecha_revision"
              label={`Fecha de Revisión `}
              value={formulario.fecha_revision}
              onChange={handleInputChange}
              placeholder="Fecha de Revisión"
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
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
