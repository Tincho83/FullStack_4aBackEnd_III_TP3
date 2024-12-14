import colors from 'colors';

import GenericRepository from "./GenericRepository.js";

export default class PetRepository extends GenericRepository {
    constructor(dao) {

        console.log(`> DAO...`.blue);

        super(dao);
    }
}