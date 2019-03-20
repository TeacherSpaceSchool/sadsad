const MailingBiletiki = require('../models/mailingBiletiki');
const express = require('express');
const axios = require('axios');
const router = express.Router();
const PaymentBiletiki = require('../models/paymentBiletiki');
const xml = require('xml');
const https = require('https');
const TicketBiletiki = require('../models/ticketBiletiki');
const TicketCinemaBiletiki = require('../models/ticketCinemaBiletiki');
const CheckVisaBiletiki = require('../models/checkVisaBiletiki');
const ActionCheckVisaBiletiki = require('../module/checkVisaBiletiki');
const nodemailer = require('nodemailer');
const FormData = require('form-data');
const randomstring = require('randomstring');
const app = require('../app');
const path = require('path');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const myConst = require('../module/const');
const jwt = require('jsonwebtoken');

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
*/


router.post('/elsom/generate', async (req, res, next) => {
    try{
        res.set('Content+Type', 'text/json; charset=utf-8');
            const instance = axios.create({
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                })
            });
            let result = await instance.post('https://mbgwp.elsom.kg:10885/MerchantAPI', {
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
    res.set('Content-Type', 'text/json; charset=utf-8');
    try{
        let ip = JSON.stringify(req.ip)
        if(ip.includes('96.170.8.59')){
            let responce = req.body
            responce = req.body
            responce = responce.PartnerPaymentResult
            let wallet = await PaymentBiletiki.findOne({wallet: responce.PartnerTrnID})
            if(wallet!=null){
                if(wallet.status=='совершен'){
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
                    'ErrorMsg': 'Error server'
                }
        });
    }
})

router.post('/elsom/check', async (req, res, next) => {
    try{
        res.set('Content+Type', 'text/json; charset=utf-8');
        const instance = axios.create({
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        });
        console.log(req.body.wallet)
        let result = await instance.post('https://mbgwp.elsom.kg:10885/MerchantAPI', {
                'PartnerGetPaymentStatus': {
                    'CultureInfo': 'ru-Ru',
                    'MSISDN': '0909000009',
                    'PartnerTrnID': req.body.wallet,
                    'Password': '2ac9cb7dc02b3c0083eb70898e549b63'
                }
            }
        );
        console.log(result.data)
        let code = result.data.Response.Result.Message
        res.status(200);
        res.end(code);

    } catch(error) {
        console.error(error)
        res.status(200);
        res.end('error');
    }
})

router.post('/kcb', async (req, res, next) => {
    res.header('Content-Type', 'application/xml; charset=utf-8');
    try{
        let ip = JSON.stringify(req.ip)
        let result = {}
        if(true){
            let responce = req.body.elements[0].elements
            console.log(ip)
            if(responce[0]['attributes']['OP']=='QE11'){
                let wallet = await PaymentBiletiki.findOne({wallet: responce[1]['attributes']['PARAM1']})
                if(wallet!=null){
                    result = [ { XML: [
                        { HEAD: { _attr: { DTS: responce[0]['attributes']['DTS'], QM: responce[0]['attributes']['QM'], QID: responce[1]['attributes']['PARAM1'], OP: responce[0]['attributes']['OP'],  }}},
                        { BODY: { _attr: { STATUS: '200', SUM: wallet.ammount }}}
                    ] } ];
                    res.status(200);
                    res.end(xml(result, true));
                } else {
                    result = [ { XML: [
                        { HEAD: { _attr: { DTS: responce[0]['attributes']['DTS'], QM: responce[0]['attributes']['QM'], QID: responce[1]['attributes']['PARAM1'], OP: responce[0]['attributes']['OP'],  }}},
                        { BODY: { _attr: { STATUS: '420', ERR_MSG: 'Указанный лицевой счет не найден' }}}
                    ] } ];
                    res.status(200);
                    res.end(xml(result, true));
                }
            } else if(responce[0]['attributes']['OP']=='QE10'){
                let wallet = await PaymentBiletiki.findOne({wallet: responce[1]['attributes']['PARAM1']})
                if(wallet!=null){
                    if(wallet.status=='совершен'){
                        result = [ { XML: [
                            { HEAD: { _attr: { DTS: responce[0]['attributes']['DTS'], QM: responce[0]['attributes']['QM'], QID: responce[1]['attributes']['PARAM1'], OP: responce[0]['attributes']['OP'],  }}},
                            { BODY: { _attr: { STATUS: '250', ERR_MSG: 'Платеж проведен' }}}
                        ] } ];
                        res.status(200);
                        res.end(xml(result, true));
                    } else {
                        let ticket = await TicketBiletiki.findOne({_id: wallet.ticket})
                        if(ticket!=null){
                            await PaymentBiletiki.findOneAndUpdate({wallet: responce[1]['attributes']['PARAM1']}, {status: 'совершен', meta:'Дата: '+responce[0]['attributes']['DTS']+' \nID: '+responce[0]['attributes']['QID']})
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
                            result = [ { XML: [
                                { HEAD: { _attr: { DTS: responce[0]['attributes']['DTS'], QM: responce[0]['attributes']['QM'], QID: responce[1]['attributes']['PARAM1'], OP: responce[0]['attributes']['OP'],  }}},
                                { BODY: { _attr: { STATUS: '250', ERR_MSG: 'Платеж успешно проведен' }}}
                            ] } ];
                            res.status(200);
                            res.end(xml(result, true));
                        } else {
                            ticket = await TicketCinemaBiletiki.findOne({_id: wallet.ticket})
                            if(ticket!=null){
                                await PaymentBiletiki.findOneAndUpdate({wallet: responce[1]['attributes']['PARAM1']}, {status: 'совершен', meta:'Дата: '+responce[0]['attributes']['DTS']+' \nID: '+responce[0]['attributes']['QID']})
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
                                result = [ { XML: [
                                    { HEAD: { _attr: { DTS: responce[0]['attributes']['DTS'], QM: responce[0]['attributes']['QM'], QID: responce[1]['attributes']['PARAM1'], OP: responce[0]['attributes']['OP'],  }}},
                                    { BODY: { _attr: { STATUS: '250', ERR_MSG: 'Платеж успешно проведен' }}}
                                ] } ];
                                res.status(200);
                                res.end(xml(result, true));
                            } else {
                                result = [ { XML: [
                                    { HEAD: { _attr: { DTS: responce[0]['attributes']['DTS'], QM: responce[0]['attributes']['QM'], QID: responce[1]['attributes']['PARAM1'], OP: responce[0]['attributes']['OP'],  }}},
                                    { BODY: { _attr: { STATUS: '420', ERR_MSG: 'Указанный лицевой счет не найден' }}}
                                ] } ];
                                res.status(200);
                                res.end(xml(result, true));
                            }
                        }
                    }
                } else
                {
                    result = [ { XML: [
                        { HEAD: { _attr: { DTS: responce[0]['attributes']['DTS'], QM: responce[0]['attributes']['QM'], QID: responce[1]['attributes']['PARAM1'], OP: responce[0]['attributes']['OP'],  }}},
                        { BODY: { _attr: { STATUS: '420', ERR_MSG: 'Указанный лицевой счет не найден' }}}
                    ] } ];
                    res.status(200);
                    res.end(xml(result, true));
                }
            }


        }
        else {
            console.error(req.ip)
            res.status(501);
            result = [ { XML: [
                { HEAD: { _attr: { DTS: 'DTS', QM: 'QM', QID: 'PARAM1', OP: 'OP',  }}},
                { BODY: { _attr: { STATUS: '420', ERR_MSG: 'Указанный лицевой счет не найден' }}}
            ] } ];
            res.end(xml(result, true));
        }
    } catch(error) {
        console.error(error)
        res.status(501);
    }
});

router.post('/balance/generate', async (req, res, next) => {
    try{
        let data = new FormData();
        data.append('merchant', 'KASSIR_KG');
        data.append('password', 'Q3Rup+pE');
        let auth_token = await axios({
            method: 'post',
            url: 'https://umai.balance.kg/site-api/acquiring/auth',
            data: data,
            headers: {
                'content-type': `multipart/form-data; boundary=${data._boundary}`,
            },
        })
        console.log(auth_token.data.details.auth_token)
        if(auth_token.data.status=='FAIL'){
            res.status(200);
            res.end('error');
        }
        auth_token = auth_token.data.details.auth_token
        data = new FormData();
        data.append('merchant', 'KASSIR_KG');
        data.append('service_id', '12');
        data.append('amount', req.body.sum);
        data.append('requisite', req.body.wallet);
        data.append('transaction_id', req.body.wallet);
        data.append('redirect_url', 'https://kassir.kg');
        data.append('hook_url', 'https://kassir.kg/balance/pay');
        data.append('auth_token', auth_token);
        let payment_token = await axios({
            method: 'post',
            url: 'https://umai.balance.kg/site-api/acquiring/request-token',
            data: data,
            headers: {
                'content-type': `multipart/form-data; boundary=${data._boundary}`,
            },
        })
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
        let payment_state_token = jwt.verify(req.param('payment_state_token'), 'x23#-09%ke');

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
            let hash = 'https://kassir.kg/visa/'+wallet.wallet+'.pdf';
            let pdfname = ''
            pdfname += hash
            pdfname=pdfname.replace('https://kassir.kg/visa/', '');
            let pdfpath = path.join(app.dirname, 'public', 'visa', pdfname);
            let doc = new PDFDocument();
            let robotoBlack = path.join(app.dirname, 'public', 'font', 'roboto', 'NotoSans-Regular.ttf');
            doc.registerFont('NotoSans', robotoBlack);
            let fstream = fs.createWriteStream(pdfpath);
            doc.pipe(fstream);
            let datet = new Date()
            datet = datet.toJSON()
            let date = datet.split('T')[0].split('-')
            let time = datet.split('T')[1].split(':')
            let dateTime = date[2]+' '+myConst.month[date[1]]+' '+date[0]+', '+time[0]+':'+time[1];
            doc
                .font('NotoSans')
                .fontSize(14)
                .text('KASSIR.KG', {width: doc.page.width - 100, align: 'justify'})
            doc.moveDown()
            doc
                .font('NotoSans')
                .fontSize(13)
                .text('Адрес: Ул. Шопокова 93/2, 9 этаж, 903 офис.', {width: doc.page.width - 100, align: 'justify'})
            doc.moveDown()
            doc
                .font('NotoSans')
                .fontSize(13)
                .text('URL: https://kassir.kg/', {width: doc.page.width - 100, align: 'justify'})
            doc.moveDown()
            doc
                .font('NotoSans')
                .fontSize(13)
                .text('Документ №'+req.body['ReturnOid'], {width: doc.page.width - 100, align: 'justify'})
            doc.moveDown()
            doc
                .font('NotoSans')
                .fontSize(13)
                .text('Сумма: '+wallet.ammount+' KGS', {width: doc.page.width - 100, align: 'justify'})
            doc.moveDown()
            doc
                .font('NotoSans')
                .fontSize(13)
                .text('Дата: '+dateTime, {width: doc.page.width - 100, align: 'justify'})
            doc.moveDown()
            doc
                .font('NotoSans')
                .fontSize(13)
                .text('Код авторизации: '+req.body['AuthCode'], {width: doc.page.width - 100, align: 'justify'})
            doc.moveDown()
            doc
                .font('NotoSans')
                .fontSize(13)
                .text(req.body['EXTRA.CARDBRAND']+': '+req.body['MaskedPan'], {width: doc.page.width - 100, align: 'justify'})
            doc.moveDown()
            doc
                .font('NotoSans')
                .fontSize(12)
                .text('Техническая поддержка: info@kassir.kg', {width: doc.page.width - 100, align: 'justify'})
            doc.moveDown()
            doc
                .font('NotoSans')
                .fontSize(12)
                .text('Спасибо за покупку!!!', {width: doc.page.width - 100, align: 'justify'})
            doc.end()
            let mailingBiletiki = await MailingBiletiki.findOne();
            let mailOptions = {
                from: mailingBiletiki.mailuser,
                to: wallet.email,
                subject: 'Чек за оплату билета',
                text: 'Ссылка на ваш чек: ' + hash
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
            let payment = new CheckVisaBiletiki({
                link: hash,
                wallet: wallet.wallet,
            });
            await CheckVisaBiletiki.create(payment);

             let ticket = await TicketBiletiki.findOne({_id: wallet.ticket})
             if(ticket!=null){
                 await PaymentBiletiki.findOneAndUpdate({wallet: req.body['ReturnOid']}, {status: 'совершен', meta:'maskedCreditCard: '+req.body['maskedCreditCard']})
                 await TicketBiletiki.findOneAndUpdate({_id: wallet.ticket}, {status: 'продан'})
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
                 res.writeHead(301, { 'Location': 'https://kassir.kg/check/'+pdfname });
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
                     res.writeHead(301, { 'Location': 'https://kassir.kg/check/'+pdfname });
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
