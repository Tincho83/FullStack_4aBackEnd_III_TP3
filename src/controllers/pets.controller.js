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

    console.log(`> PETS Controller: Get All...`.blue);

    try {
        const pets = await petsService.getAll();
        res.send({ status: "success", payload: pets })
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};


const getPetById = async (req, res) => {

    console.log(`> PETS Controller: Get...`.blue);

    try {
        const { pid } = req.params;

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

/*
const getPets_Mock = async (req, res) => {

    const { count = 100 } = req.query; // Número de mascotas (parámetro opcional, por defecto 100)

    console.log(`> PETS Controller: Get Mocks (${count} Pet's)...`.blue);

    const pets = Array.from({ length: count }, () => generatePet_Mock());
    res.send({ status: "success", payload: pets });
};
*/

const createPet = async (req, res) => {

    console.log(`> PETS Controller: Create...`.blue);

    const { name, specie, birthDate } = req.body;
    if (!name || !specie || !birthDate) {
        return res.status(400).send({ status: "error", error: "Incomplete values" })
    }

    const pet = PetDTO.getPetInputFrom({ name, specie, birthDate });
    const result = await petsService.create(pet);

    res.send({ status: "success", payload: result })
};


const createPetWithImage = async (req, res) => {

    console.log(`> PETS Controller: Create with image...`.blue);

    const file = req.file;
    const { name, specie, birthDate } = req.body;
    if (!name || !specie || !birthDate || !file) {
        return res.status(400).send({ status: "error", error: "Incomplete values" })
    }

    //console.log(file);
    const pet = PetDTO.getPetInputFrom({ name, specie, birthDate, image: `${__dirname}/../public/img/${file.filename}` });

    //console.log(pet);

    const result = await petsService.create(pet);
    res.send({ status: "success", payload: result })
};


const updatePet = async (req, res) => {

    console.log(`> PETS Controller: Update...`.blue);

    const petUpdateBody = req.body;
    const petId = req.params.pid;
    const result = await petsService.update(petId, petUpdateBody);
    res.send({ status: "success", message: "pet updated" })
};


const deletePet = async (req, res) => {

    console.log(`> PETS Controller: Delete...`.blue);

    const petId = req.params.pid;
    const result = await petsService.delete(petId);
    res.send({ status: "success", message: "pet deleted" });
};


export default {
    getAllPets,
    getPetById,
    //getPets_Mock,
    createPet,
    updatePet,
    deletePet,
    createPetWithImage
}