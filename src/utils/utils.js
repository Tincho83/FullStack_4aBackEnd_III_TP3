import { fakerES as faker } from "@faker-js/faker";
import { createHash, passwordValidation } from "./index.js";
import winston from "winston";
import os from "os";
import { mode, config, debug } from "../config/config.js";

/*
export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(11));
};

export const isValidPassword = (pass, hash) => {
    return bcrypt.compareSync(pass, hash);
};
*/

export const generateUser_Mock = () => {

    let password = "coder123";
    //console.log("pass ori", password);

    let id = faker.database.mongodbObjectId();
    let first_name = faker.person.firstName();
    let last_name = faker.person.lastName();
    let email = faker.internet.email({ firstName: first_name, lastName: last_name });
    //let password = `${faker.word.adjective()}.${faker.word.adjective()}`;
    password = createHash(password);
    let role = Math.random() < 0.76 ? "user" : "admin";
    let pets = []; // Sin propietario //faker.database.mongodbObjectId();

    //console.log("pass hsh", password);
    //console.log("rol ", role);
    return {
        id, first_name, last_name, email, password, role, pets
    }

}

export const generatePetCom = () => {
    let id = faker.database.mongodbObjectId();
    let nombreMasc = faker.animal.petName();
    let especie = faker.animal.type();
    let fechaNac = faker.date.birthdate();
    let adoptado = faker.datatype.boolean();
    let propietario = faker.database.mongodbObjectId();
    let imagen = faker.image.url();

    /*
    console.log(faker.animal.cat())
    console.log(faker.animal.insect())

    console.log(faker.color.human())

    let nombre=faker.person.firstName("female")
    let apellido=faker.person.lastName()
    let email=faker.internet.email({firstName: nombre, lastName: apellido})
    let telNumber=faker.phone.number({ style: 'international' })

    let persona = { nombre, apellido, email, telNumber }
        
    console.log(persona)
        
    let title = faker.commerce.product()
    let description = faker.commerce.productDescription()
    let precio = faker.commerce.price()
    let stock = faker.number.int({ min: 0, max: 5000 })
            
    let producto = { title, description, precio, stock }
    console.log(producto)
    */

    return {
        id, nombreMasc, especie, fechaNac, adoptado, propietario, imagen
    }
}

export const generatePet_Mock = () => {
    const id = faker.database.mongodbObjectId();
    const name = faker.animal.petName();
    const specie = faker.animal.type();
    const birthDate = faker.date.birthdate({ min: 1, max: 15, mode: 'age' }); // Edad entre 1 y 15 años
    const adopted = false; // No adoptado
    const owner = null; // Sin propietario
    const image = faker.image.url();

    return { id, name, specie, birthDate, adopted, owner, image };
};

export const generateAdopt = () => {

    //let propietario = generateUser();
    let pet = generatePet_Mock();

    return {
        //propietario, nombreMasc
        pet
    }
}

//Logger.1.
const customLevels = {
    levels: { debug: 5, http: 4, info: 3, warning: 2, error: 1, fatal: 0 },
    colors: { debug: 'blue', http: 'magenta', info: 'green', warning: 'yellow', error: 'red', fatal: 'bold red' }
};

//Logger.2.
winston.addColors(customLevels.colors);

//Logger.3.
const transports = [];
if (mode === "dev") {
    // Logger para desarrollo (nivel debug y solo consola)
    transports.push(
        new winston.transports.Console({
            level: "debug", // Loguea desde debug hacia arriba
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        })
    );
} else {
    // Logger para producción (nivel info, consola y archivo)
    transports.push(
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
        new winston.transports.File({
            level: "info",
            filename: "./src/logs/errors.log",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })
    );
}


//Logger.3.
const formatoMensaje = winston.format(log => {
    // console.log(log)
    //log.message += ` - hostname: ${os.hostname()} - user: ${os.userInfo().username}`

    return log;
})

//Logger.4.
const filtroVerboseHttp = winston.format(log => {
    // console.log(log)
    //if (log.level === "verbose" || log.level === "http") {
     //   log.message += ` - hostname: ${os.hostname()} - user: ${os.userInfo().username}`
    //    return log;
    //}
    return log;
})

//Logger.5.
export const logger = winston.createLogger(
    {
        levels: customLevels.levels,
        format: winston.format.combine(//winston.format.colorize(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss', }),
            winston.format.printf(({ level, message, timestamp }) => {
                return `[${timestamp}] ${level}: ${message}`;
            })
        ),
        transports
        /*
        transports: [new winston.transports.Console({
            //level: "silly", // Silly >>> Debug >>> Verbose >>> Http >>> Info >>> Warn >>> Error
            levels: customLevels.levels,
            format: winston.format.combine(winston.format.colorize(),
                winston.format.simple()
            ),
        }),
        new winston.transports.File({
            level: "info",
            filename: "./src/logs/error.log",
            format: winston.format.combine(
                formatoMensaje(),
                winston.format.timestamp(),
                winston.format.prettyPrint()
            )
        }),
        new winston.transports.File({
            level: "verbose",
            filename: "./src/logs/mensajesVerboseHttp.log",
            format: winston.format.combine(
                filtroVerboseHttp(),
                winston.format.timestamp(),
                winston.format.prettyPrint()
            )
        })
        ]*/
    }
);



export const middLog = (req, res, next) => {
    req.logger = logger;
    next();
}
