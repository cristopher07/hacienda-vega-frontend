export const permisosPorRol = {
  superAdmin: [
    "areas", "dashboard", "usuarios", "inventarios", "solicitudes", "bebidas", "mesas", "menus",
    "habitaciones", "ingresos", "brazaletes", "comandas", "cierre"
  ],
  admin: [
    "areas", "dashboard", "usuarios", "inventarios", "solicitudes", "bebidas", "mesas", "menus",
    "habitaciones", "ingresos", "brazaletes", "cierre"
  ],
  cajera: ["comandas", "dashboard", "solicitudes", "cierre"],
  recepcionista: ["ingresos", "dashboard", "solicitudes", "cierre"]
};
