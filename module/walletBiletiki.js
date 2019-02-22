const WalletBiletiki = require('../models/walletBiletiki');
const format = require('./const').stringifyDateTime
const randomstring = require('randomstring');

const generateWallet = async () => {
    let check = {}
    let wallet = ''
    while(check!=null){
        wallet = randomstring.generate({length: 8, charset: 'numeric'})
        check = await WalletBiletiki.findOne({wallet: wallet})
    }
    return(wallet)
}

const getWalletBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'пользователь',
            'кошелек',
            'баланс',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        else if(sort[0]=='кошелек'&&sort[1]=='descending')
            sort = '-wallet';
        else if(sort[0]=='кошелек'&&sort[1]=='ascending')
            sort = 'wallet';
        else if(sort[0]=='баланс'&&sort[1]=='descending')
            sort = '-balance';
        else if(sort[0]=='баланс'&&sort[1]=='ascending')
            sort = 'balance';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        if(search == ''){
            count = await WalletBiletiki.count();
            findResult = await WalletBiletiki
                .find({})
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('user balance wallet updatedAt _id')
                .populate({
                    path: 'user',
                    select: 'name email'
                });
        } else {
            count = await WalletBiletiki.count({
                $or: [
                    {wallet: {'$regex': search, '$options': 'i'}},
                    {user: {'$regex': search, '$options': 'i'}},
                ]
            }
            );
            findResult = await WalletBiletiki.find({
                $or: [
                    {wallet: {'$regex': search, '$options': 'i'}},
                    {user: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('user balance wallet updatedAt _id')
                .populate({
                    path: 'user',
                    select: 'name email'
                });
        }
        for (let i=0; i<findResult.length; i++){
            let user = '';
            if(findResult[i].user !=undefined)
                user = findResult[i].user.name+'\n'+findResult[i].user.email+'\n'+findResult[i].user._id
            data.push([user, findResult[i].wallet, findResult[i].balance, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addWalletBiletiki = async (object) => {
    try{
        if(await WalletBiletiki.count({user: object.user})===0){
            let _object = new WalletBiletiki(object);
            await WalletBiletiki.create(_object);
        }
    } catch(error) {
        console.error(error)
    }
}

const setWalletBiletiki = async (balance, id) => {
    try{
        let wallet = await WalletBiletiki.findById({_id: id});
        wallet.balance = balance;
        await wallet.save();
    } catch(error) {
        console.error(error)
    }
}
module.exports.getWalletBiletiki = getWalletBiletiki;
module.exports.setWalletBiletiki = setWalletBiletiki;
module.exports.addWalletBiletiki = addWalletBiletiki;
module.exports.generateWallet = generateWallet;