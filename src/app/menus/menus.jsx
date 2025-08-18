// src/pages/Menus.jsx

import React, { useEffect, useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import MainLayout from "../components/layout/MainLayout";
import { Replay } from "@mui/icons-material";
import Buscar from "../components/modulesComponents/Buscar";
import Listar from "../components/modulesComponents/Listar";
import Confirmation from "../components/modulesComponents/Confirmation";
import FormMenus from "./menuForm";
import { addMenu, deleteMenu, editMenu, getMenuByQuery } from "./services/menuService";
import { useSnackbar } from 'notistack';

export default function Menus() {
  const [title] = useState("MENÚS");
  const [subTitle] = useState(`Gestión de Menús`);
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
    cargarMenus(buscar);
  }, [buscar, rowsPerPage, pageFix]);

  const cargarMenus = async (busqueda) => {
    let objResponse = await getMenuByQuery(busqueda, rowsPerPage, pageFix, '');
        if (objResponse.valid) {
          setData(objResponse.data);
        } else {
          setData([]);
          setAlertMensaje({
            open: true,
            message: objResponse.message || "No se encontraron menús.",
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
    const addMenus = async (obj) => {
      let objRespuesta = await addMenu({
        ...obj,
      });
      if (objRespuesta.valid) {
        cargarMenus(buscar);
        enqueueSnackbar("Se agregó correctamente el menú.", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else {
      enqueueSnackbar(objRespuesta.msg || 'Error al crear el menú.', {
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
      let objRespuesta = await editMenu({
        ...obj,
      });
      if (objRespuesta.valid) {
        cargarMenus(buscar);
        enqueueSnackbar("Se editó correctamente el menú.", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else {
        enqueueSnackbar(objRespuesta.msg || 'Error al editar el menú.', {
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
    const deleteMenus = async (index) => {
      let objRespuesta = await deleteMenu(
        index.id_menu,
      );
      if (objRespuesta.valid) {
        cargarMenus(buscar);
        enqueueSnackbar("Se eliminó correctamente el menú.", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else {
        enqueueSnackbar(objRespuesta.msg || 'Error al eliminar el menú.', {
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
    { id: "id_menu", label: "ID" },
    { id: "tipo_menu", label: "Tipo de Menú" },
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
                                  message={`¿Está seguro de eliminar el menú?: ${
                                    selectedData ? selectedData.descripcion : ""
                                  }`}
                                  handleOk={() => { deleteMenus(selectedData); setOpenDelete(false); }}
                                />
            </>
          ) : (
            <>
              <FormMenus
                onCancelar={() => { setVerForm(false); setSelectedData(null); }}
                fnEditar={edit}
                fnGuardar={addMenus}
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
