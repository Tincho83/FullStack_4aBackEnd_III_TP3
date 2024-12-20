import { Router } from "express";
import { logger } from "../utils/utils.js";

const router = Router();

router.get("/loggerTest", (req, res) => {

    logger.debug("Esto es un log de nivel DEBUG");
    logger.http("Esto es un log de nivel HTTP");
    logger.info("Esto es un log de nivel INFO");
    logger.warning("Esto es un log de nivel WARNING");
    logger.error("Esto es un log de nivel ERROR");
    logger.fatal("Esto es un log de nivel FATAL");

    res.send("Logs (debug, http, info, warning, error, fatal) generados correctamente. Revisa la consola y archivos.");
});

export default router;
