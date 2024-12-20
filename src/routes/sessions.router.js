import { Router } from 'express';
import sessionsController from '../controllers/sessions.controller.js';
import { routerSESSIONS } from '../middleware/ConsoleLog/routerConsoleLog.js';

const router = Router();

router.post('/register', routerSESSIONS, sessionsController.register);
router.post('/login', routerSESSIONS, sessionsController.login);
router.get('/current', routerSESSIONS, sessionsController.current);
router.get('/unprotectedLogin', routerSESSIONS, sessionsController.unprotectedLogin);
router.get('/unprotectedCurrent', routerSESSIONS, sessionsController.unprotectedCurrent);

export default router;