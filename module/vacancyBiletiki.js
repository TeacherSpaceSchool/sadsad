const VacancyBiletiki = require('../models/vacancyBiletiki');
const format = require('./const').stringifyDateTime

const getClient = async () => {
    return await VacancyBiletiki.find();
}

const getVacancyBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'название',
            'обязанности',
            'требования',
            'условия',
            'ысым',
            'милдеттери',
            'талаптар',
            'шарттары',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        else if(sort[0]=='название'&&sort[1]=='descending')
            sort = '-nameRu';
        else if(sort[0]=='название'&&sort[1]=='ascending')
            sort = 'nameRu';
        else if(sort[0]=='обязанности'&&sort[1]=='descending')
            sort = '-requirementsRu';
        else if(sort[0]=='обязанности'&&sort[1]=='ascending')
            sort = 'requirementsRu';
        else if(sort[0]=='требования'&&sort[1]=='descending')
            sort = '-dutiesRu';
        else if(sort[0]=='требования'&&sort[1]=='ascending')
            sort = 'dutiesRu';
        else if(sort[0]=='условия'&&sort[1]=='descending')
            sort = '-conditionsRu';
        else if(sort[0]=='условия'&&sort[1]=='ascending')
            sort = 'conditionsRu';
        else if(sort[0]=='ысым'&&sort[1]=='descending')
            sort = '-nameKg';
        else if(sort[0]=='ысым'&&sort[1]=='ascending')
            sort = 'nameKg';
        else if(sort[0]=='милдеттери'&&sort[1]=='descending')
            sort = '-requirementsKg';
        else if(sort[0]=='милдеттери'&&sort[1]=='ascending')
            sort = 'requirementsKg';
        else if(sort[0]=='талаптар'&&sort[1]=='descending')
            sort = '-dutiesKg';
        else if(sort[0]=='талаптар'&&sort[1]=='ascending')
            sort = 'dutiesKg';
        else if(sort[0]=='шарттары'&&sort[1]=='descending')
            sort = '-conditionsKg';
        else if(sort[0]=='шарттары'&&sort[1]=='ascending')
            sort = 'conditionsKg';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        if(search == ''){
            count = await VacancyBiletiki.count();
            findResult = await VacancyBiletiki
                .find()
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('nameRu requirementsRu dutiesRu conditionsRu nameKg requirementsKg dutiesKg conditionsKg updatedAt _id');
        } else {
            count = await VacancyBiletiki.count({
                $or: [
                    {nameRu: {'$regex': search, '$options': 'i'}},
                    {requirementsRu: {'$regex': search, '$options': 'i'}},
                    {dutiesRu: {'$regex': search, '$options': 'i'}},
                    {conditionsRu: {'$regex': search, '$options': 'i'}},
                    {nameKg: {'$regex': search, '$options': 'i'}},
                    {requirementsKg: {'$regex': search, '$options': 'i'}},
                    {dutiesKg: {'$regex': search, '$options': 'i'}},
                    {conditionsKg: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await VacancyBiletiki.find({
                $or: [
                    {nameRu: {'$regex': search, '$options': 'i'}},
                    {requirementsRu: {'$regex': search, '$options': 'i'}},
                    {dutiesRu: {'$regex': search, '$options': 'i'}},
                    {conditionsRu: {'$regex': search, '$options': 'i'}},
                    {nameKg: {'$regex': search, '$options': 'i'}},
                    {requirementsKg: {'$regex': search, '$options': 'i'}},
                    {dutiesKg: {'$regex': search, '$options': 'i'}},
                    {conditionsKg: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('nameRu requirementsRu dutiesRu conditionsRu nameKg requirementsKg dutiesKg conditionsKg updatedAt _id');
        }
        for (let i=0; i<findResult.length; i++){
            data.push([findResult[i].nameRu, findResult[i].requirementsRu, findResult[i].dutiesRu, findResult[i].conditionsRu, findResult[i].nameKg, findResult[i].requirementsKg, findResult[i].dutiesKg, findResult[i].conditionsKg, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addVacancyBiletiki = async (object) => {
    try{
        let _object = new VacancyBiletiki(object);
        await VacancyBiletiki.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setVacancyBiletiki = async (object, id) => {
    try{
        await VacancyBiletiki.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteVacancyBiletiki = async (id) => {
    try{
        await VacancyBiletiki.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getClient = getClient;
module.exports.deleteVacancyBiletiki = deleteVacancyBiletiki;
module.exports.getVacancyBiletiki = getVacancyBiletiki;
module.exports.setVacancyBiletiki = setVacancyBiletiki;
module.exports.addVacancyBiletiki = addVacancyBiletiki;