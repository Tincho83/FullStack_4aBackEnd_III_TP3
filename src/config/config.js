import dotenv from 'dotenv';
import { Command, Option } from 'commander';
import colors from 'colors';


console.time(`\x1b[34mTiempo de Carga de Configuracion\x1b[0m`);
console.log(`

******************************************************************************
******************************************************************************
> Iniciando App...
>  Cargando Configuracion...`.blue);





const appProgram = new Command();

//appProgram.option("-p, --port <port>", "Numero de Puerto de escucha del Servidor. Si no se especifica se asignara el puerto 8080.", 8080);
//appProgram.option("-m, --mode <dev|prod>", "Modo de ejecucion: Desarrollo o Produccion. Si no se especifica se asignara el modo Dev.", "dev");
//appProgram.requiredOption("-code, --code <code>", "Obligatorio: Codigo para iniciar la aplicacion.", "No se pudo obtener el codigo de seguridad.");
appProgram.addOption(new Option("-m, --mode <mode>", "Modo de ejecución del script (Desarrollo o Produccion). Si no se especifica se asignara el modo Dev.").choices(["dev", "prod"]).default("dev"));
appProgram.option("-d, --debug", "Modo depuracion de la aplicacion en valor Booleano. Si no se especifica se asignara el valor Booleano false.", false);

appProgram.parse();

//let mode = "dev" // dev para desarrollo prod produccion
const { mode, debug } = appProgram.opts();
let options = appProgram.opts();
console.log(`>    Obteniendo argumentos de inicio de la App: ${JSON.stringify(options)}`.blue);

dotenv.config({
    path: mode === "prod" ? "./src/.env.prod" : "./src/.env.dev",
    override: true
})

export const config = {
    PORT: process.env.PORT || 8080,
    MONGO_URL: process.env.MONGO_URL,
    MONGO_URLwithDB: process.env.MONGO_URLwithDB,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASS: process.env.MONGO_PASS,
    MONGO_DBNAME: process.env.MONGO_DBNAME,
    MONGO_COLLPETSNAME: process.env.MONGO_COLLPETSNAME,
    MONGO_COLLADOPNAME: process.env.MONGO_COLLADOPNAME,
    MONGO_COLLMSGSNAME: process.env.MONGO_COLLMSGSNAME,
    MONGO_COLLUSERSNAME: process.env.MONGO_COLLUSERSNAME,
    MONGO_COLLTICKTNAME: process.env.MONGO_COLLTICKTNAME,
    CookieParser_SECRET: process.env.CookieParser_SECRET,
    ExpressSessions_SECRET: process.env.ExpressSessions_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    PATH_LOGFILE: process.env.PATH_LOGFILE,
    PATH_STOSESS: process.env.PATH_STOSESS,
    GITHUB_APPID: process.env.GITHUB_APPID,
    GITHUB_CLIENTID: process.env.GITHUB_CLIENTID,
    GITHUB_CLIENTSECRET: process.env.GITHUB_CLIENTSECRET,
    GITHUB_CALLBACKURL: process.env.GITHUB_CALLBACKURL,
    PERSISTENCE: process.env.PERSISTENCE,
    GMAIL_ACCOUNT: process.env.GMAIL_ACCOUNT,
    GMAIL_CODE: process.env.GMAIL_CODE,
    APP_MODEEXEC: process.env.APP_MODEEXEC
}

export { mode, debug };

console.timeEnd(`\x1b[34mTiempo de Carga de Configuracion\x1b[0m`);