import { adoptionsService, petsService, usersService } from "../services/index.js"

const getAllAdoptions = async(req,res)=>{

    req.logger.debug(`> ADOPTIONS Controller: Get All...`);

    const result = await adoptionsService.getAll();
    res.send({status:"success",payload:result})
}

const getAdoption = async(req,res)=>{

    req.logger.debug(`> ADOPTIONS Controller: Get...`);

    const adoptionId = req.params.aid;
    const adoption = await adoptionsService.getBy({_id:adoptionId})
    if(!adoption) { 
        return res.status(404).send({status:"error",error:"Adoption not found"})
    }

    res.send({status:"success",payload:adoption})
}

const createAdoption = async(req,res)=>{

    req.logger.debug(`> ADOPTIONS Controller: Create...`);

    const {uid,pid} = req.params;
    const user = await usersService.getUserById(uid);
    if(!user) { 
        return res.status(404).send({status:"error", error:"user Not found"});
    }

    const pet = await petsService.getBy({_id:pid});
    if(!pet) {
        return res.status(404).send({status:"error",error:"Pet not found"});
    }
    
    if(pet.adopted) {
        return res.status(400).send({status:"error",error:"Pet is already adopted"});
    }
    
    user.pets.push(pet._id);
    await usersService.update(user._id,{pets:user.pets})
    await petsService.update(pet._id,{adopted:true,owner:user._id})
    await adoptionsService.create({owner:user._id,pet:pet._id})
    res.send({status:"success",message:"Pet adopted"})
}

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption
}