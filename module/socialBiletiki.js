const SocialBiletiki = require('../models/socialBiletiki');
const format = require('./const').stringifyDateTime
const mongoose = require('mongoose');

const getClient = async () => {
    return await SocialBiletiki.find();
}

const getSocialBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'изображение',
            'имя',
            'ссылка',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        else if(sort[0]=='имя'&&sort[1]=='descending')
            sort = '-name';
        else if(sort[0]=='имя'&&sort[1]=='ascending')
            sort = 'name';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        if(search == ''){
            count = await SocialBiletiki.count();
            findResult = await SocialBiletiki
                .find()
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('image name url updatedAt _id');
        } else if (mongoose.Types.ObjectId.isValid(search)) {
            count = await SocialBiletiki.count({
                $or: [
                    {_id: search},
                    {name: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await SocialBiletiki.find({
                $or: [
                    {_id: search},
                    {name: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('image name url updatedAt _id');
        } else {
            count = await SocialBiletiki.count({
                $or: [
                    {name: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await SocialBiletiki.find({
                $or: [
                    {name: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('image name url updatedAt _id');
        }
        for (let i=0; i<findResult.length; i++){
            let image=findResult[i].image.toString();
            while(image.includes(',http://'))
                image = image.replace(',http://', '\nhttp://');
            data.push([image, findResult[i].name, findResult[i].url, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addSocialBiletiki = async (object) => {
    try{
        let _object = new SocialBiletiki(object);
        await SocialBiletiki.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setSocialBiletiki = async (object, id) => {
    try{
        await SocialBiletiki.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteSocialBiletiki = async (id) => {
    try{
        await SocialBiletiki.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getClient = getClient;
module.exports.deleteSocialBiletiki = deleteSocialBiletiki;
module.exports.getSocialBiletiki = getSocialBiletiki;
module.exports.setSocialBiletiki = setSocialBiletiki;
module.exports.addSocialBiletiki = addSocialBiletiki;