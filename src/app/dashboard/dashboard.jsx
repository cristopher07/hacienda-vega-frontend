

import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import dayjs from "dayjs";
import 'dayjs/locale/es';

import { getIngresoByQuery } from "./services/DashboardServices";
import VistaIngresos from "./vistadashboard";

export default function Ingresos() {

  const [title] = useState("DASHBOARD PRINCIPAL");
  const [subTitle] = useState(`Página Principal Sistema Hacienda La Vega`);

  const [totalIngresoHotel, setTotalIngresoHotel] = useState(0);
  const [totalIngresoPiscinas, setTotalIngresoPiscinas] = useState(0);
  const [totalIngresoGeneral, setTotalIngresoGeneral] = useState(0);
  const [mesActual, setMesActual] = useState('');

  dayjs.locale('es');

  useEffect(() => {
    cargarTotales();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cargarTotales = async () => {

    let objResponse = await getIngresoByQuery("", 9999, 0, "");

    if (objResponse.valid) {

      const hoy = dayjs();
      setMesActual(hoy.format("MMMM"));

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
    }
  };

  return (
    <MainLayout
      title={title}
      subtitle={subTitle}
      metacontent={
        <>
          <VistaIngresos
            totalIngresoHotel={totalIngresoHotel}
            totalIngresoPiscinas={totalIngresoPiscinas}
            totalIngresoGeneral={totalIngresoGeneral}
            mesActual={mesActual}
          />
        </>
      }
    />
  );
}
