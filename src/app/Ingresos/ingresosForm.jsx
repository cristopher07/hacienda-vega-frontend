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
  InputAdornment,
} from "@mui/material";
import { listHabitaciones } from "../habitaciones/services/habitacionService";
import { lisBrazaletes } from "../brazaletes/services/brazaletesService";
import { listMarca } from "../areas/services/areaService";

export default function FormIngresos({
  onCancelar,
  fnGuardar,
  fnEditar,
  data,
  titulo = "",
  enqueueSnackbar,
}) {
  const [formulario, setFormulario] = useState({
    descripcion: "",
    idArea: "",
    metodo: "",
    precio: "",
    cantidad: "",
    fechaInicio: "",
    fechaFin: "",
    idHabitacion: "",
    estado: 1,
    ...data,
  });

  const [area, setArea] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [brazalete, setBrazalete] = useState([]);

  useEffect(() => {
    if (data) {
      setFormulario((prev) => ({
        ...prev,
        ...data,
      }));
    }
  }, [data]);

  useEffect(() => {
    getAreas();
    getRooms();
    getBrazalete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAreas = async () => {
    const response = await listMarca();
    if (response.valid) {
      const filteredAreas = response.data.filter(
        (item) => item.nombre !== "Restaurante"
      );

      setArea(filteredAreas);
    } else {
      enqueueSnackbar("Error al obtener las áreas.", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    }
  };

  const getRooms = async () => {
    const response = await listHabitaciones();
    if (response.ok) {
      // Convertir precio a número en cada habitación
      const roomsNumericos = response.data.map((h) => ({
        ...h,
        precio: Number(h.precio),
      }));
      setRooms(roomsNumericos);
    } else {
      enqueueSnackbar("Error al obtener las habitaciones.", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    }
  };

  const getBrazalete = async () => {
    const response = await lisBrazaletes();
    if (response.valid) {
      setBrazalete(response.data);
    } else {
      enqueueSnackbar("Error al obtener los brazaletes.", {
        variant: "error",
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
  };

  const handleDescripcionChange = (e) => {
    const value = e.target.value;
    let precio = "";

    if (formulario.idArea === 5) {
      // Brazaletes
      const seleccionado = brazalete.find((b) => b.tipo_brazalete === value);
      precio = seleccionado ? Number(seleccionado.precio) : "";
      const cantidad = Number(formulario.cantidad) || 1;
      setFormulario((prev) => ({
        ...prev,
        descripcion: value,
        precio: precio * cantidad,
      }));
    } else {
      // Habitaciones
      const seleccionado = rooms.find((r) => r.tipo_habitacion === value);
      precio = seleccionado ? Number(seleccionado.precio) : "";
      setFormulario((prev) => ({
        ...prev,
        descripcion: value,
        precio: precio,
        idHabitacion: seleccionado ? seleccionado.id_habitacion : "",
      }));
    }
  };

  const handleCantidadChange = (e) => {
    const cantidad = Number(e.target.value) || 1;

    if (formulario.idArea === 5 && formulario.descripcion) {
      // Solo para brazaletes y si ya hay un tipo seleccionado
      const seleccionado = brazalete.find(
        (b) => b.tipo_brazalete === formulario.descripcion
      );
      const precioUnitario = seleccionado ? Number(seleccionado.precio) : 0;

      setFormulario((prev) => ({
        ...prev,
        cantidad: e.target.value,
        precio: precioUnitario * cantidad,
      }));
    } else {
      setFormulario((prev) => ({
        ...prev,
        cantidad: e.target.value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formulario.precio) {
      enqueueSnackbar("Por favor complete todos los campos obligatorios.", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
      return;
    }

    if(formulario.idArea === 7){
    if (formulario.fechaFin === formulario.fechaInicio) {
      enqueueSnackbar(
        "La fecha de fin debe ser diferente a la fecha de inicio.",
        {
          variant: "error",
        }
      );
      return;
    }
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

        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="area-label">Áreas</InputLabel>
              <Select
                labelId="area-label"
                id="idArea"
                name="idArea"
                required
                value={formulario.idArea}
                placeholder="Seleccione un área"
                onChange={handleInputChange}
                label="Áreas"
                variant="outlined"
              >
                {area.map((area) => (
                  <MenuItem key={area.id_area} value={area.id_area}>
                    {area.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {formulario.idArea === 5 ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="area-label">Brazaletes</InputLabel>
                <Select
                  labelId="area-label"
                  id="descripcion"
                  name="descripcion"
                  required
                  value={formulario.descripcion}
                  placeholder="Seleccione un Brazalete"
                  onChange={handleDescripcionChange}
                  label="Brazaletes"
                  variant="outlined"
                >
                  {brazalete.map((brazalete) => (
                    <MenuItem
                      key={brazalete.id_brazalete}
                      value={brazalete.tipo_brazalete}
                    >
                      {brazalete.tipo_brazalete}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="rol-label">Método de pago</InputLabel>
                <Select
                  labelId="rol-label"
                  id="metodo"
                  name="metodo"
                  required
                  value={formulario.metodo}
                  onChange={handleInputChange}
                  placeholder="Seleccione un método"
                  label="Método"
                  variant="outlined"
                >
                  <MenuItem value="Tarjeta">Tarjeta Débito / Crédito</MenuItem>
                  <MenuItem value="Efectivo">Efectivo</MenuItem>
                  <MenuItem value="Transferencia">Transferencia</MenuItem>
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
                disabled
                value={formulario.precio}
                onChange={handleInputChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Q</InputAdornment>
                  ),
                  //  endAdornment: (
                  //   <InputAdornment position='end'>.00</InputAdornment>
                  // ),
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="cantidad"
                name="cantidad"
                label="Cantidad"
                type="number"
                value={formulario.cantidad}
                onChange={handleCantidadChange}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
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
              <FormControl fullWidth variant="outlined">
                <InputLabel id="area-label">Habitaciones</InputLabel>
                <Select
                  labelId="area-label"
                  id="descripcion"
                  name="descripcion"
                  required
                  value={formulario.descripcion}
                  placeholder="Seleccione un Habitaciones"
                  onChange={handleDescripcionChange}
                  label="Habitaciones"
                  variant="outlined"
                >
                  {rooms
                    .filter((disponible) => disponible.disponible === 1)
                    .map((habitacion) => (
                      <MenuItem
                        key={habitacion.id_habitacion}
                        value={habitacion.tipo_habitacion}
                      >
                        {habitacion.tipo_habitacion +
                          " #" +
                          habitacion.numero_habitacion}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="rol-label">Método de pago</InputLabel>
                <Select
                  labelId="rol-label"
                  id="metodo"
                  name="metodo"
                  required
                  value={formulario.metodo}
                  onChange={handleInputChange}
                  placeholder="Seleccione un método"
                  label="Método"
                  variant="outlined"
                >
                  <MenuItem value="Tarjeta">Tarjeta Débito / Crédito</MenuItem>
                  <MenuItem value="Efectivo">Efectivo</MenuItem>
                  <MenuItem value="Transferencia">Transferencia</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                disabled
                id="precio"
                name="precio"
                label="Precio"
                value={formulario.precio}
                onChange={handleInputChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Q</InputAdornment>
                  ),
                  // endAdornment: (
                  //   <InputAdornment position='end'>.00</InputAdornment>
                  // ),
                }}
                InputLabelProps={{ shrink: true }}
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

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="fechaInicio"
                name="fechaInicio"
                label={`Fecha de Ingreso `}
                value={formulario.fechaInicio}
                onChange={handleInputChange}
                placeholder="Fecha de Ingreso"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  min: new Date().toISOString().split("T")[0],
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="fechaFin"
                name="fechaFin"
                label={`Fecha de Salida `}
                value={formulario.fechaFin}
                onChange={handleInputChange}
                placeholder="Fecha de Salida"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  min:
                    formulario.fechaInicio ||
                    new Date().toISOString().split("T")[0],
                }}
              />
            </Grid>
          </Grid>
        )}
      </Paper>

      <Typography
        variant="body2"
        sx={{
          color: (theme) => theme.palette.text.disabled,
          m: 2,
          fontStyle: "italic",
        }}
      >
        {formulario.idArea === 7
          ? `Hotel seleccionado: ${formulario.descripcion} - Precio: Q. ${formulario.precio} por noche.` 
          : `Brazalete seleccionado: ${formulario.descripcion} - Precio: Q. ${formulario.precio} por cantidad y precio.`}
        {" | Recuerda que el precio es automático."}
      </Typography>

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
