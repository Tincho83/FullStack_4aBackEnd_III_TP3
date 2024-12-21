import { fakerES as faker } from "@faker-js/faker";
import { createHash, passwordValidation } from "./index.js";
import winston from "winston";
import os from "os";
import { mode, config, debug } from "../config/config.js";


export const generateUser_Mock = () => {

    let password = "coder123";

    let id = faker.database.mongodbObjectId();
    let first_name = faker.person.firstName();
    let last_name = faker.person.lastName();
    let email = faker.internet.email({ firstName: first_name, lastName: last_name });    
    password = createHash(password);
    let role = Math.random() < 0.76 ? "user" : "admin";
    let pets = []; 

    return {
        id, first_name, last_name, email, password, role, pets
    }
};


export const generatePet_Mock = () => {
    const id = faker.database.mongodbObjectId();
    const name = faker.animal.petName();
    const specie = faker.animal.type();
    const birthDate = faker.date.birthdate({ min: 1, max: 15, mode: 'age' }); 
    const adopted = false; 
    const owner = null; 
    const image = faker.image.url();

    return { id, name, specie, birthDate, adopted, owner, image };
};



export const generateAdopt = () => {
   
    let pet = generatePet_Mock();

    return {       
        pet
    }
};


const customLevels = {
    levels: { debug: 5, http: 4, info: 3, warning: 2, error: 1, fatal: 0 },
    colors: { debug: 'blue', http: 'magenta', info: 'green', warning: 'yellow', error: 'red', fatal: 'bold red' }
};


winston.addColors(customLevels.colors);


const transports = [];
if (mode === "dev") {
    transports.push(
        new winston.transports.Console({
            level: "debug", 
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `[${timestamp}] ${level}: ${message}`;
                }),
            ),
        })
    );
} else {
    transports.push(
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize(),              
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `[${timestamp}] ${level}: ${message}`;
                }),
            ),
        }),
        new winston.transports.File({
            level: "error",
            filename: "./src/logs/errors.log",
            format: winston.format.combine(
                winston.format.errors({ stack: true }),
                winston.format.timestamp(),
                winston.format.json(),
                //winston.format.printf(({ timestamp, level, message, stack }) => { return `[${timestamp}] ${level}: ${message} ${stack || ''}`; })
            )
        })
    );
}



const formatoMensaje = winston.format(log => {
    req.logger.debug(log);
    //log.message += ` - hostname: ${os.hostname()} - user: ${os.userInfo().username}`
    return log;
})


const filtroVerboseHttp = winston.format(log => {
    req.logger.debug(log);
    //if (log.level === "verbose" || log.level === "http") {
    //   log.message += ` - hostname: ${os.hostname()} - user: ${os.userInfo().username}`
    //    return log;
    //}
    return log;
})


export const logger = winston.createLogger(
    {
        levels: customLevels.levels,
        format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(({ timestamp, level, message }) => {
                return `[${timestamp}] ${level}: ${message}`;
            })
        ),
        transports
    }
);



export const middLog = (req, res, next) => {
    req.logger = logger;
    next();
}
