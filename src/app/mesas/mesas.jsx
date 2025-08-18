// src/pages/Mesas.jsx

import React, { useEffect, useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import MainLayout from "../components/layout/MainLayout";
import { Replay } from "@mui/icons-material";
import Buscar from "../components/modulesComponents/Buscar";
import Listar from "../components/modulesComponents/Listar";
import Confirmation from "../components/modulesComponents/Confirmation";
import FormMesas from "./mesaForm";
import { addMesa, deleteMesa, editMesa, getMesaByQuery } from "./services/mesaService";
import { useSnackbar } from 'notistack';

export default function Mesas() {
  const [title] = useState("MESAS");
  const [subTitle] = useState(`Gestión de Mesas`);
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
    cargarMesas(buscar);
  }, [buscar, rowsPerPage, pageFix]);

  const cargarMesas = async (busqueda) => {
    let objResponse = await getMesaByQuery(busqueda, rowsPerPage, pageFix, '');
        if (objResponse.valid) {
          setData(objResponse.data);
        } else {
          setData([]);
          setAlertMensaje({
            open: true,
            message: objResponse.message || "No se encontraron mesas.",
            alertType: "warning",
          });
        }
  };

    /**
     * AGREGAR LOS COLORES NUEVOS.
     *
     * @param {null} null No tiene Parametros.
     * @public
     */
    const addMesas = async (obj) => {
      let objRespuesta = await addMesa({
        ...obj,
      });
      if (objRespuesta.valid) {
        cargarMesas(buscar);
        enqueueSnackbar("Se agregó correctamente la mesa.", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else {
      enqueueSnackbar(objRespuesta.msg || 'Error al crear la mesa.', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
    }
      setVerForm(false);
    };
    

  const edit = async (obj) => {
      let objRespuesta = await editMesa({
        ...obj,
      });
      if (objRespuesta.valid) {
        cargarMesas(buscar);
        enqueueSnackbar("Se editó correctamente la mesa.", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else {
        enqueueSnackbar(objRespuesta.msg || 'Error al editar la mesa.', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        });
      }
      setVerForm(false);
      setSelectedData();
    };

  /*const deleteBebidas = async (obj) => {
    const res = await deleteBebida(obj.id_bebida);
    if (res.valid) {
      enqueueSnackbar("Se eliminó correctamente la bebida.", { variant: "success" });
      cargarBebidas(buscar);
      setOpenDelete(false);
      setSelectedData(null);
    } else {
      enqueueSnackbar(res.message || "Error al eliminar bebida p.", { variant: "error" });
    }
  };*/

  /**
     * ELIMINA EL COLOR SEGUN VALIDACIONES REALIZADAS.
     *
     * @param {int} index Id del período a eliminar
     * @return {alertMessage} Mensaje de respuesta correcta o error
     * @public
     */
    const deleteMesas = async (index) => {
      let objRespuesta = await deleteMesa(
        index.id_mesa,
      );
      if (objRespuesta.valid) {
        cargarMesas(buscar);
        enqueueSnackbar("Se eliminó correctamente la mesa.", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else {
        enqueueSnackbar(objRespuesta.msg || 'Error al eliminar la mesa.', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        });
      }
      setVerForm(false);
      setSelectedData();
    };
  

  const columns = [
    { id: "id_mesa", label: "ID" },
    { id: "tipo_de_mesa", label: "Tipo de Mesa" },
    { id: "capacidad", label: "Capacidad" },
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
            setOpenDelete(true);
            setSelectedData(data);
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
                                  message={`¿Está seguro de eliminar la mesa?: ${
                                    selectedData ? selectedData.tipo_de_mesa : ""
                                  }`}
                                  handleOk={() => { deleteMesas(selectedData); setOpenDelete(false); }}
                                />
            </>
          ) : (
            <>
              <FormMesas
                onCancelar={() => { setVerForm(false); setSelectedData(null); }}
                fnEditar={edit}
                fnGuardar={addMesas}
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
