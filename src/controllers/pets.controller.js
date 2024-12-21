import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js"
import { CustomError } from "../utils/ErrorsHandlers/CustomError.js";
import { errorArgsPet } from "../utils/ErrorsHandlers/DataErrors.js";
import { ERROR_TYPES } from "../utils/ErrorsHandlers/EnumErrors.js";
import { ERROR_MESSAGES } from "../utils/ErrorsHandlers/ErrorMessages.js";
import __dirname from "../utils/index.js";
import { generatePet_Mock } from "../utils/utils.js";
import colors from 'colors';
import multer from 'multer';
import path from 'path';
import mongoose from 'mongoose';


const getAllPets = async (req, res) => {

    req.logger.debug(`> PETS Controller: Get All....`);

    try {
        const pets = await petsService.getAll();

        req.logger.debug(`> All Pets listed.`);
        req.logger.info(`Pets listed.\r\n`);

        res.send({ status: "success", payload: pets })
    } catch (error) {        
        req.logger.error(`${error.message}`);

        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};


const getPetById = async (req, res, next) => {

    try {
        const { pid } = req.params;

        req.logger.debug(`> PETS Controller: Get By ID: ${pid}...`);

        if (!mongoose.Types.ObjectId.isValid(pid)) {
            req.logger.debug(`> PETS Controller: Get By ID: Error en ID: ${pid}...`);
            req.logger.warning(`Invalid Pet.\r\n`);

            CustomError.createError("Error de ID", ERROR_MESSAGES.PET.INVALID_ID, { pid }, ERROR_TYPES.TIPO_DE_DATOS);
        }

        const pet = await petsService.getBy(pid);

        if (!pet) {
            req.logger.debug(`> PETS Controller: Get By ID: ID ${pid} not found...`);
            req.logger.warning(`Pet not found.\r\n`);

            CustomError.createError("Error al buscar mascota", ERROR_MESSAGES.PET.PET_NOT_FOUND, { pid }, ERROR_TYPES.NOT_FOUND);
        }

        req.logger.debug(`> Pet ${pid} listed.`);
        req.logger.info(`Pet listed.\r\n`);

        res.send({ status: "success", payload: pet });

    } catch (error) {
        //req.logger.error(error.message);

        return next(error);
    }
};

const createPet = async (req, res, next) => {

    try {
        req.logger.debug(`> PETS Controller: Create...`);

        const { name, specie, birthDate } = req.body;

        if (!name || !specie) {
            CustomError.createError("Create Pet Error", ERROR_MESSAGES.PET.MISSING_FIELDS, errorArgsPet(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        if (!name) {
            CustomError.createError("Create Pet Error", ERROR_MESSAGES.PET.NAME_REQUIRED, errorArgsPet(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        if (!specie) {
            CustomError.createError("Create Pet Error", ERROR_MESSAGES.PET.SPECIE_REQUIRED, errorArgsPet(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        req.logger.debug(`> PETS Controller: Create: Creating From Body: ${JSON.stringify(req.body, null, 5)}`);

        const pet = PetDTO.getPetInputFrom({ name, specie, birthDate });

        const result = await petsService.create(pet);

        req.logger.debug(`> Pet created: ${result}`);
        req.logger.info(`Pet created.\r\n`);

        res.send({ status: "success", payload: result })

    } catch (error) {
        //req.logger.error(error.message);

        return next(error);
    }
};


const createPetWithImage = async (req, res, next) => {

    try {
        req.logger.debug(`> PETS Controller: Create with image...`);

        const file = req.file;
        const { name, specie, birthDate, image } = req.body;
        if (!name || !specie || !file) {
            req.logger.debug(`> PETS Controller: Create with image: Incomplete registration values. Please verify data... ${JSON.stringify(file, null, 5)} ${JSON.stringify(req.body, null, 5)}`);
            CustomError.createError("Create Pet Error", ERROR_MESSAGES.PET.MISSING_FIELDS, errorArgsPet(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        if (!name) {
            CustomError.createError("Create Pet Error", ERROR_MESSAGES.PET.NAME_REQUIRED, errorArgsPet(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        if (!specie) {
            CustomError.createError("Create Pet Error", ERROR_MESSAGES.PET.SPECIE_REQUIRED, errorArgsPet(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        if (!file) {
            CustomError.createError("Create Pet Error", ERROR_MESSAGES.PET.FILE_NOT_FOUND, errorArgsPet(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }


        req.logger.debug(`> PETS Controller: Create with image: Creating From File and Body: ${JSON.stringify(file, null, 5)}\r\n${JSON.stringify(req.body, null, 5)}`);

        const pet = PetDTO.getPetInputFrom({ name, specie, birthDate, image: `${__dirname}/../public/img/${file.filename}` });

        const result = await petsService.create(pet);

        req.logger.debug(`> Pet created with image: ${result}`);
        req.logger.info(`Pet created with image.\r\n`);

        res.send({ status: "success", payload: result })
    } catch (error) {
        //req.logger.error(error.message);

        return next(error);
    }
};


const updatePet = async (req, res, next) => {

    try {
        const petUpdateBody = req.body;
        const petId = req.params.pid;
        const { name, specie, birthDate } = req.body;

        req.logger.debug(`> PETS Controller: Update ${petId}...`);

        if (!mongoose.Types.ObjectId.isValid(petId)) {
            req.logger.debug(`> PETS Controller: Update: Error en ID: ${petId}...`);
            req.logger.warning(`Invalid Pet.\r\n`);

            CustomError.createError("Error de ID", ERROR_MESSAGES.PET.INVALID_ID, { petId }, ERROR_TYPES.TIPO_DE_DATOS);
        }

        if (!name || !specie) {
            req.logger.debug(`> PETS Controller: Update: Incomplete values for update. Please verify data... ${JSON.stringify(req.body, null, 5)}`);
            CustomError.createError("Create Pet Error", ERROR_MESSAGES.PET.MISSING_FIELDS, errorArgsPet(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        if (!name) {
            CustomError.createError("Create Pet Error", ERROR_MESSAGES.PET.NAME_REQUIRED, errorArgsPet(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        if (!specie) {
            CustomError.createError("Create Pet Error", ERROR_MESSAGES.PET.SPECIE_REQUIRED, errorArgsPet(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        const pet = await petsService.getBy(petId);
        if (!pet) {
            req.logger.debug(`> PETS Controller: Update: ID ${petId} not found...`);
            req.logger.warning(`Pet not found.\r\n`);

            CustomError.createError("Error al buscar mascota", ERROR_MESSAGES.PET.PET_NOT_FOUND, { petId }, ERROR_TYPES.NOT_FOUND);
        }
        const result = await petsService.update(petId, petUpdateBody);

        req.logger.debug(`> Pet updated: ${result}`);
        req.logger.info(`Pet updated.\r\n`);

        res.send({ status: "success", message: "pet updated" })

    } catch (error) {
        //req.logger.error(`${error.message}\r\n`);

        return next(error);
    }
};


const deletePet = async (req, res, next) => {

    try {
        const petId = req.params.pid;

        req.logger.debug(`> PETS Controller: Delete ${petId}...`);

        if (!mongoose.Types.ObjectId.isValid(petId)) {
            req.logger.debug(`> PETS Controller: Delete: Error en ID: ${petId}...`);
            req.logger.warning(`Invalid Pet.\r\n`);

            CustomError.createError("Error de ID", ERROR_MESSAGES.PET.INVALID_ID, { petId }, ERROR_TYPES.TIPO_DE_DATOS);
        }

        const pet = await petsService.getBy(petId);
        if (!pet) {
            req.logger.debug(`> PETS Controller: Delete: ID ${petId} not found...`);
            req.logger.warning(`Pet not found.\r\n`);

            CustomError.createError("Error al buscar mascota", ERROR_MESSAGES.PET.PET_NOT_FOUND, { petId }, ERROR_TYPES.NOT_FOUND);
        }

        const result = await petsService.delete(petId);

        req.logger.debug(`> Pet deleted: ${result}`);
        req.logger.info(`Pet deleted.\r\n`);

        res.send({ status: "success", message: "pet deleted" });

    } catch (error) {
        //req.logger.error(error.message);

        return next(error);
    }
};


export default {
    getAllPets,
    getPetById,
    createPet,
    updatePet,
    deletePet,
    createPetWithImage
}