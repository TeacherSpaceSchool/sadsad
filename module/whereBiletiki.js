const WhereBiletiki = require('../models/whereBiletiki');
const format = require('./const').stringifyDateTime
const mongoose = require('mongoose');

const getClientByName = async (name) => {
    return await WhereBiletiki.findOne({nameRu: name});
}

const getClient = async () => {
    return await WhereBiletiki.find();
}

const getIds = async (city) => {
    if(city!==undefined&&city.length>0)
        return await WhereBiletiki.find({city: city}).select('nameRu _id')
    else
        return []
}

const getCity = async () => {
    return await WhereBiletiki.find().distinct('city')
}

const getWhereBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'изображение',
            'название',
            'ысым',
            'адрес',
            'город',
            'координаты',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        else if(sort[0]=='название'&&sort[1]=='descending')
            sort = '-nameRu';
        else if(sort[0]=='название'&&sort[1]=='ascending')
            sort = 'nameRu';
        else if(sort[0]=='описание'&&sort[1]=='descending')
            sort = '-descriptionRu';
        else if(sort[0]=='описание'&&sort[1]=='ascending')
            sort = 'descriptionRu';
        else if(sort[0]=='ысым'&&sort[1]=='descending')
            sort = '-nameKg';
        else if(sort[0]=='ысым'&&sort[1]=='ascending')
            sort = 'nameKg';
        else if(sort[0]=='баяндоо'&&sort[1]=='descending')
            sort = '-descriptionKg';
        else if(sort[0]=='баяндоо'&&sort[1]=='ascending')
            sort = 'descriptionKg';
        else if(sort[0]=='адрес'&&sort[1]=='descending')
            sort = '-address';
        else if(sort[0]=='адрес'&&sort[1]=='ascending')
            sort = 'address';
        else if(sort[0]=='город'&&sort[1]=='descending')
            sort = '-city';
        else if(sort[0]=='город'&&sort[1]=='ascending')
            sort = 'city';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        if(search == ''){
            count = await WhereBiletiki.count();
            findResult = await WhereBiletiki
                .find()
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('nameRu city nameKg image address coords updatedAt _id');
        } else if (mongoose.Types.ObjectId.isValid(search)) {
            count = await WhereBiletiki.count({
                $or: [
                    {_id: search},
                    {nameRu: {'$regex': search, '$options': 'i'}},
                    {nameKg: {'$regex': search, '$options': 'i'}},
                    {city: {'$regex': search, '$options': 'i'}},
                    {descriptionRu: {'$regex': search, '$options': 'i'}},
                    {descriptionKg: {'$regex': search, '$options': 'i'}},
                    {address: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await WhereBiletiki.find({
                $or: [
                    {_id: search},
                    {city: {'$regex': search, '$options': 'i'}},
                    {nameRu: {'$regex': search, '$options': 'i'}},
                    {nameKg: {'$regex': search, '$options': 'i'}},
                    {descriptionRu: {'$regex': search, '$options': 'i'}},
                    {descriptionKg: {'$regex': search, '$options': 'i'}},
                    {address: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('city nameRu nameKg image address coords updatedAt _id');
        } else {
            count = await WhereBiletiki.count({
                $or: [
                    {nameRu: {'$regex': search, '$options': 'i'}},
                    {nameKg: {'$regex': search, '$options': 'i'}},
                    {city: {'$regex': search, '$options': 'i'}},
                    {descriptionRu: {'$regex': search, '$options': 'i'}},
                    {descriptionKg: {'$regex': search, '$options': 'i'}},
                    {address: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await WhereBiletiki.find({
                $or: [
                    {city: {'$regex': search, '$options': 'i'}},
                    {nameRu: {'$regex': search, '$options': 'i'}},
                    {nameKg: {'$regex': search, '$options': 'i'}},
                    {descriptionRu: {'$regex': search, '$options': 'i'}},
                    {descriptionKg: {'$regex': search, '$options': 'i'}},
                    {address: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('city nameRu nameKg image address coords updatedAt _id');
        }
        for (let i=0; i<findResult.length; i++){
            let image = ''
            if(findResult[i].image!=undefined){
                image=findResult[i].image.toString();
            }
            while(image.includes(',http://'))
                image = image.replace(',http://', '\nhttp://');
            data.push([image, findResult[i].nameRu, findResult[i].nameKg, findResult[i].address, findResult[i].city, findResult[i].coords, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addWhereBiletiki = async (object) => {
    try{
        let _object = new WhereBiletiki(object);
        await WhereBiletiki.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setWhereBiletiki = async (object, id) => {
    try{
        await WhereBiletiki.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteWhereBiletiki = async (id) => {
    try{
        await WhereBiletiki.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getClientByName = getClientByName;
module.exports.getIds = getIds;
module.exports.getClient = getClient;
module.exports.getCity = getCity;
module.exports.deleteWhereBiletiki = deleteWhereBiletiki;
module.exports.getWhereBiletiki = getWhereBiletiki;
module.exports.setWhereBiletiki = setWhereBiletiki;
module.exports.addWhereBiletiki = addWhereBiletiki;