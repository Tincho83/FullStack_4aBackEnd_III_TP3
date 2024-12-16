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


const getPets_Mock = async (req, res) => {

    const { count = 100 } = req.query; // Nro de mascotas, por defecto 100

    console.log(`> MOCKS Controller: Get Mocks (${count} Pet's)...`.blue);

    const pets = Array.from({ length: count }, () => generatePet_Mock());
    res.send({ status: "success", payload: pets });
};

const getUsers_Mock = async (req, res) => {

    const { count = 50 } = req.query; // Nro de usuarios, por defecto 50

    console.log(`> MOCKS Controller: Get Mocks (${count} User's)...`.blue);

    const users = Array.from({ length: count }, () => generateUser_Mock());
    res.send({ status: "success", payload: users });
};

const generateData_Mock = async (req, res) => {

    let { users, pets } = req.query;
    console.log(`**Query users: ${users}, pets: ${pets}`);

    if (!users || !pets) {

        // Nro de mascotas, por defecto 25 || Nro de usuarios, por defecto 25
        ({ users = 25, pets = 25 } = req.body);
        console.log(`**users Body: ${users}, pets: ${pets}`);
    }

    console.log(`> MOCKS Controller: Get Mocks ${users} User's and ${pets} Pet's...`.blue);
    //console.log(`> MOCKS Controller: Get Mocks (${count} User's)...`.blue);

    try {
        // Insertar en MongoDB

        //console.log(generatedUsers);
        //const users = Array.from({ length: count }, () => generateUser_Mock());
        const generatedUsers = Array.from({ length: users }, () => generateUser_Mock());
        await usersService.insertMany(generatedUsers);

        const generatedPets = Array.from({ length: pets }, () => generatePet_Mock());
        await petsService.insertMany(generatedPets);

        //res.send({ status: "success", payload: pets });
        res.send({ status: "success", message: "Datos generados e insertados correctamente", users: generatedUsers.length, pets: generatedPets.length });
    } catch (error) {
        console.error(`Error al insertar datos de prueba: ${error.message}`.red);
        res.status(500).send({ status: "error", message: "Error al insertar datos en la base de datos" });
    }

};



export default {
    getPets_Mock,
    getUsers_Mock,
    generateData_Mock
}