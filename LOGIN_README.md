# Sistema de Autenticación - Hacienda La Vega

## Configuración del Login

### Endpoint
El sistema de login está configurado para usar el endpoint:
```
http://localhost:3001/hv/usuarios/login
```

### Variables de Entorno
Asegúrate de que el archivo `.env` en la raíz del proyecto contenga:
```
REACT_APP_BACKEND_BASE=http://localhost:3001/hv
```

### Estructura de Petición
El login envía una petición POST con la siguiente estructura:
```json
{
  "usuario": "nombre_usuario",
  "password": "contraseña123"
}
```

### Respuesta Esperada del Backend
El backend debe responder con una estructura similar a:
```json
{
  "success": true,
  "message": "Login exitoso",
  "token": "jwt_token_aqui",
  "user": {
    "id": 1,
    "usuario": "nombre_usuario",
    "name": "Nombre Usuario",
    // otros campos del usuario
  }
}
```

### Funcionalidades Implementadas

1. **Autenticación**: Valida credenciales contra el endpoint configurado
2. **Almacenamiento local**: Guarda el token y datos del usuario en localStorage
3. **Redirección automática**: Redirige a áreas después del login exitoso
4. **Protección de rutas**: Las rutas principales requieren autenticación
5. **Logout**: Limpia la sesión y redirige al login
6. **Manejo de errores**: Muestra mensajes específicos según el tipo de error
7. **Interceptores de Axios**: Añade automáticamente el token a las peticiones

### Rutas

- `/login` - Página de login (pública)
- `/` - Redirección automática según el estado de autenticación
- `/areas`, `/usuarios`, `/inventarios`, `/solicitudes` - Rutas protegidas

### Uso

1. **Acceder al login**: Navega a `/login` o serás redirigido automáticamente si no estás autenticado
2. **Iniciar sesión**: Ingresa usuario y contraseña, haz clic en "Login"
3. **Logout**: Usa el menú del usuario en la esquina superior derecha

### Archivos Modificados/Creados

- `src/app/login/services/authService.js` - Servicio de autenticación (NUEVO)
- `src/app/login/login.jsx` - Componente de login (MODIFICADO)
- `src/App.js` - Configuración de rutas (MODIFICADO)
- `src/index.js` - Configuración de interceptores (MODIFICADO)
- `src/app/components/navigateButton/userMenu.jsx` - Menú con logout (MODIFICADO)

### Personalización

Para cambiar la ruta de redirección después del login, modifica esta línea en `login.jsx`:
```javascript
navigate("/areas"); // Cambia "/areas" por la ruta deseada
```

### Solución de Problemas

1. **Error de conexión**: Verifica que el backend esté ejecutándose en `http://localhost:3001`
2. **Credenciales inválidas**: El backend debe responder con status 401 para credenciales incorrectas
3. **Variables de entorno**: Reinicia el servidor de desarrollo después de cambiar `.env`
4. **Token no incluido en peticiones**: Los interceptores de axios se configuran automáticamente

### Desarrollo

Para probar el login:
1. Asegúrate de que el backend esté corriendo en el puerto 3001
2. Ejecuta `npm start` en el frontend
3. Navega a `http://localhost:3000`
4. Serás redirigido automáticamente al login si no estás autenticado
