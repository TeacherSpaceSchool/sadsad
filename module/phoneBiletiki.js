const PhoneBiletiki = require('../models/phoneBiletiki');
const format = require('./const').stringifyDateTime

const getClient = async () => {
    return await PhoneBiletiki.find();
}

const getPhoneBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'телефон',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        else if(sort[0]=='телефон'&&sort[1]=='descending')
            sort = '-phone';
        else if(sort[0]=='телефон'&&sort[1]=='ascending')
            sort = 'phone';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        if(search == ''){
            count = await PhoneBiletiki.count();
            findResult = await PhoneBiletiki
                .find()
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('phone updatedAt _id');
        } else {
            count = await PhoneBiletiki.count({
                $or: [
                    {phone: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await PhoneBiletiki.find({
                $or: [
                    {phone: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('phone updatedAt _id');
        }
        for (let i=0; i<findResult.length; i++){
            data.push([findResult[i].phone, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addPhoneBiletiki = async (object) => {
    try{
        let _object = new PhoneBiletiki(object);
        await PhoneBiletiki.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setPhoneBiletiki = async (object, id) => {
    try{
        await PhoneBiletiki.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deletePhoneBiletiki = async (id) => {
    try{
        await PhoneBiletiki.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getClient = getClient;
module.exports.deletePhoneBiletiki = deletePhoneBiletiki;
module.exports.getPhoneBiletiki = getPhoneBiletiki;
module.exports.setPhoneBiletiki = setPhoneBiletiki;
module.exports.addPhoneBiletiki = addPhoneBiletiki;