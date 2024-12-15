import colors from 'colors';
import { logger } from '../utils/utils.js';

export default class GenericRepository {
    constructor(dao) {
        this.dao = dao;

    }

    getAll = (params) => {

        //console.log(`> Generic Repository: Get All...`.blue);        
        logger.debug(`> Generic Repository: Get All...`);

        return this.dao.get(params);
    }

    getBy = (params) => {

        //console.log(`> Generic Repository: Get By...`.blue);        
        logger.debug(`> Generic Repository: Get By ${params}...`);

        return this.dao.getBy(params);
    }

    create = (doc) => {

        //console.log(`> Generic Repository: Create...`.blue);        
        logger.debug(`> Generic Repository: Create...`);

        return this.dao.save(doc);
    }

    insertMany = (docs) => {

        //console.log(`> Generic Repository: Insert Many...`.blue);        
        logger.debug(`> Generic Repository:  Insert Many...`);

        return this.dao.insertMany(docs);
    }

    update = (id, doc) => {

        //console.log(`> Generic Repository: Update...`.blue);        
        logger.debug(`> Generic Repository: Update ${id}...`);

        return this.dao.update(id, doc);
    }

    delete = (id) => {

        //console.log(`> Generic Repository: Delete...`.blue);       
        logger.debug(`> Generic Repository: Delete ${id}...`);

        return this.dao.delete(id);
    }
}