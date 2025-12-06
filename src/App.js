import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Areas from "./app/areas/areas";
import Layout from "./app/layout/layout";
import Usuarios from "./app/usuarios/usuarios";
import Inventarios from "./app/inventarios/inventarios";
import Solicitudes from "./app/solicitudes/solicitudes";
import LoginView from "./app/login/login";
import Bebidas from "./app/bebidas/bebidas";
import Mesas from "./app/mesas/mesas";
import Habitaciones from "./app/habitaciones/habitaciones";
import Menus from "./app/menus/menus";
import Ingresos from "./app/Ingresos/ingresos";
import Brazaletes from "./app/brazaletes/brazaletes";
import Comandas from "./app/comandas/comandas";
import Dashboard from "./app/dashboard/dashboard";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal - Login */}
        <Route path="/" element={<LoginView />} />
        <Route path="/login" element={<LoginView />} />
        
        {/* Rutas con Layout (menu) */}
        <Route path="/app" element={<Layout />}>
          <Route path="dashboard" element={
            <ProtectedRoute modulo="dashboard">
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="areas" element={
            <ProtectedRoute modulo="areas">
              <Areas />
            </ProtectedRoute>
          } />
          <Route path="usuarios" element={
            <ProtectedRoute modulo="usuarios">
              <Usuarios />
            </ProtectedRoute>
          } />
          <Route path="inventarios" element={
            <ProtectedRoute modulo="inventarios">
              <Inventarios />
            </ProtectedRoute>
          } />
          <Route path="solicitudes" element={
            <ProtectedRoute modulo="solicitudes">
              <Solicitudes />
            </ProtectedRoute>
          } />
          <Route path="bebidas" element={
            <ProtectedRoute modulo="bebidas">
              <Bebidas />
            </ProtectedRoute>
          } />
          <Route path="mesas" element={
            <ProtectedRoute modulo="mesas">
              <Mesas />
            </ProtectedRoute>
          } />
          <Route path="menus" element={
            <ProtectedRoute modulo="menus">
              <Menus />
            </ProtectedRoute>
          } />
          <Route path="habitaciones" element={
            <ProtectedRoute modulo="habitaciones">
              <Habitaciones />
            </ProtectedRoute>
          } />
          <Route path="ingresos" element={
            <ProtectedRoute modulo="ingresos">
              <Ingresos />
            </ProtectedRoute>
          } />
          <Route path="brazaletes" element={
            <ProtectedRoute modulo="brazaletes">
              <Brazaletes />
            </ProtectedRoute>
          } />
          <Route path="comandas" element={
            <ProtectedRoute modulo="comandas">
              <Comandas />
            </ProtectedRoute>
          } />
          {/* <Route path="table" element={<TablePage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
