const FAQBiletiki = require('../models/FAQBiletiki');
const format = require('./const').stringifyDateTime

const getClient = async () => {
    return await FAQBiletiki.find();
}

const getFAQBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'вопрос',
            'ответ',
            'суроо',
            'жооп',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        else if(sort[0]=='ответ'&&sort[1]=='descending')
            sort = '-answerRu';
        else if(sort[0]=='ответ'&&sort[1]=='ascending')
            sort = 'answerRu';
        else if(sort[0]=='жооп'&&sort[1]=='descending')
            sort = '-answerKg';
        else if(sort[0]=='жооп'&&sort[1]=='ascending')
            sort = 'answerKg';
        else if(sort[0]=='вопрос'&&sort[1]=='descending')
            sort = '-questionRu';
        else if(sort[0]=='вопрос'&&sort[1]=='ascending')
            sort = 'questionRu';
        else if(sort[0]=='суроо'&&sort[1]=='descending')
            sort = '-questionKg';
        else if(sort[0]=='суроо'&&sort[1]=='ascending')
            sort = 'questionKg';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        if(search == ''){
            count = await FAQBiletiki.count();
            findResult = await FAQBiletiki
                .find()
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('questionRu answerRu questionKg answerKg updatedAt _id');
        } else {
            count = await FAQBiletiki.count({
                $or: [
                    {_id: {'$regex': search, '$options': 'i'}},
                    {questionRu: {'$regex': search, '$options': 'i'}},
                    {answerRu: {'$regex': search, '$options': 'i'}},
                    {questionKg: {'$regex': search, '$options': 'i'}},
                    {answerKg: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await FAQBiletiki.find({
                $or: [
                    {_id: {'$regex': search, '$options': 'i'}},
                    {questionRu: {'$regex': search, '$options': 'i'}},
                    {answerRu: {'$regex': search, '$options': 'i'}},
                    {questionKg: {'$regex': search, '$options': 'i'}},
                    {answerKg: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('questionRu answerRu questionKg answerKg updatedAt _id');
        }
        for (let i=0; i<findResult.length; i++){
            data.push([findResult[i].questionRu, findResult[i].answerRu, findResult[i].questionKg, findResult[i].answerKg, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addFAQBiletiki = async (object) => {
    try{
        let _object = new FAQBiletiki(object);
        await FAQBiletiki.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setFAQBiletiki = async (object, id) => {
    try{
        await FAQBiletiki.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteFAQBiletiki = async (id) => {
    try{
        await FAQBiletiki.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getClient = getClient;
module.exports.deleteFAQBiletiki = deleteFAQBiletiki;
module.exports.getFAQBiletiki = getFAQBiletiki;
module.exports.setFAQBiletiki = setFAQBiletiki;
module.exports.addFAQBiletiki = addFAQBiletiki;