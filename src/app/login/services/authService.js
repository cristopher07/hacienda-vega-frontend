import axios from 'axios';

// URL ROOT - usar la misma configuración que otros servicios
const URL = process.env.REACT_APP_BACKEND_BASE || 'http://localhost:3001/hv';

/**
 * Servicio de autenticación para login de usuarios
 * @param {Object} credentials - Credenciales de usuario
 * @param {string} credentials.usuario - Nombre de usuario
 * @param {string} credentials.password - Contraseña del usuario
 * @returns {Promise} Respuesta del servidor
 */
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${URL}/usuarios/login`, {
            usuario: credentials.usuario,
            password: credentials.password
        });
        
        // Si el login es exitoso, guardar el token en localStorage si existe
        if (response.data && response.data.token) {
            localStorage.setItem('authToken', response.data.token);
        }
        
        // También guardar información del usuario si existe
        if (response.data && response.data.user) {
            localStorage.setItem('userData', JSON.stringify(response.data.user));
        }
        
        return response.data;
    } catch (error) {
        console.error("Error en login:", error);
        // Lanzar el error para que pueda ser manejado en el componente
        throw error;
    }
};

/**
 * Función para cerrar sesión
 */
export const logoutUser = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
};

/**
 * Función para verificar si el usuario está autenticado
 * @returns {boolean} true si está autenticado, false si no
 */
export const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    return token !== null;
};

/**
 * Función para obtener el token de autenticación
 * @returns {string|null} Token de autenticación o null si no existe
 */
export const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

/**
 * Función para obtener los datos del usuario
 * @returns {Object|null} Datos del usuario o null si no existen
 */
export const getUserData = () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
};

/**
 * Configurar axios para incluir el token en todas las peticiones
 */
export const setupAxiosInterceptors = () => {
    axios.interceptors.request.use(
        (config) => {
            const token = getAuthToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Interceptor para manejar respuestas 401 (no autorizado)
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                // Token expirado o inválido, cerrar sesión
                logoutUser();
                // Redirigir al login si es necesario
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );
};
