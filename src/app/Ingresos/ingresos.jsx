// src/pages/Bebidas.jsx

import React, { useEffect, useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import MainLayout from "../components/layout/MainLayout";
import { Replay } from "@mui/icons-material";
import Buscar from "../components/modulesComponents/Buscar";
import Listar from "../components/modulesComponents/Listar";
import Confirmation from "../components/modulesComponents/Confirmation";
import dayjs from "dayjs";
import 'dayjs/locale/es';
import {
  createIngreso,
  deleteIngreso,
  editIngreso,
  getIngresoByQuery,
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
  console.log("selectedData--- editar: ", selectedData);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageFix, setpageFix] = useState(0);
  const [buscar, setBuscar] = useState("");
  const [alertMessage, setAlertMensaje] = useState({
    open: false,
    message: "",
    alertType: "info",
  });
  const [totalIngresoHotel, setTotalIngresoHotel] = useState(0);
  const [totalIngresoPiscinas, setTotalIngresoPiscinas] = useState(0);
  const [totalIngresoGeneral, setTotalIngresoGeneral] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [mesActual, setMesActual] = useState('');
  dayjs.locale('es');
  useEffect(() => {
    cargarIngresos(buscar);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buscar, rowsPerPage, pageFix]);

  const cargarIngresos = async (busqueda) => {
    let objResponse = await getIngresoByQuery(
      busqueda,
      rowsPerPage,
      pageFix,
      ""
    );
    if (objResponse.valid) {
      setData(objResponse.data);
      // Calcular totales del mes actual
      const hoy = dayjs();
      setMesActual(hoy.locale('es').format('MMMM'));
      const ingresosMesActual = objResponse.data.filter(item =>
        dayjs(item.fecha).month() === hoy.month() &&
        dayjs(item.fecha).year() === hoy.year()
      );
      const totalHotel = ingresosMesActual
        .filter(item => item.nombreArea === "Hotel")
        .reduce((acc, curr) => acc + Number(curr.monto), 0);
      const totalPiscina = ingresosMesActual
        .filter(item => item.nombreArea === "Piscina")
        .reduce((acc, curr) => acc + Number(curr.monto), 0);
      const totalGeneral = ingresosMesActual
        .reduce((acc, curr) => acc + Number(curr.monto), 0);
      setTotalIngresoHotel(totalHotel);
      setTotalIngresoPiscinas(totalPiscina);
      setTotalIngresoGeneral(totalGeneral);
    } else {
      console.log("objResponse", objResponse);
      setData([]);
      setAlertMensaje({
        open: true,
        message: objResponse.message || "No se encontraron ingresos.",
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
  const addIngreso = async (obj) => {
    let objRespuesta = await createIngreso({
      ...obj,
    });
    if (objRespuesta.valid) {
      cargarIngresos(buscar);
      enqueueSnackbar("Se agregó correctamente su ingreso.", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } else {
      console.log("errorrr", objRespuesta);
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
    let objRespuesta = await editIngreso({
      ...obj,
    });
    if (objRespuesta.valid) {
      cargarIngresos(buscar);
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
  const deleteIng = async (index) => {
    let objRespuesta = await deleteIngreso(index.id_ingreso);
    if (objRespuesta.valid) {
      cargarIngresos(buscar);
      enqueueSnackbar("Se eliminó correctamente el ingreso.", {
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
    { id: "id_ingreso", label: "ID" },
    { id: "nombreArea", label: "Nombre Área" },
    { id: "descripcion", label: "Descripción Ingreso" },
    { id: "monto", label: "Precio" },
    { id: "metodo", label: "Método" },
    { id: "codigo_comprobante", label: "Comprobante" },
    {
      id: "fecha",
      label: "Fecha",
      render: (row) => dayjs(row.fecha).format("DD/MM/YYYY"),
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
                mesActual={mesActual}
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
                message={`¿Está seguro de eliminar el ingreso?: Ingreso # ${
                  selectedData ? selectedData.id_ingreso : ""
                }`}
                handleOk={() => {
                  deleteIng(selectedData);
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
                fnGuardar={addIngreso}
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
