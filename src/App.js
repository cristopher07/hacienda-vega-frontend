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
<<<<<<< HEAD
import Ingresos from "./app/Ingresos/ingresos";
=======
import Brazaletes from "./app/brazaletes/brazaletes";
>>>>>>> feature/dev-nestor

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal - Login */}
        <Route path="/" element={<LoginView />} />
        <Route path="/login" element={<LoginView />} />
        
        {/* Rutas con Layout (menu) */}
        <Route path="/app" element={<Layout />}>
          <Route path="areas" element={<Areas />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="inventarios" element={<Inventarios />} />
          <Route path="solicitudes" element={<Solicitudes />} />
          <Route path="bebidas" element={<Bebidas />} />
          <Route path="mesas" element={<Mesas />} />
          <Route path="menus" element={<Menus />} />
          <Route path="habitaciones" element={<Habitaciones />} />
<<<<<<< HEAD
          <Route path="ingresos" element={<Ingresos />} />
=======
          <Route path="brazaletes" element={<Brazaletes />} />
>>>>>>> feature/dev-nestor
          {/* <Route path="table" element={<TablePage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
