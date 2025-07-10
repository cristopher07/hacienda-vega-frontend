import axios from 'axios';

//// URL ROOT
const URL = process.env.REACT_APP_BACKEND_BASE;

export const getInventarios = async (obj, rowsPerPage, pageFix, pagination) => {
    try {
       const response = await axios.get(URL+`/inventario/all?busqueda=${obj}&rowsPerPage=${rowsPerPage}&page=${pageFix}&paginacion=${pagination}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching inventarios:", error);
        throw error;
    }
};

export const getInventarioByQuery = async (obj, rowsPerPage, pageFix, pagination) => {
    try {
       const response = await axios.get(URL+`/inventario/query?busqueda=${obj}&rowsPerPage=${rowsPerPage}&page=${pageFix}&paginacion=${pagination}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching inventarios:", error);
        throw error;
    }
};

export const addInventario = async (obj) => {
    try {
        const response = await axios.post(URL + '/inventario/add', obj);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editInventario = async (obj) => {
    try {
        const response = await axios.post(URL + `/inventario/Update/${obj.id_inventario}`, obj);
        return response.data;
    } catch (error) {
        console.error("Error editing inventario:", error);
        throw error;
    }
};

export const deleteInventario = async (id) => {
    try {
        let obj = {
            id_inventario: id
        };
        const response = await axios.post(URL +  `/inventario/Delete/${id}`,obj);
        return response.data;
    } catch (error) {
        console.error("Error deleting inventario:", error);
        throw error;
    }
};