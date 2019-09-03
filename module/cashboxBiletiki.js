const CashboxBiletiki = require('../models/cashboxBiletiki');
const format = require('./const').stringifyDateTime
const mongoose = require('mongoose');

const getClient = async () => {
    return await CashboxBiletiki.find();
}

const getCashboxBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'название',
            'адрес',
            'геолокация',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        else if(sort[0]=='название'&&sort[1]=='descending')
            sort = '-name';
        else if(sort[0]=='название'&&sort[1]=='ascending')
            sort = 'name';
        else if(sort[0]=='адрес'&&sort[1]=='descending')
            sort = '-address';
        else if(sort[0]=='адрес'&&sort[1]=='ascending')
            sort = 'address';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        if(search == ''){
            count = await CashboxBiletiki.count();
            findResult = await CashboxBiletiki
                .find()
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
        } else if (mongoose.Types.ObjectId.isValid(search)) {
            count = await CashboxBiletiki.count({
                $or: [
                    {_id: search},
                    {name: {'$regex': search, '$options': 'i'}},
                    {address: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await CashboxBiletiki.find({
                $or: [
                    {_id: search},
                    {name: {'$regex': search, '$options': 'i'}},
                    {address: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
        } else {
            count = await CashboxBiletiki.count({
                $or: [
                    {name: {'$regex': search, '$options': 'i'}},
                    {address: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await CashboxBiletiki.find({
                $or: [
                    {name: {'$regex': search, '$options': 'i'}},
                    {address: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
        }
        for (let i=0; i<findResult.length; i++){
            let geo = ''
            if(findResult[i].geo!=undefined)
                geo = findResult[i].geo
            data.push([findResult[i].name, findResult[i].address, geo, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addCashboxBiletiki = async (object) => {
    try{
        let _object = new CashboxBiletiki(object);
        await CashboxBiletiki.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setCashboxBiletiki = async (object, id) => {
    try{
        await CashboxBiletiki.updateOne({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteCashboxBiletiki = async (id) => {
    try{
        await CashboxBiletiki.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getClient = getClient;
module.exports.deleteCashboxBiletiki = deleteCashboxBiletiki;
module.exports.getCashboxBiletiki = getCashboxBiletiki;
module.exports.setCashboxBiletiki = setCashboxBiletiki;
module.exports.addCashboxBiletiki = addCashboxBiletiki;