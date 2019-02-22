const PaymentBiletiki = require('../models/paymentBiletiki');
const format = require('./const').stringifyDateTime

const getPaymentBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'пользователь',
            'сумма',
            'сервис',
            'meta',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        else if(sort[0]=='сумма'&&sort[1]=='descending')
            sort = '-ammount';
        else if(sort[0]=='сумма'&&sort[1]=='ascending')
            sort = 'ammount';
        else if(sort[0]=='сервис'&&sort[1]=='descending')
            sort = '-service';
        else if(sort[0]=='сервис'&&sort[1]=='ascending')
            sort = 'service';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        if(search == ''){
            count = await PaymentBiletiki.count();
            findResult = await PaymentBiletiki
                .find({})
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('user ammount service updatedAt _id meta')
                .populate({
                    path: 'user',
                    select: 'name email'
                });
        } else {
            count = await PaymentBiletiki.count({
                $or: [
                    {payment: {'$regex': search, '$options': 'i'}},
                    {user: {'$regex': search, '$options': 'i'}},
                ]
            }
            );
            findResult = await PaymentBiletiki.find({
                $or: [
                    {payment: {'$regex': search, '$options': 'i'}},
                    {user: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('user ammount service updatedAt _id meta')
                .populate({
                    path: 'user',
                    select: 'name email'
                });
        }
        for (let i=0; i<findResult.length; i++){
            let user = '';
            if(findResult[i].user !=undefined)
                user = findResult[i].user.name+'\n'+findResult[i].user.email+'\n'+findResult[i].user._id
            data.push([user, findResult[i].ammount, findResult[i].service, findResult[i].meta, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addPaymentBiletiki = async (object) => {
    try{
            let _object = new PaymentBiletiki(object);
            await PaymentBiletiki.create(_object);
    } catch(error) {
        console.error(error)
    }
}

module.exports.getPaymentBiletiki = getPaymentBiletiki;
module.exports.addPaymentBiletiki = addPaymentBiletiki;