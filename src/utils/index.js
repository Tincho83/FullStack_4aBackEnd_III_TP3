import bcrypt from 'bcrypt';
import {fileURLToPath} from 'url';
import { dirname } from 'path';

/*
export const createHash = async(password) =>{
    const salts = await bcrypt.genSalt(11);
    return bcrypt.hash(password,salts);
}


*/


export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(11));
};

export const isValidPassword = (pass, hash) => {
    return bcrypt.compareSync(pass, hash);
};


export const passwordValidation = async(user,password) => bcrypt.compare(password,user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;