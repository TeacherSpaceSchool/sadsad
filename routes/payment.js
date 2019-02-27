var express = require('express');
var router = express.Router();
const WalletBiletiki = require('../models/walletBiletiki');
const PaymentBiletiki = require('../models/paymentBiletiki');
var xml = require('xml');

/* GET home page. */
router.get('/asisnur', async (req, res, next) => {
    try{
        let ip = JSON.stringify(req.ip)
        console.log(ip.include('212.112.122.179'))
        let result;
        res.set('Content-Type', 'text/xml');
        if(req.param.command==='check'){
            let wallet = await WalletBiletiki.findOne({wallet: req.param('account')})
            /*XML*/
            if(wallet!=null){
                result = [ { response: [ { result: 0 } , { comment: 'ok' } ] } ];
                res.status(200);
                res.end(xml(result, true));
            } else {
                result = [ { response: [ { result: 1 } , { comment: 'no such user' } ] } ];
                res.status(200);
                res.end(xml(result, true));
            }
        } else if(req.param('command')==='pay'){
            let wallet = await WalletBiletiki.findOne({wallet: req.param('account')})
            if(wallet!=null){
                wallet.balance = parseInt(wallet.balance)-parseInt(req.param('sum'))
                await WalletBiletiki.findOneAndUpdate({_id: wallet._id}, {$set: wallet});
                let payment = new PaymentBiletiki({user: wallet.user, ammount: parseInt(req.param('sum')), service: 'AsisNur', meta:'Дата: '+new Date(parseInt(req.param('txn_date')))+' \nID: '+req.param('txn_id')});
                await PaymentBiletiki.create(payment);
                result = [ { response: [ { txn_id: req.param('txn_id') } , { result: 0 } , { comment: 'no such user' } ] } ];
                res.status(200);
                res.end(result);
            } else {
                result = [ { response: [ { txn_id: req.param('txn_id') } , { result: 1 } , { comment: 'no such user' } ] } ];
                res.status(200);
                res.end(result);
            }
        }
    } catch(error) {
        console.error(error)
        res.status(501);
    }
});

router.get('/qiwi', async (req, res, next) => {
    try{
        let ip = JSON.stringify(req.ip)
        console.log(ip.include('212.112.122.179'))
        let result;
        res.set('Content-Type', 'text/xml');
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
                wallet.balance = wallet.balance-parseInt(req.param('sum'))
                await WalletBiletiki.findOneAndUpdate({_id: wallet._id}, {$set: wallet});
                let payment = new PaymentBiletiki({user: wallet.user, ammount: parseInt(req.param('sum')), service: 'QIWI', meta:'Дата: '+new Date(parseInt(req.param('txn_date')))+' \nID: '+req.param('txn_id')});
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
    } catch(error) {
        console.error(error)
        res.status(501);
    }
});

router.get('/balancekg', async (req, res, next) => {
    try{
        let ip = JSON.stringify(req.ip)
        console.log(ip.include('212.112.122.179'))
        let result;
        res.set('Content-Type', 'text/xml');
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
                wallet.balance = wallet.balance-parseInt(req.param('sum'))
                await WalletBiletiki.findOneAndUpdate({_id: wallet._id}, {$set: wallet});
                let payment = new PaymentBiletiki({user: wallet.user, ammount: parseInt(req.param('sum')), service: 'balancekg', meta:'Дата: '+new Date(parseInt(req.param('txn_date')))+' \nID: '+req.param('txn_id')});
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
    } catch(error) {
        console.error(error)
        res.status(501);
    }
});


module.exports = router;
