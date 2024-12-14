//Manejo de Errores.1.

export class CustomError {

    //static createError(name, message, cause, code, suggestion = null) {
    static createError(name, message, cause, code) {
        let error = new Error(message, { cause });
        error.name = name;
        error.code = code;
        error.custom = true;
        //if (suggestion) error.suggestion = suggestion;

        throw error;
        // throw new Error("mensaje personalizado de error")
    }
}

// Los controladores usan CustomError para manejar errores.
// Los mensajes y códigos de error son consistentes.
// Puedes extender fácilmente el manejo de errores a nuevas funcionalidades como adopciones.

// Ejemplo:
// CustomError.createError( "Error al registrar usuario", ERROR_MESSAGES.USER.NAME_REQUIRED, errorArgs(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS, "Asegúrese de enviar el nombre en el cuerpo de la solicitud." );