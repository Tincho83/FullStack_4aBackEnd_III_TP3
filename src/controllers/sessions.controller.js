import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js";
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';
import { ERROR_MESSAGES } from "../utils/ErrorsHandlers/ErrorMessages.js";
import { ERROR_TYPES } from "../utils/ErrorsHandlers/EnumErrors.js";
import { CustomError } from "../utils/ErrorsHandlers/CustomError.js";
import { errorArgsUser } from "../utils/ErrorsHandlers/DataErrors.js";
import { errorHandler } from "../middleware/ErrorsHandlers/errorHandler.js";
import { logger } from "../utils/utils.js";

const register = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        req.logger.debug(`> SESSIONS Controller: Register User: ${JSON.stringify(req.body, null, 5)}`);

        if (!first_name || !last_name || !email || !password) {

            CustomError.createError("Register User Error", ERROR_MESSAGES.USER.MISSING_FIELDS, errorArgsUser(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        const exists = await usersService.getUserByEmail(email);

        if (exists) {
            req.logger.debug(`> USERS Controller: Create: Existing mail ${email}...`);
            req.logger.error(`Existing mail.\r\n`);

            CustomError.createError("Create User Error", ERROR_MESSAGES.USER.USER_ALREADY_EXISTS, errorArgsUser({ email }), ERROR_TYPES.USER_ALREADY_EXISTS);
        }

        const hashedPassword = createHash(password);
        const user = { first_name, last_name, email, password: hashedPassword }
        let result = await usersService.create(user);

        req.logger.debug(`> User created: ${result}`);
        req.logger.info(`User created.\r\n`);

        res.send({ status: "success", payload: result._id });
    } catch (error) {

        return next(error);

    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        req.logger.debug(`> SESSIONS Controller: Login User: ${JSON.stringify(req.body, null, 5)}`);

        if (!email || !password) {
            CustomError.createError("Login User Error", ERROR_MESSAGES.USER.MISSING_FIELDS, errorArgsUser(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        const user = await usersService.getUserByEmail(email);
        if (!user) {
            req.logger.debug(`> SESSIONS Controller: Login: No Exist mail ${email}...`);
            req.logger.error(`Invalid mail.\r\n`);

            CustomError.createError("Login User Error", ERROR_MESSAGES.USER.USER_NOT_FOUND, errorArgsUser({ email }), ERROR_TYPES.NOT_FOUND);
        }

 

        const isValidPassword = await passwordValidation(user, password);
        //console.log(`email ${email}   pwd ${password}    pwdvd   ${isValidPassword}`);
        if (!isValidPassword) {
            req.logger.debug(`> SESSIONS Controller: Login: Incorrect Credenctials...`);
            req.logger.error(`Invalid Credentials.\r\n`);

            CustomError.createError("Login User Error", ERROR_MESSAGES.SESSION.INVALID_CRED, errorArgsUser(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        console.log(``);
        const userDto = UserDTO.getUserTokenFrom(user);
        req.logger.debug(`${JSON.stringify(userDto, null, 5)}`);

        req.logger.debug(`> SESSIONS Controller: Login: Creating Sign JWT and Cookie...`);
        const token = jwt.sign(userDto, 'tokenSecretJWT', { expiresIn: "1h" });
        res.cookie('coderCookie', token, { maxAge: 3600000 }).send({ status: "success", message: "Logged in" })

    } catch (error) {

        return next(error);
    }
}

const current = async (req, res, next) => {
    try {
        req.logger.debug(`> SESSIONS Controller: Current...`);

        const cookie = req.cookies['coderCookie']
        const user = jwt.verify(cookie, 'tokenSecretJWT');
        if (user) {
            req.logger.debug(`> User cookie: ${user}`);
            req.logger.info(`USer cookie.\r\n`);

            return res.send({ status: "success", payload: user })
        }
    } catch (error) {
        req.logger.debug(`${error.message}`);
        req.logger.error(`${error.message}`);

        return next(error);

    }
}

const unprotectedLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        req.logger.debug(`> SESSIONS Controller: UnProtectedLogin: ${JSON.stringify(req.body, null, 5)}`);

        if (!email || !password) {
            CustomError.createError("Login User Error", ERROR_MESSAGES.USER.MISSING_FIELDS, errorArgsUser(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        const user = await usersService.getUserByEmail(email);
        if (!user) {
            req.logger.debug(`> SESSIONS Controller: Login: No Exist mail ${email}...`);
            req.logger.error(`Invalid mail.\r\n`);

            CustomError.createError("Login User Error", ERROR_MESSAGES.USER.USER_NOT_FOUND, errorArgsUser({ email }), ERROR_TYPES.NOT_FOUND);
        }

        const isValidPassword = await passwordValidation(user, password);
        if (!isValidPassword) {
            req.logger.debug(`> SESSIONS Controller: Login: Incorrect Credenctials...`);
            req.logger.error(`Invalid Credentials.\r\n`);

            CustomError.createError("Login User Error", ERROR_MESSAGES.SESSION.INVALID_CRED, errorArgsUser(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        req.logger.debug(`> SESSIONS Controller: Login: Creating Sign JWT and Cookie...`);        
        const token = jwt.sign(user, 'tokenSecretJWT', { expiresIn: "1h" });
        res.cookie('unprotectedCookie', token, { maxAge: 3600000 }).send({ status: "success", message: "Unprotected Logged in" })
    } catch (error) {
        req.logger.debug(`${error.message}`);
        req.logger.error(`${error.message}`);

        return next(error);
    }
}

const unprotectedCurrent = async (req, res, next) => {
    try {
        req.logger.debug(`> SESSIONS Controller: UnProtectedCurrent...`);

        const cookie = req.cookies['unprotectedCookie']
        const user = jwt.verify(cookie, 'tokenSecretJWT');
        if (user) {
            req.logger.debug(`> User cookie: ${user}`);
            req.logger.info(`USer cookie.\r\n`);

            return res.send({ status: "success", payload: user })
        }
    } catch (error) {
        req.logger.debug(`${error.message}`);
        req.logger.error(`${error.message}`);

        return next(error);

    }

}
export default {
    current,
    login,
    register,
    current,
    unprotectedLogin,
    unprotectedCurrent
}