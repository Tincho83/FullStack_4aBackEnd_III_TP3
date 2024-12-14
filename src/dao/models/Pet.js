import mongoose from 'mongoose';
import { config } from '../../config/config.js';

const petsColl = config.MONGO_COLLPETSNAME;

const petsSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        specie: { type: String, required: true },
        birthDate: Date,
        adopted: { type: Boolean, default: false },
        owner: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Users'
        },
        image: String
    },
    {
        timestamps: true
    }
)

const petModel = mongoose.model(petsColl, petsSchema);

export default petModel;