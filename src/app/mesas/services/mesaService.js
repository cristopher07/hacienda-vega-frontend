import axios from 'axios';

//// URL ROOT
const URL = process.env.REACT_APP_BACKEND_BASE;

export const getMesas = async (obj, rowsPerPage, pageFix, pagination = 1) => {
    try {
       const response = await axios.get(URL+`/mesas/all?busqueda=${obj}&rowsPerPage=${rowsPerPage}&page=${pageFix}&paginacion=${pagination}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching mesas:", error);
        throw error;
    }
};

//// LISTAR area selects
export const listMarca = async () => {
    const urlMarcas = '/mesas/all';
    try {
      let respuesta = await axios.get(URL + urlMarcas + '?paginacion=0');
      return respuesta.data;
    } catch (error) {
      return error;
    }
};

export const getMesaByQuery = async (obj, rowsPerPage, pageFix, pagination) => {
    try {
       const response = await axios.get(URL+`/mesas/query?busqueda=${obj}&rowsPerPage=${rowsPerPage}&page=${pageFix}&paginacion=${pagination}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching Mesas:", error);
        throw error;
    }
};

export const addMesa = async (obj) => {
    try {
        const response = await axios.post(URL + '/mesas/add', obj);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editMesa = async (obj) => {
    try {
        const response = await axios.post(URL + `/mesas/Update/${obj.id_mesa}`, obj);
        return response.data;
    } catch (error) {
        console.error("Error editing mesas:", error);
        throw error;
    }
};

export const deleteMesa = async (id) => {
    try {
        let obj = {
            id_mesa: id
        };
        const response = await axios.post(URL +  `/mesas/Delete/${id}`,obj);
        return response.data;
    } catch (error) {
        console.error("Error deleting mesa:", error);
        throw error;
    }
};
