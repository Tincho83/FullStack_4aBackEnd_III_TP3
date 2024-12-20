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
    }
}