
import React, { useEffect, useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import MainLayout from "../components/layout/MainLayout";
import { Replay } from "@mui/icons-material";
import Buscar from "../components/modulesComponents/Buscar";
import Listar from "../components/modulesComponents/Listar";
import Confirmation from "../components/modulesComponents/Confirmation";

import { useSnackbar } from 'notistack';
import FormInventarios from "./solicitudesForms";
import { addInventario, addSolicitudes, deleteInventario, deleteSolicitudes, editInventario, editSolicitudes, getInventarioByQuery, getSolicitudesByQuery } from "./services/solicitudesServices";
import FormSolicitudes from "./solicitudesForms";

export default function Solicitudes() {
  const [title] = useState("SOLICITUDES");
  const [subTitle] = useState(`Gestión de Solicitudes`);
  const { enqueueSnackbar } = useSnackbar();
  /** Variable para la lógica de visualización del formulariom lista y busqueda */
  const [verForm, setVerForm] = useState(false);

  /** Variable para el manejo de la información de la tabla */
  const [data, setData] = useState([]);
  console.log("dataa: ", data);

  /** Variable para la seleccion del objeto en la Row*/
  const [selectedData, setSelectedData] = useState();

  /** Variables para la paginacion y busqueda de la tabla*/
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [pageFix, setpageFix] = useState(0);

  const [buscar, setBuscar] = useState("");

  const [alertMessage, setAlertMensaje] = useState({
    open: false,
    message: "",
    alertType: "info",
  });
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    // Cargar los datos al iniciar el componente
    getSolicitudAll(buscar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buscar, rowsPerPage, pageFix]);

  const handleClose = () => {
    setAlertMensaje({
      open: false,
      message: "",
      alertType: "info",
    });
  };

  const getSolicitudAll = async (busqueda) => {
    let objResponse = await getSolicitudesByQuery(busqueda, rowsPerPage, pageFix, '');
    if (objResponse.valid) {
      setData(objResponse.data);
    } else {
      setData([]);
      setAlertMensaje({
        open: true,
        message: objResponse.message || "No se encontraron solicitudes.",
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
  const addSolicitud = async (obj) => {
    let objRespuesta = await addSolicitudes({
      ...obj,
    });
    if (objRespuesta.valid) {
      getSolicitudAll(buscar);
      enqueueSnackbar("Se agregó correctamente la solicitud.", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } else {
      enqueueSnackbar(objRespuesta.msg || 'Error al crear la solicitud.', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
        horizontal: 'right',
      },
    });
  }
    setVerForm(false);
  };

  /**
   * EDITAR LOS COLORES ACTIVOS.
   *
   * @param {null} null No tiene Parametros.
   * @public
   */
  const edit = async (obj) => {
    let objRespuesta = await editSolicitudes({
      ...obj,
    });
    if (objRespuesta.valid) {
      getSolicitudAll(buscar);
      enqueueSnackbar("Se editó correctamente la solicitud.", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } else {
      enqueueSnackbar(objRespuesta.msg || 'Error al editar la solicitud.', {
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

  /**
   * ELIMINA EL COLOR SEGUN VALIDACIONES REALIZADAS.
   *
   * @param {int} index Id del período a eliminar
   * @return {alertMessage} Mensaje de respuesta correcta o error
   * @public
   */
  const deleteSolicitud = async (index) => {
    let objRespuesta = await deleteSolicitudes(
      index.id_solicitud,
    );
    if (objRespuesta.valid) {
      getSolicitudAll(buscar);
      enqueueSnackbar("Se eliminó correctamente la solicitud.", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } else {
      enqueueSnackbar(objRespuesta.msg || 'Error al eliminar la solicitud.', {
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
    {
      id: "id_solicitud",
      label: "ID",
    },
    {
      id: "fecha_solicitud",
      label: "Fecha Solicitud",
    },
     {
      id: "nombreUsuario",
      label: "Nombre Usuario",
    },
      {
      id: "nombreArea",
      label: "Nombre Área",
    },
    {
      id: "detalle",
      label: "Detalle",
    },
      {
      id: "monto",
      label: "Monto",
    },
      {
      id: "documento",
      label: "Documento",
    },
     {
      id: "fecha_revision",
      label: "Fecha Revisión",
    },
     {
      id: "estado",
      label: "Estado",
    },
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
          // canRender: () => ACCION_MODIFICAR === true ? true : false,
          //disabled: true,
          onClick: (e, data) => {
            setSelectedData(data);
            setVerForm(true);
          },
        },
        {
          name: "eliminar",
          iconName: "Delete",
          toolTip: "Eliminar Registro",
          // canRender: () => ACCION_ELIMINAR === true ? true : false,
          //disabled: true,
          onClick: (e, data) => {
            setOpenDelete(true);
            setSelectedData(data);
          },
        },
      ],
    },
  ];

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
                setSelectedData();
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
              <Buscar
                setpageFix={setpageFix}
                onBusqueda={(e) => {
                  setBuscar(e);
                }}
                setVerForm={setVerForm}
                buscar={buscar}
              />
              <Listar
                data={data}
                columns={columns}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                count={data[0]?.count === undefined ? 0 : data[0].count}
                pageFix={pageFix}
                setpageFix={setpageFix}
                onEdit={(row) => {
                  setSelectedData(row);
                  setVerForm(true);
                }}
                onDelete={(row) => {
                  setSelectedData(row);
                  setOpenDelete(true);
                }}
              />
                 <Confirmation
                    open={openDelete}
                    handleClose={() => setOpenDelete(false)}
                    title={"Advertencia"}
                    message={`¿Está seguro de eliminar el Producto?: ${
                      selectedData ? selectedData.producto : ""
                    }`}
                    handleOk={() => { deleteSolicitud(selectedData); setOpenDelete(false); }}
                  />
            </>
          ) : (
            <>
              <FormSolicitudes
              onCancelar={(e) => {
                setVerForm(e);
                setSelectedData();
              }}
              fnEditar={edit}
              fnGuardar={addSolicitud}
              data={selectedData}
              setData={setSelectedData}
              enqueueSnackbar={enqueueSnackbar}
              />
               <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={alertMessage.open}
                autoHideDuration={4000}
                onClose={handleClose}
              >
                <Alert
                  variant="filled"
                  severity={alertMessage.alertType}
                  onClose={handleClose}
                >
                  {alertMessage.message}
                </Alert>
              </Snackbar>
            </>
          )}
        </>
      }
    >
      {/* Aquí podrías renderizar children, si MainLayout los soporta */}
    </MainLayout>
  );
}
