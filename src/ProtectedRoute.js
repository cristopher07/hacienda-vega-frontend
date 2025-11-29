import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getModulosPermitidos } from "./app/utils/auth";

// Recibe el nombre del módulo (ej: "areas", "usuarios") y el componente a renderizar
export default function ProtectedRoute({ modulo, children }) {
  const location = useLocation();
  const modulosPermitidos = getModulosPermitidos();
  console.log("modulosPermitidos: ", modulosPermitidos);

  if (!modulosPermitidos.includes(modulo)) {
    console.log("Acceso denegado al módulooooo:", modulo);
    // Si no tiene permiso, redirige al inicio o a una página de acceso denegado
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
