const UserBiletiki = require('../models/userBiletiki');
const WalletBiletiki = require('../models/walletBiletiki');
const WalletBiletikiAction = require('../module/walletBiletiki');
const MailingBiletiki = require('../models/mailingBiletiki');
const format = require('./const').stringifyDateTime
const mailchimp = require('../module/mailchimp');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

const getCinemaUser = async () => {
    return(await UserBiletiki.find({status: 'active', role: 'cinema'}))
}

const getUserBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'имя',
            'фамилия',
            'email',
            'телефон',
            'роль',
            'статус',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        else if(sort[0]=='имя'&&sort[1]=='descending')
            sort = '-name';
        else if(sort[0]=='имя'&&sort[1]=='ascending')
            sort = 'name';
        else if(sort[0]=='фамилия'&&sort[1]=='descending')
            sort = '-surname';
        else if(sort[0]=='фамилия'&&sort[1]=='ascending')
            sort = 'surname';
        else if(sort[0]=='email'&&sort[1]=='descending')
            sort = '-email';
        else if(sort[0]=='email'&&sort[1]=='ascending')
            sort = 'email';
        else if(sort[0]=='телефон'&&sort[1]=='descending')
            sort = '-phonenumber';
        else if(sort[0]=='телефон'&&sort[1]=='ascending')
            sort = 'phonenumber';
        else if(sort[0]=='роль'&&sort[1]=='descending')
            sort = '-role';
        else if(sort[0]=='роль'&&sort[1]=='ascending')
            sort = 'role';
        else if(sort[0]=='статус'&&sort[1]=='descending')
            sort = '-status';
        else if(sort[0]=='статус'&&sort[1]=='ascending')
            sort = 'status';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        if(search == ''){
            count = await UserBiletiki.count();
            findResult = await UserBiletiki
                .find({role: {$ne: 'admin'}})
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('name surname email phonenumber role status updatedAt _id');
        } else {
            count = await UserBiletiki.count({
                $and: [
                    {
                        $or: [
                            {name: {'$regex': search, '$options': 'i'}},
                            {surname: {'$regex': search, '$options': 'i'}},
                            {email: {'$regex': search, '$options': 'i'}},
                            {phonenumber: {'$regex': search, '$options': 'i'}},
                            {role: {'$regex': search, '$options': 'i'}},
                            {status: {'$regex': search, '$options': 'i'}},
                        ]}, {
                        role:
                            {$ne: 'admin'}
                    }]
            });
            findResult = await UserBiletiki.find({
                $and: [
                    {
                        $or: [
                            {name: {'$regex': search, '$options': 'i'}},
                            {surname: {'$regex': search, '$options': 'i'}},
                            {email: {'$regex': search, '$options': 'i'}},
                            {phonenumber: {'$regex': search, '$options': 'i'}},
                            {role: {'$regex': search, '$options': 'i'}},
                            {status: {'$regex': search, '$options': 'i'}},
                    ]}, {
                        role:
                            {$ne: 'admin'}
                }]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('name surname email phonenumber role status updatedAt _id');
        }
        for (let i=0; i<findResult.length; i++){
            if(findResult[i].name==undefined)
                findResult[i].name=''
            if(findResult[i].surname==undefined)
                findResult[i].surname=''
            if(findResult[i].phonenumber==undefined)
                findResult[i].phonenumber=''
            if(findResult[i].status==undefined)
                findResult[i].status=''
            data.push([findResult[i].name, findResult[i].surname, findResult[i].email, findResult[i].phonenumber, findResult[i].role, findResult[i].status, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addUserBiletiki = async (object) => {
    try{
        let _object = new UserBiletiki(object);
        await UserBiletiki.create(_object);
        await mailchimp.send(object.email, object.name, object.surname, object._id)
        _object = new WalletBiletiki({user: object._id, wallet: await WalletBiletikiAction.generateWallet(), balance: 0});
        await WalletBiletiki.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setUserBiletiki = async (object, id) => {
    try{
        if(object.password!==undefined&&object.password.length>0) {
            let user = await UserBiletiki.findById({_id: id});
            user.email = object.email;
            user.name = object.name;
            user.surname = object.surname;
            user.phonenumber = object.phonenumber;
            user.role = object.role;
            user.status = object.status;
            user.password = object.password;
            await user.save();
        } else {
            await UserBiletiki.findOneAndUpdate({_id: id}, {$set: object});
        }
    } catch(error) {
        console.error(error)
    }
}

let recoveryPass = async (email) => {
    if(await UserBiletiki.count({email: email})>0){
        let newPassword = randomstring.generate(7);
        let user = await UserBiletiki.findOne({email: email});
        user.password = newPassword;
        await user.save();
        let mailOptions = {
            from: 'alilameneg@gmail.com',
            to: email,
            subject: 'Восстановление пароля',
            text: 'Ваш новый пароль: '+newPassword
        };
        let mailingBiletiki = await MailingBiletiki.findOne();
        if(mailingBiletiki!==null&&UserBiletiki.find({email: email}).length>0){
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: mailingBiletiki.mailuser,
                    pass: mailingBiletiki.mailpass
                }
            });
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    }
}

const deleteUserBiletiki = async (id) => {
    try{
        await UserBiletiki.deleteMany({_id: {$in: id}});
        await WalletBiletiki.deleteMany({user: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getCinemaUser = getCinemaUser;
module.exports.recoveryPass = recoveryPass;
module.exports.deleteUserBiletiki = deleteUserBiletiki;
module.exports.getUserBiletiki = getUserBiletiki;
module.exports.setUserBiletiki = setUserBiletiki;
module.exports.addUserBiletiki = addUserBiletiki;