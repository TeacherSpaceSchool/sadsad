const AboutBiletiki = require('../models/aboutBiletiki');
const format = require('./const').stringifyDateTime ;

const getClient = async () => {
    return await AboutBiletiki.findOne();
}

const getAboutBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'описание',
            'баяндоо',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        else if(sort[0]=='описание'&&sort[1]=='descending')
            sort = '-descriptionRu';
        else if(sort[0]=='описание'&&sort[1]=='ascending')
            sort = 'descriptionRu';
        else if(sort[0]=='баяндо'&&sort[1]=='descending')
            sort = '-descriptionKg';
        else if(sort[0]=='баяндо'&&sort[1]=='ascending')
            sort = 'descriptionKg';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        if(search == ''){
            count = await AboutBiletiki.count();
            findResult = await AboutBiletiki
                .find()
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('descriptionRu descriptionKg updatedAt _id');
        } else {
            count = await AboutBiletiki.count({
                $or: [
                    {_id: {'$regex': search, '$options': 'i'}},
                    {descriptionRu: {'$regex': search, '$options': 'i'}},
                    {descriptionKg: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await AboutBiletiki.find({
                $or: [
                    {_id: {'$regex': search, '$options': 'i'}},
                    {descriptionRu: {'$regex': search, '$options': 'i'}},
                    {descriptionKg: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('descriptionRu descriptionKg updatedAt _id');
        }
        for (let i=0; i<findResult.length; i++){
            data.push([findResult[i].descriptionRu, findResult[i].descriptionKg, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addAboutBiletiki = async (object) => {
    try{
        if(await AboutBiletiki.count()===0){
            let _object = new AboutBiletiki(object);
            await AboutBiletiki.create(_object);
        }
    } catch(error) {
        console.error(error)
    }
}

const setAboutBiletiki = async (object, id) => {
    try{
        await AboutBiletiki.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteAboutBiletiki = async (id) => {
    try{
        await AboutBiletiki.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getClient = getClient;
module.exports.deleteAboutBiletiki = deleteAboutBiletiki;
module.exports.getAboutBiletiki = getAboutBiletiki;
module.exports.setAboutBiletiki = setAboutBiletiki;
module.exports.addAboutBiletiki = addAboutBiletiki;