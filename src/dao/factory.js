import { config } from '../config/config.js';
import { ConnDBMongoDBSingleton as ConnectDB } from './Singleton/ConnDBMongoDBSingleton.js';

let DAO;



switch (config.PERSISTENCE) {
    case "MONGODB":
        ConnectDB.conectarDB(config.MONGO_URL, config.MONGO_DBNAME);        

    break;

    case "FILESYSTEM":        
        const { ProductsManager } = require("./filesystem/ProductsManager.js");
        DAO = new ProductsManager();
        break;

    default:
        throw new Error("Error en la configuración de persistencia. Verificar variable.");
}



export { DAO };