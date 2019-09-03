const MailingBiletiki = require('../models/mailingBiletiki');
const format = require('./const').stringifyDateTime

const getClient = async () => {
    return await MailingBiletiki.findOne();
}

const getMailingBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'mailuser',
            'mailpass',
            'mailchimpInstance',
            'listUniqueId',
            'mailchimpApiKey',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        count = await MailingBiletiki.count();
        findResult = await MailingBiletiki
                .find()
                .sort(sort)
                .select('mailuser mailpass mailchimpInstance listUniqueId mailchimpApiKey updatedAt _id');
        for (let i=0; i<findResult.length; i++){
            data.push([findResult[i].mailuser, findResult[i].mailpass, findResult[i].mailchimpInstance, findResult[i].listUniqueId, findResult[i].mailchimpApiKey, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addMailingBiletiki = async (object) => {
    try{
        if(await MailingBiletiki.count()===0){
            let _object = new MailingBiletiki(object);
            await MailingBiletiki.create(_object);
        }
    } catch(error) {
        console.error(error)
    }
}

const setMailingBiletiki = async (object, id) => {
    try{
        await MailingBiletiki.updateOne({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteMailingBiletiki = async (id) => {
    try{
        await MailingBiletiki.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getClient = getClient;
module.exports.deleteMailingBiletiki = deleteMailingBiletiki;
module.exports.getMailingBiletiki = getMailingBiletiki;
module.exports.setMailingBiletiki = setMailingBiletiki;
module.exports.addMailingBiletiki = addMailingBiletiki;