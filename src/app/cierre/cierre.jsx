import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import { useSnackbar } from "notistack";
import {
  getResumenCaja,
  crearCierreCaja,
  listarCierres
} from "./services/cierreServices";
import MainLayout from "../components/layout/MainLayout";

export default function CierreCaja() {

  const [title] = useState("CIERRE DE CAJA");
    const [subTitle] = useState(`Modulo para efectuar Cierre de Caja`);


  const { enqueueSnackbar } = useSnackbar();

  // ===== DATOS DEL USUARIO LOGUEADO =====
  const rol = localStorage.getItem("rol"); // recepcionista | cajera | admin | superAdmin
  const usuarioLS = JSON.parse(localStorage.getItem("usuario"));
  const idUsuario = usuarioLS?.data?.id_usuario;
  const idArea = usuarioLS?.data?.id_area;

  // ===== STATES =====
  const [fecha, setFecha] = useState("");
  const [resumen, setResumen] = useState({
    efectivo: 0,
    transferencia: 0,
    tarjeta: 0,
  });
  const [efectivoCaja, setEfectivoCaja] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [loading, setLoading] = useState(false);
  const [cierres, setCierres] = useState([]);

  const cargarCierres = async () => {
  const res = await listarCierres();
  console.log("respuesta de cierres:", res);
  if (res.valid) {
    setCierres(res.data);
  }
};

  // ===== CARGA AUTOMÁTICA AL CAMBIAR FECHA =====
  useEffect(() => {
    if (rol === "admin" || rol === "superAdmin") {
    cargarCierres();
  }
    if (fecha) {
      cargarResumen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fecha]);

  // ===== OBTENER RESUMEN POR ROL =====
  const cargarResumen = async () => {
    try {
      setLoading(true);
      const response = await getResumenCaja({
        fecha,
        rol,
        id_usuario: idUsuario
      });

      if (response.valid) {
        setResumen(response.data);
      } else {
        enqueueSnackbar("No se pudo obtener el resumen", {
          variant: "warning",
        });
      }
    } catch (error) {
      enqueueSnackbar("Error al cargar resumen o cierre ya realizado", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const totalEsperado =
    Number(resumen.efectivo || 0) +
    Number(resumen.transferencia || 0) +
    Number(resumen.tarjeta || 0);

  const restante = Number(efectivoCaja || 0) - Number(resumen.efectivo || 0);

  // ===== CIERRE DE CAJA =====
  const handleCerrarCaja = async () => {
    if (!fecha) {
      enqueueSnackbar("Seleccione una fecha", { variant: "warning" });
      return;
    }

    try {
      const payload = {
        fecha,
        id_usuario: idUsuario,
        id_area: idArea,
        efectivo_caja: efectivoCaja,
        restante,
        observaciones,
        estado: "CERRADO",
      };

      const response = await crearCierreCaja(payload);

      if (response.valid) {
        enqueueSnackbar("Cierre de caja realizado correctamente", {
          variant: "success",
        });
        setFecha("");
        setResumen({ efectivo: 0, transferencia: 0, tarjeta: 0 });
        setEfectivoCaja("");
        setObservaciones("");
      } else {
        enqueueSnackbar(response.msg || "No se pudo cerrar caja", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Error al efectuar cierre", {
        variant: "error",
      });
    }
  };

 

  return (
    <MainLayout
          title={title}
          subtitle={subTitle}
          metacontent={
            <>
             <Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" color="primary" fontWeight="bold">
          CIERRE DE CAJA
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="date"
              label="Fecha"
              InputLabelProps={{ shrink: true }}
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Resumen de Caja</Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Efectivo"
              value={resumen.efectivo}
              disabled
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Transferencia"
              value={resumen.transferencia}
              disabled
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Tarjeta"
              value={resumen.tarjeta}
              disabled
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Verificación de Caja</Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Total Esperado"
              value={totalEsperado}
              disabled
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Efectivo en Caja"
              value={efectivoCaja}
              onChange={(e) => setEfectivoCaja(e.target.value)}
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Diferencia"
              value={restante}
              disabled
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Observaciones"
              multiline
              rows={3}
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCerrarCaja}
            disabled={loading}
          >
            EFECTUAR CIERRE DE CAJA
          </Button>
        </Box>
      </Paper>
      {(rol === "admin" || rol === "superAdmin") && (
  <Paper sx={{ mt: 4, p: 2 }}>
    <Typography variant="h5" color="primary" fontWeight="bold">
      Historial de Cierres de Caja
    </Typography>

    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Usuario</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Efectivo</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Restante</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Observaciones</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {cierres.map((row) => (
          <TableRow key={row.id_caja}>
            <TableCell>{row.fecha}</TableCell>
            <TableCell>{row.usuario}</TableCell>
            <TableCell>Q {row.efectivo_caja}</TableCell>
            <TableCell>Q {row.restante}</TableCell>
            <TableCell>{row.observaciones}</TableCell>
            <TableCell>{row.estado}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
)}

    </Box>
            </>
          }
        />

   
  );
}
