import { logger } from "../utils/utils.js";
import petModel from "./models/Pet.js";


export default class Pet {

    get = (params) => {

        //console.log(`> PETS DAO: Get...`.blue);
        logger.debug(`> PETS DAO: Get...`);
        
        //return petModel.find(params)
        return petModel.find(params).lean();
    }

    getBy = (params) => {

        //console.log(`> PETS DAO: Get By...`.blue);
        logger.debug(`> PETS DAO: Get By ${params}...`);

        //return petModel.findOne(params);
        return petModel.findOne({ _id: params }).lean();
    }

    save = (doc) => {

        //console.log(`> PETS DAO: Save...`.blue);
        logger.debug(`> PETS DAO: Save...`);

        return petModel.create(doc);
    }

    insertMany = (docs) => {

        //console.log(`> Pets DAO: Insert Many...`.blue);
        logger.debug(`> PETS DAO: Insert Many...`);

        return petModel.insertMany(docs);
    }

    update = (id, doc) => {

        //console.log(`> PETS DAO: Update...`.blue);
        logger.debug(`> PETS DAO: Update ${id}...`);

        return petModel.findByIdAndUpdate(id, { $set: doc })
    }

    delete = (id) => {

        //console.log(`> PETS DAO: Delete...`.blue);
        logger.debug(`> PETS DAO: Delete ${id}...`);

        return petModel.findByIdAndDelete(id);
    }
}