var express = require('express');
var router = express.Router();
const WalletBiletiki = require('../models/walletBiletiki');
const PaymentBiletiki = require('../models/paymentBiletiki');
var xml = require('xml');

/* GET home page. */
router.get('/asisnur', async (req, res, next) => {
    try{
        console.log(req.body)
        let result;
        res.set('Content-Type', 'text/xml');
        if(req.body.command==='check'){
            let wallet = await WalletBiletiki.findOne({wallet: req.body.account})
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
        } else if(req.body.command==='pay'){
            let wallet = await WalletBiletiki.findOne({wallet: req.body.account})
            if(wallet!=null){
                wallet.balance = parseInt(wallet.balance)-parseInt(req.body.sum)
                await WalletBiletiki.findOneAndUpdate({_id: wallet._id}, {$set: wallet});
                let payment = new PaymentBiletiki({user: wallet.user, ammount: parseInt(req.body.sum), service: 'AsisNur', meta:'Дата: '+req.body.txn_date+' \nID: '+req.body.txn_id});
                await PaymentBiletiki.create(payment);
                result = [ { response: [ { txn_id: req.body.txn_id } , { result: 0 } , { comment: 'no such user' } ] } ];
                res.status(200);
                res.end(result);
            } else {
                result = [ { response: [ { txn_id: req.body.txn_id } , { result: 1 } , { comment: 'no such user' } ] } ];
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
        console.log(req.body)
        let result;
        res.set('Content-Type', 'text/xml');
        if(req.body.command==='check'){
            let wallet = await WalletBiletiki.findOne({wallet: req.body.account})
            /*XML*/
            if(wallet!=null){
                res.status(200);
                res.end({osmp_txn_id: req.body.txn_id, result: 0, comment: 'ok'});
            } else {
                res.status(200);
                res.end({osmp_txn_id: req.body.txn_id, result: 1, comment: 'no such user'});
            }
        } else if(req.body.command==='pay'){
            let wallet = await WalletBiletiki.findOne({wallet: req.body.account})
            if(wallet!=null){
                wallet.balance = wallet.balance-parseInt(req.body.sum)
                await WalletBiletiki.findOneAndUpdate({_id: wallet._id}, {$set: wallet});
                let payment = new PaymentBiletiki({user: wallet.user, ammount: parseInt(req.body.sum), service: 'QIWI', meta:'Дата: '+req.body.txn_date+' \nID: '+req.body.txn_id});
                await PaymentBiletiki.create(payment);
                res.end({osmp_txn_id: req.body.txn_id, prv_txn: payment._id, sum: req.body.sum, result: 0, comment: 'ok'});
            } else {
                res.status(200);
                res.end({osmp_txn_id: req.body.txn_id, prv_txn: '', sum: req.body.sum, result: 1, comment: 'no such user'});
            }
        }
    } catch(error) {
        console.error(error)
        res.status(501);
    }
});

module.exports = router;
