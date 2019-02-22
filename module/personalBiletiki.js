const PersonalBiletiki = require('../models/personalBiletiki');
const format = require('./const').stringifyDateTime

const getClient = async () => {
    return await PersonalBiletiki.find();
}

const getPersonalBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'контакты',
            'кто',
            'ким',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        else if(sort[0]=='кто'&&sort[1]=='descending')
            sort = '-whoRu';
        else if(sort[0]=='кто'&&sort[1]=='ascending')
            sort = 'whoRu';
        else if(sort[0]=='ким'&&sort[1]=='descending')
            sort = '-whoKg';
        else if(sort[0]=='ким'&&sort[1]=='ascending')
            sort = 'whoKg';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        if(search == ''){
            count = await PersonalBiletiki.count();
            findResult = await PersonalBiletiki
                .find()
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('contact whoRu whoKg updatedAt _id');
        } else {
            count = await PersonalBiletiki.count({
                $or: [
                    {whoRu: {'$regex': search, '$options': 'i'}},
                    {whoKg: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await PersonalBiletiki.find({
                $or: [
                    {whoRu: {'$regex': search, '$options': 'i'}},
                    {whoKg: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('contact whoRu whoKg updatedAt _id');
        }
        for (let i=0; i<findResult.length; i++){
            data.push([ findResult[i].contact, findResult[i].whoRu, findResult[i].whoKg, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addPersonalBiletiki = async (object) => {
    try{
        let _object = new PersonalBiletiki(object);
        await PersonalBiletiki.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setPersonalBiletiki = async (object, id) => {
    try{
        await PersonalBiletiki.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deletePersonalBiletiki = async (id) => {
    try{
        await PersonalBiletiki.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getClient = getClient;
module.exports.deletePersonalBiletiki = deletePersonalBiletiki;
module.exports.getPersonalBiletiki = getPersonalBiletiki;
module.exports.setPersonalBiletiki = setPersonalBiletiki;
module.exports.addPersonalBiletiki = addPersonalBiletiki;