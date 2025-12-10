

import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import dayjs from "dayjs";
import 'dayjs/locale/es';
import { getDashboardResumen} from "./services/DashboardServices"
import DashboardBienvenida from "./vistadashboard";
import VistaIngresos from "./vistaIngresos"

export default function Ingresos() {

  const [title] = useState("DASHBOARD PRINCIPAL");
  const [subTitle] = useState(`Página Principal Sistema Hacienda La Vega`);

   const [data, setData] = useState(null);
   const rol = localStorage.getItem("rol");
   console.log("rol: ", rol);
   

  dayjs.locale('es');

  useEffect(() => {
    cargarDashboard();
  }, []);

  const cargarDashboard = async () => {
    const res = await getDashboardResumen();
    if(res.valid){
      setData(res.data);
    }
  }

  return (
    <MainLayout
      title={title}
      subtitle={subTitle}
      metacontent={
        <>
          {/* Bienvenida */}
      <DashboardBienvenida />

{(rol === "admin" || rol === "superAdmin") && (
      <VistaIngresos { ...data} />
)}
        </>
      }
    />
  );
}
