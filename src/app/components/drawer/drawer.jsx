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
import { Dashboard, Person } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  { text: "Áreas", icon: <Dashboard />, path: "/dashboard" },
  { text: "Catálogos", icon: <Person />, path: "/profile" },
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
          backgroundColor: "#0D47A1", // Azul oscuro
          color: "#E5E5E5", // Color de texto claro
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
