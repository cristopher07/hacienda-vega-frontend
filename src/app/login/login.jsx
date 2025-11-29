import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Grid,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { loginUser } from "./services/authService";
import { useNavigate } from "react-router-dom";

// Componentes estilizados usando Material-UI
const LoginContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  padding: theme.spacing(2),
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
  maxWidth: "1000px",
  width: "50%",
  borderRadius: "24px",
  overflow: "hidden",
  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  minHeight: "120px",
}));

const LeftPanel = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #1976d2 0%, #1565c0 50%, #0d47a1 100%)",
  color: "white",
  padding: theme.spacing(3),
  minHeight: "450px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-20%",
    left: "-20%",
    width: "200px",
    height: "200px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "50%",
    filter: "blur(40px)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-10%",
    right: "-10%",
    width: "120px",
    height: "100px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "50%",
    filter: "blur(20px)",
  },
}));

const RightPanel = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: "450px",
}));

export default function LoginView() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Llamada real al endpoint de login
      const response = await loginUser({
        usuario: usuario,
        password: password,
      });

      console.log("Login exitoso:", response);

      // cargar a localStorage los datos del usuario loggeado
      localStorage.setItem("rol", response.data.rol);
      localStorage.setItem("usuario", JSON.stringify(response));
      // Redirigir al primer módulo permitido según el rol
      const { permisosPorRol } = require("../utils/permisos");
      const modulos = permisosPorRol[response.data.rol] || [];
      console.log("modulos: ", modulos);
      if (modulos.length > 0) {
        navigate(`/app/${modulos[1]}`);
      } else {
        navigate("/app");
      }
    } catch (err) {
      // Manejar diferentes tipos de errores del backend
      let errorMessage = "Ocurrió un error inesperado";

      if (err.response) {
        // Error del servidor (4xx, 5xx)
        switch (err.response.status) {
          case 401:
            errorMessage =
              "Credenciales inválidas. Verifica tu usuario y contraseña.";
            break;
          case 400:
            errorMessage =
              "Datos inválidos. Verifica la información ingresada.";
            break;
          case 404:
            errorMessage = "Usuario no encontrado.";
            break;
          case 500:
          case 502:
          case 503:
            errorMessage = "Error del servidor. Intenta más tarde.";
            break;
          default:
            if (err.response.data && err.response.data.message) {
              errorMessage = err.response.data.message;
            } else if (err.response.data && err.response.data.msg) {
              errorMessage = err.response.data.msg;
            }
            break;
        }
      } else if (err.request) {
        // Error de conexión
        errorMessage =
          "Error de conexión. Verifica que el servidor esté funcionando en http://localhost:3001";
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      console.error("Error en login:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoginContainer maxWidth={false}>
      <LoginPaper elevation={20}>
        <Grid container sx={{ minHeight: "400px" }}>
          {/* Panel Izquierdo */}
          <Grid item xs={12} md={6}>
            <LeftPanel>
              <Box sx={{ maxWidth: "400px", mx: "auto", width: "100%" }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: "bold",
                    lineHeight: 1.2,
                    mb: 6,
                    fontSize: { xs: "2.5rem", lg: "3.5rem" },
                  }}
                >
                  Hacienda
                  <br />
                  la Vega
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "#bbdefb",
                    lineHeight: 1.6,
                    maxWidth: "300px",
                    fontWeight: 300,
                  }}
                >
                  Bienvenido(a) al sistema de control de la Hacienda La Vega.
                  Gestiona tus áreas, hotel y más de manera eficiente.
                </Typography>
              </Box>
            </LeftPanel>
          </Grid>

          {/* Panel Derecho */}
          <Grid item xs={12} md={6}>
            <RightPanel>
              <Box sx={{ maxWidth: "400px", mx: "auto", width: "100%" }}>
                {/* Encabezado */}
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, color: "#1a1a1a", mb: 1 }}
                  >
                    Login
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#666" }}>
                    Ingresa con tu usuario y contraseña.
                  </Typography>
                </Box>

                {/* Mensaje de error */}
                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                {/* Formulario */}
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ width: "100%" }}
                >
                  <TextField
                    fullWidth
                    label="Usuario"
                    variant="outlined"
                    required
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    placeholder="Ingresa tu usuario"
                    sx={{
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    sx={{
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                  />

                  {/* Botones */}
                  <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={loading}
                      sx={{
                        py: 1.5,
                        borderRadius: "12px",
                        textTransform: "none",
                        fontSize: "16px",
                        fontWeight: 500,
                        background:
                          "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                        "&:hover": {
                          background:
                            "linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)",
                        },
                      }}
                    >
                      {loading ? "Ingresando..." : "Ingresar"}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </RightPanel>
          </Grid>
        </Grid>
      </LoginPaper>
    </LoginContainer>
  );
}
