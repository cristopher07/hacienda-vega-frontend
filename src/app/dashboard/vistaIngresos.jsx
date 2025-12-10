import { Box, Grid, Paper, Typography, Avatar, Stack } from "@mui/material";

export default function VistaIngresos({
  ingresoHotel,
  ingresoPiscina,
  ingresoRestaurante,
  totalIngresos,
  totalEgresos,
  balance,
}) {

  const Card = ({ letra, color, titulo, descripcion, valor }) => (
    <Paper elevation={1} sx={{ p: 2, borderRadius: 2, height: "100%" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            variant="rounded"
            sx={{
              bgcolor: `${color}.light`,
              color: `${color}.dark`,
              fontWeight: 700,
              width: 36,
              height: 36,
              borderRadius: 2,
            }}
          >
            {letra}
          </Avatar>

          <Box>
            <Typography fontWeight={700}>{titulo}</Typography>
            <Typography variant="body2" color="text.secondary">
              {descripcion}
            </Typography>
          </Box>
        </Stack>

        <Box textAlign="right">
          <Typography variant="h6" fontWeight={700}>
            Q. {valor}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );

  return (
    <Box sx={{ mt: 2, width: "100%", mb: 6 }}>
        <br />
        <br />
     <Grid container spacing={2} sx={{ mb: 4 }}>

        <Grid item xs={12} md={4}>
          <Card
            letra="H"
            color="primary"
            titulo="Hotel"
            descripcion="Ingresos de hotel"
            valor={ingresoHotel}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            letra="P"
            color="warning"
            titulo="Piscina"
            descripcion="Ingresos de piscina"
            valor={ingresoPiscina}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            letra="R"
            color="info"
            titulo="Restaurante"
            descripcion="Ingresos de restaurante"
            valor={ingresoRestaurante}
          />
        </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card
            letra="T"
            color="success"
            titulo="Total Ingresos"
            descripcion="Ingresos generales"
            valor={totalIngresos}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            letra="E"
            color="error"
            titulo="Egresos"
            descripcion="Solicitudes aprobadas"
            valor={totalEgresos}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            letra="B"
            color={balance >= 0 ? "success" : "error"}
            titulo="Balance"
            descripcion="Ingresos - Egresos"
            valor={balance}
          />
        </Grid>

      </Grid>
    </Box>
  );
}
