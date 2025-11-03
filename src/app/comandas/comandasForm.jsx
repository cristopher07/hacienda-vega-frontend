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

import { listMarca } from "../mesas/services/mesaService";
import { listMesas } from "../menus/services/menuService";
import { listBebidas } from "../bebidas/services/bebidaService";
 import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
  } from "@mui/material";
  import DeleteIcon from '@mui/icons-material/Delete';

export default function ComandasForm({
  onCancelar,
  fnGuardar,
  fnEditar,
  data,
  titulo = "",
  enqueueSnackbar,
}) {
  const [mesa, setMesa] = useState([]);
  const [menu, setMenu] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [comandaItems, setComandaItems] = useState([]);

  const [formulario, setFormulario] = useState({
    id_mesa: "",
    id_menu: "",
    id_bebida: "",
    descripcion: "",
    subtotal: "",
    fecha: "",
    observacion: "",
    total: "",
    tipo_pago: "",
    metodo: "",
    estado: 1,
    ...data,
  });


  const getSelectedPrices = React.useCallback(() => {
    const menuPrice = menu.find(m => m.id_menu === formulario.id_menu)?.precio || 0;
    const bebidaPrice = bebidas.find(b => b.id_bebida === formulario.id_bebida)?.precio || 0;
    return Number(menuPrice) + Number(bebidaPrice);
  }, [formulario.id_menu, formulario.id_bebida, menu, bebidas]);

  // Actualiza el subtotal cuando cambian menú o bebida
  useEffect(() => {
    if (formulario.id_menu || formulario.id_bebida) {
      const sum = getSelectedPrices();
      setFormulario(prev => ({ ...prev, subtotal: sum }));
    }
  }, [formulario.id_menu, formulario.id_bebida, menu, bebidas, getSelectedPrices]);


  useEffect(() => {
    if (data) {
      setFormulario((prev) => ({
        ...prev,
        ...data,
      }));
    }
  }, [data]);

  useEffect(() => {
    getMesas();
    getMenus();
    getBebidas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Actualiza el total sumando los subtotales de todos los items agregados
  useEffect(() => {
    const total = comandaItems.reduce((acc, item) => acc + Number(item.subtotal || 0), 0);
    setFormulario(prev => ({ ...prev, total }));
  }, [comandaItems]);

  const getMesas = async () => {
    const response = await listMarca();
    if (response.ok) {
      setMesa(response.data);
    } else {
      enqueueSnackbar("Error al obtener las mesas.", {
    // Array para los ítems agregados a la comanda
   
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    }
  };

  const getMenus = async () => {
    const response = await listMesas();
    if (response.ok) {
      setMenu(response.data);
    } else {
      enqueueSnackbar("Error al obtener las mesas.", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    }
  };

  const getBebidas = async () => {
    const response = await listBebidas();
    if (response.ok) {
      setBebidas(response.data);
    } else {
      enqueueSnackbar("Error al obtener las bebidas.", {
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

    // If changing menu or bebida, update subtotal automatically
    if (name === "id_menu" || name === "id_bebida") {
      setFormulario((prev) => ({
        ...prev,
        [name]: value,
      }));
      // Subtotal will be updated by useEffect above
    } else {
      setFormulario((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Construir el array para enviar al backend
    const comandaArray = comandaItems.map(item => ({
      id_mesa: formulario.id_mesa,
      id_menu: item.id_menu,
      id_bebida: item.id_bebida,
      subtotal: item.subtotal,
      fecha: formulario.fecha,
      observacion: formulario.observacion,
      estado: formulario.estado,
      total: formulario.total,
      tipo_pago: formulario.tipo_pago,
      // Puedes agregar más campos si lo necesitas
    }));


    // Enviar el array al backend usando tu función de guardar
    fnGuardar(comandaArray);
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
              <InputLabel id="mesa-label">Mesa</InputLabel>
              <Select
                labelId="mesa-label"
                id="id_mesa"
                name="id_mesa"
                required
                value={formulario.id_mesa || ''}
                onChange={handleInputChange}
                label="Mesa"
                variant="outlined"
              >
                {mesa.map(mesa => (
                  <MenuItem key={mesa.id_mesa} value={mesa.id_mesa}>{mesa.nombre}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="menu-label">Menú</InputLabel>
              <Select
                labelId="menu-label"
                id="id_menu"
                name="id_menu"
                value={formulario.id_menu || ''}
                onChange={handleInputChange}
                label="Menú"
                variant="outlined"
              >
                {menu.map(menu => (
                  <MenuItem key={menu.id_menu} value={menu.id_menu}>{menu.descripcion}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="bebida-label">Bebida</InputLabel>
              <Select
                labelId="bebida-label"
                id="id_bebida"
                name="id_bebida"
                value={formulario.id_bebida || ''}
                onChange={handleInputChange}
                label="Bebida"
                variant="outlined"
              >
                {bebidas.map(bebida => (
                  <MenuItem key={bebida.id_bebida} value={bebida.id_bebida}>{bebida.descripcion}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="subtotal"
              name="subtotal"
              label="Subtotal"
              disabled={formulario.id_menu || formulario.id_bebida ? false : true}
              value={formulario.subtotal || ''}
              onChange={handleInputChange}
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="fecha"
              name="fecha"
              label="Fecha"
              value={formulario.fecha || ''}
              onChange={handleInputChange}
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="observacion"
              name="observacion"
              label="Observación"
              value={formulario.observacion || ''}
              onChange={handleInputChange}
              variant="outlined"
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
                value={formulario.estado || ''}
                onChange={handleInputChange}
                label="Estado"
                variant="outlined"
              >
                <MenuItem value="En Preparación">En Preparación</MenuItem>
                <MenuItem value="Listo">Listo</MenuItem>
                <MenuItem value="Pagado">Pagado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="total"
              name="total"
              label="Total"
              disabled
              value={formulario.total || ''}
              onChange={handleInputChange}
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="tipo-pago-label">Tipo de pago</InputLabel>
              <Select
                labelId="tipo-pago-label"
                id="tipo_pago"
                name="tipo_pago"
                required
                value={formulario.tipo_pago || ''}
                onChange={handleInputChange}
                label="Tipo de pago"
                variant="outlined"
              >
                <MenuItem value="Tarjeta">Tarjeta Débito / Crédito</MenuItem>
                <MenuItem value="Efectivo">Efectivo</MenuItem>
                <MenuItem value="Transferencia">Transferencia</MenuItem>
              </Select>
            </FormControl>
          </Grid>

      {/* Agregar button for adding items to comandaItems */}
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (formulario.id_menu || formulario.id_bebida) {
                    setComandaItems(prev => [
                      ...prev,
                      {
                        id_menu: formulario.id_menu,
                        menu_desc: menu.find(m => m.id_menu === formulario.id_menu)?.descripcion || '',
                        id_bebida: formulario.id_bebida,
                        bebida_desc: bebidas.find(b => b.id_bebida === formulario.id_bebida)?.descripcion || '',
                        subtotal: formulario.subtotal || 0,
                      }
                    ]);
                    setFormulario(prev => ({ ...prev, id_menu: '', id_bebida: '', subtotal: '' }));
                  }
                }}
                sx={{ mt: 2 }}
              >
                Agregar
              </Button>
            </Grid>

          {/* Table for comandaItems */}
          {comandaItems.length > 0 && (
            <Grid item xs={12}>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Menú</TableCell>
                      <TableCell>Bebida</TableCell>
                      <TableCell>Subtotal</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {comandaItems.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{item.menu_desc}</TableCell>
                        <TableCell>{item.bebida_desc}</TableCell>
                        <TableCell>{item.subtotal}</TableCell>
                        <TableCell>
                          <IconButton color="error" onClick={() => {
                            setComandaItems(prev => prev.filter((_, i) => i !== idx));
                          }}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={2} align="right"><b>Total</b></TableCell>
                      <TableCell colSpan={2}>
                        {comandaItems.reduce((acc, item) => acc + Number(item.subtotal || 0), 0)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          )}
         
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
          disabled={comandaItems.length === 0}
        >
          GUARDAR
        </Button>
      </Box>
    </Box>
  );
}
