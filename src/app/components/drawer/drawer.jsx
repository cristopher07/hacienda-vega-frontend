import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import {  Assignment, Domain, Inventory2, Person } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  { text: "Áreas", icon: <Domain  />, path: "/app/areas" },
  { text: "Usuarios", icon: <Person />, path: "/app/usuarios" },
  { text: "Inventarios", icon: <Inventory2  />, path: "/app/inventarios" },
  { text: "Solicitudes", icon: <Assignment />, path: "/app/solicitudes" }, //nuevo icono como para una solicitud
];

export default function DrawerMenu() {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#0D47A1", 
          color: "#E5E5E5",
           top: '5px',
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map(({ text, icon, path }) => {
          const isActive = location.pathname === path;

          return (
            <ListItem key={text} disablePadding>
              <ListItemButton
                component={Link}
                to={path}
                sx={{
                  backgroundColor: isActive ? "#1565C0" : "transparent",
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#1976D2",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#FFFFFF" }}>{icon}</ListItemIcon>
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? "bold" : "normal",
                    color: "#FFFFFF",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
