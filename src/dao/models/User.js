import mongoose from 'mongoose';
import { config } from '../../config/config.js';

const usersColl = config.MONGO_COLLUSERSNAME;

const usersSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: 'user' },
        pets: {
            type: [
                {
                    _id: {
                        type: mongoose.SchemaTypes.ObjectId,
                        ref: 'pets'
                    }
                }
            ],
            default: []
        }
    },
    {
        timestamps: true
    })

const userModel = mongoose.model(usersColl, usersSchema);

export default userModel;