import { adoptionsService, petsService, usersService } from "../services/index.js"
import { CustomError } from "../utils/ErrorsHandlers/CustomError.js";
import { errorArgsPet, errorArgsUser } from "../utils/ErrorsHandlers/DataErrors.js";
import { ERROR_TYPES } from "../utils/ErrorsHandlers/EnumErrors.js";
import { ERROR_MESSAGES } from "../utils/ErrorsHandlers/ErrorMessages.js";
import mongoose from 'mongoose';

const getAllAdoptions = async (req, res) => {

    req.logger.debug(`> ADOPTIONS Controller: Get All...`);

    try {
        const result = await adoptionsService.getAll();

        req.logger.debug(`> All Adoptions listed.`);
        req.logger.info(`Adoptions listed.\r\n`);

        res.send({ status: "success", payload: result })
    } catch (error) {
        req.logger.error(`${error.message}`);

        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
}

const getAdoption = async (req, res, next) => {

    try {
        req.logger.debug(`> ADOPTIONS Controller: Get...`);

        const adoptionId = req.params.aid;

        if (!mongoose.Types.ObjectId.isValid(adoptionId)) {
            req.logger.debug(`> ADOPTIONS Controller: Get By ID: Error en ID: ${adoptionId}...`);
            req.logger.warning(`Invalid Adoption.\r\n`);

            CustomError.createError("Error de ID", ERROR_MESSAGES.PET.INVALID_ID, { adoptionId }, ERROR_TYPES.TIPO_DE_DATOS);
        }

        const adoption = await adoptionsService.getBy({ _id: adoptionId })

        if (!adoption) {
            req.logger.debug(`> ADOPTIONS Controller: Get By ID: ID ${adoptionId} not found...`);
            req.logger.warning(`Adoption not found.\r\n`);

            CustomError.createError("Error Adoption not found.", ERROR_MESSAGES.PET.PET_NOT_FOUND, { adoptionId }, ERROR_TYPES.NOT_FOUND);
        }

        req.logger.debug(`> Adoption ${adoptionId} listed.`);
        req.logger.info(`Adoption listed.\r\n`);

        res.send({ status: "success", payload: adoption })
    } catch (error) {

        return next(error);
    }
}

const createAdoption = async (req, res, next) => {

    try {
        req.logger.debug(`> ADOPTIONS Controller: Create...`);

        const { uid, pid } = req.params;

        if (!mongoose.Types.ObjectId.isValid(uid)) {
            req.logger.debug(`> ADOPTIONS Controller: Get By ID: Error en ID: ${uid}...`);
            req.logger.warning(`Invalid Adoption.\r\n`);

            CustomError.createError("Error de ID", ERROR_MESSAGES.PET.INVALID_ID, { uid }, ERROR_TYPES.TIPO_DE_DATOS);
        }

        if (!mongoose.Types.ObjectId.isValid(pid)) {
            req.logger.debug(`> ADOPTIONS Controller: Get By ID: Error en ID: ${pid}...`);
            req.logger.warning(`Invalid Adoption.\r\n`);

            CustomError.createError("Error de ID", ERROR_MESSAGES.PET.INVALID_ID, { pid }, ERROR_TYPES.TIPO_DE_DATOS);
        }


        if (!uid || !pid) {
            CustomError.createError("Create Adoption Error", ERROR_MESSAGES.USER.MISSING_FIELDS, errorArgsUser(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        if (!uid) {
            CustomError.createError("Create Adoption Error", ERROR_MESSAGES.USER.MISSING_FIELDS, errorArgsUser(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        if (!pid) {
            CustomError.createError("Create Adoption Error", ERROR_MESSAGES.PET.MISSING_FIELDS, errorArgsPet(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        req.logger.debug(`> ADOPTIONS Controller: Create: Creating From Body: ${JSON.stringify(req.body, null, 5)}`);

        const user = await usersService.getUserById(uid);
        if (!user) {
            req.logger.debug(`> USERS Controller: Update: ID ${uid} not found...`);
            req.logger.warning(`User not found.\r\n`);

            CustomError.createError("User", ERROR_MESSAGES.USER.USER_NOT_FOUND, { uid }, ERROR_TYPES.NOT_FOUND);
        }

        const pet = await petsService.getBy({ _id: pid });
        if (!pet) {
            req.logger.debug(`> PETS Controller: Get By ID: ID ${pid} not found...`);
            req.logger.warning(`Pet not found.\r\n`);

            CustomError.createError("Error al buscar mascota", ERROR_MESSAGES.PET.PET_NOT_FOUND, { pid }, ERROR_TYPES.NOT_FOUND);
        }

        if (pet.adopted) {
            req.logger.debug(`> ADOPTIONS Controller: Get By ID: ID ${pid} Pet is already adopted...`);
            req.logger.warning(`Pet is already adopted. Pet not found.\r\n`);

            CustomError.createError("Pet is already adopted", ERROR_MESSAGES.PET.PET_NOT_FOUND, { pid }, ERROR_TYPES.NOT_FOUND);
        }

        user.pets.push(pet._id);

        await usersService.update(user._id, { pets: user.pets })
        await petsService.update(pet._id, { adopted: true, owner: user._id })
        await adoptionsService.create({ owner: user._id, pet: pet._id })

        req.logger.debug(`> Adoption modified.`);
        req.logger.info(`Adoption modified.\r\n`);

        res.send({ status: "success", message: "Pet adopted" })

    } catch (error) {
       
        return next(error);
    }
}

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption
}