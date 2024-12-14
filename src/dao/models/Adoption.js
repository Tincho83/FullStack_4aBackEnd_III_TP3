import mongoose from "mongoose";
import { config } from '../../config/config.js';

const adopColl = config.MONGO_COLLADOPNAME;

const adopSchema = new mongoose.Schema({
    owner:{ type:mongoose.SchemaTypes.ObjectId, ref:'Users' },
    pet:{   type:mongoose.SchemaTypes.ObjectId, ref:'Pets' }
})

const adoptionModel = mongoose.model(adopColl,adopSchema);

export default adoptionModel;