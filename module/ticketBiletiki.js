const MailingBiletiki = require('../models/mailingBiletiki');
const TicketBiletiki = require('../models/ticketBiletiki')
const EventBiletiki = require('../models/eventBiletiki')
const EventBiletikiModule = require('../module/eventBiletiki')
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
const abc = require('./seats').abc
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const ExcelJS = require('exceljs');

const buy = async (req, res, user) => {
    let data = JSON.parse(req.body.data);
    let number = 0;
    if(checkEmail(data.email)&&checkPhone(data.phone)) {
        let qrnameA = []
        let pdfnameA = []
        let qrpathA = []
        let hashA = []
        for(let i=0; i<data.seats.length; i++){
            hashA[i]=randomstring.generate({length: 12, charset: 'numeric'});
            while (!await checkHash(hashA[i]))
                hashA[i] = randomstring.generate({length: 12, charset: 'numeric'});
            qrnameA[i] = randomstring.generate(5) + user._id + data.event._id + '.png';
            pdfnameA[i] = (qrnameA[i].replace('.png', '.pdf'));
            qrpathA[i] = (path.join(app.dirname, 'public', 'qr', qrnameA[i]));
            let fstream = fs.createWriteStream(qrpathA[i]);
            let qrTicket = await qr.image(hashA[i], {type: 'png'});
            let stream = qrTicket.pipe(fstream)
            let tickets = ''
            stream.on('finish', async () => {
                number++
                if(number===(data.seats.length)){
                    let payment = new PaymentBiletiki({
                        wallet: data.wallet,
                        ticket: '*',
                        ammount: data.fullPrice,
                        service: data.service,
                        meta: '*',
                        status: 'обработка',
                        name: data.name,
                        email: data.email,
                        phone: data.phone
                    });
                    let doc = new PDFDocument();
                    let pdfpath = path.join(app.dirname, 'public', 'ticket', pdfnameA[0]);
                    let robotoBlack = path.join(app.dirname, 'public', 'font', 'roboto', 'NotoSans-Regular.ttf');
                    doc.registerFont('NotoSans', robotoBlack);
                    let fstream = fs.createWriteStream(pdfpath);
                    doc.pipe(fstream);
                    let event = await EventBiletiki.findById({_id: data.event._id});
                    for(let i1=0; i1<number; i1++){
                        doc.moveDown()
                        doc.image(qrpathA[i1], doc.page.width - 200, 15, {fit: [200, 200], align: 'center'})
                        doc.moveDown()
                        doc
                            .font('NotoSans')
                            .fontSize(13)
                            .text('Kassir.kg', {width: doc.page.width - 100, align: 'justify'})
                        doc.moveDown()
                        let datet = new Date()
                        datet = datet.toJSON()
                        let dateA = datet.split('T')[0].split('-')
                        let timeA = datet.split('T')[1].split(':')
                        let dateTimeA = dateA[2]+' '+myConst.month[dateA[1]]+' '+dateA[0]+', '+timeA[0]+':'+timeA[1];
                        let sum = parseInt(data.seats[i1][0]['price'])
                        doc
                            .font('NotoSans')
                            .fontSize(10)
                            .text('Сервис: '+data.service, {width: doc.page.width - 100, align: 'justify'})
                        doc
                            .font('NotoSans')
                            .fontSize(10)
                            .text('Дата покупки: '+dateTimeA, {width: doc.page.width - 100, align: 'justify'})
                        if(!data.seats[i1][0].newWithout)
                            doc
                                .font('NotoSans')
                                .fontSize(10)
                                .text('Площадка: '+data.event.where.name, {width: doc.page.width - 100, align: 'justify'})
                        doc
                            .font('NotoSans')
                            .fontSize(10)
                            .text('Мероприятие: '+data.event.nameRu, {width: doc.page.width - 100, align: 'justify'})
                        doc.moveDown()
                        let dateB = data.seats[i1][1].split('T')[0].split('-')
                        let timeB = data.seats[i1][1].split('T')[1].split(':')
                        let dateTimeB = dateB[2] + ' ' + myConst.month[dateB[1]] + ' ' + dateB[0] + ', ' + timeB[0] + ':' + timeB[1];
                        let place = data.seats[i1][0]['name']
                        if(data.seats[i1][0]['name'].split(':')[1]!==undefined) {
                            place = 'Сектор '+data.seats[i1][0]['selectSector'] + ' Ряд ' + data.seats[i1][0]['name'].split(':')[0].split(' ')[1] + ' Место ' + data.seats[i1][0]['name'].split(':')[1].split(' ')[0]
                        }
                        if(data.seats[i1][0].newWithout)
                            place = 'Тариф: '+place
                        doc
                            .font('NotoSans')
                            .fontSize(10)
                            .text('    Дата проведения: '+dateTimeB+'\n'+
                                '    '+place+'\n'+
                                '    Цена: '+data.seats[i1][0]['price'] + ' сом', {width: doc.page.width - 100, align: 'justify'})
                        doc.moveDown()
                        doc
                            .font('NotoSans')
                            .fontSize(10)
                            .text('Код проверки: '+hashA[i1], {width: doc.page.width - 100, align: 'justify'})
                        doc
                            .font('NotoSans')
                            .fontSize(10)
                            .text('Техническая поддержка: info@kassir.kg', {width: doc.page.width - 100, align: 'justify'})
                        doc
                            .font('NotoSans')
                            .fontSize(10)
                            .text('Телефоный номер: +996 (312 / 559 / 777 / 500) 988 477', {width: doc.page.width - 100, align: 'justify'})
                        doc.moveDown()
                        doc
                            .font('NotoSans')
                            .fontSize(6)
                            .text('Билетти пайдалануу эрежелери \n' +
                                '1. Бул электрондук билет иш-чарага катышууга укук берет. \n' +
                                '2. Электрондук билетти көчүрүүгө жана көчүрмөлөрүн үчүнчү тараптарга берүүгө тыюу салынат. Бул электрондук билеттеги бирдей штрих-кодду, сиз үчүн иш-чарага катышууга бир ирет кирүү укугуна кепилдик берет. Үчүнчү тараптагыларга ушуга окшош штирх-коду бар электрондук билетти берилгендиги аныкталса, Сиз иш-чарага катышуу укугунан айрыласыз. \n' +
                                '3. Электрондук билеттерди текшерүү жана иш-чарага катышуу – уюштуруу уюмунун же аймактык администрациянын башчысы белгилеген эрежеге ылайык жүзөгө ашырылат. Электрондук билетти пайдалануу жана укук ченемин текшерүү максатында, учурунда өзүңүз менен бирге өздүгүңүздү аныктоочу документти алып жүрүүнү эскертет.\n' +
                                '4. Билетти сатып алууда, Сиз Kassir.kg сайтында толук нускасы жарыяланган эрежелер менен макулдашасыз. \n' +
                                '5. Иш-чарага белгиленген убакыттан 15 минутага ашык кечиккен көрөрмандар типтүү билети бар болгон жагдайда да киргизилбейт. \n' +
                                '6. Мас абалында жана өзү менен бирге спирттик суусундуктарды алып келген жарандар типтүү билети бар болгон жагдайда иш-чарага киргизилбейт. \n' +
                                '7. Билет, билет кассаларынан башка жерлерден, өкүлдөрдөн жана тараптардан сатып алынган билеттер, алардын түп нускасына шайкеш келбеген жагдайда, жасалма деп таанылат. Мындай жагдайда ушундай билеттин ээси аны пайдаланууга жана таркаткан болсо кылмыш жана административдик жоопкерчиликке тартыларын эскертет. \n\n' +
                                'Правила использования билета \n' +
                                '1. Настоящий электронный билет дает право на посещение мероприятия. \n' +
                                '2. Настоящий электронный билет запрещается копировать и передавать копии третьим лицам. Уникальный идентификатор (штрих-код), содержащийся на настоящем электронном билете, гарантирует вам право на однократное посещение мероприятия. Предъявление третьими лицами электронного билета с идентичным идентификатором лишает вас права на посещение мероприятия. \n' +
                                '3. Проверка электронных билетов и проход на мероприятие осуществляется в соответствии с правилами, установленными организатором или администрацией площадки. Для прохождения процедуры идентификации электронного билета и в целях проверки правомерности использования настоящего электронного билета рекомендовано иметь при себе документ, удостоверяющий личность. \n' +
                                '4. Приобретая билет Вы соглашаетесь с Правилами, полная версия которых опубликована на сайте Kassir.kg. \n' +
                                '5. Зрители, опоздавшие на мероприятие по установленному времени более 15-ти минут, не допускаются, даже при наличии билета. \n' +
                                '6. Лицам в нетрезвом состоянии, и со своими спиртными напитками, не допускаются на мероприятие, даже при наличии билета. \n' +
                                '7. Билеты, приобретенные в иных местах, нежели в билетных кассах, у уполномоченных представителей и распространителей могут быть признаны поддельными при несоответствии с их оригинальными билетами. В этом случае владелец такого билета несет риск уголовной, административной ответственности, при попытке его использования, наряду с распространителями этих билетов.',
                                {columns: 2,
                                    columnGap: 15,
                                    height: 200,
                                    width: 465,
                                    align: 'justify'})
                        if(i1!==number-1)
                            doc.addPage()

                        let _object = new TicketBiletiki({
                            seats: [data.seats[i1]],
                            hash: hashA[i1],
                            user: user._id,
                            image: data.event.image,
                            genre: data.event.genre,
                            event: data.event.nameRu,
                            where: data.event.where.name,
                            ticket: myConst.url + 'ticket/' + pdfnameA[0],
                            status: 'ожидается оплата',
                            payment: payment._id
                        });

                        tickets+=('|'+_object._id)

                        await TicketBiletiki.create(_object);

                        if (!event.where.data[event.date[0]].without&&!event.where.data[event.date[0]].withoutNew) {
                            for (let x = 0; x < _object.seats.length; x++) {
                                for (let i = 0; i < event.date.length; i++) {
                                    let keys = Object.keys(event.where.data[event.date[i]]);
                                    for (let i1 = 0; i1 < keys.length; i1++) {
                                        for (let i2 = 0; i2 < event.where.data[event.date[i]][keys[i1]].length; i2++) {
                                            for (let i3 = 0; i3 < event.where.data[event.date[i]][keys[i1]][i2].length; i3++) {
                                                if (event.where.data[event.date[i]][keys[i1]][i2][i3].name === _object.seats[x][0].name &&
                                                    _object.seats[x][1].includes(event.date[i])&&
                                                    abc[event.where.name][keys[i1]] === _object.seats[x][0].selectSector
                                                ) {
                                                    event.where.data[event.date[i]][keys[i1]][i2][i3].status = 'sold'
                                                    event.where.data[event.date[i]][keys[i1]][i2][i3].color = 'red'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else [
                            event = data.event
                        ]



                    }
                    doc.end()

                    await EventBiletikiModule.setEventBiletiki(event, event._id);

                    payment.ticket = tickets
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
                        let tickets = await TicketBiletiki.find({payment: payment._id})
                        for(let ii=0; ii<tickets.length; ii++){
                            if (tickets[ii].status === 'ожидается оплата') {
                                let _event_ = await EventBiletiki.findOne({_id: data.event._id})
                                if (!_event_.where.data[_event_.date[0]].without&&!_event_.where.data[_event_.date[0]].withoutNew) {
                                    for (let x = 0; x < tickets[ii].seats.length; x++) {
                                        for (let i = 0; i < _event_.date.length; i++) {
                                            let keys = Object.keys(_event_.where.data[_event_.date[i]]);
                                            for (let i1 = 0; i1 < keys.length; i1++) {
                                                for (let i2 = 0; i2 < _event_.where.data[_event_.date[i]][keys[i1]].length; i2++) {
                                                    for (let i3 = 0; i3 < _event_.where.data[_event_.date[i]][keys[i1]][i2].length; i3++) {
                                                        if (_event_.where.data[_event_.date[i]][keys[i1]][i2][i3].name === tickets[ii].seats[x][0].name &&
                                                            tickets[ii].seats[x][1].includes(_event_.date[i])&&
                                                            abc[_event_.where.name][keys[i1]] === tickets[ii].seats[x][0].selectSector
                                                        ) {
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
                                await EventBiletiki.updateOne({_id: data.event._id}, {$set: _event_});
                                await TicketBiletiki.deleteMany({_id: tickets[ii]._id})
                                await PaymentBiletiki.deleteMany({_id: payment._id})
                            }
                        }

                    }, 30*60*1000);
                    res.status(200);
                    res.end('ok');
                }
            })
        }
        //await EventBiletiki.updateOne({_id: data.event._id}, {$set: data.event});
    }
}

const checkHash = async (hash) => {
    const new1 = await TicketBiletiki.count({hash: {'$regex': hash, '$options': 'i'}})===0;
    return(new1)
}

const approveTicketBiletiki = async (object, hash) => {
    try{
        if(await TicketBiletiki.count({hash: {'$regex': hash, '$options': 'i'}, status: 'продан'})!==0){
            await TicketBiletiki.updateOne({hash: {'$regex': hash, '$options': 'i'}}, {$set: {status: 'использован'}});
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
    return(await TicketBiletiki.findOne({hash: {'$regex': hash, '$options': 'i'}}).populate({path: 'user', select: 'name email'}))
}

const getUnlouding = async (event) => {
    let findEvent = await EventBiletiki
        .findOne({nameRu: event});
    let price = findEvent.price.map((element)=>element.price)
    let paymentSystems = {}

    let findResult = await TicketBiletiki
        .find({event: event})
        .populate({
            path: 'user',
        });
    let workbook = new ExcelJS.Workbook();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let worksheet = await workbook.addWorksheet('Выгрузка');
    worksheet.columns = [
        { header: 'id', key: '_id', width: 10 },
        { header: 'время заказа', key: 'timeBuy', width: 10 },
        { header: 'событие', key: 'event', width: 10 },
        { header: 'время проведения', key: 'timeCurry', width: 10 },
        { header: 'категория', key: 'genre', width: 10 },
        { header: 'место проведения', key: 'where', width: 10 },
        { header: 'секция', key: 'sector', width: 10 },
        { header: 'ряд', key: 'row', width: 10 },
        { header: 'место', key: 'seat', width: 10 },
        { header: 'стоимость', key: 'price', width: 10 },
        { header: 'пользователь', key: 'user', width: 10 },
        { header: 'система', key: 'paySystem', width: 10 },
        { header: 'штрихкод', key: 'qrCode', width: 10 },
        { header: 'статус', key: 'status', width: 10 },
    ];
    for (let i=0; i<findResult.length; i++){
        let user = '';
        let paymentSystem = '';
        if(findResult[i].user !=undefined){
            user = findResult[i].user.email+' ['+findResult[i].user._id+']'
            if(findResult[i].user.role=='admin'){
                paymentSystem = 'центральная касса'

            }
            else if(findResult[i].user.role=='cashier'){
                paymentSystem = 'кассир'
            }
            else if(findResult[i].user.role=='organizator'){
                paymentSystem = 'организатор'
            }
            else {
                paymentSystem = await PaymentBiletiki.findOne({ticket: {'$regex': findResult[i]._id, '$options': 'i'}})
                if(paymentSystem != null){
                    paymentSystem = paymentSystem.service
                } else {
                    paymentSystem = 'ошибка'
                }
            }
        }
        else {
            paymentSystem = await PaymentBiletiki.findOne({ticket: {'$regex': findResult[i]._id, '$options': 'i'}})
            if(paymentSystem != null){
                paymentSystem = paymentSystem.service
            } else {
                paymentSystem = 'ошибка'
            }
        }
        if(paymentSystems[paymentSystem]===undefined)
            paymentSystems[paymentSystem] = {
                count: 0,
                usd: 0
            }
        if(['использован', 'продан', 'возвращен'].includes(findResult[i].status))
            paymentSystems[paymentSystem] = {
                count: paymentSystems[paymentSystem].count+=1,
                usd: paymentSystems[paymentSystem].usd+=parseInt(findResult[i].seats[0][0].price)
            }
        let seat = '';
        let row = '';
        let sector = '';
        let timeCarry = '';
        let price = '';
        if(findResult[i].seats !=undefined){
            if(findResult[i].seats[0][0].name.split(':')[1]!==undefined) {
                seat = findResult[i].seats[0][0].name.split(':')[1].split(' ')[0];
                row = findResult[i].seats[0][0].name.split(':')[0].split(' ')[1];
            }
            if(findResult[i].seats[0][0].selectSector!==undefined) sector = findResult[i].seats[0][0].selectSector
            else if(findResult[i].seats[0][2]!==undefined) sector = findResult[i].seats[0][2];
            else sector = findResult[i].seats[0][0].name
            timeCarry = findResult[i].seats[0][1];
            price = findResult[i].seats[0][0].price;
        }
        await worksheet.addRow({
            ticket: findResult[i].ticket,
            qrCode: findResult[i].hash,
            user: user,
            event: findResult[i].event,
            where: findResult[i].where,
            status: findResult[i].status,
            seat: seat,
            row: row,
            paySystem: paymentSystem,
            sector: sector,
            timeCurry: format(timeCarry),
            price: price,
            genre: findResult[i].genre,
            timeBuy: format(findResult[i].createdAt),
            _id: findResult[i]._id
        });
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    worksheet = await workbook.addWorksheet('Отчет по ценам');
    worksheet.columns = [
        { header: 'цена', key: 'price', width: 10 },
        { header: 'заведено', key: 'count', width: 10 },
        { header: 'остаток', key: 'ost', width: 10 },
        { header: 'отмена', key: 'cancel', width: 10 },
        { header: 'продано', key: 'sell', width: 10 },
        { header: 'прибыль', key: 'usd', width: 10 },
    ];
    let otchet = [];
    let allUsd = 0;
    let allOst = 0;
    let count = {'Итого': 0};
    if (!findEvent.where.data[findEvent.date[0]].without&&!findEvent.where.data[findEvent.date[0]].withoutNew) {
        for (let x = 0; x < price.length; x++) {
            count[price[x]] = 0
            for (let i = 0; i < findEvent.date.length; i++) {
                let keys = Object.keys(findEvent.where.data[findEvent.date[i]]);
                for (let i1 = 0; i1 < keys.length; i1++) {
                    for (let i2 = 0; i2 < findEvent.where.data[findEvent.date[i]][keys[i1]].length; i2++) {
                        for (let i3 = 0; i3 < findEvent.where.data[findEvent.date[i]][keys[i1]][i2].length; i3++) {
                            if (findEvent.where.data[findEvent.date[i]][keys[i1]][i2][i3].price == price[x]) {
                                count[price[x]] += 1
                            }
                        }
                    }
                }
            }
            count['Итого'] += count[price[x]]
        }
    }
    else if(findEvent.where.data[findEvent.date[0]].withoutNew){
        for (let x = 0; x < price.length; x++) {
            count[price[x]] = 0
            for (let i = 0; i < findEvent.date.length; i++) {
                let keys = Object.keys(findEvent.where.data[findEvent.date[i]]);
                for (let i1 = 0; i1 < keys.length; i1++) {
                    for (let i2 = 0; i2 < findEvent.where.data[findEvent.date[i]][keys[i1]].length; i2++) {
                        if (findEvent.where.data[findEvent.date[i]][keys[i1]][i2].price.price == price[x]) {
                                count[price[x]] += (parseInt(findEvent.where.data[findEvent.date[i]][keys[i1]][i2].free)+parseInt(findEvent.where.data[findEvent.date[i]][keys[i1]][i2].sold))
                        }
                    }
                }
            }
            count['Итого'] += count[price[x]]
        }
    }
    else if(findEvent.where.data[findEvent.date[0]].without){
        for (let x = 0; x < price.length; x++) {
            count[price[x]] = 0
            for (let i = 0; i < findEvent.date.length; i++) {
                let keys = Object.keys(findEvent.where.data[findEvent.date[i]]);
                for (let i1 = 0; i1 < keys.length; i1++) {
                    for (let i2 = 0; i2 < findEvent.where.data[findEvent.date[i]][keys[i1]].length; i2++) {
                        if (findEvent.where.data[findEvent.date[i]][keys[i1]][i2].price.price == price[x]) {
                            count[price[x]] += parseInt(findEvent.where.data[findEvent.date[i]][keys[i1]][i2].free)
                        }
                    }
                }
            }
            count['Итого'] += count[price[x]]
        }
    }
    for (let i=0; i<price.length; i++){
        let findTicketByPrice = findResult.filter(findResult => findResult.seats[0][0].price==price[i])
        otchet[i] = {}
        otchet[i].name = price[i]
        otchet[i].count = count[price[i]]
        otchet[i].sell = (findTicketByPrice.filter(findTicketByPrice => ['использован', 'продан', 'возвращен'].includes(findTicketByPrice.status))).length;
        otchet[i].cancel = (findTicketByPrice.filter(findTicketByPrice => ['отмена'].includes(findTicketByPrice.status))).length
        otchet[i].usd = ((findTicketByPrice.filter(findTicketByPrice => ['использован', 'продан', 'возвращен'].includes(findTicketByPrice.status))).length)*parseInt(price[i]);
        otchet[i].ost = otchet[i].count - otchet[i].sell
        allUsd+=otchet[i].usd
        allOst+=otchet[i].ost
    }
    otchet[otchet.length] = {}
    otchet[otchet.length-1].name = 'Итого'
    otchet[otchet.length-1].count = count['Итого']
    otchet[otchet.length-1].sell = (findResult.filter(findResult => ['использован', 'продан', 'возвращен'].includes(findResult.status))).length;
    otchet[otchet.length-1].cancel = (findResult.filter(findResult => ['отмена'].includes(findResult.status))).length
    otchet[otchet.length-1].usd = allUsd
    otchet[otchet.length-1].ost = allOst
    for (let i=0; i<otchet.length; i++){
        await worksheet.addRow({
            count: otchet[i].count,
            price: otchet[i].name,
            sell: otchet[i].sell,
            cancel: otchet[i].cancel,
            usd: otchet[i].usd,
            ost: otchet[i].ost
        });
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    worksheet = await workbook.addWorksheet('Отчет по Платежным Системам');
    worksheet.columns = [
        { header: 'имя', key: 'price', width: 10 },
        { header: 'продано', key: 'count', width: 10 },
        { header: 'прибыль', key: 'usd', width: 10 },
    ];
    let allCount = 0, allUsd1 = 0;
    for (let i=0; i<(Object.keys(paymentSystems)).length; i++){
        allCount += paymentSystems[(Object.keys(paymentSystems))[i]].count
        allUsd1 += parseInt(paymentSystems[(Object.keys(paymentSystems))[i]].usd)
        await worksheet.addRow({
            price: (Object.keys(paymentSystems))[i],
            count: paymentSystems[(Object.keys(paymentSystems))[i]].count,
            usd: paymentSystems[(Object.keys(paymentSystems))[i]].usd
        });
    }
    await worksheet.addRow({
        price: 'Итого',
        count: allCount,
        usd: allUsd1
    });

    let xlsxname = randomstring.generate(10) + '.xlsx';
    let xlsxdir = path.join(app.dirname, 'public', 'xlsx');
    if (!await fs.existsSync(xlsxdir)){
        await fs.mkdirSync(xlsxdir);
    }
    let xlsxpath = path.join(app.dirname, 'public', 'xlsx', xlsxname);
    await workbook.xlsx.writeFile(xlsxpath);
    return(myConst.url + 'xlsx/' + xlsxname)
}

const getTicketBiletiki1 = async (search, sort, skip, user) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'билет',
            'проверочный код',
            'пользователь',
            'событие',
            'место проведения',
            'статус',
            'место',
            'ряд',
            'сектор',
            'время проведения',
            'стоимость',
            'жанр',
            'время заказа',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-createdAt';
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
            sort = '-createdAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'createdAt';
        else if(sort[0]=='жанр'&&sort[1]=='descending')
            sort = '-genre';
        else if(sort[0]=='жанр'&&sort[1]=='ascending')
            sort = 'genre';
        if(search == ''){
            count = await TicketBiletiki.count({cashier: user});
            findResult = await TicketBiletiki
                .find({cashier: user})
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('genre hash user event status ticket seats where createdAt image _id')
                .populate({
                    path: 'user',
                    select: 'name email'
                });
        } else if (mongoose.Types.ObjectId.isValid(search)) {
            count = await TicketBiletiki.count({
                cashier: user,
                $or: [
                    {_id: search},
                    {hash: {'$regex': search, '$options': 'i'}},
                    {status: {'$regex': search, '$options': 'i'}},
                    {seats: {'$regex': search, '$options': 'i'}},
                    {event: {'$regex': search, '$options': 'i'}},
                    {where: {'$regex': search, '$options': 'i'}},
                    {genre: {'$regex': search, '$options': 'i'}},
                    {payment: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await TicketBiletiki.find({
                cashier: user,
                $or: [
                    {_id: search},
                    {hash: {'$regex': search, '$options': 'i'}},
                    {status: {'$regex': search, '$options': 'i'}},
                    {seats: {'$regex': search, '$options': 'i'}},
                    {event: {'$regex': search, '$options': 'i'}},
                    {where: {'$regex': search, '$options': 'i'}},
                    {genre: {'$regex': search, '$options': 'i'}},
                    {payment: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('genre hash user event status  ticket seats where createdAt image _id')
                .populate({
                    path: 'user',
                    select: 'name email'
                });
        } else {
            count = await TicketBiletiki.count({
                cashier: user,
                $or: [
                    {hash: {'$regex': search, '$options': 'i'}},
                    {status: {'$regex': search, '$options': 'i'}},
                    {seats: {'$regex': search, '$options': 'i'}},
                    {event: {'$regex': search, '$options': 'i'}},
                    {where: {'$regex': search, '$options': 'i'}},
                    {genre: {'$regex': search, '$options': 'i'}},
                    {payment: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await TicketBiletiki.find({
                cashier: user,
                $or: [
                    {hash: {'$regex': search, '$options': 'i'}},
                    {status: {'$regex': search, '$options': 'i'}},
                    {seats: {'$regex': search, '$options': 'i'}},
                    {event: {'$regex': search, '$options': 'i'}},
                    {where: {'$regex': search, '$options': 'i'}},
                    {genre: {'$regex': search, '$options': 'i'}},
                    {payment: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('genre hash user event status  ticket seats where createdAt image _id')
                .populate({
                    path: 'user',
                    select: 'name email'
                });
        }
        for (let i=0; i<findResult.length; i++){
            let user = '';
            if(findResult[i].user !=undefined)
                user = findResult[i].user.name+'\n'+findResult[i].user.email+'\n'+findResult[i].user._id
            let seat = '';
            let row = '';
            let sector = '';
            let timeCarry = '';
            let price = '';
            if(findResult[i].seats !=undefined){
                if(findResult[i].seats[0][0].name.split(':')[1]!==undefined){
                    seat = findResult[i].seats[0][0].name.split(':')[1].split(' ')[0];
                    row = findResult[i].seats[0][0].name.split(':')[0].split(' ')[1];
                }
                if(findResult[i].seats[0][0].selectSector!==undefined) sector = findResult[i].seats[0][0].selectSector
                else if(findResult[i].seats[0][2]!==undefined) sector = findResult[i].seats[0][2];
                else sector = findResult[i].seats[0][0].name
                timeCarry = findResult[i].seats[0][1];
                price = findResult[i].seats[0][0].price;
            }
            data.push([
                findResult[i].ticket,
                findResult[i].hash,
                user,
                findResult[i].event,
                findResult[i].where,
                findResult[i].status,
                seat,
                row,
                sector,
                format(timeCarry),
                price,
                findResult[i].genre,
                format(findResult[i].createdAt),
                findResult[i]._id]
            );
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const getTicketBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'билет',
            'проверочный код',
            'пользователь',
            'событие',
            'место проведения',
            'статус',
            'место',
            'ряд',
            'сектор',
            'время проведения',
            'стоимость',
            'жанр',
            'время заказа',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-createdAt';
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
            sort = '-createdAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'createdAt';
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
                .select('genre hash user event status ticket seats where createdAt image _id')
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
                    {seats: {'$regex': search, '$options': 'i'}},
                    {event: {'$regex': search, '$options': 'i'}},
                    {where: {'$regex': search, '$options': 'i'}},
                    {genre: {'$regex': search, '$options': 'i'}},
                    {payment: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await TicketBiletiki.find({
                $or: [
                    {_id: search},
                    {hash: {'$regex': search, '$options': 'i'}},
                    {status: {'$regex': search, '$options': 'i'}},
                    {seats: {'$regex': search, '$options': 'i'}},
                    {event: {'$regex': search, '$options': 'i'}},
                    {where: {'$regex': search, '$options': 'i'}},
                    {genre: {'$regex': search, '$options': 'i'}},
                    {payment: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('genre hash user event status  ticket seats where createdAt image _id')
                .populate({
                    path: 'user',
                    select: 'name email'
                });
        } else {
            count = await TicketBiletiki.count({
                $or: [
                    {hash: {'$regex': search, '$options': 'i'}},
                    {status: {'$regex': search, '$options': 'i'}},
                    {seats: {'$regex': search, '$options': 'i'}},
                    {event: {'$regex': search, '$options': 'i'}},
                    {where: {'$regex': search, '$options': 'i'}},
                    {genre: {'$regex': search, '$options': 'i'}},
                    {payment: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await TicketBiletiki.find({
                $or: [
                    {hash: {'$regex': search, '$options': 'i'}},
                    {status: {'$regex': search, '$options': 'i'}},
                    {seats: {'$regex': search, '$options': 'i'}},
                    {event: {'$regex': search, '$options': 'i'}},
                    {where: {'$regex': search, '$options': 'i'}},
                    {genre: {'$regex': search, '$options': 'i'}},
                    {payment: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('genre hash user event status  ticket seats where createdAt image _id')
                .populate({
                    path: 'user',
                    select: 'name email'
                });
        }
        for (let i=0; i<findResult.length; i++){
            let user = '';
            if(findResult[i].user !=undefined)
                user = findResult[i].user.name+'\n'+findResult[i].user.email+'\n'+findResult[i].user._id
            let seat = '';
            let row = '';
            let sector = '';
            let timeCarry = '';
            let price = '';
            if(findResult[i].seats !=undefined){
                if(findResult[i].seats[0][0].name.split(':')[1]!==undefined){
                    seat = findResult[i].seats[0][0].name.split(':')[1].split(' ')[0];
                    row = findResult[i].seats[0][0].name.split(':')[0].split(' ')[1];
                }
                if(findResult[i].seats[0][0].selectSector!==undefined) sector = findResult[i].seats[0][0].selectSector
                else if(findResult[i].seats[0][2]!==undefined) sector = findResult[i].seats[0][2];
                else sector = findResult[i].seats[0][0].name
                timeCarry = findResult[i].seats[0][1];
                price = findResult[i].seats[0][0].price;
            }
            data.push([
                findResult[i].ticket,
                findResult[i].hash,
                user,
                findResult[i].event,
                findResult[i].where,
                findResult[i].status,
                seat,
                row,
                sector,
                format(timeCarry),
                price,
                findResult[i].genre,
                format(findResult[i].createdAt),
                findResult[i]._id]
            );
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
        await TicketBiletiki.updateOne({_id: id}, {$set: object});
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

module.exports.getUnlouding = getUnlouding;
module.exports.getByHash = getByHash;
module.exports.checkHash = checkHash;
module.exports.deleteTicketBiletiki = deleteTicketBiletiki;
module.exports.getTicketBiletiki = getTicketBiletiki;
module.exports.getTicketBiletiki1 = getTicketBiletiki1;
module.exports.setTicketBiletiki = setTicketBiletiki;
module.exports.addTicketBiletiki = addTicketBiletiki;
module.exports.getById = getById;
module.exports.approveTicketBiletiki = approveTicketBiletiki;
module.exports.buy = buy;
