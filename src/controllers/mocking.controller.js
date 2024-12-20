import PetDTO from "../dto/Pet.dto.js";
import { petsService, usersService } from "../services/index.js"
import { CustomError } from "../utils/ErrorsHandlers/CustomError.js";
import { ERROR_TYPES } from "../utils/ErrorsHandlers/EnumErrors.js";
import { ERROR_MESSAGES } from "../utils/ErrorsHandlers/ErrorMessages.js";
import __dirname from "../utils/index.js";
import { generatePet_Mock } from "../utils/utils.js";
import { generateUser_Mock } from "../utils/utils.js";
import colors from 'colors';
import multer from 'multer';
import path from 'path';
import mongoose from 'mongoose';
import { errorArgsPet, errorArgsUser } from "../utils/ErrorsHandlers/DataErrors.js";

const getPets_Mock = async (req, res) => {

    const { count = 100 } = req.query;

    req.logger.debug(`> MOCKS Controller: Get Mocks (${count} Pet's)...`);

    const pets = Array.from({ length: count }, () => generatePet_Mock());
    req.logger.info(`> Get Mocks (${count} Pet's)...\r\n`);
    res.send({ status: "success", payload: pets });
};

const getUsers_Mock = async (req, res) => {

    const { count = 32 } = req.query; 

    req.logger.debug(`> MOCKS Controller: Get Mocks (${count} User's)...`);

    const users = Array.from({ length: count }, () => generateUser_Mock());
    req.logger.info(`> Get Mocks (${count} User's)...\r\n`);
    res.send({ status: "success", payload: users });
};

const generateData_Mock = async (req, res, next) => {

    req.logger.debug(`> MOCKS Controller: GenerateData: Get Mocks User's and Pet's...`);

    let { users, pets } = req.query;
    req.logger.debug(`> Mock from query: users: ${users}, pets: ${pets}`);

    if (!users || !pets) {
       
        ({ users = 25, pets = 25 } = req.body);
        req.logger.debug(`> Body Users: ${users}, Pets: ${pets}`);
    }

    try {
        req.logger.debug(`> MOCKS Controller: Generate Mocks ${users} User's...`);
        const generatedUsers = Array.from({ length: users }, () => generateUser_Mock());
        await usersService.insertMany(generatedUsers);
        req.logger.info(`> Mocks Generated (${users} User's)...\r\n`);

        req.logger.debug(`> MOCKS Controller: Generate Mocks ${pets} Pet's...`);
        const generatedPets = Array.from({ length: pets }, () => generatePet_Mock());
        await petsService.insertMany(generatedPets);
        req.logger.info(`> Mocks Generated (${pets} Pet's)...\r\n`);

        //res.send({ status: "success", payload: pets });
        res.send({ status: "success", message: "Datos generados e insertados correctamente", users: generatedUsers.length, pets: generatedPets.length });
    } catch (error) {
        req.logger.error(`Error al insertar datos de prueba: ${error.message}`);
        res.status(500).send({ status: "error", message: "Error al insertar datos en la base de datos" });
        return next(error);
    }

};



export default {
    getPets_Mock,
    getUsers_Mock,
    generateData_Mock
}