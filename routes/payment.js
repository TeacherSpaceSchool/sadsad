const MailingBiletiki = require('../models/mailingBiletiki');
const express = require('express');
const axios = require('axios');
const router = express.Router();
const PaymentBiletiki = require('../models/paymentBiletiki');
const xml = require('xml');
const https = require('https');
const TicketBiletiki = require('../models/ticketBiletiki');
const TicketCinemaBiletiki = require('../models/ticketCinemaBiletiki');
var convert = require('xml-js');
const nodemailer = require('nodemailer');

/* GET home page. */
router.get('/asisnur', async (req, res, next) => {
    let result;
    try{
        let ip = JSON.stringify(req.ip)
        if(ip.includes('95.47.232.100')){
            res.set('Content+Type', 'text/xml');
            if(req.param('command')==='check'){
                let wallet = await PaymentBiletiki.findOne({wallet: req.param('account')})
                if(wallet!=null){
                    result = [ { response: [ { osmp_txn_id: req.param('txn_id') } , { result: 0 }, {comment: 'ok'} ] } ];
                    res.status(200);
                    res.end(xml(result, true));
                } else {
                    result = [ { response: [ { osmp_txn_id: req.param('txn_id') } , { result: 5 }, {comment: 'Идентификатора абонента не найден'} ] } ];
                    res.status(200);
                    res.end(xml(result, true));
                }
            } else if(req.param('command')==='pay'){
                let wallet = await PaymentBiletiki.findOne({wallet: req.param('account')})
                if(wallet!=null){
                    if(wallet.status=='совершен'){
                        result = [ { response: [ { osmp_txn_id: req.param('txn_id') } , { prv_txn: '' } , { sum: req.param('sum') } , { result: 8 } , { comment: 'Прием платежей запрещен по техническим причинам' } ] } ];
                        res.status(200);
                        res.end(xml(result, true));
                    } else if(wallet.status!='обработка'&&wallet.status!='ошибка'){
                        result = [ { response: [ { osmp_txn_id: req.param('txn_id') } , { prv_txn: '' } , { sum: req.param('sum') } , { result: 79 } , { comment: 'Счет абонента не активен' } ] } ];
                        res.status(200);
                        res.end(xml(result, true));
                    } else if(wallet.ammount>parseInt(req.param('sum'))){
                        await PaymentBiletiki.findOneAndUpdate({wallet: req.param('account')}, {status: 'ошибка'})
                        result = [ { response: [ { osmp_txn_id: req.param('txn_id') } , { prv_txn: '' } , { sum: req.param('sum') } , { result: 241 } , { comment: 'Сумма слишком мала' } ] } ];
                        res.status(200);
                        res.end(xml(result, true));
                    } else {
                         let ticket = await TicketBiletiki.findOne({_id: wallet.ticket})
                        if(ticket!=null){
                            await PaymentBiletiki.findOneAndUpdate({wallet: req.param('account')}, {status: 'совершен', meta:'Дата: '+new Date(parseInt(req.param('txn_date')))+' \nID: '+req.param('txn_id')})
                            await TicketBiletiki.findOneAndUpdate({_id: wallet.ticket}, {status: 'продан'})
                            let mailingBiletiki = await MailingBiletiki.findOne();
                            let mailOptions = {
                                from: mailingBiletiki.mailuser,
                                to: wallet.email,
                                subject: 'Ваш билет',
                                text: 'Ссылка на ваш билет: ' + ticket.ticket
                            };
                            if (mailingBiletiki !== null) {
                                const transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                        user: mailingBiletiki.mailuser,
                                        pass: mailingBiletiki.mailpass
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
                            result = [ { response: [ { osmp_txn_id: req.param('txn_id') } , { prv_txn: wallet._id } , { sum: req.param('sum') } , { result: 0 } , { comment: 'ok' } ] } ];
                            res.status(200);
                            res.end(xml(result, true));
                        } else {
                            ticket = await TicketCinemaBiletiki.findOne({_id: wallet.ticket})
                            if(ticket!=null){
                                await PaymentBiletiki.findOneAndUpdate({wallet: req.param('account')}, {status: 'совершен', meta:'Дата: '+new Date(parseInt(req.param('txn_date')))+' \nID: '+req.param('txn_id')})
                                await TicketCinemaBiletiki.findOneAndUpdate({_id: wallet.ticket}, {status: 'продан'})
                                let mailingBiletiki = await MailingBiletiki.findOne();
                                let mailOptions = {
                                    from: mailingBiletiki.mailuser,
                                    to: wallet.email,
                                    subject: 'Ваш билет',
                                    text: 'Ссылка на ваш билет: ' + ticket.ticket
                                };
                                if (mailingBiletiki !== null) {
                                    const transporter = nodemailer.createTransport({
                                        service: 'gmail',
                                        auth: {
                                            user: mailingBiletiki.mailuser,
                                            pass: mailingBiletiki.mailpass
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
                                result = [ { response: [ { osmp_txn_id: req.param('txn_id') } , { prv_txn: payment._id } , { sum: req.param('sum') } , { result: 0 } , { comment: 'ok' } ] } ];
                                res.status(200);
                                res.end(xml(result, true));
                            } else {
                                result = [ { response: [ { osmp_txn_id: req.param('txn_id') } , { prv_txn: '' } , { sum: req.param('sum') } , { result: 5 } , { comment: 'Идентификатора абонента не найден' } ] } ];
                                res.status(200);
                                res.end(xml(result, true));
                            }
                        }
                    }
                } else {
                    result = [ { response: [ { osmp_txn_id: req.param('txn_id') } , { prv_txn: '' } , { sum: req.param('sum') } , { result: 5 } , { comment: 'Идентификатора абонента не найден' } ] } ];
                    res.status(200);
                    res.end(xml(result, true));
                }
            }
        } else {
            res.set('Content+Type', 'text/xml');
            console.error(req.ip)
            res.status(501);
            result = [ { response: [ { result: 501 } , { comment: 'IP адресс не разрешен' } ] } ];
            res.end(xml(result, true));
        }
    } catch(error) {
        res.status(200);
        res.set('Content+Type', 'text/xml');
        console.error(error)
        result = [ { response: [ { result: 1 } , { comment: 'Временная ошибка, повторите запрос позже' } ] } ];
        res.end(xml(result, true));
    }
});
/*
router.get('/qiwi', async (req, res, next) => {
    try{
        let ip = JSON.stringify(req.ip)
        console.log(ip.includes('212.42.104.209'))
        if(ip.includes('212.42.104.209')){
            let result;
            res.set('Content+Type', 'text/xml');
            if(req.param('command')==='check'){
                let wallet = await WalletBiletiki.findOne({wallet: req.param('account')})
                if(wallet!=null){
                    result = [ { response: [ { osmp_txn_id: req.param('txn_id') } , { result: 0 }, {comment: 'ok'} ] } ];
                    res.status(200);
                    res.end(xml(result, true));
                } else {
                    result = [ { response: [ { osmp_txn_id: req.param('txn_id') } , { result: 1 }, {comment: 'ok'} ] } ];
                    res.status(200);
                    res.end(xml(result, true));
                }
            } else if(req.param('command')==='pay'){
                let wallet = await WalletBiletiki.findOne({wallet: req.param('account')})
                console.log(wallet)
                if(wallet!=null){
                    wallet.balance = wallet.balance+parseInt(req.param('sum'))
                    await WalletBiletiki.findOneAndUpdate({_id: wallet._id}, {$set: wallet});
                    let payment = new PaymentBiletiki({status: 'совершен', user: wallet.user, ammount: parseInt(req.param('sum')), service: 'QIWI', meta:'Дата: '+new Date(parseInt(req.param('txn_date')))+' \nID: '+req.param('txn_id')});
                    await PaymentBiletiki.create(payment);
                    result = [ { response: [ { osmp_txn_id: req.param('txn_id') } , { prv_txn: payment._id } , { sum: req.param('sum') } , { result: 0 } , { comment: 'ok' } ] } ];
                    res.status(200);
                    res.end(xml(result, true));
                } else {
                    result = [ { response: [ { osmp_txn_id: req.param('txn_id') } , { prv_txn: '' } , { sum: req.param('sum') } , { result: 1 } , { comment: 'no such user' } ] } ];
                    res.status(200);
                    res.end(xml(result, true));
                }
            }
        } else {
            console.error(req.ip)
            res.status(501);
        }
    } catch(error) {
        console.error(error)
        res.status(501);
        res.end();
    }
});

router.get('/balancekg', async (req, res, next) => {
    try{
        let ip = JSON.stringify(req.ip)
        console.log(ip.includes('212.112.101.182'))
        if(ip.includes('212.112.101.182')){
            let result;
            res.set('Content+Type', 'text/xml');
            if(req.param('command')==='check'){
                let wallet = await WalletBiletiki.findOne({wallet: req.param('account')})
                if(wallet!=null){
                    result = [ { response: [ { osmp_txn_id: req.param('txn_id') } , { result: 0 }, {comment: 'ok'} ] } ];
                    res.status(200);
                    res.end(xml(result, true));
                } else {
                    result = [ { response: [ { osmp_txn_id: req.param('txn_id') } , { result: 1 }, {comment: 'ok'} ] } ];
                    res.status(200);
                    res.end(xml(result, true));
                }
            } else if(req.param('command')==='pay'){
                let wallet = await WalletBiletiki.findOne({wallet: req.param('account')})
                if(wallet!=null){
                    wallet.balance = wallet.balance+parseInt(req.param('sum'))
                    await WalletBiletiki.findOneAndUpdate({_id: wallet._id}, {$set: wallet});
                    let payment = new PaymentBiletiki({status: 'совершен', user: wallet.user, ammount: parseInt(req.param('sum')), service: 'balancekg', meta:'Дата: '+new Date(parseInt(req.param('txn_date')))+' \nID: '+req.param('txn_id')});
                    await PaymentBiletiki.create(payment);
                    result = [ { response: [ { osmp_txn_id: req.param('txn_id') } , { prv_txn: payment._id } , { sum: req.param('sum') } , { result: 0 } , { comment: 'ok' } ] } ];
                    res.status(200);
                    res.end(xml(result, true));
                } else {
                    result = [ { response: [ { osmp_txn_id: req.param('txn_id') } , { prv_txn: '' } , { sum: req.param('sum') } , { result: 1 } , { comment: 'no such user' } ] } ];
                    res.status(200);
                    res.end(xml(result, true));
                }
            }
        } else {
            console.error(req.ip)
            res.status(501);
        }
    } catch(error) {
        console.error(error)
        res.status(501);
    }
});*/


router.post('/elsom/generate', async (req, res, next) => {
    try{
        res.set('Content+Type', 'text/json; charset=utf-8');
            const instance = axios.create({
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                })
            });
            console.log({
                'PartnerGenerateOTP': {
                    'PartnerTrnID': req.body.wallet,
                    'CultureInfo': 'ru-Ru',
                    'MSISDN': '0909000009',
                    'PartnerCode': '04108',
                    'ChequeNo': '',
                    'Amount': req.body.sum,
                    'CashierNo': req.body.wallet,
                    'UDF': req.body.wallet,
                    'Password': '2ac9cb7dc02b3c0083eb70898e549b63'
                }
            })
            let result = await instance.post('https://mbgwt.elsom.kg:10690/MerchantAPI', {
                   'PartnerGenerateOTP': {
                       'PartnerTrnID': req.body.wallet,
                       'CultureInfo': 'ru-Ru',
                       'MSISDN': '0909000009',
                       'PartnerCode': '04108',
                       'ChequeNo': '',
                       'Amount': req.body.sum,
                       'CashierNo': req.body.wallet,
                       'UDF': req.body.wallet,
                       'Password': '2ac9cb7dc02b3c0083eb70898e549b63'
                   }
               }
           );

        let code = result.data.Response.Result.OTP
           res.status(200);
            res.end(code);

    } catch(error) {
        console.error(error)
        res.status(200);
        res.end('error');
    }
})

router.post('/elsom/pay', async (req, res, next) => {
    console.log(req.body)
    res.set('Content+Type', 'text/json; charset=utf-8');
    try{
        let ip = JSON.stringify(req.ip)
        if(ip.includes('93.170.8.84')){

            console.log(req.body)
            let responce = req.body
            if(responce.PartnerPaymentResult==undefined){
                res.set('Content+Type', 'text/plain; charset=utf-8');
            }
            console.log(req.body)
            responce = req.body
            responce = responce.PartnerPaymentResult
            let wallet = await PaymentBiletiki.findOne({wallet: responce.PartnerTrnID})
            console.log(wallet)
            if(wallet!=null){
                console.log(wallet.status)
                if(wallet.status=='совершен'){
                    res.status(200);
                    res.json({
                        'Response':
                            {
                                'ErrorCode': '11003',
                                'ErrorMsg': 'User Authentication Failed.'
                            }
                    });
                } else if(wallet.status!='обработка'&&wallet.status!='ошибка'){
                    res.status(200);
                    res.json({
                        'Response':
                            {
                                'ErrorCode': '11003',
                                'ErrorMsg': 'User Authentication Failed.'
                            }
                    });
                } else {
                    let ticket = await TicketBiletiki.findOne({_id: wallet.ticket})
                    if(ticket!=null){
                        await PaymentBiletiki.findOneAndUpdate({wallet: responce.PartnerTrnID}, {status: 'совершен', meta:'Сообщение: '+responce.Message+' \nID: '+responce.PSPTrnID})
                        await TicketBiletiki.findOneAndUpdate({_id: wallet.ticket}, {status: 'продан'})
                        let mailingBiletiki = await MailingBiletiki.findOne();
                        let mailOptions = {
                            from: mailingBiletiki.mailuser,
                            to: wallet.email,
                            subject: 'Ваш билет',
                            text: 'Ссылка на ваш билет: ' + ticket.ticket
                        };
                        if (mailingBiletiki !== null) {
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: mailingBiletiki.mailuser,
                                    pass: mailingBiletiki.mailpass
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
                        res.status(200);
                        res.json({
                                'Response': {
                                    'ErrorCode': '0',
                                    'ErrorMsg': 'Success'
                                }
                            }
                        );
                    } else {
                        ticket = await TicketCinemaBiletiki.findOne({_id: wallet.ticket})
                        if(ticket!=null){
                            await PaymentBiletiki.findOneAndUpdate({wallet: responce.PartnerTrnID}, {status: 'совершен', meta:'Сообщение: '+responce.Message+' \nID: '+responce.PSPTrnID})
                            await TicketCinemaBiletiki.findOneAndUpdate({_id: wallet.ticket}, {status: 'продан'})
                            let mailingBiletiki = await MailingBiletiki.findOne();
                            let mailOptions = {
                                from: mailingBiletiki.mailuser,
                                to: wallet.email,
                                subject: 'Ваш билет',
                                text: 'Ссылка на ваш билет: ' + ticket.ticket
                            };
                            if (mailingBiletiki !== null) {
                                const transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                        user: mailingBiletiki.mailuser,
                                        pass: mailingBiletiki.mailpass
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
                            res.status(200);
                            res.json({
                                    'Response': {
                                        'ErrorCode': '0',
                                        'ErrorMsg': 'Success'
                                    }
                                }
                            );
                        } else {
                             res.status(200);
                            res.json({
                                'Response':
                                    {
                                        'ErrorCode': '11003',
                                        'ErrorMsg': 'User Authentication Failed.'
                                    }
                            });
                        }
                    }
                }
            } else {
                res.status(200);
                res.json({
                    'Response':
                        {
                            'ErrorCode': '11003',
                            'ErrorMsg': 'User Authentication Failed.'
                        }
                });
            }
        } else {
            console.error(req.ip)
            res.status(501);
            res.json({
                'Response':
                    {
                        'ErrorCode': '501',
                        'ErrorMsg': 'IP адресс не разрешен'
                    }
            });

        }
    } catch(error) {
        console.error(error)
        res.status(200);
        res.json({
            'Response':
                {
                    'ErrorCode': '8000',
                    'ErrorMsg': 'Success'
                }
        });
    }
})

router.post('/kcb/check', async (req, res, next) => {
    res.set('Content+Type', 'text/xml');
    try{
        let ip = JSON.stringify(req.ip)
        let result = {}
        if(ip.includes('95.46.154.64')){
            let responce = req.body.elements[0].elements
            console.log(responce[1]['attributes']['PARAM1'])
            let wallet = await PaymentBiletiki.findOne({wallet: responce[1]['attributes']['PARAM1']})
            if(wallet!=null){
                result = [ { XML: [
                    { HEAD: { _attr: { DTS: responce['XML']['HEAD']['_attributes']['DTS'], QM: responce['XML']['HEAD']['_attributes']['QM'], QID: responce['XML']['BODY']['_attributes']['PARAM1'], OP: responce['XML']['HEAD']['_attributes']['OP'],  }}},
                    { BODY: { _attr: { STATUS: '200', SUM: wallet.ammount }}}
                ] } ];
                res.status(200);
                res.send(xml(result, true));
            } else {
                result = [ { XML: [
                    { HEAD: { _attr: { DTS: responce['XML']['HEAD']['_attributes']['DTS'], QM: responce['XML']['HEAD']['_attributes']['QM'], QID: responce['XML']['BODY']['_attributes']['PARAM1'], OP: responce['XML']['HEAD']['_attributes']['OP'],  }}},
                    { BODY: { _attr: { STATUS: '420', ERR_MSG: 'Указанный лицевой счет не найден' }}}
                    ] } ];
                res.status(200);
                res.send(xml(result, true));
            }
        }
        else {
            console.error(req.ip)
            res.status(501);
            res.send('IP адресс не разрешен');
        }
    } catch(error) {
        console.error(error)
        res.status(501);
    }
});

router.post('/kcb/pay', async (req, res, next) => {
    res.set('Content+Type', 'text/xml');
    try{
        let result = {}
        let ip = JSON.stringify(req.ip)
        if(ip.includes('95.46.154.64')){
            let responce = convert.xml2json(req.body, {compact: true, spaces: 4})
            let wallet = await PaymentBiletiki.findOne({wallet: responce['XML']['BODY']['_attributes']['PARAM1']})
            if(wallet!=null){
                if(wallet.status=='совершен'){
                    result = [ { XML: [
                        { HEAD: { _attr: { DTS: responce['XML']['HEAD']['_attributes']['DTS'], QM: responce['XML']['HEAD']['_attributes']['QM'], QID: responce['XML']['BODY']['_attributes']['PARAM1'], OP: responce['XML']['HEAD']['_attributes']['OP'],  }}},
                        { BODY: { _attr: { STATUS: '400', ERR_MSG: 'Платеж находится в обработке' }}}
                    ] } ];
                    res.status(200);
                    res.end(xml(result, true));
                } else if(wallet.status!='обработка'&&wallet.status!='ошибка'){
                    result = [ { XML: [
                        { HEAD: { _attr: { DTS: responce['XML']['HEAD']['_attributes']['DTS'], QM: responce['XML']['HEAD']['_attributes']['QM'], QID: responce['XML']['BODY']['_attributes']['PARAM1'], OP: responce['XML']['HEAD']['_attributes']['OP'],  }}},
                        { BODY: { _attr: { STATUS: '424', ERR_MSG: 'Сервис временно недоступен' }}}
                    ] } ];
                    res.status(200);
                    res.end(xml(result, true));
                } else {
                    let ticket = await TicketBiletiki.findOne({_id: wallet.ticket})
                    if(ticket!=null){
                        await PaymentBiletiki.findOneAndUpdate({wallet: responce['XML']['BODY']['_attributes']['PARAM1']}, {status: 'совершен', meta:'Дата: '+responce['XML']['HEAD']['_attributes']['DTS']+' \nID: '+responce['XML']['HEAD']['_attributes']['QID']})
                        await TicketBiletiki.findOneAndUpdate({_id: wallet.ticket}, {status: 'продан'})
                        let mailingBiletiki = await MailingBiletiki.findOne();
                        let mailOptions = {
                            from: mailingBiletiki.mailuser,
                            to: wallet.email,
                            subject: 'Ваш билет',
                            text: 'Ссылка на ваш билет: ' + ticket.ticket
                        };
                        if (mailingBiletiki !== null) {
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: mailingBiletiki.mailuser,
                                    pass: mailingBiletiki.mailpass
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
                        result = [ { XML: [
                            { HEAD: { _attr: { DTS: responce['XML']['HEAD']['_attributes']['DTS'], QM: responce['XML']['HEAD']['_attributes']['QM'], QID: responce['XML']['BODY']['_attributes']['PARAM1'], OP: responce['XML']['HEAD']['_attributes']['OP'],  }}},
                            { BODY: { _attr: { STATUS: '250', ERR_MSG: 'Платеж успешно проведен' }}}
                        ] } ];
                        res.status(200);
                        res.end(xml(result, true));
                    } else {
                        ticket = await TicketCinemaBiletiki.findOne({_id: wallet.ticket})
                        if(ticket!=null){
                            await PaymentBiletiki.findOneAndUpdate({wallet: responce['XML']['BODY']['_attributes']['PARAM1']}, {status: 'совершен', meta:'Дата: '+responce['XML']['HEAD']['_attributes']['DTS']+' \nID: '+responce['XML']['HEAD']['_attributes']['QID']})
                            await TicketCinemaBiletiki.findOneAndUpdate({_id: wallet.ticket}, {status: 'продан'})
                            let mailingBiletiki = await MailingBiletiki.findOne();
                            let mailOptions = {
                                from: mailingBiletiki.mailuser,
                                to: wallet.email,
                                subject: 'Ваш билет',
                                text: 'Ссылка на ваш билет: ' + ticket.ticket
                            };
                            if (mailingBiletiki !== null) {
                                const transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                        user: mailingBiletiki.mailuser,
                                        pass: mailingBiletiki.mailpass
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
                            result = [ { XML: [
                                { HEAD: { _attr: { DTS: responce['XML']['HEAD']['_attributes']['DTS'], QM: responce['XML']['HEAD']['_attributes']['QM'], QID: responce['XML']['BODY']['_attributes']['PARAM1'], OP: responce['XML']['HEAD']['_attributes']['OP'],  }}},
                                { BODY: { _attr: { STATUS: '250', ERR_MSG: 'Платеж успешно проведен' }}}
                            ] } ];
                            res.status(200);
                            res.end(xml(result, true));
                        } else {
                            result = [ { XML: [
                                { HEAD: { _attr: { DTS: responce['XML']['HEAD']['_attributes']['DTS'], QM: responce['XML']['HEAD']['_attributes']['QM'], QID: responce['XML']['BODY']['_attributes']['PARAM1'], OP: responce['XML']['HEAD']['_attributes']['OP'],  }}},
                                { BODY: { _attr: { STATUS: '420', ERR_MSG: 'Указанный лицевой счет не найден' }}}
                            ] } ];
                            res.status(200);
                            res.end(xml(result, true));
                        }
                    }
                }
            } else {
                result = [ { XML: [
                    { HEAD: { _attr: { DTS: responce['XML']['HEAD']['_attributes']['DTS'], QM: responce['XML']['HEAD']['_attributes']['QM'], QID: responce['XML']['BODY']['_attributes']['PARAM1'], OP: responce['XML']['HEAD']['_attributes']['OP'],  }}},
                    { BODY: { _attr: { STATUS: '420', ERR_MSG: 'Указанный лицевой счет не найден' }}}
                ] } ];
                res.status(200);
                res.end(xml(result, true));
            }
        } else {
            console.error(req.ip)
            res.status(501);
            res.end('IP адрес не разрешен');

        }
    } catch(error) {
        console.error(error)
        res.status(200);
        res.end({
            'Response':
                {
                    'ErrorCode': '8000',
                    'ErrorMsg': 'Success'
                }
        });
    }
})

router.post('/balance/generate', async (req, res, next) => {
    console.log('balance')
    try{
        res.set('Content+Type', 'text/json; charset=utf-8');
        console.log('balance')
        let auth_token = await axios.post('http://umai.balance.kg/site-api/acquiring/auth?merchant=...&password=...')
        console.log(auth_token.data)
        if(auth_token.data.status=='FAIL'){
            res.status(200);
            res.end('error');
        }
        auth_token = auth_token.data.details.auth_token
        let payment_token = await axios.post('http://umai.balance.kg/site-api/acquiring/request-token?' +
            'merchant: Наименование мерчанта ' +
            'service_id: ID сервиса ' +
            'amount:' + req.body.sum + ' ' +
            'requisite: '+ req.body.wallet + ' ' +
            'transaction_id: ' + req.body.wallet + ' ' +
            'redirect_url: https://kassir.kg ' +
            'hook_url: https://kassir.kg/balance/pay ' +
            'auth_token: ' + auth_token)
        console.log(payment_token.data)
        if(payment_token.data.status=='FAIL'){
            res.status(200);
            res.end('error');
        }
        payment_token = payment_token.data.details.payment_token
        res.status(200);
        res.end('http://balance.kg/acquiring.html?payment_token='+payment_token);
    } catch(error) {
        console.error(error)
        res.status(200);
        res.end('error');
    }
})

router.post('/balance/pay', async (req, res, next) => {
    try{
        res.set('Content+Type', 'text/json; charset=utf-8');
        let payment_state_token = req.param('payment_state_token')
        let wallet = await PaymentBiletiki.findOne({wallet: payment_state_token.transaction_id})

        if(payment_state_token.payment_state == 'SUCCESS'){
            let ticket = await TicketBiletiki.findOne({_id: wallet.ticket})
            if(ticket!=null){
                    await PaymentBiletiki.findOneAndUpdate({wallet: req.param('account')}, {status: 'совершен', meta:'*'})
                    await TicketBiletiki.findOneAndUpdate({_id: wallet.ticket}, {status: 'продан'})
                let mailingBiletiki = await MailingBiletiki.findOne();
                let mailOptions = {
                    from: mailingBiletiki.mailuser,
                    to: wallet.email,
                    subject: 'Ваш билет',
                    text: 'Ссылка на ваш билет: ' + ticket.ticket
                };
                if (mailingBiletiki !== null) {
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: mailingBiletiki.mailuser,
                            pass: mailingBiletiki.mailpass
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
            } else {
                ticket = await TicketCinemaBiletiki.findOne({_id: wallet.ticket})
                if(ticket!=null){
                    await PaymentBiletiki.findOneAndUpdate({wallet: req.param('account')}, {status: 'совершен', meta:'*'})
                    await TicketCinemaBiletiki.findOneAndUpdate({_id: wallet.ticket}, {status: 'продан'})
                    let mailingBiletiki = await MailingBiletiki.findOne();
                    let mailOptions = {
                        from: mailingBiletiki.mailuser,
                        to: wallet.email,
                        subject: 'Ваш билет',
                        text: 'Ссылка на ваш билет: ' + ticket.ticket
                    };
                    if (mailingBiletiki !== null) {
                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: mailingBiletiki.mailuser,
                                pass: mailingBiletiki.mailpass
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
                }
            }
        }
        res.status(200);
        res.end();
    } catch(error) {
        console.error(error)
        res.status(200);
        res.end('error');
    }
})

router.post('/tested', async (req, res, next) => {
    try{
        console.log(req.body, req.params)
        res.status(501);
        res.end('error');
    } catch(error) {
        console.error(error)
        res.status(501);
    }
});

router.post('/visa/pay', async (req, res, next) => {
    try{
        let wallet = await PaymentBiletiki.findOne({wallet: req.body['ReturnOid']})
        if(wallet!=null){
            let ticket = await TicketBiletiki.findOne({_id: wallet.ticket})
            if(ticket!=null){
                await PaymentBiletiki.findOneAndUpdate({wallet: req.body['ReturnOid']}, {status: 'совершен', meta:'maskedCreditCard: '+req.body['maskedCreditCard']})
                await TicketBiletiki.findOneAndUpdate({_id: wallet.ticket}, {status: 'продан'})
                let mailingBiletiki = await MailingBiletiki.findOne();
                let mailOptions = {
                    from: mailingBiletiki.mailuser,
                    to: wallet.email,
                    subject: 'Ваш билет',
                    text: 'Ссылка на ваш билет: ' + ticket.ticket
                };
                if (mailingBiletiki !== null) {
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: mailingBiletiki.mailuser,
                            pass: mailingBiletiki.mailpass
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
                res.writeHead(301, { 'Location': 'https://kassir.kg/' });
                res.end();
            } else {
                ticket = await TicketCinemaBiletiki.findOne({_id: wallet.ticket})
                if(ticket!=null){
                    await PaymentBiletiki.findOneAndUpdate({wallet: req.body['ReturnOid']}, {status: 'совершен', meta:'maskedCreditCard: '+req.body['maskedCreditCard']})
                    await TicketCinemaBiletiki.findOneAndUpdate({_id: wallet.ticket}, {status: 'продан'})
                    let mailingBiletiki = await MailingBiletiki.findOne();
                    let mailOptions = {
                        from: mailingBiletiki.mailuser,
                        to: wallet.email,
                        subject: 'Ваш билет',
                        text: 'Ссылка на ваш билет: ' + ticket.ticket
                    };
                    if (mailingBiletiki !== null) {
                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: mailingBiletiki.mailuser,
                                pass: mailingBiletiki.mailpass
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
                    res.writeHead(301, { 'Location': 'https://kassir.kg/' });
                    res.end();
                } else {
                    res.status(501);
                    res.end('error');
                }
            }
        } else {
            res.status(501);
            res.end('error');
        }
    } catch(error) {
        console.error(error)
        res.status(501);
    }
});

module.exports = router;
