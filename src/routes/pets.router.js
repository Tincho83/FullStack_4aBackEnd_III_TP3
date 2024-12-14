import { Router } from 'express';
import petsController from '../controllers/pets.controller.js';
import uploader from '../utils/uploader.js';
import colors from 'colors';
import { routerPETS } from '../middleware/ConsoleLog/routerConsoleLog.js';

const router = Router();

//router.get('/mockingpets', routerPETS, petsController.getPets_Mock);
router.get('/', routerPETS, petsController.getAllPets);
router.get('/:pid', routerPETS, petsController.getPetById);
router.post('/', routerPETS, petsController.createPet); 
router.post('/withimage', routerPETS, uploader.single('image'), petsController.createPetWithImage);
router.put('/:pid', routerPETS, petsController.updatePet);
router.delete('/:pid', routerPETS, petsController.deletePet);

export default router;