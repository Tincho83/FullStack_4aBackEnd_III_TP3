import colors from 'colors';
import { logger } from '../utils/utils.js';


import GenericRepository from "./GenericRepository.js";

export default class PetRepository extends GenericRepository {
    constructor(dao) {

        //console.log(`> DAO...`.blue);
        logger.debug(`> DAO...`);

        super(dao);
    }
}