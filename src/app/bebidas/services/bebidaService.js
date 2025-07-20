import axios from 'axios';

//// URL ROOT
const URL = process.env.REACT_APP_BACKEND_BASE;

export const getBebidas = async (obj, rowsPerPage, pageFix, pagination = 1) => {
    try {
        const response = await axios.get(
            `${URL}/bebidas/all?busqueda=${obj}&rowsPerPage=${rowsPerPage}&page=${pageFix}&paginacion=${pagination}`
        );
        return {
            valid: true,
            data: response.data,
        };
    } catch (error) {
        console.error("Error fetching bebidas:", error);
        return {
            valid: false,
            message: "Error al obtener las bebidas.",
        };
    }
};

//// LISTAR area selects
export const listMarca = async () => {
    const urlMarcas = '/bebidas/all';
    try {
      let respuesta = await axios.get(URL + urlMarcas + '?paginacion=0');
      return respuesta.data;
    } catch (error) {
      return error;
    }
};

export const addBebida = async (obj) => {
    try {
        const response = await axios.post(URL + '/bebidas/add', obj);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editBebida = async (obj) => {
    try {
        const response = await axios.post(URL + `/bebidasUpdate/${obj.id_bebida}`, obj);
        return response.data;
    } catch (error) {
        console.error("Error editing bebida:", error);
        throw error;
    }
};

export const deleteBebida = async (id) => {
    try {
        let obj = {
            id_bebida: id
        };
        const response = await axios.post(URL +  `bebidasDelete/${id}`,obj);
        return response.data;
    } catch (error) {
        console.error("Error deleting bebida:", error);
        throw error;
    }
};