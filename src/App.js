import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Areas from "./app/areas/areas";
import Layout from "./app/layout/layout";
import Usuarios from "./app/usuarios/usuarios";
import Inventarios from "./app/inventarios/inventarios";
import Bebidas from "./app/bebidas/bebidas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="areas" element={<Areas />} />
          <Route path="usuarios" element={<Usuarios />} />
           <Route path="inventarios" element={<Inventarios />} />
           <Route path="bebidas" element={<Bebidas />} />

          {/* <Route path="table" element={<TablePage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
