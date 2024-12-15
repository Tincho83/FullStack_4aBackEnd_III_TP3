import { usersService } from "../services/index.js"
import { CustomError } from "../utils/ErrorsHandlers/CustomError.js";
import { errorArgsUser } from "../utils/ErrorsHandlers/DataErrors.js";
import { ERROR_TYPES } from "../utils/ErrorsHandlers/EnumErrors.js";
import { ERROR_MESSAGES } from "../utils/ErrorsHandlers/ErrorMessages.js";
import mongoose from 'mongoose';
import { errorHandler } from "../middleware/ErrorsHandlers/errorHandler.js";


const getAllUsers = async (req, res) => {

    console.log(`> USERS Controller: Get All...`.blue);
    req.logger.info('> USERS Controller: Create...');
    req.logger.warning('Faltan datos requeridos en el body'); //if !variable
    req.logger.error(`El usuario con email ${email} ya existe`); // if variable existe
    req.logger.fatal(`Error crítico en addUser: ${error.message}`); //catch error 500

    //Generar Error para probar Logger
    if (req.query.error) { throw new Error(`Error de prueba...!!!`) }

    try {
        const users = await usersService.getAll();
        res.send({ status: "success", payload: users })
    } catch (error) {
        req.logger.log("error", error.message);
        req.logger.error(`${error.message}`);
        req.logger.verbose(`${error.message} - prueba log verbose`)

        console.error(error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
    req.logger.verbose(`Se ejecuto la ruta /api/heroes`)
};


const getUser = async (req, res) => {

    console.log(`> USERS Controller: Get...`.blue);

    try {
        const userId = req.params.uid;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            //throw new Error('El ID proporcionado no es válido');
            CustomError.createError("Error de ID", ERROR_MESSAGES.USER.INVALID_ID, { userId }, ERROR_TYPES.TIPO_DE_DATOS);
        }

        const user = await usersService.getUserById(userId);

        if (!user) {
            return res.status(404).send({ status: "error", error: "User not found" })
        }

        res.send({ status: "success", payload: user })

    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
}


const addUser = async (req, res, next) => {

    console.log(`> USERS Controller: Create...`.blue);

    //const userId = req.params.uid;
    let { first_name, last_name, email, role, password } = req.body;

    //console.log(first_name, last_name, role, email, password);

    try {
        if (!first_name || !last_name || !email || !password) {
            //return res.status(400).json({ status: "error", message: "Faltan datos requeridos." });
            CustomError.createError("Error Alta de Usuario", ERROR_MESSAGES.USER.MISSING_FIELDS, errorArgsUser(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        if (!first_name || !last_name) {
            CustomError.createError("Error Alta de Usuario", ERROR_MESSAGES.USER.NAME_REQUIRED, errorArgsUser(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        if (!email) {
            CustomError.createError("Error Alta de Usuario", ERROR_MESSAGES.USER.EMAIL_REQUIRED, errorArgsUser(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        if (!password) {
            CustomError.createError("Error Alta de Usuario", ERROR_MESSAGES.USER.PASSWORD_REQUIRED, errorArgsUser(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }


        const user = await usersService.getUserByEmail(email);

        //const user = await usersService.getUserById(userId);
        if (user) {
            //CustomError.createError("Error Alta de Usuario", ERROR_MESSAGES.USER.USER_ALREADY_EXISTS, errorArgs(req.body), ERROR_TYPES.USER_ALREADY_EXISTS);
            CustomError.createError("Error Alta de Usuario", ERROR_MESSAGES.USER.USER_ALREADY_EXISTS, errorArgsUser({ email }), ERROR_TYPES.USER_ALREADY_EXISTS);
        }

        //res.send({ status: "success", payload: user })

        const result = await usersService.create({ first_name, last_name, email, role, password });

        res.send({ status: "success", payload: result })

    } catch (error) {
        //console.error(error);
        //res.status(500).send({ status: "error", error: "Internal Server Error" });
        //res.status(error.code).send({ "error": error.name +": " +error.message });
        return next(error);
    }
}


const updateUser = async (req, res) => {

    console.log(`> USERS Controller: Update...`.blue);

    try {

        const updateBody = req.body;
        const userId = req.params.uid;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            //throw new Error('El ID proporcionado no es válido');
            CustomError.createError("Error de ID", ERROR_MESSAGES.USER.INVALID_ID, { userId }, ERROR_TYPES.TIPO_DE_DATOS);
        }

        const user = await usersService.getUserById(userId);
        if (!user) {
            return res.status(404).send({ status: "error", error: "User not found" })
        }

        console.log(user);

        const result = await usersService.update(userId, updateBody);
        res.send({ status: "success", message: "User updated" })

    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }

}


const deleteUser = async (req, res) => {

    console.log(`> USERS Controller: Delete...`.blue);

    try {
        const userId = req.params.uid;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            //throw new Error('El ID proporcionado no es válido');
            CustomError.createError("Error de ID", ERROR_MESSAGES.USER.INVALID_ID, { userId }, ERROR_TYPES.TIPO_DE_DATOS);
        }

        const user = await usersService.getUserById(userId);
        if (!user) {
            return res.status(404).send({ status: "error", error: "User not found" })
        }

        const result = await usersService.delete(userId);
        res.send({ status: "success", message: "User deleted" })
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
}


export default {
    deleteUser,
    addUser,
    getAllUsers,
    getUser,
    updateUser
}