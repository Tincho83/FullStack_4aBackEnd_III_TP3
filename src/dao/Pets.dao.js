import { logger } from "../utils/utils.js";
import petModel from "./models/Pet.js";


export default class Pet {

    get = (params) => {
        
        logger.debug(`> PETS DAO: Get...`);

        return petModel.find(params).lean();
    }

    getBy = (params) => {

        logger.debug(`> PETS DAO: Get By ${params}...`);

        return petModel.findOne({ _id: params }).lean();
    }

    save = (doc) => {

        logger.debug(`> PETS DAO: Save...`);

        return petModel.create(doc);
    }

    insertMany = (docs) => {

        logger.debug(`> PETS DAO: Insert Many...`);

        return petModel.insertMany(docs);
    }

    update = (id, doc) => {

        logger.debug(`> PETS DAO: Update ${id}...`);

        return petModel.findByIdAndUpdate(id, { $set: doc })
    }

    delete = (id) => {
 
        logger.debug(`> PETS DAO: Delete ${id}...`);

        return petModel.findByIdAndDelete(id);
    }
}