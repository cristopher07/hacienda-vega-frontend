import axios from 'axios';

//// URL ROOT
const URL = process.env.REACT_APP_BACKEND_BASE;

export const getUsuarios = async (obj, rowsPerPage, pageFix, pagination) => {
    try {
       const response = await axios.get(URL+`/usuarios/all?busqueda=${obj}&rowsPerPage=${rowsPerPage}&page=${pageFix}&paginacion=${pagination}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching usuarios:", error);
        throw error;
    }
};

//// LISTAR area selects
export const listUsuarios = async () => {
    const urlUsuario = '/usuarios/all';
    try {
      let respuesta = await axios.get(URL + urlUsuario + '?paginacion=0');
      return respuesta.data;
    } catch (error) {
      return error;
    }
};

export const getUsuarioByQuery = async (obj, rowsPerPage, pageFix, pagination) => {
    try {
       const response = await axios.get(URL+`/usuarios/query?busqueda=${obj}&rowsPerPage=${rowsPerPage}&page=${pageFix}&paginacion=${pagination}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching usuarios:", error);
        throw error;
    }
};

export const addUsuario = async (obj) => {
    try {
        const response = await axios.post(URL + '/usuarios/add', obj);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editUsuario = async (obj) => {;
    try {
        const response = await axios.post(URL + `/usuarios/Update/${obj.id_usuario}`, obj);
        return response.data;
    } catch (error) {
        console.error("Error editing usuario:", error);
        throw error;
    }
};

export const deleteUsuario = async (id) => {
    try {
        let obj = {
            id_usuario: id
        };
        const response = await axios.post(URL +  `/usuarios/Delete/${id}`,obj);
        return response.data;
    } catch (error) {
        console.error("Error deleting usuario:", error);
        throw error;
    }
};