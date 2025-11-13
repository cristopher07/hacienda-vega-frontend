import React, { useEffect, useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import MainLayout from "../components/layout/MainLayout";
import { Replay } from "@mui/icons-material";
import Confirmation from "../components/modulesComponents/Confirmation";
import { getMesaByQuery } from "../mesas/services/mesaService";
import VistaComandas from "./vistaComandas";
import ComandasFilter from "./comandasFilter";
import ComandasForm from "./comandasForm";
import { useSnackbar } from "notistack";
import { addComanda, getComandas } from "./services/comandasService";
import TablaComandas from "./TablaComandas"; // crea este componente si no existe
import dayjs from "dayjs";

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
  const [selectedData, setSelectedData] = useState(null);
  const [verTablaComandas, setVerTablaComandas] = useState(true);
  const [dataComandas, setDataComandas] = useState([]);
  console.log("dataComandas: ", dataComandas);
  const [rowsPerPageComandas, setRowsPerPageComandas] = useState(10);
  const [pageFixComandas, setpageFixComandas] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const cargarMesas = async (busqueda) => {
    setLoading(true);
    let objResponse = await getMesaByQuery(busqueda, rowsPerPage, pageFix, "");
    if (objResponse.valid) {
      setMesas(objResponse.data);
      setMesasFiltradas(objResponse.data);
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

  const cargarComandas = async () => {
    let objResponse = await getComandas(
      "",
      rowsPerPageComandas,
      pageFixComandas,
      ""
    );
    if (objResponse.ok) {
      setDataComandas(objResponse.data);
      // setVerTablaComandas(false);
    } else {
      setDataComandas([]);
      setAlertMensaje({
        open: true,
        message: objResponse.message || "No se encontraron menús.",
        alertType: "warning",
      });
    }
  };

  const onFiltrarTipo = (tipo) => {
    if (tipo === "Todos") {
      setMesasFiltradas(mesas);
    } else {
      setMesasFiltradas(mesas.filter((m) => m.tipo_de_mesa === tipo));
    }
  };

  useEffect(() => {
    cargarMesas(buscar);
    // eslint-disable-next-line
  }, [buscar, rowsPerPage, pageFix]);

  useEffect(() => {
    cargarComandas();
    // eslint-disable-next-line
  }, [rowsPerPageComandas, pageFixComandas]);

  /**
   * AGREGAR LAS COMANDAS NUEVAS.
   *
   * @param {Array} comandaArray Array de objetos de comandas.
   * @public
   */
  const addIngreso = async (comandaArray, onUpdate) => {
    for (const obj of comandaArray) {
      let objRespuesta = await addComanda({
        ...obj,
      });
      console.log("objRespuestaaaa: ", objRespuesta);
      if (objRespuesta.success) {
        enqueueSnackbar("Se agregó correctamente la comanda.", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else {
        enqueueSnackbar(objRespuesta.msg || "Error al crear la comanda.", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      }
    }
    setVerForm(false);
    if (typeof onUpdate === "function") onUpdate();
  };

  // Esta función será llamada desde el botón
  window.mostrarTablaComandas = () => setVerTablaComandas(true);

  // Columnas para la tabla de comandas
  const columnsComandas = [
    { id: "id_comanda", label: "ID" },
    { id: "nombreMesa", label: "Mesa" },
    { id: "nombreMenu", label: "Menú" },
    { id: "nombreBebida", label: "Bebida" },
    { id: "subtotal", label: "Subtotal" },
    {
      id: "fecha",
      label: "Fecha",
      render: (row) => {
        return row.fecha
          ? dayjs(row.fecha).subtract(6, "hour").format("DD/MM/YYYY HH:mm")
          : "";
      },
    },
    { id: "observacion", label: "Observación" },
    { id: "estado", label: "Estado" },
    { id: "total", label: "Total" },
    { id: "tipo_pago", label: "Tipo de pago" },
  ];

  const toggleTablaComandas = () => {
    setVerTablaComandas((prev) => !prev);
  };

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
                toggleTablaComandas={toggleTablaComandas}
                mostrarTablaComandas={verTablaComandas}
              />
              <VistaComandas
                mesas={mesasFiltradas}
                loading={loading}
                dataComandas={dataComandas}
                onUpdate={() => {
                  cargarMesas(buscar);
                  cargarComandas();
                }}
              />
              {verTablaComandas && (
                <TablaComandas
                  data={dataComandas}
                  columns={columnsComandas}
                  rowsPerPage={rowsPerPageComandas}
                  setRowsPerPage={setRowsPerPageComandas}
                  count={dataComandas[0]?.count || 0}
                  pageFix={pageFixComandas}
                  setpageFix={setpageFixComandas}
                  onCerrar={toggleTablaComandas}
                />
              )}
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
            <div>
              <ComandasForm
                onCancelar={() => {
                  setVerForm(false);
                  setSelectedData(null);
                }}
                // fnEditar={edit}
                fnGuardar={(comandaArray) => addIngreso(comandaArray, () => {
                  cargarMesas(buscar);
                  cargarComandas();
                })}
                data={selectedData}
                setData={setSelectedData}
                enqueueSnackbar={enqueueSnackbar}
                onUpdate={() => {
                  cargarMesas(buscar);
                  cargarComandas();
                }}
              />
            </div>
          )}
        </>
      }
    />
  );
}
