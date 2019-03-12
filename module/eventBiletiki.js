const EventBiletiki = require('../models/eventBiletiki');
const BillboardBiletiki = require('../models/billboardBiletiki');
const format = require('./const').stringifyDateTime

const getIds = async () => {
    return await EventBiletiki.find().select('nameRu _id');
};

const getByCity = async (city) => {
    let today = new Date();
    return await EventBiletiki.find({city: city, active: 'on', realDate: {$elemMatch: { $gte: today }}});
};

const getPopular = async (city) => {
    let today = new Date();
    return await EventBiletiki.findRandom({city: city, popular: 'on', active: 'on', realDate: {$elemMatch: { $gte: today }}}).limit(20);
};

const getEventsByName = async (city, date, search) => {
    return await EventBiletiki.find({$or: [{nameRu: {'$regex': search, '$options': 'i'}}, {nameKg: {'$regex': search, '$options': 'i'}}], active: 'on', realDate: {$elemMatch: { $gte: date }}});
};

const getEvents = async (city, date, genre, skip) => {
    skip = parseInt(skip)*20;
    if(date===''&&!Array.isArray(date)) {
        date = new Date()
        console.log(date)
        return await EventBiletiki.find({city: city, genre: {'$regex': genre, '$options': 'i'}, active: 'on', realDate: {$elemMatch: { $gte: date }}}).skip(skip).limit(20);
    }
    let yesterday = date[0]
    let tomorrow = date[1]
    if(date[0]==date[1]) {
        yesterday = date[0].split('T')[0]+'T00:00:00.000Z'
        yesterday = new Date(yesterday)
        tomorrow = date[0].split('T')[0]+'T00:00:00.000Z'
        tomorrow = new Date(tomorrow)
        tomorrow.setDate(tomorrow.getDate() + 1)
    }
    console.log(yesterday , tomorrow)
    return await EventBiletiki.find({city: city, genre: {'$regex': genre, '$options': 'i'}, active: 'on', $and: [{realDate: {$gte: yesterday}}, {realDate: {$lte: tomorrow}}]}).skip(skip).limit(20);
};

const getEventBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'изображение',
            'название',
            'описание',
            'ысым',
            'баяндоо',
            'город',
            'где',
            'даты',
            'цены',
            'видео',
            'возраста',
            'жанр',
            'популярный',
            'активен',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        else if(sort[0]=='активен'&&sort[1]=='descending')
            sort = '-active';
        else if(sort[0]=='активен'&&sort[1]=='ascending')
            sort = 'active';
        else if(sort[0]=='популярный'&&sort[1]=='descending')
            sort = '-popular';
        else if(sort[0]=='популярный'&&sort[1]=='ascending')
            sort = 'popular';
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
        else if(sort[0]=='город'&&sort[1]=='descending')
            sort = '-city';
        else if(sort[0]=='город'&&sort[1]=='ascending')
            sort = 'city';
        else if(sort[0]=='баяндоо'&&sort[1]=='descending')
            sort = '-descriptionKg';
        else if(sort[0]=='баяндоо'&&sort[1]=='ascending')
            sort = 'descriptionKg';
        else if(sort[0]=='жанр'&&sort[1]=='descending')
            sort = '-genre';
        else if(sort[0]=='жанр'&&sort[1]=='ascending')
            sort = 'genre';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        if(search == ''){
            count = await EventBiletiki.count();
            findResult = await EventBiletiki
                .find()
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('active image nameRu city descriptionRu nameKg descriptionKg popular where date price video ageCategory genre updatedAt _id');
        } else {
            count = await EventBiletiki.count({
                $or: [
                    {_id: {'$regex': search, '$options': 'i'}},
                    {nameRu: {'$regex': search, '$options': 'i'}},
                    {nameKg: {'$regex': search, '$options': 'i'}},
                    {descriptionRu: {'$regex': search, '$options': 'i'}},
                    {descriptionKg: {'$regex': search, '$options': 'i'}},
                    {popular: {'$regex': search, '$options': 'i'}},
                    {genre: {'$regex': search, '$options': 'i'}}
                ]
            });
            findResult = await EventBiletiki.find({
                $or: [
                    {_id: {'$regex': search, '$options': 'i'}},
                    {nameRu: {'$regex': search, '$options': 'i'}},
                    {nameKg: {'$regex': search, '$options': 'i'}},
                    {descriptionRu: {'$regex': search, '$options': 'i'}},
                    {descriptionKg: {'$regex': search, '$options': 'i'}},
                    {popular: {'$regex': search, '$options': 'i'}},
                    {genre: {'$regex': search, '$options': 'i'}}
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('active image nameRu popular city descriptionRu nameKg descriptionKg where date price video ageCategory genre updatedAt _id');
        }
        for (let i=0; i<findResult.length; i++){
            let image=findResult[i].image.toString();
            while(image.includes(',http://'))
                image = image.replace(',http://', '\nhttp://');
            let where = ''
            if(findResult[i].where!=undefined){
                where = findResult[i].where
            }
            let active = ''
            if(findResult[i].active!=undefined){
                active = findResult[i].active
            }
            let city = ''
            if(findResult[i].city!=undefined){
                city = findResult[i].city
            }
            data.push([image, findResult[i].nameRu, findResult[i].descriptionRu, findResult[i].nameKg, findResult[i].descriptionKg, city, JSON.stringify(where), JSON.stringify(findResult[i].date), JSON.stringify(findResult[i].price), findResult[i].video, findResult[i].ageCategory, findResult[i].genre, findResult[i].popular, active, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addEventBiletiki = async (object) => {
    try{
        let _object = new EventBiletiki(object);
        await EventBiletiki.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setEventBiletiki = async (object, id) => {
    try{
        await EventBiletiki.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteEventBiletiki = async (id) => {
    try{
        await EventBiletiki.deleteMany({_id: {$in: id}});
        await BillboardBiletiki.deleteMany({event: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}
module.exports.getEventsByName = getEventsByName;
module.exports.getEvents = getEvents;
module.exports.getPopular = getPopular;
module.exports.getByCity = getByCity;
module.exports.getIds = getIds;
module.exports.deleteEventBiletiki = deleteEventBiletiki;
module.exports.getEventBiletiki = getEventBiletiki;
module.exports.setEventBiletiki = setEventBiletiki;
module.exports.addEventBiletiki = addEventBiletiki;