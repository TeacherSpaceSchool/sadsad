const TicketCinemaBiletiki = require('../models/ticketCinemaBiletiki'), EventBiletiki = require('../models/eventBiletiki')
const format = require('./const').stringifyDateTime

const checkHash = async (hash) => {
    const new1 = await TicketCinemaBiletiki.count({hash: hash})===0;
    return(new1)
}

const getById = async (id) => {
    return(await TicketCinemaBiletiki.findOne({_id: id}))
}

const getByHash = async (hash) => {
    return(await TicketCinemaBiletiki.findOne({hash: hash}).populate({path: 'user', select: 'name email'}))
}

const approveTicketCinemaBiletiki = async (object, hash) => {
    try{
        if(await TicketCinemaBiletiki.count({hash: hash, status: 'продан'})!==0){
            await TicketCinemaBiletiki.findOneAndUpdate({hash: hash}, {$set: {status: 'использован'}});
            return('ok')
        } else {
            return('error')
        }
    } catch(error) {
        console.error(error)
    }
}

const getTicketCinemaBiletiki1 = async (search, sort, skip, user) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'билет',
            'hash',
            'пользователь',
            'кино',
            'кинотеатр',
            'зал',
            'статус',
            'места',
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
        else if(sort[0]=='кино'&&sort[1]=='descending')
            sort = '-movie';
        else if(sort[0]=='кино'&&sort[1]=='ascending')
            sort = 'movie';
        else if(sort[0]=='статус'&&sort[1]=='descending')
            sort = '-status';
        else if(sort[0]=='статус'&&sort[1]=='ascending')
            sort = 'status';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        if(search == ''){
            count = await TicketCinemaBiletiki.count();
            findResult = await TicketCinemaBiletiki
                .find({user: user._id})
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('hash user movie cinema hall status ticket seats updatedAt image _id')
                .populate({
                    path: 'user',
                    select: 'name email'
                });
        } else {
            count = await TicketCinemaBiletiki.count({
                $and: [
                    {user: user._id},
                    {
                        $or: [
                            {hash: {'$regex': search, '$options': 'i'}},
                            {status: {'$regex': search, '$options': 'i'}},
                        ]
                    }
                ]
            });
            findResult = await TicketCinemaBiletiki.find({
                $and: [
                    {user: user._id},
                    {
                        $or: [
                            {hash: {'$regex': search, '$options': 'i'}},
                            {status: {'$regex': search, '$options': 'i'}},
                        ]
                    }
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('hash user movie cinema hall status ticket seats updatedAt image _id')
                .populate({
                    path: 'user',
                    select: 'name email'
                });
        }
        for (let i=0; i<findResult.length; i++){
            let user = '';
            if(findResult[i].user !== null)
                user = findResult[i].user.name+'\n'+findResult[i].user.email+'\n'+findResult[i].user._id
            data.push([findResult[i].ticket, findResult[i].hash, user, findResult[i].movie, findResult[i].cinema, findResult[i].hall, findResult[i].status, JSON.stringify(findResult[i].seats), format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const getTicketCinemaBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'билет',
            'hash',
            'пользователь',
            'кино',
            'кинотеатр',
            'зал',
            'статус',
            'места',
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
        else if(sort[0]=='кино'&&sort[1]=='descending')
            sort = '-movie';
        else if(sort[0]=='кино'&&sort[1]=='ascending')
            sort = 'movie';
        else if(sort[0]=='статус'&&sort[1]=='descending')
            sort = '-status';
        else if(sort[0]=='статус'&&sort[1]=='ascending')
            sort = 'status';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        if(search == ''){
            count = await TicketCinemaBiletiki.count();
            findResult = await TicketCinemaBiletiki
                .find()
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('hash user movie cinema hall status ticket seats updatedAt image _id')
                .populate({
                    path: 'user',
                    select: 'name email'
                });
        } else {
            count = await TicketCinemaBiletiki.count({
                $or: [
                    {hash: {'$regex': search, '$options': 'i'}},
                    {status: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await TicketCinemaBiletiki.find({
                $or: [
                    {hash: {'$regex': search, '$options': 'i'}},
                    {status: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('hash user movie cinema hall status ticket seats updatedAt image _id')
                .populate({
                    path: 'user',
                    select: 'name email'
                });
        }
        for (let i=0; i<findResult.length; i++){
            let user = '';
            if(findResult[i].user !=undefined)
                user = findResult[i].user.name+'\n'+findResult[i].user.email+'\n'+findResult[i].user._id
            data.push([findResult[i].ticket, findResult[i].hash, user, findResult[i].movie, findResult[i].cinema, findResult[i].hall, findResult[i].status, JSON.stringify(findResult[i].seats), format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addTicketCinemaBiletiki = async (object) => {
    try{
        let _object = new TicketCinemaBiletiki(object);
        await TicketCinemaBiletiki.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setTicketCinemaBiletiki = async (object, id) => {
    try{
        await TicketCinemaBiletiki.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteTicketCinemaBiletiki = async (id) => {
    try{
        await TicketCinemaBiletiki.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getByHash = getByHash;
module.exports.checkHash = checkHash;
module.exports.deleteTicketCinemaBiletiki = deleteTicketCinemaBiletiki;
module.exports.getTicketCinemaBiletiki1 = getTicketCinemaBiletiki1;
module.exports.getTicketCinemaBiletiki = getTicketCinemaBiletiki;
module.exports.setTicketCinemaBiletiki = setTicketCinemaBiletiki;
module.exports.addTicketCinemaBiletiki = addTicketCinemaBiletiki;
module.exports.getById = getById;
module.exports.approveTicketCinemaBiletiki = approveTicketCinemaBiletiki;
