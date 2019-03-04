const TicketBiletiki = require('../models/ticketBiletiki'), EventBiletiki = require('../models/eventBiletiki')
const format = require('./const').stringifyDateTime

const checkHash = async (hash) => {
    const new1 = await TicketBiletiki.count({hash: hash})===0;
    return(new1)
}

const approveTicketBiletiki = async (object, hash) => {
    try{
        if(await TicketBiletiki.count({hash: hash, status: 'продан'})!==0){
            await TicketBiletiki.findOneAndUpdate({hash: hash}, {$set: {status: 'использован'}});
            return('ok')
        } else {
            return('error')
        }
    } catch(error) {
        console.error(error)
    }
}

const getById = async (id) => {
    return(await TicketBiletiki.findOne({_id: id}))
}

const getByHash = async (hash) => {
    return(await TicketBiletiki.findOne({hash: hash}).populate({path: 'user', select: 'name email'}))
}

const getTicketBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'билет',
            'hash',
            'пользователь',
            'событие',
            'место',
            'статус',
            'места',
            'жанр',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        else if(sort[0]=='hash'&&sort[1]=='descending')
            sort = '-hash';
        else if(sort[0]=='hash'&&sort[1]=='ascending')
            sort = 'hash';
        else if(sort[0]=='пользователь'&&sort[1]=='descending')
            sort = '-user';
        else if(sort[0]=='пользователь'&&sort[1]=='ascending')
            sort = 'user';
        else if(sort[0]=='событие'&&sort[1]=='descending')
            sort = '-event';
        else if(sort[0]=='событие'&&sort[1]=='ascending')
            sort = 'event';
        else if(sort[0]=='статус'&&sort[1]=='descending')
            sort = '-status';
        else if(sort[0]=='статус'&&sort[1]=='ascending')
            sort = 'status';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        else if(sort[0]=='жанр'&&sort[1]=='descending')
            sort = '-genre';
        else if(sort[0]=='жанр'&&sort[1]=='ascending')
            sort = 'genre';
        if(search == ''){
            count = await TicketBiletiki.count();
            findResult = await TicketBiletiki
                .find()
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('genre hash user event status ticket seats where updatedAt image _id')
                .populate({
                    path: 'user',
                    select: 'name email'
                });
        } else {
            count = await TicketBiletiki.count({
                $or: [
                    {hash: {'$regex': search, '$options': 'i'}},
                    {status: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await TicketBiletiki.find({
                $or: [
                    {hash: {'$regex': search, '$options': 'i'}},
                    {status: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('genre hash user event status  ticket seats where updatedAt image _id')
                .populate({
                    path: 'user',
                    select: 'name email'
                });
        }
        for (let i=0; i<findResult.length; i++){
            let user = '';
            if(findResult[i].user !=undefined)
                user = findResult[i].user.name+'\n'+findResult[i].user.email+'\n'+findResult[i].user._id
            data.push([findResult[i].ticket, findResult[i].hash, user, findResult[i].event, findResult[i].where, findResult[i].status, JSON.stringify(findResult[i].seats), findResult[i].genre, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addTicketBiletiki = async (object) => {
    try{
        let _object = new TicketBiletiki(object);
        await TicketBiletiki.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setTicketBiletiki = async (object, id) => {
    try{
        await TicketBiletiki.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteTicketBiletiki = async (id) => {
    try{
        await TicketBiletiki.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getByHash = getByHash;
module.exports.checkHash = checkHash;
module.exports.deleteTicketBiletiki = deleteTicketBiletiki;
module.exports.getTicketBiletiki = getTicketBiletiki;
module.exports.setTicketBiletiki = setTicketBiletiki;
module.exports.addTicketBiletiki = addTicketBiletiki;
module.exports.getById = getById;
module.exports.approveTicketBiletiki = approveTicketBiletiki;
