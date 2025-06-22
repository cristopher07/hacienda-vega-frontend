import { Outlet } from "react-router-dom";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import DrawerMenu from "../components/drawer/drawer";
import UserMenu from "../components/navigateButton/userMenu";

export default function Layout() {
  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar superior */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#0D47A1", // ← aquí se define el azul oscuro
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Hacienda la Vega
          </Typography>
          <IconButton color="inherit" edge="end">
            <UserMenu />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer lateral */}
      <DrawerMenu />

      {/* Contenido principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: "#E5E5E5" }}>
        <Toolbar /> {/* Espacio para AppBar */}
        <Outlet />
      </Box>
    </Box>
  );
}
