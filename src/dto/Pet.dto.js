import colors from 'colors';

export default class PetDTO {
    static getPetInputFrom = (pet) => {

        console.log(`> PETS DTO...`.blue);

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