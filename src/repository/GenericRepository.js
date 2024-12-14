import colors from 'colors';

export default class GenericRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getAll = (params) =>{

        console.log(`> Generic Repository: Get All...`.blue);

        return this.dao.get(params);
    }

    getBy = (params) =>{

        console.log(`> Generic Repository: Get By...`.blue);

        return this.dao.getBy(params);
    }

    create = (doc) =>{

        console.log(`> Generic Repository: Create...`.blue);

        return this.dao.save(doc);
    }

    insertMany = (docs) => {

        console.log(`> Generic Repository: Insert Many...`.blue);
        
        return this.dao.insertMany(docs);
    }

    update = (id,doc) =>{

        console.log(`> Generic Repository: Update...`.blue);

        return this.dao.update(id,doc);
    }

    delete = (id) =>{

        console.log(`> Generic Repository: Delete...`.blue);

        return this.dao.delete(id);
    }
}