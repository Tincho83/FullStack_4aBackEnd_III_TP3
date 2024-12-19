import { logger } from "../utils/utils.js";
import adoptionModel from "./models/Adoption.js";

export default class Adoption {

    get = (params) => {

        logger.debug(`> ADOPTIONS DAO: Get...`);

        return adoptionModel.find(params);
    }

    getBy = (params) => {

        logger.debug(`> ADOPTIONS DAO: Get By...`);

        return adoptionModel.findOne(params);
    }

    save = (doc) => {

        logger.debug(`> ADOPTIONS DAO: Save...`);

        return adoptionModel.create(doc);
    }

    update = (id, doc) => {

        logger.debug(`> ADOPTIONS DAO: Update...`);

        return adoptionModel.findByIdAndUpdate(id, { $set: doc })
    }

    delete = (id) => {

        logger.debug(`> ADOPTIONS DAO: Delete...`);

        return adoptionModel.findByIdAndDelete(id);
    }
}