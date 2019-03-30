const TicketCinemaBiletiki = require('../models/ticketCinemaBiletiki'), SeanceBiletiki = require('../models/seanceBiletiki')
const MailingBiletiki = require('../models/mailingBiletiki');
const format = require('./const').stringifyDateTime
const randomstring = require('randomstring');
const app = require('../app');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const qr = require('qr-image');
const myConst = require('../module/const');
const PaymentBiletiki = require('../models/paymentBiletiki');
const checkEmail = require('./const').validMail
const checkPhone = require('./const').validPhone
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const buy = async (req, res, user) => {
    let data = JSON.parse(req.body.data);
    if(checkEmail(data.email)&&checkPhone(data.phone)) {
        let hash = randomstring.generate({length: 12, charset: 'numeric'});
        while (!await checkHash(hash))
            hash = randomstring.generate({length: 12, charset: 'numeric'});
        let qrname = randomstring.generate(5) + user._id + data.event._id + '.png';
        let pdfname = qrname.replace('.png', '.pdf');
        let qrpath = path.join(app.dirname, 'public', 'qr', qrname);
        let fstream = fs.createWriteStream(qrpath);
        let qrTicket = await qr.image(hash, {type: 'png'});
        let stream = qrTicket.pipe(fstream)
        stream.on('finish', async () => {
            /*const code39 = barcode('code39', {
                data: hash,
                width: 400,
                height: 100,
            });
            let barcodepath = path.join(app.dirname, 'public', 'barcode', qrname);
            code39.saveImage(barcodepath, function (err){*/
            let doc = new PDFDocument();
            let pdfpath = path.join(app.dirname, 'public', 'ticket', pdfname);
            let robotoBlack = path.join(app.dirname, 'public', 'font', 'roboto', 'NotoSans-Regular.ttf');
            doc.registerFont('NotoSans', robotoBlack);
            let fstream = fs.createWriteStream(pdfpath);
            doc.pipe(fstream);
            doc
                .font('NotoSans')
                .fontSize(13)
                .text('Kassir.kg', {width: doc.page.width - 100, align: 'center'})
            doc.moveDown()
            let datet = new Date()
            datet = datet.toJSON()
            let date = datet.split('T')[0].split('-')
            let time = datet.split('T')[1].split(':')
            let dateTime = date[2]+' '+myConst.month[date[1]]+' '+date[0]+', '+time[0]+':'+time[1];
            let sum = 0
            for(let i = 0; i<data.seats.length; i++){
                sum+=parseInt(data.seats[i][0]['price'])
            }
            doc
                .font('NotoSans')
                .fontSize(11)
                .text('Сервис: '+data.service+' Сумма: '+sum+' сом Дата: '+dateTime, {width: doc.page.width - 100, align: 'justify'})
            doc
                .font('NotoSans')
                .fontSize(11)
                .text('Кино: '+data.movie, {width: doc.page.width - 100, align: 'justify'})
            doc
                .font('NotoSans')
                .fontSize(11)
                .text('Кинотеатр: '+data.cinema, {width: doc.page.width - 100, align: 'justify'})
            doc
                .font('NotoSans')
                .fontSize(11)
                .text('Зал: '+data.hall, {width: doc.page.width - 100, align: 'justify'})
            doc.moveDown()
            doc
                .font('NotoSans')
                .fontSize(11)
                .text('Места:', {width: doc.page.width - 100, align: 'justify'})
            for(let i = 0; i<data.seats.length; i++){
                let date = data.seats[i][1].split('T')[0].split('-')
                let time = data.seats[i][1].split('T')[1].split(':')
                let dateTime = date[2] + ' ' + myConst.month[date[1]] + ' ' + date[0] + ', ' + time[0] + ':' + time[1];
                doc
                    .font('NotoSans')
                    .fontSize(11)
                    .text((i + 1)+') Дата: '+dateTime+' Ряд '+data.seats[i][0]['name'].split(':')[0].split(' ')[1]+' Место '+data.seats[i][0]['name'].split(':')[1].split(' ')[0]+' Цена: '+data.seats[i][0]['price'] + ' сом', {width: doc.page.width - 100, align: 'justify'})
            }
            doc.moveDown()
            doc.image(qrpath, {fit: [145, 145], align: 'justify'})
            doc
                .font('NotoSans')
                .fontSize(11)
                .text('Код проверки: '+hash, {width: doc.page.width - 100, align: 'justify'})
            doc
                .font('NotoSans')
                .fontSize(11)
                .text('Техническая поддержка: info@kassir.kg', {width: doc.page.width - 100, align: 'justify'})
            doc.end()
        })
        await SeanceBiletiki.findOneAndUpdate({_id: data.event._id}, {$set: data.event});
        let _object = new TicketCinemaBiletiki({
            seats: data.seats,
            image: data.image,
            hash: hash,
            user: user._id,
            event: data.event._id,
            ticket: myConst.url + 'ticket/' + pdfname,
            status: 'ожидается оплата',
            movie: data.movie,
            cinema: data.cinema,
            hall: data.hall,
        });
        await TicketCinemaBiletiki.create(_object);
        let payment = new PaymentBiletiki({
            wallet: data.wallet,
            ticket: _object._id,
            ammount: data.fullPrice,
            service: data.service,
            meta: '*',
            status: 'обработка',
            name: data.name,
            email: data.email,
            phone: data.phone
        });
        await PaymentBiletiki.create(payment);
        let mailingBiletiki = await MailingBiletiki.findOne();
        let wallet1 = data.wallet
        if(data.service=='ЭЛСОМ')
            wallet1 = data.elsomCode
        let mailOptions = {
            from: mailingBiletiki.mailuser,
            to: data.email,
            subject: 'Kassir.kg - Счет за билет',
            text: 'Ваш счет для оплаты: ' + wallet1
        };
        if (mailingBiletiki !== null) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: mailingBiletiki.mailuser,
                    pass: mailingBiletiki.mailpass
                },
                tls: {
                    // do not fail on invalid certs
                    rejectUnauthorized: false
                }
            });
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
        setTimeout(async () => {
            let ticket = await TicketCinemaBiletiki.findOne({_id: _object._id})
            if (ticket.status === 'ожидается оплата') {
                let _seance = await SeanceBiletiki.findOne({_id: data.event._id})
                for (let x = 0; x < ticket.seats.length; x++) {
                    for (let i = 0; i < _seance.seats.length; i++) {
                        for (let i1 = 0; i1 < _seance.seats[i].length; i1++) {
                            if (_seance.seats[i][i1].name === ticket.seats[x].name) {
                                _seance.seats[i][i1].status='free'
                                _seance.seats[i][i1].color='indigo'
                            }
                        }
                    }
                }


                await SeanceBiletiki.findOneAndUpdate({_id: data.event._id}, {$set: _seance});
                await TicketCinemaBiletiki.deleteMany({_id: _object._id})
                await PaymentBiletiki.deleteMany({ticket: _object._id})
            }
        }, 1800000);
    }
}

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
        } else if (mongoose.Types.ObjectId.isValid(search)) {
            count = await TicketCinemaBiletiki.count({
                $and: [
                    {user: user._id},
                    {
                        $or: [
                            {_id: search},
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
                            {_id: search},
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
        } else if (mongoose.Types.ObjectId.isValid(search)) {
            count = await TicketCinemaBiletiki.count({
                $or: [
                    {_id: search},
                    {hash: {'$regex': search, '$options': 'i'}},
                    {status: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await TicketCinemaBiletiki.find({
                $or: [
                    {_id: search},
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
module.exports.buy = buy;
