import userModel from "./models/User.js";


export default class Users {

    get = (params) => {

        console.log(`> USERS DAO: Get...`.blue);

        return userModel.find(params);
    }

    getBy = (params) => {

        console.log(`> USERS DAO: GetBy...`.blue);

        return userModel.findOne(params);
    }

    save = (doc) => {

        console.log(`> USERS DAO: Save...`.blue);

        return userModel.create(doc);
    }

    insertMany = (docs) => {

        console.log(`> Users DAO: Insert Many...`.blue);

        return userModel.insertMany(docs);
    }

    update = (id, doc) => {

        console.log(`> USERS DAO: Update...`.blue);


        return userModel.findByIdAndUpdate(id, { $set: doc })
    }

    delete = (id) => {

        console.log(`> USERS DAO: Delete...`.blue);

        return userModel.findByIdAndDelete(id);
    }
}