import express from 'express';
//import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import colors from 'colors';
import moment from 'moment';
import { fork } from "child_process"
//import { Command, Option } from 'commander';
//import dotenv from 'dotenv';
import os from 'os';
import handlebars from 'express-handlebars'
import compress from "express-compression"
import zlib from "zlib"

import { config, mode, debug } from './config/config.js';
//import { connDB } from './dao/connDB.js';
//import { ConnDBMongoDBSingleton as ConnectDB } from './dao/Singleton/ConnDBMongoDBSingleton.js';
import { DAO } from './dao/factory.js';
import { generateAdopt, middLog, logger } from './utils/utils.js';
import { errorHandler } from './middleware/ErrorsHandlers/errorHandler.js';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import loggerTestRouter from "./routes/loggerTest.router.js";


console.time(`\x1b[34mTiempo de Carga de Aplicacion\x1b[0m`);

/*
console.log(`
******************************************************************************
******************************************************************************
> Iniciando App...`.yellow);

console.log(`
>> Obteniendo argumentos de inicio de App: `.yellow);

const appProgram = new Command();
appProgram.option("-p, --port <port>", "Numero de Puerto de escucha del Servidor. Si no se especifica se asignara el puerto 8080.", 8081);
appProgram.option("-m, --mode <dev|prod>", "Modo de ejecucion: Desarrollo o Produccion. Si no se especifica se asignara el modo Dev.", "dev");
appProgram.option("-d, --debug", "Modo depuracion de la aplicacion en valor Booleano. Si no se especifica se asignara el valor Booleano false.", false);
//appProgram.requiredOption("-code, --code <code>", "Obligatorio: Codigo para iniciar la aplicacion.", "No se pudo obtener el codigo de seguridad.");


appProgram.parse();
let options = appProgram.opts();
console.log(`>>>> ${JSON.stringify(options)}`.yellow);
*/

const PORT = config.PORT;
const app = express();
//const connection = mongoose.connect(config.MONGO_URL);

app.use(middLog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(compress());  // por defecto comprime gzip | middlware a nivel de aplicación
app.use(compress({ brotli: { enabled: true, } }));
app.use(cookieParser(config.CookieParser_SECRET));

app.use(express.static("./src/public"));
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')


app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);
app.use("/", loggerTestRouter);
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
})

/*
app.get('/info', (req, res) => {

    let texto=`texto muy muy muy muuuuuuuuy largo`.repeat(100_000_000);

    let textoCromprimido=zlib.deflateSync(texto);
    //let textoCromprimido=zlib.brotliCompressSync(texto);

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Encoding','deflate');
    //res.setHeader('Content-Encoding','br');
    res.status(200).send(textoCromprimido);
})
*/

app.use(errorHandler);

let servername = process.env.COMPUTERNAME;
let oscpu = os.cpus()[0].model
let numCPUs = os.cpus().length;
let osnet = Object.values(os.networkInterfaces())
    .flat() // Aplanar las interfaces en un solo array
    .filter((iface) => iface && (iface.family === 'IPv4' || iface.family === 'IPv6')) // Filtrar solo IPv4 e IPv6
    .map((iface) => ({ family: iface.family, address: iface.address })); // Mapear el resultado con familia y dirección
let osname = os.platform() === 'win32' ? 'Windows' : 'Otro';
let osArch = os.arch();
let osrelease = os.release();
let osRAM = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2); // bytes a GB a 2 decimales
let nodeversion = process.version;
let modversion = process.versions;
let pid = process.pid;
let apppath = process.cwd();
let memusage = process.memoryUsage();
let memttl = memusage.heapTotal / 1024 / 1024;
let memused = memusage.heapUsed / 1024 / 1024;
let procarg = `${process.argv.slice(1)} ${process.argv.slice(4)}`;
let platform = process.platform;
let envvariab = process.env;
let logonServer = envvariab.LOGONSERVER ? `\\\\${envvariab.LOGONSERVER.replace(/\\\\/g, '').replace(/\\/g, '')}` : 'No disponible';
let username = envvariab.USERNAME || 'No disponible';
let horahhmmss = moment().format('DD/MM/yyyy hh:mm:ss A');


app.listen(PORT, () => {
    console.log(`
******************************************************************************
*                   Servidor en linea sobre puerto ${PORT}                      *
******************************************************************************

    # Url:
        http://localhost:${PORT}

    # Aplicacion iniciada:
    # Fecha y Hora: ${horahhmmss}
    # En el servidor: ${servername}
    # Sistema Operativo: ${osname} ${osrelease} ${osArch}
    # Procesador: ${oscpu}, ${numCPUs} Nucleos
    # RAM Instalada: ${osRAM} Gb
    # IP's: ${osnet.map((net) => `${net.family}: ${net.address}`).join(' - ')}    
    # Con el usuario: "${username}" en Dominio: "${logonServer}" 
    # Desde la ruta: ${apppath}
    # Con argumentos: ${procarg}
    # Modo de ejecución: ${mode}
    # Debug: ${debug}
    # proceso Id principal: ${pid}    
    # en plataforma: ${platform}
    # con uso de memoria: ${memused.toFixed(2)} MB de ${memttl.toFixed(2)} MB
    # usando version de:
        NodeJS: ${nodeversion}
        OpenSSL: ${JSON.stringify(modversion.openssl, null, 5)}
    
******************************************************************************`.yellow);

});
console.timeEnd(`\x1b[34mTiempo de Carga de Aplicacion\x1b[0m`);

//console.log('\x1b[32m', 'Inicio de la aplicación', '\x1b[0m');
//console.log('\x1b[31m', 'Error en el módulo XYZ', '\x1b[0m');
//console.time('Cargad de Aplicacion');
// ... código de tu aplicación
//console.log('\x1b[34m', 'Cargad de Aplicacion:', '\x1b[0m', console.timeEnd('Cargad de Aplicacion'));


setTimeout(() => {
    /*
    console.log(`> Generando Adopcion`.blue);
    
    for (let i = 0; i < 100; i++) {
        console.log(`Adopción #${i + 1}:`, generateAdopt());
    }
    */

    //console.log(`Logs:`.blue);
}, 32);



process.on('exit', code => {
    console.log(`
> Saliendo de la App...
******************************************************************************
******************************************************************************`.blue);
});


