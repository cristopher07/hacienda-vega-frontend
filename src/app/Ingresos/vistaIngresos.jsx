import {
  Box,
  Paper,
  Typography,
  Grid,
  Avatar,
  Stack,
} from "@mui/material";

export default function VistaIngresos({
  totalIngresoHotel,
  totalIngresoPiscinas,
  totalIngresoGeneral,
  mesActual
}) {
  return (
    <Box sx={{ mt: 2, width: "100%", marginBottom: 6 }}>
      {/* Row de tarjetas 6/6 con separación abajo */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {/* HOTEL */}
        <Grid item xs={4} md={4}>
          <Paper
            elevation={1}
            sx={{
              p: 2,
              borderRadius: 2,
              height: "100%",
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  variant="rounded"
                  sx={{
                    bgcolor: "primary.light",
                    color: "primary.dark",
                    fontWeight: 700,
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                  }}
                >
                  H
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "primary.main" }}>
                    Hotel
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Gestión de ingresos hotel
                  </Typography>
                </Box>
              </Stack>

              <Box textAlign="right">
                <Typography variant="caption" color="text.secondary">
                  Ingresos {mesActual}
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  Q. {totalIngresoHotel}
                </Typography>
              </Box>
            </Stack>

     
          </Paper>
        </Grid>

        {/* PISCINAS */}
        <Grid item xs={4} md={4}>
          <Paper
            elevation={1}
            sx={{
              p: 2,
              borderRadius: 2,
              height: "100%",
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  variant="rounded"
                  sx={{
                    bgcolor: "warning.light",
                    color: "warning.dark",
                    fontWeight: 700,
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                  }}
                >
                  P
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "primary.main" }}>
                    Piscinas
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Gestión de ingresos piscinas
                  </Typography>
                </Box>
              </Stack>

              <Box textAlign="right">
                <Typography variant="caption" color="text.secondary">
                  Ingresos {mesActual}
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  Q. {totalIngresoPiscinas}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>

           {/* TOTAL INGRESOS HOTEL Y PISCINAS */}
           <Grid item xs={4} md={4}>
             <Paper
               elevation={1}
               sx={{
                 p: 2,
                 borderRadius: 2,
                 height: "100%",
               }}
             >
               <Stack direction="row" alignItems="center" justifyContent="space-between">
                 <Stack direction="row" alignItems="center" spacing={2}>
                   <Avatar
                     variant="rounded"
                     sx={{
                       bgcolor: "success.light",
                       color: "success.dark",
                       fontWeight: 700,
                       width: 36,
                       height: 36,
                       borderRadius: 2,
                     }}
                   >
                     T
                   </Avatar>
                   <Box>
                     <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "primary.main" }}>
                       General
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                       Gestión de ingresos hotel y piscinas
                     </Typography>
                   </Box>
                 </Stack>

                 <Box textAlign="right">
                   <Typography variant="caption" color="text.secondary">
                     Ingresos {mesActual}
                   </Typography>
                   <Typography variant="h6" fontWeight={700}>
                    Q. {totalIngresoGeneral}
                   </Typography>
                 </Box>
               </Stack>
             </Paper>
           </Grid>
      </Grid>

    </Box>
  );
}
