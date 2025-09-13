import React, { useEffect, useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import MainLayout from "../components/layout/MainLayout";
import { Replay } from "@mui/icons-material";
import Buscar from "../components/modulesComponents/Buscar";
import Listar from "../components/modulesComponents/Listar";
import Confirmation from "../components/modulesComponents/Confirmation";
import FormBrazalete from "./brazaleteForm";
import { addBrazalete, deleteBrazalete, editBrazalete, getBrazaletes } from "./services/brazaletesService";
import { useSnackbar } from 'notistack';

export default function Brazaletes() {
  const [title] = useState("BRAZALETES");
  const [subTitle] = useState(`Gestión de Brazaletes`);
  const { enqueueSnackbar } = useSnackbar();
  /** Variable para la lógica de visualización del formulariom lista y busqueda */
  const [verForm, setVerForm] = useState(false);

  /** Variable para el manejo de la información de la tabla */
  const [data, setData] = useState([]);

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
    getBrazaleteAll(buscar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buscar, rowsPerPage, pageFix]);

  const handleClose = () => {
    setAlertMensaje({
      open: false,
      message: "",
      alertType: "info",
    });
  };

  const getBrazaleteAll = async (busqueda) => {
    let objResponse = await getBrazaletes(busqueda, rowsPerPage, pageFix, '');
    if (objResponse.valid) {
      setData(objResponse.data);
    } else {
      setData([]);
      setAlertMensaje({
        open: true,
        message: objResponse.message || "No se encontraron brazaletes.",
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
  const addBrazaletes = async (obj) => {
    let objRespuesta = await addBrazalete({
      ...obj,
    });
    if (objRespuesta.valid) {
      getBrazaleteAll(buscar);
      enqueueSnackbar("Se agregó correctamente el brazalete.", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } else {
    enqueueSnackbar(objRespuesta.msg || 'Error al crear el color.', {
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
    let objRespuesta = await editBrazalete({
      ...obj,
    });
    if (objRespuesta.valid) {
      getBrazaleteAll(buscar);
      enqueueSnackbar("Se editó correctamente el brazalete.", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } else {
      enqueueSnackbar(objRespuesta.msg || 'Error al editar el brazalete.', {
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
  const deleteBrazaletes = async (index) => {
    let objRespuesta = await deleteBrazalete(
      index.id_brazalete,
    );
    if (objRespuesta.valid) {
      getBrazaleteAll(buscar);
      enqueueSnackbar("Se eliminó correctamente el brazalete.", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } else {
      enqueueSnackbar(objRespuesta.msg || 'Error al eliminar el brazalete.', {
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
      id: "id_brazalete",
      label: "ID",
    },
    {
      id: "tipo_brazalete",
      label: "Tipo de Brazalete",
    },
    {
      id: "precio",
      label: "Precio",
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
                    message={`¿Está seguro de eliminar el brazalete?: ${
                      selectedData ? selectedData.tipo_brazalete : ""
                    }`}
                    handleOk={() => { deleteBrazaletes(selectedData); setOpenDelete(false); }}
                  />
            </>
          ) : (
            <>
                          <FormBrazalete
                            onCancelar={() => { setVerForm(false); setSelectedData(null); }}
                            fnEditar={edit}
                            fnGuardar={addBrazaletes}
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
    >
      {/* Aquí podrías renderizar children, si MainLayout los soporta */}
    </MainLayout>
  );
}
