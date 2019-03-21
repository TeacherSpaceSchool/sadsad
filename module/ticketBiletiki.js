const MailingBiletiki = require('../models/mailingBiletiki');
const TicketBiletiki = require('../models/ticketBiletiki'), EventBiletiki = require('../models/eventBiletiki')
const randomstring = require('randomstring');
const format = require('./const').stringifyDateTime
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
                .text('Площадка: '+data.event.where.name, {width: doc.page.width - 100, align: 'justify'})
            doc
                .font('NotoSans')
                .fontSize(11)
                .text('Мероприятие: '+data.event.nameRu, {width: doc.page.width - 100, align: 'justify'})
            doc.moveDown()
            doc
                .font('NotoSans')
                .fontSize(11)
                .text('Места:', {width: doc.page.width - 100, align: 'justify'})
            for (let i = 0; i < data.seats.length; i++) {
                let date = data.seats[i][1].split('T')[0].split('-')
                let time = data.seats[i][1].split('T')[1].split(':')
                let dateTime = date[2] + ' ' + myConst.month[date[1]] + ' ' + date[0] + ', ' + time[0] + ':' + time[1];
                doc
                    .font('NotoSans')
                    .fontSize(11)
                    .text((i + 1)+') Дата: '+dateTime+' Место: '+data.seats[i][0]['name']+' Цена: '+data.seats[i][0]['price'] + ' сом', {width: doc.page.width - 100, align: 'justify'})
            }
            doc.moveDown()
            doc.image(qrpath, {fit: [145, 145], align: 'center'})
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
        await EventBiletiki.findOneAndUpdate({_id: data.event._id}, {$set: data.event});
        let _object = new TicketBiletiki({
            seats: data.seats,
            hash: hash,
            user: user._id,
            image: data.event.image,
            genre: data.event.genre,
            event: data.event.nameRu,
            where: data.event.where.name,
            ticket: myConst.url + 'ticket/' + pdfname,
            status: 'ожидается оплата',
        });
        await TicketBiletiki.create(_object);
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
        let mailOptions = {
            from: 'info@kassir.kg',
            to: data.email,
            subject: 'Счет за билет',
            text: 'Ваш счет для оплаты: ' + data.wallet
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
      /*  setTimeout(async () => {
            let ticket = await TicketBiletiki.findOne({_id: _object._id})
            if (ticket.status === 'ожидается оплата') {
                let _event_ = await EventBiletiki.findOne({_id: data.event._id})
                if (!_event_.where.data[_event_.date[0]].without) {
                    for (let x = 0; x < ticket.seats.length; x++) {
                        for (let i = 0; i < _event_.date.length; i++) {
                            let keys = Object.keys(_event_.where.data[_event_.date[i]]);
                            for (let i1 = 0; i1 < keys.length; i1++) {
                                for (let i2 = 0; i2 < _event_.where.data[_event_.date[i]][keys[i1]].length; i2++) {
                                    for (let i3 = 0; i3 < _event_.where.data[_event_.date[i]][keys[i1]][i2].length; i3++) {
                                        if (_event_.where.data[_event_.date[i]][keys[i1]][i2][i3].name === ticket.seats[x][0].name && ticket.seats[x][1].includes(_event_.date[i])) {
                                            _event_.where.data[_event_.date[i]][keys[i1]][i2][i3].status = 'free'
                                            for (let c = 0; c < _event_.price.length; c++) {
                                                if (_event_.price[c].price === _event_.where.data[_event_.date[i]][keys[i1]][i2][i3].price)
                                                    _event_.where.data[_event_.date[i]][keys[i1]][i2][i3].color = _event_.price[c].color
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                await EventBiletiki.findOneAndUpdate({_id: data.event._id}, {$set: _event_});
                await TicketBiletiki.deleteMany({_id: _object._id})
                await PaymentBiletiki.deleteMany({ticket: _object._id})
            }
        }, 1800000);*/
    }
}

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
        } else if (mongoose.Types.ObjectId.isValid(search)) {
            count = await TicketBiletiki.count({
                $or: [
                    {_id: search},
                    {hash: {'$regex': search, '$options': 'i'}},
                    {status: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await TicketBiletiki.find({
                $or: [
                    {_id: search},
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
module.exports.buy = buy;
