const AdsBiletiki = require('../models/adsBiletiki');
const format = require('./const').stringifyDateTime ;
const mongoose = require('mongoose');

const getRandomTop = async () => {
    let today = new Date();
    return await AdsBiletiki.findRandom({dateEnd: {$gte: today}, dateStart: {$lte: today}, type: 'top'}).limit(1);
};

const getBottom = async () => {
    let today = new Date();
    return await AdsBiletiki.find({dateEnd: {$gte: today}, dateStart: {$lte: today}, type: 'down'}).select('image link imageThumbnail');
};

const getAdsBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'фотографии',
            'имя',
            'ссылка',
            'дата начала',
            'дата окончания',
            'тип',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        else if(sort[0]=='тип'&&sort[1]=='descending')
            sort = '-type';
        else if(sort[0]=='тип'&&sort[1]=='ascending')
            sort = 'type';
        else if(sort[0]=='фотографии'&&sort[1]=='descending')
            sort = '-image';
        else if(sort[0]=='фотографии'&&sort[1]=='ascending')
            sort = 'image';
        else if(sort[0]=='ссылка'&&sort[1]=='descending')
            sort = '-link';
        else if(sort[0]=='ссылка'&&sort[1]=='ascending')
            sort = 'link';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        else if(sort[0]=='дата начала'&&sort[1]=='descending')
            sort = '-dateStart';
        else if(sort[0]=='дата начала'&&sort[1]=='ascending')
            sort = 'dateStart';
        else if(sort[0]=='дата окончания'&&sort[1]=='descending')
            sort = '-dateEnd';
        else if(sort[0]=='дата окончания'&&sort[1]=='ascending')
            sort = 'dateEnd';
        else if(sort[0]=='имя'&&sort[1]=='descending')
            sort = '-name';
        else if(sort[0]=='имя'&&sort[1]=='ascending')
            sort = 'name';
        if(search == ''){
            count = await AdsBiletiki.count();
            findResult = await AdsBiletiki
                .find()
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('image name link type dateStart dateEnd updatedAt _id');
        } else if (mongoose.Types.ObjectId.isValid(search)) {
            count = await AdsBiletiki.count({
                $or: [
                    {_id: search},
                    {type: {'$regex': search, '$options': 'i'}},
                    {name: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await AdsBiletiki.find({
                $or: [
                    {_id: search},
                    {type: {'$regex': search, '$options': 'i'}},
                    {name: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('image name link dateStart type dateEnd updatedAt _id');
        } else {
            count = await AdsBiletiki.count({
                $or: [
                    {type: {'$regex': search, '$options': 'i'}},
                    {name: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await AdsBiletiki.find({
                $or: [
                    {type: {'$regex': search, '$options': 'i'}},
                    {name: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('image name link dateStart type dateEnd updatedAt _id');
        }
        for (let i=0; i<findResult.length; i++){
            let image=findResult[i].image.toString();
            while(image.includes(',http://'))
                image = image.replace(',http://', '\nhttp://');
            data.push([image, findResult[i].name, findResult[i].link, format(findResult[i].dateStart), format(findResult[i].dateEnd), findResult[i].type, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addAdsBiletiki = async (object) => {
    try{
        let _object = new AdsBiletiki(object);
        await AdsBiletiki.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setAdsBiletiki = async (object, id) => {
    try{
        await AdsBiletiki.updateOne({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteAdsBiletiki = async (id) => {
    try{
        await AdsBiletiki.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getBottom = getBottom;
module.exports.getRandomTop = getRandomTop;
module.exports.deleteAdsBiletiki = deleteAdsBiletiki;
module.exports.getAdsBiletiki = getAdsBiletiki;
module.exports.setAdsBiletiki = setAdsBiletiki;
module.exports.addAdsBiletiki = addAdsBiletiki;