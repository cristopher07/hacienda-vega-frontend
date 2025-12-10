import axios from 'axios';

//// URL ROOT
const URL = process.env.REACT_APP_BACKEND_BASE;

//// LISTAR totales selects
export const getDashboardResumen = async () => {
  const res = await axios.get( URL + "/dashboard/resumen");
  return res.data;
};

export const getIngresos = async (obj, rowsPerPage, pageFix, pagination = 1) => {
    try {
       const response = await axios.get(URL+`/ingresos/all?busqueda=${obj}&rowsPerPage=${rowsPerPage}&page=${pageFix}&paginacion=${pagination}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching ingreso:", error);
        throw error;
    }
};

