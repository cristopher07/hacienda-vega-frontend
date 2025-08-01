import axios from 'axios';

//// URL ROOT
const URL = process.env.REACT_APP_BACKEND_BASE;

export const getMenus = async (obj, rowsPerPage, pageFix, pagination = 1) => {
    try {
       const response = await axios.get(URL+`/menus/all?busqueda=${obj}&rowsPerPage=${rowsPerPage}&page=${pageFix}&paginacion=${pagination}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching menu:", error);
        throw error;
    }
};

//// LISTAR area selects
export const listMarca = async () => {
    const urlMarcas = '/menus/all';
    try {
      let respuesta = await axios.get(URL + urlMarcas + '?paginacion=0');
      return respuesta.data;
    } catch (error) {
      return error;
    }
};

export const getMenuByQuery = async (obj, rowsPerPage, pageFix, pagination) => {
    try {
       const response = await axios.get(URL+`/menus/query?busqueda=${obj}&rowsPerPage=${rowsPerPage}&page=${pageFix}&paginacion=${pagination}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching menus:", error);
        throw error;
    }
};

export const addMenu = async (obj) => {
    try {
        const response = await axios.post(URL + '/menus/add', obj);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editMenu = async (obj) => {
    try {
        const response = await axios.post(URL + `/menus/Update/${obj.id_menu}`, obj);
        return response.data;
    } catch (error) {
        console.error("Error editing menus:", error);
        throw error;
    }
};

export const deleteMenu = async (id) => {
    try {
        let obj = {
            id_menu: id
        };
        const response = await axios.post(URL +  `/menus/Delete/${id}`,obj);
        return response.data;
    } catch (error) {
        console.error("Error deleting menus:", error);
        throw error;
    }
};
