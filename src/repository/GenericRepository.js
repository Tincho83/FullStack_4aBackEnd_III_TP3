import { logger } from '../utils/utils.js';

export default class GenericRepository {
    constructor(dao) {
        this.dao = dao;

    }

    getAll = (params) => {

        logger.debug(`> Generic Repository: Get All...`);

        return this.dao.get(params);
    }

    getBy = (params) => {

        logger.debug(`> Generic Repository: Get By ID...`);

        return this.dao.getBy(params);
    }

    create = (doc) => {

        logger.debug(`> Generic Repository: Create...`);

        return this.dao.save(doc);
    }

    insertMany = (docs) => {

        logger.debug(`> Generic Repository:  Insert Many...`);

        return this.dao.insertMany(docs);
    }

    update = (id, doc) => {

        logger.debug(`> Generic Repository: Update ${id}...`);

        return this.dao.update(id, doc);
    }

    delete = (id) => {

        logger.debug(`> Generic Repository: Delete ${id}...`);

        return this.dao.delete(id);
    }
}