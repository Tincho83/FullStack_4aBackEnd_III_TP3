import adoptionModel from "./models/Adoption.js";

export default class Adoption {

    get = (params) => {

        console.log(`> ADOPTIONS DAO: Get...`.blue);

        return adoptionModel.find(params);
    }

    getBy = (params) => {

        console.log(`> ADOPTIONS DAO: Get By...`.blue);

        return adoptionModel.findOne(params);
    }

    save = (doc) => {

        console.log(`> ADOPTIONS DAO: Save...`.blue);

        return adoptionModel.create(doc);
    }

    update = (id, doc) => {

        console.log(`> ADOPTIONS DAO: Update...`.blue);

        return adoptionModel.findByIdAndUpdate(id, { $set: doc })
    }

    delete = (id) => {

        console.log(`> ADOPTIONS DAO: Delete...`.blue);

        return adoptionModel.findByIdAndDelete(id);
    }
}