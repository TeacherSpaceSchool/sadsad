const ContactBiletiki = require('../models/contactBiletiki');
const format = require('./const').stringifyDateTime
const mongoose = require('mongoose');

const getClient = async () => {
    return await ContactBiletiki.findOne();
}

const getContactBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'координаты',
            'касса',
            'адрес',
            'бронирование',
            'связь',
            'возврат',
            'главная',
            'сотрдуничество',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        else if(sort[0]=='координаты'&&sort[1]=='descending')
            sort = '-coords';
        else if(sort[0]=='координаты'&&sort[1]=='ascending')
            sort = 'coords';
        else if(sort[0]=='касса'&&sort[1]=='descending')
            sort = '-cashbox';
        else if(sort[0]=='касса'&&sort[1]=='ascending')
            sort = 'cashbox';
        else if(sort[0]=='адрес'&&sort[1]=='descending')
            sort = '-address';
        else if(sort[0]=='адрес'&&sort[1]=='ascending')
            sort = 'address';
        else if(sort[0]=='бронирование'&&sort[1]=='descending')
            sort = '-booking';
        else if(sort[0]=='бронирование'&&sort[1]=='ascending')
            sort = 'booking';
        else if(sort[0]=='связь'&&sort[1]=='descending')
            sort = '-connection';
        else if(sort[0]=='связь'&&sort[1]=='ascending')
            sort = 'connection';
        else if(sort[0]=='возврат'&&sort[1]=='descending')
            sort = '-return1';
        else if(sort[0]=='возврат'&&sort[1]=='ascending')
            sort = 'return1';
        else if(sort[0]=='главная'&&sort[1]=='descending')
            sort = '-general';
        else if(sort[0]=='главная'&&sort[1]=='ascending')
            sort = 'general';
        else if(sort[0]=='сотрдуничество'&&sort[1]=='descending')
            sort = '-cooperation';
        else if(sort[0]=='сотрдуничество'&&sort[1]=='ascending')
            sort = 'cooperation';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        if(search == ''){
            count = await ContactBiletiki.count();
            findResult = await ContactBiletiki
                .find()
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('coords cashbox address booking connection return1 general cooperation updatedAt _id');
        } else if (mongoose.Types.ObjectId.isValid(search)) {
            count = await ContactBiletiki.count({
                $or: [
                    {_id: search},
                    {coords: {'$regex': search, '$options': 'i'}},
                    {cashbox: {'$regex': search, '$options': 'i'}},
                    {address: {'$regex': search, '$options': 'i'}},
                    {booking: {'$regex': search, '$options': 'i'}},
                    {connection: {'$regex': search, '$options': 'i'}},
                    {return1: {'$regex': search, '$options': 'i'}},
                    {general: {'$regex': search, '$options': 'i'}},
                    {cooperation: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await ContactBiletiki.find({
                $or: [
                    {_id: search},
                    {coords: {'$regex': search, '$options': 'i'}},
                    {cashbox: {'$regex': search, '$options': 'i'}},
                    {address: {'$regex': search, '$options': 'i'}},
                    {booking: {'$regex': search, '$options': 'i'}},
                    {connection: {'$regex': search, '$options': 'i'}},
                    {return1: {'$regex': search, '$options': 'i'}},
                    {general: {'$regex': search, '$options': 'i'}},
                    {cooperation: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('coords cashbox address booking connection return1 general cooperation updatedAt _id');
        } else {
            count = await ContactBiletiki.count({
                $or: [
                    {coords: {'$regex': search, '$options': 'i'}},
                    {cashbox: {'$regex': search, '$options': 'i'}},
                    {address: {'$regex': search, '$options': 'i'}},
                    {booking: {'$regex': search, '$options': 'i'}},
                    {connection: {'$regex': search, '$options': 'i'}},
                    {return1: {'$regex': search, '$options': 'i'}},
                    {general: {'$regex': search, '$options': 'i'}},
                    {cooperation: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await ContactBiletiki.find({
                $or: [
                    {coords: {'$regex': search, '$options': 'i'}},
                    {cashbox: {'$regex': search, '$options': 'i'}},
                    {address: {'$regex': search, '$options': 'i'}},
                    {booking: {'$regex': search, '$options': 'i'}},
                    {connection: {'$regex': search, '$options': 'i'}},
                    {return1: {'$regex': search, '$options': 'i'}},
                    {general: {'$regex': search, '$options': 'i'}},
                    {cooperation: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('coords cashbox address booking connection return1 general cooperation updatedAt _id');
        }
        for (let i=0; i<findResult.length; i++){
            data.push([findResult[i].coords, findResult[i].cashbox, findResult[i].address, findResult[i].booking, findResult[i].connection, findResult[i].return1, findResult[i].general, findResult[i].cooperation, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addContactBiletiki = async (object) => {
    try{
        console.log(ContactBiletiki.count())
        if(await ContactBiletiki.count()===0){
            let _object = new ContactBiletiki(object);
            await ContactBiletiki.create(_object);
        }
    } catch(error) {
        console.error(error)
    }
}

const setContactBiletiki = async (object, id) => {
    try{
        await ContactBiletiki.updateOne({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteContactBiletiki = async (id) => {
    try{
        await ContactBiletiki.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getClient = getClient;
module.exports.deleteContactBiletiki = deleteContactBiletiki;
module.exports.getContactBiletiki = getContactBiletiki;
module.exports.setContactBiletiki = setContactBiletiki;
module.exports.addContactBiletiki = addContactBiletiki;