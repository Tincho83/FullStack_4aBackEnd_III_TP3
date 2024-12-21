import { Router } from "express";
import { logger } from "../utils/utils.js";

const router = Router();

router.get("/loggerTest", (req, res) => {

    logger.debug("Log de nivel DEBUG");
    logger.http("Log de nivel HTTP");
    logger.info("Log de nivel INFO");
    logger.warning("Log de nivel WARNING");
    logger.error("Log de nivel ERROR");
    logger.fatal("Log de nivel FATAL");

    res.send("Logs (debug, http, info, warning, error, fatal) generados correctamente. Revisar la consola y archivo de registo errors.log.");
});

export default router;
