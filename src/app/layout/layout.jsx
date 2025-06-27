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
          backgroundColor: "#0D47A1",
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
      <Box
        component="main"
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f3f2f2",
          minHeight: "100vh", 
        }}
      >
        {/* <Toolbar /> */}
        <Outlet />
      </Box>
    </Box>
  );
}
