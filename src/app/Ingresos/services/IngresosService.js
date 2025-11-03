import axios from 'axios';

//// URL ROOT
const URL = process.env.REACT_APP_BACKEND_BASE;

export const getIngresos = async (obj, rowsPerPage, pageFix, pagination = 1) => {
    try {
       const response = await axios.get(URL+`/ingresos/all?busqueda=${obj}&rowsPerPage=${rowsPerPage}&page=${pageFix}&paginacion=${pagination}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching ingreso:", error);
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

export const createIngreso = async (obj) => {
    try {
        const response = await axios.post(URL + '/ingresos/add', obj);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editIngreso = async (obj) => {
    try {
        const response = await axios.post(URL + `/ingresos/Update/${obj.id_ingreso}`, obj);
        return response.data;
    } catch (error) {
        console.error("Error editing ingreso:", error);
        throw error;
    }
};

export const deleteIngreso = async (id) => {
    try {
        let obj = {
            id_ingreso: id
        };
        const response = await axios.post(URL +  `/ingresos/Delete/${id}`,obj);
        return response.data;
    } catch (error) {
        console.error("Error deleting ingreso:", error);
        throw error;
    }
};
