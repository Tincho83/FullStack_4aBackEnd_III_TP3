//Manejo de Errores.5.
import colors from 'colors';
import { logger } from '../../utils/utils.js';


export const errorHandler = (error, req, res, next) => {

    if (error.custom) {
        
        logger.error(``, error.cause);

        res.setHeader('Content-Type', 'application/json');
        return res.status(error.code).json({ error: `${error.name}: ${error.message}` })
    
    } else if (error.name === "ValidationError") {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ status: "validationError", error: error.message });
    
    } else {
        logger.error(`[Error interno]:`, error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({ status: "errorHandler", error: `Error interno del servidor: ${error.message}` })
    
    }

}