import axios from 'axios';

//// URL ROOT
const URL = process.env.REACT_APP_BACKEND_BASE;

export const getComandas = async (obj, rowsPerPage, pageFix, pagination = 1) => {
    try {
       const response = await axios.get(URL+`/comandas/query?busqueda=${obj}&rowsPerPage=${rowsPerPage}&page=${pageFix}&paginacion=${pagination}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching comanda:", error);
        throw error;
    }
};

//// LISTAR area selects
export const listMarca = async () => {
    const urlMarcas = '/habitaciones/all';
    try {
      let respuesta = await axios.get(URL + urlMarcas + '?paginacion=0');
      return respuesta.data;
    } catch (error) {
      return error;
    }
};

export const getIngresoByQuery = async (obj, rowsPerPage, pageFix, pagination) => {
    try {
       const response = await axios.get(URL+`/ingresos/query?busqueda=${obj}&rowsPerPage=${rowsPerPage}&page=${pageFix}&paginacion=${pagination}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching ingreso:", error);
        throw error;
    }
};

export const addComanda = async (obj) => {
    try {
        const response = await axios.post(URL + '/comandas/add', obj);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const updateComandaStates = async (obj) => {
    console.log("---obj update comanda: ", obj);
    try {
        const response = await axios.post(URL + '/comandas/update-state', obj);        
        return response.data;
    } catch (error) {
        throw error;
    }
}


