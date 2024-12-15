import mongoose from 'mongoose';
import colors from 'colors';

export class ConnDBMongoDBSingleton {

    static #conexion = null;

    constructor(url, db) {

        this.url = url;
        this.db = db;
    }

    static async conectarDB(url, db) {

        //mongoose.set('strictQuery', true);  // default mongoose < v6
        mongoose.set('strictQuery', false); // default mongoose > v7

        try {
            // Si ya existe una conexion, la retornamos
            if (this.#conexion) {
                console.log(`Conexión con la base de datos "${this.#conexion.db}" establecida previamente...`);
                return this.#conexion;
            }

            // Crear nueva instancia
            this.#conexion = new ConnDBMongoDBSingleton(url, db);

            // Intentar conectar a MongoDB
            await mongoose.connect(this.#conexion.url, {
                dbName: this.#conexion.db
            });

            console.log(`Se establecio conexion con la base de datos "\x1b[34m${this.#conexion.db}\x1b[33m" de manera exitosa.                        
                        
******************************************************************************\x1b[0m
\x1b[34mLogs:\x1b[0m`.yellow);


            return this.#conexion;

        } catch (error) {
            console.error(`Error al conectar a MongoDB: ${error.message}`);
            // Reseteamos la conexión en caso de error
            this.#conexion = null;
            //process.exit(); 
            throw error; // Relanzamos el error para manejarlo en la app principal
        }
    }

}