import axios from 'axios';

//// URL ROOT
const URL = process.env.REACT_APP_BACKEND_BASE;

export const getAreas = async (obj, rowsPerPage, pageFix, pagination) => {
    try {
       const response = await axios.get(URL+`/areas/all?busqueda=${obj}&rowsPerPage=${rowsPerPage}&page=${pageFix}&paginacion=${pagination}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching areas:", error);
        throw error;
    }
};

export const addArea = async (obj) => {
    try {
        const response = await axios.post(URL + '/areas/add', obj);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editArea = async (obj) => {
    console.log("obj: ", obj);
    try {
        const response = await axios.post(URL + `/areas/Update/${obj.id_area}`, obj);
        return response.data;
    } catch (error) {
        console.error("Error editing area:", error);
        throw error;
    }
};

export const deleteArea = async (id) => {
    console.log("---id: ", id);
    try {
        let obj = {
            id_area: id
        };
        const response = await axios.post(URL +  `/areas/Delete/${id}`,obj);
        return response.data;
    } catch (error) {
        console.error("Error deleting area:", error);
        throw error;
    }
};