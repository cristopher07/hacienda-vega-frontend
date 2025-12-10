import axios from 'axios';

//// URL ROOT
const URL = process.env.REACT_APP_BACKEND_BASE;

export const getSolicitudes = async (obj, rowsPerPage, pageFix, pagination = 1) => {
    try {
       const response = await axios.get(URL+`/solicitudes/all?busqueda=${obj}&rowsPerPage=${rowsPerPage}&page=${pageFix}&paginacion=${pagination}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching solicitudes:", error);
        throw error;
    }
};

//// LISTAR area selects
export const listSolicitudes = async () => {
    const urlUsuario = '/solicitudes/all';
    try {
      let respuesta = await axios.get(URL + urlUsuario + '?paginacion=0');
      return respuesta.data;
    } catch (error) {
      return error;
    }
};

export const getSolicitudesByQuery = async (obj, rowsPerPage, pageFix, pagination) => {
    try {
       const response = await axios.get(URL+`/solicitudes/query?busqueda=${obj}&rowsPerPage=${rowsPerPage}&page=${pageFix}&paginacion=${pagination}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching solicitudes:", error);
        throw error;
    }
};

export const addSolicitudes = async (obj) => {
    try {
        const response = await axios.post(URL + '/solicitudes/add', obj);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editSolicitudes = async (obj) => {
    try {
        const response = await axios.post(URL + `/solicitudes/Update/${obj.id_solicitud}`, obj);
        return response.data;
    } catch (error) {
        console.error("Error editing solicitudes:", error);
        return {
            valid: false,
            msg: error.response?.data?.msg || "Error al editar",
        };
    }
};

export const deleteSolicitudes = async (id) => {
    try {
        let obj = {
            id_solicitud: id
        };
        const response = await axios.post(URL +  `/solicitudes/Delete/${id}`,obj);
        return response.data;
    } catch (error) {
        console.error("Error deleting solicitudes:", error);
        throw error;
    }
};