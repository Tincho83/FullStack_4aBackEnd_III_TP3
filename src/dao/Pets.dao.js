import petModel from "./models/Pet.js";

export default class Pet {

    get = (params) => {

        console.log(`> PETS DAO: Get...`.blue);

        //return petModel.find(params)
        return petModel.find(params).lean();
    }

    getBy = (params) => {

        console.log(`> PETS DAO: Get By...`.blue);

        //return petModel.findOne(params);
        return petModel.findOne({ _id: params }).lean();
    }

    save = (doc) => {

        console.log(`> PETS DAO: Save...`.blue);

        return petModel.create(doc);
    }

    insertMany = (docs) => {

        console.log(`> Pets DAO: Insert Many...`.blue);

        return petModel.insertMany(docs);
    }

    update = (id, doc) => {

        console.log(`> PETS DAO: Update...`.blue);

        return petModel.findByIdAndUpdate(id, { $set: doc })
    }

    delete = (id) => {

        console.log(`> PETS DAO: Delete...`.blue);

        return petModel.findByIdAndDelete(id);
    }
}