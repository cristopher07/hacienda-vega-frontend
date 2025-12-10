import { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function DashboardBienvenida({ usuario }) {
  
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setHora(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const obtenerSaludo = () => {
    const h = hora.getHours();
    if (h < 12) return "Buenos días";
    if (h < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  const fechaFormateada = hora.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const horaFormateada = hora.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  return (
    <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: 600,
          textAlign: "center",
          width: "100%",
          background: "linear-gradient(135deg, #e3f2fd, #fff)"
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          {obtenerSaludo()}
        </Typography>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          Hoy es <strong>{fechaFormateada}</strong>
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: "bold", color: "primary.main" }}>
          {horaFormateada}
        </Typography>

        <Typography variant="body1" sx={{ mt: 3, fontStyle: "italic" }}>
          Bienvenido al sistema de administración 
          de Hacienda La Vega.
        </Typography>
      </Paper>
    </Box>
  );
}
