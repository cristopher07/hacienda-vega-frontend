import axios from 'axios';

//// URL ROOT
const URL = process.env.REACT_APP_BACKEND_BASE;

export const getHabitaciones = async (obj, rowsPerPage, pageFix, pagination = 1) => {
    try {
       const response = await axios.get(URL+`/habitaciones/all?busqueda=${obj}&rowsPerPage=${rowsPerPage}&page=${pageFix}&paginacion=${pagination}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching habitacion:", error);
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

export const getHabitacionByQuery = async (obj, rowsPerPage, pageFix, pagination) => {
    try {
       const response = await axios.get(URL+`/habitaciones/query?busqueda=${obj}&rowsPerPage=${rowsPerPage}&page=${pageFix}&paginacion=${pagination}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching habitacion:", error);
        throw error;
    }
};

export const addHabitacion = async (obj) => {
    try {
        const response = await axios.post(URL + '/habitaciones/add', obj);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editHabitacion = async (obj) => {
    try {
        const response = await axios.post(URL + `/habitaciones/Update/${obj.id_habitacion}`, obj);
        return response.data;
    } catch (error) {
        console.error("Error editing habitacion:", error);
        throw error;
    }
};

export const deleteHabitacion = async (id) => {
    try {
        let obj = {
            id_habitacion: id
        };
        const response = await axios.post(URL +  `/habitaciones/Delete/${id}`,obj);
        return response.data;
    } catch (error) {
        console.error("Error deleting habitacion:", error);
        throw error;
    }
};
