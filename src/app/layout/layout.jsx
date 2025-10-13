import { Outlet } from "react-router-dom";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerMenu from "../components/drawer/drawer";
import UserMenu from "../components/navigateButton/userMenu";

export default function Layout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

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
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            HACIENDA LA VEGA
          </Typography>
          <IconButton color="inherit" edge="end">
            <UserMenu />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer lateral */}
      <DrawerMenu isOpen={isDrawerOpen} />

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
