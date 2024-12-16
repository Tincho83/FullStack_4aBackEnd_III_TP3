import { Router } from 'express';
import mockingController from '../controllers/mocking.controller.js';
import { routerMOCKS } from '../middleware/ConsoleLog/routerConsoleLog.js';

const router = Router();

// con Middleware para mostrar en consola donde se ingresa

router.get('/mockingpets', routerMOCKS, mockingController.getPets_Mock);
router.get('/mockingusers', routerMOCKS, mockingController.getUsers_Mock);
router.post('/generateData', routerMOCKS, mockingController.generateData_Mock);

export default router;