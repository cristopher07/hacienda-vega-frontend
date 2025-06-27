import React, { useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import MainLayout from "../components/layout/MainLayout";
import { Replay } from "@mui/icons-material";
import Buscar from "../components/modulesComponents/Buscar";
import Listar from "../components/modulesComponents/Listar";
import Confirmation from "../components/modulesComponents/Confirmation";
import Form from "../components/modulesComponents/Form";

export default function Areas() {
  const [title] = useState("ÁREAS");
  const [subTitle] = useState(`Gestión de Áreas`);

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

  const handleClose = () => {
    setAlertMensaje({
      open: false,
      message: "",
      alertType: "info",
    });
  };

    const columns = [
    {
      id: "id_Area",
      label: "ID",
    },
    {
      id: "nombre",
      label: "Nombre",
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
          iconProps: {
            color: "primary",
             mpIconProps:{
              iconName: 'Editar'
            }
          },
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
          iconProps: {
            color: "error",
             mpIconProps:{
              iconName: 'Eliminar'
            }
          },
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
                    message={`¿Está seguro de eliminar el área?: ${
                      selectedData ? selectedData.descripcion : ""
                    }`}
                    handleOk={() => {}}
                  />
            </>
          ) : (
            <>
              <Form
              onCancelar={(e) => {
                setVerForm(e);
                setSelectedData();
              }}
              // fnEditar={editColor}
              // fnGuardar={addColor}
              data={selectedData}
              setData={setSelectedData}
              formulario={"COLOR"}
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
