import React, { useEffect, useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import MainLayout from "../components/layout/MainLayout";
import { Replay } from "@mui/icons-material";
import Buscar from "../components/modulesComponents/Buscar";
import Listar from "../components/modulesComponents/Listar";
import Confirmation from "../components/modulesComponents/Confirmation";

import { useSnackbar } from "notistack";
import FormSolicitudes from "./solicitudesForms";
import {
  addSolicitudes,
  deleteSolicitudes,
  editSolicitudes,
  getSolicitudesByQuery,
} from "./services/solicitudesServices";

export default function Solicitudes() {
  const [title] = useState("SOLICITUDES");
  const [subTitle] = useState(`Gestión de Solicitudes`);
  const { enqueueSnackbar } = useSnackbar();

  const [verForm, setVerForm] = useState(false);
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageFix, setpageFix] = useState(0);
  const [buscar, setBuscar] = useState("");

  const rol = localStorage.getItem("rol");
const usuarioLS = JSON.parse(localStorage.getItem("usuario"));
const usuarioLog = usuarioLS?.data?.nombre;
const idUsuarioLogueado = usuarioLS?.data?.id_usuario;

console.log("Idusuariologeado: ", idUsuarioLogueado);
console.log("UsuarioLs: ", usuarioLog);
console.log("Rol logueado: ", rol);


  const [alertMessage, setAlertMensaje] = useState({
    open: false,
    message: "",
    alertType: "info",
  });

  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    getSolicitudAll(buscar);
  }, [buscar, rowsPerPage, pageFix]);


  const getSolicitudAll = async (busqueda) => {
    console.log("entra en getsolicitudAll");
    let objResponse = await getSolicitudesByQuery(
      busqueda,
      rowsPerPage,
      pageFix,
      ''
    );

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
   * AGREGAR SOLICITUD
   */
  const addSolicitud = async (obj) => {
    console.log("ingreso a guardar nuevo");
    const res = await addSolicitudes(obj);
        if (res.valid) {
          enqueueSnackbar("Se agregó correctamente la solicitud.", { variant: "success" });
          console.log("se agrega y deberia de entrar a refrescar");
          getSolicitudAll(buscar);
          console.log("ya paso la seccion de refrescar");
          setVerForm(false);
        } else {
          enqueueSnackbar(res.message || "Error al crear solicitud.", { variant: "error" });
        }
  };

  /**
   * EDITAR SOLICITUD
   */
  const edit = async (obj) => {
    console.log("ingreso a editar");
    const objRespuesta = await editSolicitudes({ ...obj });
console.log("se ejecuta el edit del services y trae esta respueta: ", objRespuesta);
    if (objRespuesta.valid) {
       console.log("se agrega y deberia de entrar a refrescar");
          getSolicitudAll(buscar);
          console.log("ya paso la seccion de refrescar");

      enqueueSnackbar("Se editó correctamente la solicitud.", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } else {
      enqueueSnackbar(objRespuesta.msg || "Error al editar la solicitud.", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    }

    setVerForm(false);
    setSelectedData();
  };

  /**
   * ELIMINAR SOLICITUD
   */
  const deleteSolicitud = async (index) => {
    let objRespuesta = await deleteSolicitudes(index.id_solicitud);

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
      enqueueSnackbar(objRespuesta.msg || "Error al eliminar la solicitud.", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    }
    setVerForm(false);
    setSelectedData();
  };

  const columns = [
    { id: "id_solicitud", label: "ID" },
    { id: "fecha_solicitud", label: "Fecha Solicitud" },
    { id: "nombreUsuario", label: "Nombre Usuario" },
    { id: "nombreArea", label: "Nombre Área" },
    { id: "detalle", label: "Detalle" },
    { id: "monto", label: "Monto" },
    { id: "documento", label: "Documento" },
    { id: "fecha_revision", label: "Fecha Revisión" },
    { id: "estado", label: "Estado" },
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
        onClick: (e, row) => {
          const esAdmin =
            rol === "admin" || rol === "superAdmin";

          const esPropietario =
            row.id_usuario === idUsuarioLogueado;

          console.log("==== VALIDACIÓN EDITAR ====");
          console.log("Rol:", rol);
          console.log("ID usuario logueado:", idUsuarioLogueado);
          console.log("ID usuario solicitud:", row.id_usuario);
          console.log("Es admin:", esAdmin);
          console.log("Es propietario:", esPropietario);

          if (!esAdmin && !esPropietario) {
            enqueueSnackbar(
              "No puedes editar solicitudes de otros usuarios",
              {
                variant: "warning",
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
              }
            );
            return;
          }

          setSelectedData(row);
          setVerForm(true);
        },
      },
        {
        name: "eliminar",
        iconName: "Delete",
        toolTip: "Eliminar Registro",
        onClick: (e, row) => {
          const esAdmin =
            rol === "admin" || rol === "superAdmin";

          const esPropietario =
            row.id_usuario === idUsuarioLogueado;

          if (!esAdmin && !esPropietario) {
            enqueueSnackbar(
              "No puedes eliminar solicitudes de otros usuarios",
              {
                variant: "warning",
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
              }
            );
            return;
          }

          setSelectedData(row);
          setOpenDelete(true);
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
                setSelectedData(null);
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
  onEdit={(row) => {
  const esAdmin = rol === "admin" || rol === "superAdmin";
  const esPropietario = row.id_usuario === idUsuarioLogueado;

  console.log("==== VALIDACIÓN EDITAR ====");
  console.log("Rol:", rol);
  console.log("ID usuario logueado:", idUsuarioLogueado);
  console.log("ID usuario solicitud:", row.id_usuario);
  console.log("Es admin:", esAdmin);
  console.log("Es propietario:", esPropietario);

  if (!esAdmin && !esPropietario) {
    enqueueSnackbar("No puedes editar solicitudes de otros usuarios", {
      variant: "warning",
      anchorOrigin: { vertical: "bottom", horizontal: "right" },
    });
    return;
  }

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
                message={`¿Está seguro de eliminar la Solicitud?: ${
                  selectedData ? selectedData.id_solicitud : ""
                }`}
                handleOk={() => {
                  deleteSolicitud(selectedData);
                  setOpenDelete(false);
                }}
              />
            </>
          ) : (
            <>
              <FormSolicitudes
                onCancelar={() => {
                  setVerForm(false);
                  setSelectedData(null);
                }}
                fnEditar={edit}
                fnGuardar={addSolicitud}
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
