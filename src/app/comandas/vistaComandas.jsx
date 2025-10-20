import React from "react";
import { Box, Grid, Card, CardContent, Typography, Chip, CircularProgress } from "@mui/material";

const statusColors = {
  Disponible: "#A5D6A7", // verde
  Ocupada: "#EF9A9A",   // rojo
  "Pedido listo": "#FFF59D", // amarillo
};

function getStatusColor(status) {
  return statusColors[status] || "#E0E0E0";
}

export default function VistaComandas({ mesas, loading }) {
  return (
    <Box sx={{ p: 1, marginTop: 3, maxWidth: 1200, mx: 'auto' }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {mesas.map((mesa) => (
            <Grid item xs={12} sm={6} md={4} xl={2} key={mesa.id_mesa || mesa.id}>
              <Card
                sx={{
                  backgroundColor: getStatusColor(mesa.estado || mesa.estado),
                  borderRadius: 2,
                  boxShadow: 3,
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  aspectRatio: '1/1',
                  minHeight: 140,
                  maxWidth: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mx: 'auto',
                  // transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.03)' },
                }}
              >
                <CardContent sx={{ width: '100%', textAlign: 'center', p: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {mesa.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {mesa.capacidad} pers.
                  </Typography>
                  <Box mt={1}>
                    <Chip
                      label={mesa.estado || mesa.estado}
                      sx={{
                        backgroundColor: getStatusColor(mesa.estado || mesa.estado),
                        color: (mesa.estado || mesa.estado) === "Ocupada" ? "#B71C1C" : (mesa.estado || mesa.estado) === "Disponible" ? "#1B5E20" : "#F9A825",
                        fontWeight: "bold",
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
