export const permisosPorRol = {
  superAdmin: [
    "areas", "usuarios", "inventarios", "solicitudes", "bebidas", "mesas", "menus",
    "habitaciones", "ingresos", "brazaletes", "comandas", "cierreCajas", "principal"
  ],
  admin: [
    "areas", "usuarios", "inventarios", "solicitudes", "bebidas", "mesas", "menus",
    "habitaciones", "ingresos", "brazaletes", "principal"
  ],
  cajera: ["comandas", "solicitudes", "cierreCajas", "principal"],
  recepcionista: ["ingresos", "solicitudes", "cierreCajas", "principal"]
};
