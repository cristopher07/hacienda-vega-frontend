import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Areas from "./app/areas/areas";
import Layout from "./app/layout/layout";
import Usuarios from "./app/usuarios/usuarios";
import Inventarios from "./app/inventarios/inventarios";
import Solicitudes from "./app/solicitudes/solicitudes";
import Bebidas from "./app/bebidas/bebidas";
import Mesas from "./app/mesas/mesas";
import Menus from "./app/menus/menus";
import Habitaciones from "./app/habitaciones/habitaciones";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="areas" element={<Areas />} />
          <Route path="usuarios" element={<Usuarios />} />
           <Route path="inventarios" element={<Inventarios />} />
          <Route path="solicitudes" element={<Solicitudes />} />
          <Route path="bebidas" element={<Bebidas />} />
          <Route path="mesas" element={<Mesas />} />
          <Route path="menus" element={<Menus />} />
          <Route path="habitaciones" element={<Habitaciones />} />

          {/* <Route path="table" element={<TablePage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
