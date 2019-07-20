const PaymentBiletiki = require('../models/paymentBiletiki');
const format = require('./const').stringifyDateTime
const randomstring = require('randomstring');
const mongoose = require('mongoose');

const generateWallet = async () => {
    let check = {}
    let wallet = ''
    while(check!=null){
        wallet = randomstring.generate({length: 9, charset: 'numeric'})
        check = await PaymentBiletiki.findOne({wallet: wallet})
    }
    return(wallet)
}

const getPaymentBiletiki = async (search, sort, skip) => {
    try{
        /*await PaymentBiletiki.deleteMany()
        await TicketBiletiki.deleteMany()*/
        let findResult = [], data = [], count;
        const row = [
            'адресс',
            'билет',
            'сервис',
            'сумма',
            'meta',
            'статус',
            'имя',
            'email',
            'телефон',
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
        else if(sort[0]=='статус'&&sort[1]=='descending')
            sort = '-status';
        else if(sort[0]=='статус'&&sort[1]=='ascending')
            sort = 'status';
        else if(sort[0]=='email'&&sort[1]=='descending')
            sort = '-email';
        else if(sort[0]=='email'&&sort[1]=='ascending')
            sort = 'email';
        else if(sort[0]=='телефон'&&sort[1]=='descending')
            sort = '-phone';
        else if(sort[0]=='телефон'&&sort[1]=='ascending')
            sort = 'phone';
        else if(sort[0]=='имя'&&sort[1]=='descending')
            sort = '-name';
        else if(sort[0]=='имя'&&sort[1]=='ascending')
            sort = 'name';
        else if(sort[0]=='билет'&&sort[1]=='descending')
            sort = '-ticket';
        else if(sort[0]=='билет'&&sort[1]=='ascending')
            sort = 'ticket';
        if(search == ''){
            count = await PaymentBiletiki.count();
            findResult = await PaymentBiletiki
                .find({})
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('wallet status ammount service updatedAt _id meta ticket name email phone');
        } else if (mongoose.Types.ObjectId.isValid(search)) {
            count = await PaymentBiletiki.count({
                    $or: [
                        {_id: search},
                        {wallet: {'$regex': search, '$options': 'i'}},
                        {payment: {'$regex': search, '$options': 'i'}},
                        {status: {'$regex': search, '$options': 'i'}},
                        {ticket: {'$regex': search, '$options': 'i'}},
                        {name: {'$regex': search, '$options': 'i'}},
                        {email: {'$regex': search, '$options': 'i'}},
                        {phone: {'$regex': search, '$options': 'i'}},
                    ]
                }
            );
            findResult = await PaymentBiletiki.find({
                $or: [
                    {_id: search},
                    {wallet: {'$regex': search, '$options': 'i'}},
                    {payment: {'$regex': search, '$options': 'i'}},
                    {status: {'$regex': search, '$options': 'i'}},
                    {ticket: {'$regex': search, '$options': 'i'}},
                    {name: {'$regex': search, '$options': 'i'}},
                    {email: {'$regex': search, '$options': 'i'}},
                    {phone: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('wallet status ammount service updatedAt _id meta ticket name email phone');
        } else {
            count = await PaymentBiletiki.count({
                $or: [
                    {wallet: {'$regex': search, '$options': 'i'}},
                    {payment: {'$regex': search, '$options': 'i'}},
                    {status: {'$regex': search, '$options': 'i'}},
                    {ticket: {'$regex': search, '$options': 'i'}},
                    {name: {'$regex': search, '$options': 'i'}},
                    {email: {'$regex': search, '$options': 'i'}},
                    {phone: {'$regex': search, '$options': 'i'}},
                ]
            }
            );
            findResult = await PaymentBiletiki.find({
                $or: [
                    {wallet: {'$regex': search, '$options': 'i'}},
                    {payment: {'$regex': search, '$options': 'i'}},
                    {status: {'$regex': search, '$options': 'i'}},
                    {ticket: {'$regex': search, '$options': 'i'}},
                    {name: {'$regex': search, '$options': 'i'}},
                    {email: {'$regex': search, '$options': 'i'}},
                    {phone: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('wallet status ammount service updatedAt _id meta ticket name email phone');
        }
        for (let i=0; i<findResult.length; i++){
            let status = '';
            if(findResult[i].status !=undefined)
                status = findResult[i].status
            data.push([findResult[i].wallet,
                findResult[i].ticket,  findResult[i].service, findResult[i].ammount,findResult[i].meta, status, findResult[i].name, findResult[i].email, findResult[i].phone, format(findResult[i].updatedAt), findResult[i]._id]);
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

const setPaymentBiletiki = async (object, id) => {
    try{
        await PaymentBiletiki.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deletePaymentBiletiki = async (id) => {
    try{
        await PaymentBiletiki.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.setPaymentBiletiki = setPaymentBiletiki;
module.exports.deletePaymentBiletiki = deletePaymentBiletiki;
module.exports.getPaymentBiletiki = getPaymentBiletiki;
module.exports.addPaymentBiletiki = addPaymentBiletiki;
module.exports.generateWallet = generateWallet;