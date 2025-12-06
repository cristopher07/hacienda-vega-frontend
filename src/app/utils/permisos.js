export const permisosPorRol = {
  superAdmin: [
    "areas", "usuarios", "inventarios", "solicitudes", "bebidas", "mesas", "menus",
    "habitaciones", "ingresos", "brazaletes", "comandas", "cierreCajas", "dashboard"
  ],
  admin: [
    "areas", "usuarios", "inventarios", "solicitudes", "bebidas", "mesas", "menus",
    "habitaciones", "ingresos", "brazaletes", "dashboard"
  ],
  cajera: ["comandas", "solicitudes", "cierreCajas", "dashboard"],
  recepcionista: ["ingresos", "solicitudes", "cierreCajas", "dashboard"]
};
