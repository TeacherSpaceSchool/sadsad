const EmailBiletiki = require('../models/emailBiletiki');
const format = require('./const').stringifyDateTime

const getClient = async () => {
    return await EmailBiletiki.find();
}

const getEmailBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'email',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        else if(sort[0]=='email'&&sort[1]=='descending')
            sort = '-email';
        else if(sort[0]=='email'&&sort[1]=='ascending')
            sort = 'email';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        if(search == ''){
            count = await EmailBiletiki.count();
            findResult = await EmailBiletiki
                .find()
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('email updatedAt _id');
        } else {
            count = await EmailBiletiki.count({
                $or: [
                    {_id: {'$regex': search, '$options': 'i'}},
                    {email: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await EmailBiletiki.find({
                $or: [
                    {_id: {'$regex': search, '$options': 'i'}},
                    {email: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('email updatedAt _id');
        }
        for (let i=0; i<findResult.length; i++){
            data.push([findResult[i].email, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addEmailBiletiki = async (object) => {
    try{
        let _object = new EmailBiletiki(object);
        await EmailBiletiki.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setEmailBiletiki = async (object, id) => {
    try{
        await EmailBiletiki.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteEmailBiletiki = async (id) => {
    try{
        await EmailBiletiki.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getClient = getClient;
module.exports.deleteEmailBiletiki = deleteEmailBiletiki;
module.exports.getEmailBiletiki = getEmailBiletiki;
module.exports.setEmailBiletiki = setEmailBiletiki;
module.exports.addEmailBiletiki = addEmailBiletiki;