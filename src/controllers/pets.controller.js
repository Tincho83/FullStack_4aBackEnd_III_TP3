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
        res.send({ status: "success", payload: pets })
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};


const getPetById = async (req, res) => {

    try {
        const { pid } = req.params;

        req.logger.debug(`> PETS Controller: Get ${pid}...`);

        if (!mongoose.Types.ObjectId.isValid(pid)) {
            //throw new Error('El ID proporcionado no es válido');
            CustomError.createError("Error de ID", ERROR_MESSAGES.PET.INVALID_ID, { pid }, ERROR_TYPES.TIPO_DE_DATOS);
        }

        const pet = await petsService.getBy(pid);

        if (!pet) {
            CustomError.createError("Error al buscar mascota", ERROR_MESSAGES.PET.PET_NOT_FOUND, { pid }, ERROR_TYPES.PET_NOT_FOUND);
        }

        res.send({ status: "success", payload: pet });

    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};

const createPet = async (req, res) => {

    req.logger.debug(`> PETS Controller: Create...`);

    const { name, specie, birthDate } = req.body;
    if (!name || !specie || !birthDate) {
        return res.status(400).send({ status: "error", error: "Incomplete values" })
    }

    const pet = PetDTO.getPetInputFrom({ name, specie, birthDate });
    const result = await petsService.create(pet);

    res.send({ status: "success", payload: result })
};


const createPetWithImage = async (req, res) => {

    req.logger.debug(`> PETS Controller: Create with image...`);

    const file = req.file;
    const { name, specie, birthDate, image } = req.body;

    if (!name || !specie || !birthDate || !file) {
        return res.status(400).send({ status: "error", error: "Incomplete values" })
    }

    const pet = PetDTO.getPetInputFrom({ name, specie, birthDate, image: `${__dirname}/../public/img/${file.filename}` });

    const result = await petsService.create(pet);
    res.send({ status: "success", payload: result })
};


const updatePet = async (req, res) => {

    const petUpdateBody = req.body;
    const petId = req.params.pid;

    req.logger.debug(`> PETS Controller: Update ${petId}...`);

    const result = await petsService.update(petId, petUpdateBody);
    res.send({ status: "success", message: "pet updated" })
};


const deletePet = async (req, res) => {

    const petId = req.params.pid;

    req.logger.debug(`> PETS Controller: Delete ${petId}...`);


    const result = await petsService.delete(petId);
    res.send({ status: "success", message: "pet deleted" });
};


export default {
    getAllPets,
    getPetById,
    createPet,
    updatePet,
    deletePet,
    createPetWithImage
}