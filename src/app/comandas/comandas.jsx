
import React, { useEffect, useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import MainLayout from "../components/layout/MainLayout";
import { Replay } from "@mui/icons-material";
import Confirmation from "../components/modulesComponents/Confirmation";
import { getMesaByQuery } from "../mesas/services/mesaService";
import VistaComandas from "./vistaComandas";
import ComandasFilter from "./comandasFilter";

export default function Comandas() {
  const [title] = useState("COMANDAS");
  const [subTitle] = useState(`Gestión de Comandas`);
  const [verForm, setVerForm] = useState(false);
  const [mesas, setMesas] = useState([]);
  const [mesasFiltradas, setMesasFiltradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage] = useState(100); // para traer todas las mesas
  const [pageFix, setpageFix] = useState(0);
  const [buscar, setBuscar] = useState("");
  const [alertMessage, setAlertMensaje] = useState({
    open: false,
    message: "",
    alertType: "info",
  });

  const cargarMesas = async (busqueda) => {
    setLoading(true);
    let objResponse = await getMesaByQuery(busqueda, rowsPerPage, pageFix, "");
    if (objResponse.valid) {
      setMesas(objResponse.data);
      setMesasFiltradas(objResponse.data); // por defecto muestra todas
    } else {
      setMesas([]);
      setMesasFiltradas([]);
      setAlertMensaje({
        open: true,
        message: objResponse.message || "No se encontraron mesas.",
        alertType: "warning",
      });
    }
    setLoading(false);
  };

  const onFiltrarTipo = (tipo) => {
    if (tipo === "Todos") {
      setMesasFiltradas(mesas);
    } else {
      setMesasFiltradas(mesas.filter(m => m.tipo_de_mesa === tipo));
    }
  };

  useEffect(() => {
    cargarMesas(buscar);
    // eslint-disable-next-line
  }, [buscar, rowsPerPage, pageFix]);

  return (
    <MainLayout
      title={title}
      subtitle={subTitle}
      meta={
        verForm && (
          <div>
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={() => {
                setVerForm(false);
              }}
              startIcon={<Replay />}
            >
              REGRESAR
            </Button>
          </div>
        )
      }
      metacontent={
        <>
          {!verForm ? (
            <>
              <ComandasFilter
                setVerForm={setVerForm}
                mesas={mesas}
                onFiltrarTipo={onFiltrarTipo}
              />
              <VistaComandas mesas={mesasFiltradas} loading={loading} />
              <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={alertMessage.open}
                autoHideDuration={4000}
                onClose={() =>
                  setAlertMensaje({ ...alertMessage, open: false })
                }
              >
                <Alert
                  variant="filled"
                  severity={alertMessage.alertType}
                  onClose={() =>
                    setAlertMensaje({ ...alertMessage, open: false })
                  }
                >
                  {alertMessage.message}
                </Alert>
              </Snackbar>
            </>
          ) : (
            <div>Formulario para crear comanda (próximamente)</div>
          )}
        </>
      }
    />
  );
}
