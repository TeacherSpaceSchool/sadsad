const EventBiletiki = require('../models/eventBiletiki');
const BillboardBiletiki = require('../models/billboardBiletiki');
const format = require('./const').stringifyDateTime
const mongoose = require('mongoose');
const abc = require('./seats').abc

const getIds = async () => {
    return await EventBiletiki.find().select('nameRu _id');
};

const getByCity = async (city) => {
    let today = new Date();
    return await EventBiletiki.find({city: city, active: 'on', realDate: {$elemMatch: { $gte: today }}});
};

const getByCityOrganizator = async (city, user) => {
    let today = new Date();
    console.log(user)
    return await EventBiletiki.find({organizators: {'$regex': user.email, '$options': 'i'},city: city, active: 'on', realDate: {$elemMatch: { $gte: today }}});
};

const getPopular = async (city) => {
    let today = new Date();
    return await EventBiletiki.findRandom({city: {'$regex': city, '$options': 'i'}, popular: 'on', active: 'on', realDate: {$elemMatch: { $gte: today }}}).limit(20);
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
            '_id',
            'organizators'
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
        } else if (mongoose.Types.ObjectId.isValid(search)) {
            count = await EventBiletiki.count({
                $or: [
                    {_id: search},
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
                    {_id: search},
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
        } else {
            count = await EventBiletiki.count({
                $or: [
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
            let organizators = ''
            if(findResult[i].organizators!=undefined){
                organizators = findResult[i].organizators
            }
            data.push([image, findResult[i].nameRu, findResult[i].descriptionRu, findResult[i].nameKg, findResult[i].descriptionKg, city, JSON.stringify(where), JSON.stringify(findResult[i].date), JSON.stringify(findResult[i].price), findResult[i].video, findResult[i].ageCategory, findResult[i].genre, findResult[i].popular, active, format(findResult[i].updatedAt), findResult[i]._id, organizators]);
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
        let event = await EventBiletiki.findById({_id: id});
        event.realDate = object.realDate
        event.popular = object.popular
        event.active = object.active
        event.nameRu = object.nameRu
        event.nameKg =  object.nameKg
        event.descriptionRu = object.descriptionRu
        event.descriptionKg = object.descriptionKg
        event.where = object.where
        event.price = object.price
        event.date = object.date
        event.video = object.video
        event.city = object.city
        event.image = object.image
        event.imageThumbnail = object.imageThumbnail
        event.ageCategory = object.ageCategory
        event.genre = object.genre
        event.organizators = object.organizators
        await event.save();
        //await EventBiletiki.updateOne({_id: id}, {$set: object});
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

const checkSeatsEventBiletiki = async (seats, eventId) => {
    try{
        let free = true
        let event = await EventBiletiki.findById({_id: eventId});
        if (!event.where.data[event.date[0]].without&&!event.where.data[event.date[0]].withoutNew) {
            for (let x = 0; x < seats.length; x++) {
                for (let i = 0; i < event.date.length; i++) {
                    let keys = Object.keys(event.where.data[event.date[i]]);
                    for (let i1 = 0; i1 < keys.length; i1++) {
                        for (let i2 = 0; i2 < event.where.data[event.date[i]][keys[i1]].length; i2++) {
                            for (let i3 = 0; i3 < event.where.data[event.date[i]][keys[i1]][i2].length; i3++) {
                                if (event.where.data[event.date[i]][keys[i1]][i2][i3].name === seats[x][0].name &&
                                    seats[x][1].includes(event.date[i])&&
                                    abc[event.where.name][keys[i1]] === seats[x][0].selectSector
                                ) {
                                    free = event.where.data[event.date[i]][keys[i1]][i2][i3].status == 'free'
                                }
                            }
                        }
                    }
                }
            }
        }
        return free

    } catch(error) {
        console.error(error)
    }
}
const checkSeatsEventBiletikiAdminka = async (seats, eventId) => {
    try{
        let free = true
        let event = await EventBiletiki.findById({_id: eventId});
        if (!event.where.data[event.date[0]].without&&!event.where.data[event.date[0]].withoutNew) {
            for (let x = 0; x < seats.length; x++) {
                for (let i = 0; i < event.date.length; i++) {
                    let keys = Object.keys(event.where.data[event.date[i]]);
                    for (let i1 = 0; i1 < keys.length; i1++) {
                        for (let i2 = 0; i2 < event.where.data[event.date[i]][keys[i1]].length; i2++) {
                            for (let i3 = 0; i3 < event.where.data[event.date[i]][keys[i1]][i2].length; i3++) {
                                if (event.where.data[event.date[i]][keys[i1]][i2][i3].name === seats[x][0].name &&
                                    seats[x][1].includes(event.date[i])&&
                                    abc[event.where.name][keys[i1]] === seats[x][2]
                                ) {
                                    free = event.where.data[event.date[i]][keys[i1]][i2][i3].status == 'free'
                                }
                            }
                        }
                    }
                }
            }
        }
        return free

    } catch(error) {
        console.error(error)
    }
}
module.exports.checkSeatsEventBiletikiAdminka = checkSeatsEventBiletikiAdminka;
module.exports.checkSeatsEventBiletiki = checkSeatsEventBiletiki;
module.exports.getEventsByName = getEventsByName;
module.exports.getEvents = getEvents;
module.exports.getPopular = getPopular;
module.exports.getByCity = getByCity;
module.exports.getByCityOrganizator = getByCityOrganizator;
module.exports.getIds = getIds;
module.exports.deleteEventBiletiki = deleteEventBiletiki;
module.exports.getEventBiletiki = getEventBiletiki;
module.exports.setEventBiletiki = setEventBiletiki;
module.exports.addEventBiletiki = addEventBiletiki;