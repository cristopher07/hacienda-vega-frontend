import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Popover,
  Button,
} from "@mui/material";

const statusColors = {
  Disponible: "#A5D6A7", // verde
  Ocupada: "#EF9A9A", // rojo
  "Pedido listo": "#FFF59D", // amarillo
};

function getStatusColor(status) {
  return statusColors[status] || "#E0E0E0";
}

export default function VistaComandas({ mesas, loading, dataComandas }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverContent, setPopoverContent] = useState("");
  const [mesaActual, setMesaActual] = useState(null);

  const handlePopoverOpen = (event, mesa) => {
    setMesaActual(mesa);
    const comandasMesa = (dataComandas || []).filter(
      (c) => c.id_mesa === mesa.id_mesa
    );
    let content = "";
    if (comandasMesa.length > 0) {
      content = comandasMesa
        .map((c) => {
          let campos = [];
          if (c.nombreMenu != null) campos.push(`Menú: ${c.nombreMenu}`);
          if (c.nombreBebida != null) campos.push(`Bebida: ${c.nombreBebida}`);
          if (c.subtotal != null) campos.push(`Subtotal: ${c.subtotal}`);
          return campos.join("\n");
        })
        .join("\n---\n");
      // Mostrar el campo 'Total General' solo una vez al final, usando el valor de la última comanda
      const ultimoTotal = comandasMesa[comandasMesa.length - 1]?.total;
      if (ultimoTotal != null) {
        content += `\n\nTotal General: ${ultimoTotal}`;
      }
    } else {
      content = "Sin comandas recientes";
    }
    setPopoverContent(content);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverContent("");
    setMesaActual(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ p: 1, marginTop: 3, maxWidth: 1200, mx: "auto" }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : mesas.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Typography variant="h6" color="text.secondary">
            No hay mesas para mostrar.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {mesas.map((mesa) => (
            <Grid
              item
              xs={12}
              sm={5}
              md={4}
              xl={2.4}
              key={mesa.id_mesa || mesa.id}
            >
              <Card
                sx={{
                  backgroundColor: getStatusColor(mesa.estado || mesa.estado),
                  borderRadius: 2,
                  boxShadow: 3,
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  aspectRatio: "1/1",
                  minHeight: 140,
                  maxWidth: 200,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  mx: "auto",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                <CardContent
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    p: 2,
                    position: "relative",
                  }}
                >
                  {(mesa.estado === "Ocupada" ||
                    mesa.estado === "Pedido listo") && (
                    <Button
                      variant="contained"
                      color={mesa.estado === "Ocupada" ? "warning" : "success"}
                      size="small"
                       sx={{ top: 0.1 }}
                      onClick={(e) => {
                        if (mesa.estado === "Ocupada") {
                          console.log("Cambiar estado mesa a Pedido listo: ", mesa.id_mesa);
                        } else {
                          console.log("Cambiar estado mesa a Pagado: ", mesa.id_mesa);
                        }
                      }}
                    >
                      {mesa.estado === "Ocupada"
                        ? "Pedido listo"
                        : "Pagado"
                      }
                    </Button>
                  )}

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      mt: 3,
                      cursor: 'pointer',
                      borderRadius: 2,
                       transition: 'background-color 0.2s',
                    
                    }}
                    onClick={(e) => handlePopoverOpen(e, mesa)}
                  >
                    {mesa.nombre}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      cursor: 'pointer',
                      borderRadius: 2,
                       transition: 'background-color 0.2s',
                     
                    }}
                    onClick={(e) => handlePopoverOpen(e, mesa)}
                  >
                    {mesa.capacidad} pers.
                  </Typography>
                  <Box mt={1}>
                    <Chip
                      label={mesa.estado || mesa.estado}
                      sx={{
                        backgroundColor: getStatusColor(
                          mesa.estado || mesa.estado
                        ),
                        color:
                          (mesa.estado || mesa.estado) === "Ocupada"
                            ? "#B71C1C"
                            : (mesa.estado || mesa.estado) === "Disponible"
                            ? "#1B5E20"
                            : "#F9A825",
                        fontWeight: "bold",
                      
                      }}
                      onClick={(e) => handlePopoverOpen(e, mesa)}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        PaperProps={{ sx: { p: 2, minWidth: 200, borderRadius: 2 } }}
      >
        <Typography variant="body2" sx={{ whiteSpace: "pre-line", mt: 3 }}>
          {popoverContent}
        </Typography>
      </Popover>
    </Box>
  );
}
