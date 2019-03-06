const express = require('express');
const axios = require('axios');
const router = express.Router();
const WalletBiletiki = require('../models/walletBiletiki');
const PaymentBiletiki = require('../models/paymentBiletiki');
const xml = require('xml');
const randomstring = require('randomstring');

/* GET home page. */
router.get('/asisnur', async (req, res, next) => {
    let result;
    try{
        let ip = JSON.stringify(req.ip)
        console.log(ip.includes('95.47.232.100'))
        if(ip.includes('95.47.232.100')){
            res.set('Content+Type', 'text/xml');
            if(req.param('command')==='check'){
                let wallet = await WalletBiletiki.findOne({wallet: req.param('account')})
                /*XML*/
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
                let wallet = await WalletBiletiki.findOne({wallet: req.param('account')})
                console.log(wallet)
                if(wallet!=null){
                    wallet.balance = wallet.balance+parseInt(req.param('sum'))
                    await WalletBiletiki.findOneAndUpdate({_id: wallet._id}, {$set: wallet});
                    let payment = new PaymentBiletiki({status: 'совершен', user: wallet.user, ammount: parseInt(req.param('sum')), service: 'asisnur', meta:'Дата: '+new Date(parseInt(req.param('txn_date')))+' \nID: '+req.param('txn_id')});
                    await PaymentBiletiki.create(payment);
                    result = [ { response: [ { osmp_txn_id: req.param('txn_id') } , { prv_txn: payment._id } , { sum: req.param('sum') } , { result: 0 } , { comment: 'ok' } ] } ];
                    res.status(200);
                    res.end(xml(result, true));
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
        res.set('Content+Type', 'text/xml');
        console.error(error)
        result = [ { response: [ { result: 1 } , { comment: 'Временная ошибка, повторите запрос позже' } ] } ];
        res.end(xml(result, true));
    }
});

router.get('/qiwi', async (req, res, next) => {
    try{
        let ip = JSON.stringify(req.ip)
        console.log(ip.includes('212.42.104.209'))
        if(ip.includes('212.42.104.209')){
            let result;
            res.set('Content+Type', 'text/xml');
            if(req.param('command')==='check'){
                let wallet = await WalletBiletiki.findOne({wallet: req.param('account')})
                /*XML*/
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
                /*XML*/
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
});

router.post('/elsom/generate', async (req, res, next) => {
    try{
        if(await WalletBiletiki.findOne({wallet: req.body.wallet})!=null&&!isNaN(req.body.sum)&&parseInt(req.body.sum)>0){
            let wallet = WalletBiletiki.findOne({wallet: req.body.wallet})
            let payment = new PaymentBiletiki({status: 'обработка', user: wallet.user, ammount: parseInt(req.body.sum), service: 'elsom', meta:''});
            payment = await PaymentBiletiki.create(payment);
           axios.post('https://mbgwt.elsom.kg:10690/MerchantAPI ', {
                   'PartnerGenerateOTP': {
                       'PartnerTrnID': payment._id,
                       'CultureInfo': 'ru-Ru',
                       'MSISDN': '0909000009',
                       'PartnerCode': '04108',
                       'ChequeNo': randomstring.generate({length: 12, charset: 'numeric'}),
                       'Amount': req.body.sum,
                       'CashierNo': req.body.wallet,
                       'UDF': 'TEST',
                       'Password': '2ac9cb7dc02b3c0083eb70898e549b63'
                   }
               }
           )  .then(function (response) {
               // handle success
               console.log(response);
           })
               .catch(function (error) {
                   // handle error
                   console.log(error);
               })
           res.status(200);
            res.end('8385878');
       } else {
            res.status(200);
            res.end('error');
       }
    } catch(error) {
        console.error(error)
        res.status(501);
        res.end('error');
    }
})

module.exports = router;
