//Manejo de Errores.5.
import colors from 'colors';

export const errorHandler = (error, req, res, next) => {

    if (error.custom) {
        
        console.log(``, error.cause.red);

        res.setHeader('Content-Type', 'application/json');
        return res.status(error.code).json({ error: `${error.name}: ${error.message}` })
    
    } else if (error.name === "ValidationError") {
        // Manejo de errores de validación (por ejemplo, mongoose)
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ status: "validationError", error: error.message });
    
    } else {
        console.log(`[Error interno]:`, error.red);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({ status: "errorHandler", error: `Error interno del servidor: ${error.message}` })
    
    }

}



// Ejemplo:
// if (error.suggestion) { return res.status(error.code).json({ error: `${error.name}: ${error.message}`, suggestion: error.suggestion }); }