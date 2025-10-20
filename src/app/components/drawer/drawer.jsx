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
import {
  Assignment,
  Domain,
  Inventory2,
  Person,
  Liquor,
  TableBar,
  Fastfood,
  RoomService,
  AttachMoney,
  LocalActivity,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "@mui/material";

const menuItems = [
  { text: "Áreas", icon: <Domain />, path: "/app/areas" },
  { text: "Usuarios", icon: <Person />, path: "/app/usuarios" },
  { text: "Inventarios", icon: <Inventory2 />, path: "/app/inventarios" },
  { text: "Solicitudes", icon: <Assignment />, path: "/app/solicitudes" }, //nuevo icono como para una solicitud
  { text: "Bebidas", icon: <Liquor />, path: "/app/bebidas" },
  { text: "Mesas", icon: <TableBar />, path: "/app/mesas" },
  { text: "Menús", icon: <Fastfood />, path: "/app/menus" },
  { text: "Habitaciones", icon: <RoomService />, path: "/app/habitaciones" },
  { text: "Ingresos", icon: <AttachMoney />, path: "/app/ingresos" },
  { text: "Brazaletes", icon: <LocalActivity />, path: "/app/brazaletes" },
  { text: "Comandas", icon: <Assignment />, path: "/app/comandas" }, // <-- Nueva opción

];

export default function DrawerMenu({ isOpen }) {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isOpen ? 240 : 60,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: isOpen ? 240 : 60,
          boxSizing: "border-box",
          backgroundColor: "#0D47A1",
          color: "#E5E5E5",
          top: "5px",
          overflowX: "hidden",
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map(({ text, icon, path }) => {
          const isActive = location.pathname === path;

          return (
            <ListItem key={text} disablePadding>
              {isOpen ? (
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
              ) : (
                <Tooltip title={text} placement="right" arrow>
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
                    <ListItemIcon sx={{ color: "#FFFFFF" }}>
                      {icon}
                    </ListItemIcon>
                  </ListItemButton>
                </Tooltip>
              )}
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
