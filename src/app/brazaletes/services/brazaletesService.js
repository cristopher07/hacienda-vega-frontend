import axios from 'axios';

//// URL ROOT
const URL = process.env.REACT_APP_BACKEND_BASE;

export const getBrazaletes = async (obj, rowsPerPage, pageFix, pagination) => {
    try {
       const response = await axios.get(URL+`/brazaletes/all?busqueda=${obj}&rowsPerPage=${rowsPerPage}&page=${pageFix}&paginacion=${pagination}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching brazaletes:", error);
        throw error;
    }
};

//// LISTAR area selects
export const lisBrazaletes = async () => {
    const urlMarcas = '/brazaletes/all';
    try {
      let respuesta = await axios.get(URL + urlMarcas + '?paginacion=0');
      return respuesta.data;
    } catch (error) {
      return error;
    }
};

export const addBrazalete = async (obj) => {
    try {
        const response = await axios.post(URL + '/brazaletes/add', obj);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editBrazalete = async (obj) => {
    try {
        const response = await axios.post(URL + `/brazaletes/Update/${obj.id_brazalete}`, obj);
        return response.data;
    } catch (error) {
        console.error("Error editing brazalete:", error);
        throw error;
    }
};

export const deleteBrazalete = async (id) => {
    try {
        let obj = {
            id_brazalete: id
        };
        const response = await axios.post(URL +  `/brazaletes/Delete/${id}`,obj);
        return response.data;
    } catch (error) {
        console.error("Error deleting brazalete:", error);
        throw error;
    }
};