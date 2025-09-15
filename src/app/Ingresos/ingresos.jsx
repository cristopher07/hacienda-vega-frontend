// src/pages/Bebidas.jsx

import React, { useEffect, useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import MainLayout from "../components/layout/MainLayout";
import { Replay } from "@mui/icons-material";
import Buscar from "../components/modulesComponents/Buscar";
import Listar from "../components/modulesComponents/Listar";
import Confirmation from "../components/modulesComponents/Confirmation";

import {
  addHabitacion,
  deleteHabitacion,
  editHabitacion,
  getHabitacionByQuery,
} from "./services/IngresosService";
import { useSnackbar } from "notistack";
import FormIngresos from "./ingresosForm";
import VistaIngresos from "./vistaIngresos";

export default function Ingresos() {
  const [title] = useState("INGRESOS");
  const [subTitle] = useState(`Gestión de Ingresos`);
  const { enqueueSnackbar } = useSnackbar();
  const [verForm, setVerForm] = useState(false);
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageFix, setpageFix] = useState(0);
  const [buscar, setBuscar] = useState("");
  const [alertMessage, setAlertMensaje] = useState({
    open: false,
    message: "",
    alertType: "info",
  });
  const [totalIngresoHotel, setTotalIngresoHotel] = useState(1234);
  const [totalIngresoPiscinas, setTotalIngresoPiscinas] = useState(2345);
  const [totalIngresoGeneral, setTotalIngresoGeneral] = useState(2233);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    cargarHabitaciones(buscar);
  }, [buscar, rowsPerPage, pageFix]);

  const cargarHabitaciones = async (busqueda) => {
    let objResponse = await getHabitacionByQuery(
      busqueda,
      rowsPerPage,
      pageFix,
      ""
    );
    if (objResponse.valid) {
      setData(objResponse.data);
    } else {
      setData([]);
      setAlertMensaje({
        open: true,
        message: objResponse.message || "No se encontraron habitaciones.",
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
  const addHabitaciones = async (obj) => {
    let objRespuesta = await addHabitacion({
      ...obj,
    });
    if (objRespuesta.valid) {
      cargarHabitaciones(buscar);
      enqueueSnackbar("Se agregó correctamente la habitación.", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } else {
      enqueueSnackbar(objRespuesta.msg || "Error al crear la habitación.", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    }
    setVerForm(false);
  };

  const edit = async (obj) => {
    let objRespuesta = await editHabitacion({
      ...obj,
    });
    if (objRespuesta.valid) {
      cargarHabitaciones(buscar);
      enqueueSnackbar("Se editó correctamente la habitación.", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } else {
      enqueueSnackbar(objRespuesta.msg || "Error al editar la habitación.", {
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
  const deleteHabitaciones = async (index) => {
    let objRespuesta = await deleteHabitacion(index.id_habitacion);
    if (objRespuesta.valid) {
      cargarHabitaciones(buscar);
      enqueueSnackbar("Se eliminó correctamente la habitación.", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } else {
      enqueueSnackbar(objRespuesta.msg || "Error al eliminar la habitación.", {
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
    { id: "id_habitacion", label: "ID" },
    { id: "tipo_habitacion", label: "Tipo de Habitación" },
    { id: "numero_habitacion", label: "# de Habitación" },
    { id: "huespedes", label: "Cantidad de Huespedes" },
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

              <VistaIngresos
                totalIngresoHotel={totalIngresoHotel}
                totalIngresoPiscinas={totalIngresoPiscinas}
                totalIngresoGeneral={totalIngresoGeneral}
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
                message={`¿Está seguro de eliminar la habitación?: Habitación # ${
                  selectedData ? selectedData.numero_habitacion : ""
                }`}
                handleOk={() => {
                  deleteHabitaciones(selectedData);
                  setOpenDelete(false);
                }}
              />
            </>
          ) : (
            <>
              <FormIngresos
                onCancelar={() => {
                  setVerForm(false);
                  setSelectedData(null);
                }}
                fnEditar={edit}
                fnGuardar={addHabitaciones}
                data={selectedData}
                setData={setSelectedData}
                enqueueSnackbar={enqueueSnackbar}
              />
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
          )}
        </>
      }
    />
  );
}
