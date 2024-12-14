import { Router } from 'express';
import adoptionsController from '../controllers/adoptions.controller.js';
import { routerADOPTIONS } from '../middleware/ConsoleLog/routerConsoleLog.js';

const router = Router();

router.get('/', routerADOPTIONS, adoptionsController.getAllAdoptions);
router.get('/:aid', routerADOPTIONS, adoptionsController.getAdoption);
router.post('/:uid/:pid', routerADOPTIONS, adoptionsController.createAdoption);

export default router;