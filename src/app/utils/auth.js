// Retorna el array de módulos permitidos para el rol actual
import { permisosPorRol } from "./permisos";

export function getModulosPermitidos() {
  const rol = localStorage.getItem("rol");
  console.log("roooool: ", rol);
  return permisosPorRol[rol] || [];
}
