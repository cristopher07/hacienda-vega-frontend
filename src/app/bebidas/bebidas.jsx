// src/pages/Bebidas.jsx

import React, { useEffect, useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import MainLayout from "../components/layout/MainLayout";
import { Replay } from "@mui/icons-material";
import Buscar from "../components/modulesComponents/Buscar";
import Listar from "../components/modulesComponents/Listar";
import Confirmation from "../components/modulesComponents/Confirmation";
import FormBebidas from "./bebidaForm";
import { addBebida, deleteBebida, editBebida, getBebidas } from "./services/bebidaService";
import { useSnackbar } from 'notistack';

export default function Bebidas() {
  const [title] = useState("BEBIDAS");
  const [subTitle] = useState(`Gestión de Bebidas`);
  const { enqueueSnackbar } = useSnackbar();
  const [verForm, setVerForm] = useState(false);
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageFix, setpageFix] = useState(0);
  const [buscar, setBuscar] = useState("");
  const [alertMessage, setAlertMensaje] = useState({ open: false, message: "", alertType: "info" });
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    cargarBebidas(buscar);
  }, [buscar, rowsPerPage, pageFix]);

  const cargarBebidas = async (busqueda) => {
    try {
      const objResponse = await getBebidas(busqueda, rowsPerPage, pageFix, '');
      if (objResponse.valid) {
        setData(objResponse.data);
      } else {
        setData([]);
        setAlertMensaje({
          open: true,
          message: objResponse.message || "No se encontraron bebidas.",
          alertType: "warning",
        });
      }
    } catch (error) {
      setAlertMensaje({ open: true, message: "Error al cargar bebidas", alertType: "error" });
    }
  };

  const addBebidas = async (obj) => {
    const res = await addBebida(obj);
    if (res.valid) {
      enqueueSnackbar("Se agregó correctamente la bebida.", { variant: "success" });
      cargarBebidas(buscar);
      setVerForm(false);
    } else {
      enqueueSnackbar(res.message || "Error al crear bebida.", { variant: "error" });
    }
  };

  const edit = async (obj) => {
    const res = await editBebida(obj);
    if (res.valid) {
      enqueueSnackbar("Se editó correctamente la bebida.", { variant: "success" });
      cargarBebidas(buscar);
      setVerForm(false);
      setSelectedData(null);
    } else {
      enqueueSnackbar(res.message || "Error al editar bebida.", { variant: "error" });
    }
  };

  const deleteBebidas = async (obj) => {
    const res = await deleteBebida(obj.id_bebida);
    if (res.valid) {
      enqueueSnackbar("Se eliminó correctamente la bebida.", { variant: "success" });
      cargarBebidas(buscar);
      setOpenDelete(false);
      setSelectedData(null);
    } else {
      enqueueSnackbar(res.message || "Error al eliminar bebida.", { variant: "error" });
    }
  };

  const columns = [
    { id: "id_bebida", label: "ID" },
    { id: "tipo_bebida", label: "Tipo de Bebida" },
    { id: "descripcion", label: "Descripción" },
    { id: "precio", label: "Precio" },
    {
      id: "actions",
      label: "Acciones",
      minWidth: 130,
      align: "center",
      actions: [
        {
          name: "editar",
          iconName: "Edit",
          toolTip: "Editar Registro",
          onClick: (e, data) => {
            setSelectedData(data);
            setVerForm(true);
          },
        },
        {
          name: "eliminar",
          iconName: "Delete",
          toolTip: "Eliminar Registro",
          onClick: (e, data) => {
            setSelectedData(data);
            setOpenDelete(true);
          },
        },
      ],
    },
  ];

  return (
    <MainLayout title={title} subtitle={subTitle}
      meta={verForm && (
        <div>
          <Button variant="contained" color="primary" type="button"
            onClick={() => { setVerForm(false); setSelectedData(null); }}
            startIcon={<Replay />}>
            REGRESAR
          </Button>
        </div>
      )}
      metacontent={
        <>
          {!verForm ? (
            <>
              <Buscar
                setpageFix={setpageFix}
                onBusqueda={(e) => setBuscar(e)}
                setVerForm={setVerForm}
                buscar={buscar}
              />
              <Listar
                data={data}
                columns={columns}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                count={data[0]?.count || 0}
                pageFix={pageFix}
                setpageFix={setpageFix}
                onEdit={(row) => { setSelectedData(row); setVerForm(true); }}
                onDelete={(row) => { setSelectedData(row); setOpenDelete(true); }}
              />
              <Confirmation
                open={openDelete}
                handleClose={() => setOpenDelete(false)}
                title={"Advertencia"}
                message={`¿Está seguro de eliminar la bebida?: ${selectedData?.descripcion || ""}`}
                handleOk={() => deleteBebidas(selectedData)}
              />
            </>
          ) : (
            <>
              <FormBebidas
                onCancelar={() => { setVerForm(false); setSelectedData(null); }}
                fnEditar={edit}
                fnGuardar={addBebidas}
                data={selectedData}
                setData={setSelectedData}
              />
              <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={alertMessage.open}
                autoHideDuration={4000}
                onClose={() => setAlertMensaje({ ...alertMessage, open: false })}
              >
                <Alert variant="filled" severity={alertMessage.alertType} onClose={() => setAlertMensaje({ ...alertMessage, open: false })}>
                  {alertMessage.message}
                </Alert>
              </Snackbar>
            </>
          )}
        </>
      }
    />
  );
}
