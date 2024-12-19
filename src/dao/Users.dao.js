import { logger } from "../utils/utils.js";
import userModel from "./models/User.js";


export default class Users {

    get = (params) => {

        logger.debug(`> USERS DAO: Get...`);

        return userModel.find(params);
    }

    getBy = (params) => {

        logger.debug(`> USERS DAO: GetBy...`);

        return userModel.findOne(params);
    }

    save = (doc) => {

        logger.debug(`> USERS DAO: Save...`);

        return userModel.create(doc);
    }

    insertMany = (docs) => {

        logger.debug(`> USERS DAO: Insert Many...`);

        return userModel.insertMany(docs);
    }

    update = (id, doc) => {

        logger.debug(`> USERS DAO: Update...`);

        return userModel.findByIdAndUpdate(id, { $set: doc })
    }

    delete = (id) => {
        
        logger.debug(`> USERS DAO: Delete...`);

        return userModel.findByIdAndDelete(id);
    }
}