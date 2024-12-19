import colors from 'colors';
import { logger } from '../utils/utils.js';

export default class PetDTO {
    static getPetInputFrom = (pet) => {
        
        logger.debug(`> PETS DTO...`);

        return {
            name: pet.name || '',
            specie: pet.specie || '',
            image: pet.image || '',
            birthDate: pet.birthDate || '12-30-2000',
            adopted: false,
            owner: pet.owner || null
        }
    }
}