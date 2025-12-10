// Retorna el array de módulos permitidos para el rol actual
import { permisosPorRol } from "./permisos";

export function getModulosPermitidos() {
  const rol = localStorage.getItem("rol");
  console.log("roooool: ", rol);
  const usuario = localStorage.getItem("usuario");
  console.log("usuariooo: ", usuario);
  return permisosPorRol[rol] || [];
}
