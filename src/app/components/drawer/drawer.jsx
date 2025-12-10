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
  Home,
  Domain,
  Inventory2,
  Person,
  Liquor,
  TableBar,
  Fastfood,
  RoomService,
  AttachMoney,
  LocalActivity,
  ReceiptLong,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { getModulosPermitidos } from "../../utils/auth";
import { Tooltip } from "@mui/material";

const menuItems = [
  { key: "dashboard", text: "Dashboard Principal", icon: <Home />, path: "/app/dashboard" },
  { key: "areas", text: "Áreas", icon: <Domain />, path: "/app/areas" },
  { key: "usuarios", text: "Usuarios", icon: <Person />, path: "/app/usuarios" },
  { key: "inventarios", text: "Inventarios", icon: <Inventory2 />, path: "/app/inventarios" },
  { key: "solicitudes", text: "Solicitudes", icon: <Assignment />, path: "/app/solicitudes" },
  { key: "bebidas", text: "Bebidas", icon: <Liquor />, path: "/app/bebidas" },
  { key: "mesas", text: "Mesas", icon: <TableBar />, path: "/app/mesas" },
  { key: "menus", text: "Menús", icon: <Fastfood />, path: "/app/menus" },
  { key: "habitaciones", text: "Habitaciones", icon: <RoomService />, path: "/app/habitaciones" },
  { key: "ingresos", text: "Ingresos", icon: <AttachMoney />, path: "/app/ingresos" },
  { key: "brazaletes", text: "Brazaletes", icon: <LocalActivity />, path: "/app/brazaletes" },
  { key: "comandas", text: "Comandas", icon: <Assignment />, path: "/app/comandas" },
  { key: "cierre", text: "Cierre de Caja", icon: <ReceiptLong />, path: "/app/cierre" },
];


export default function DrawerMenu({ isOpen }) {
  const location = useLocation();
  const modulosPermitidos = getModulosPermitidos();

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
        {menuItems
          .filter(item => modulosPermitidos.includes(item.key))
          .map(({ text, icon, path }) => {
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
