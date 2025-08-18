import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Areas from "./app/areas/areas";
import Layout from "./app/layout/layout";
import Usuarios from "./app/usuarios/usuarios";
import Inventarios from "./app/inventarios/inventarios";
import Solicitudes from "./app/solicitudes/solicitudes";
import LoginView from "./app/login/login";

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
         
          {/* <Route path="table" element={<TablePage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
