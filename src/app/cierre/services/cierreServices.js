import axios from 'axios';

//// URL ROOT
const URL = process.env.REACT_APP_BACKEND_BASE;

export const getResumenCaja = async (obj) => {
  const response = await axios.post(
    `${URL}/cierres/resumen`,
    obj
  );
  return response.data;
};


export const crearCierreCaja = async (obj) => {
  const res = await axios.post(URL + "/cierres/add", obj);
  return res.data;
};


export const listarCierres = async () => {
  try {
    const response = await axios.get(URL + "/cierres/all");
    return response.data;
  } catch (error) {
    console.error("Error listando cierres", error);
    throw error;
  }
};
