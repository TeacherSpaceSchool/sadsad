const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtsecret = '@615141ViDiK141516@';
const UserBiletiki = require('../models/userBiletiki');
const TicketBiletiki = require('../models/ticketBiletiki');
const TicketBiletikiAction = require('../module/ticketBiletiki');
const EventBiletiki = require('../models/eventBiletiki');
const SeanceBiletiki = require('../models/seanceBiletiki');
const TicketCinemaBiletiki = require('../models/ticketCinemaBiletiki');
const WalletBiletiki = require('../models/walletBiletiki');
const WalletBiletikiAction = require('../module/walletBiletiki');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const app = require('../app');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const qr = require('qr-image');
const myConst = require('../module/const');

let start = () => {
//настройка паспорта
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        function (email, password, done) {
            console.log('email', email, password)
            UserBiletiki.findOne({email: email}, (err, user) => {
                if (err) {
                    return done(err);
                }

                if (!user || !user.checkPassword(password) || user.status!='active') {
                    return done(null, false, {message: 'Нет такого пользователя или пароль неверен.'});
                }
                return done(null, user);
            });
        }
        )
    );
    const jwtOptions = {};
    jwtOptions.jwtFromRequest= ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey=jwtsecret;
    passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
            UserBiletiki.findOne({email:payload.email}, (err, user) => {
                if (err) {
                    return done(err)
                }
                if (user) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            })
        })
    );
}

const verifydrole = async (req, res, func) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                await func(user.role)
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const verifydadmin = async (req, res, func) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active'&&(user.role==='admin'||user.role==='manager')) {
                await func()
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const verifydcinema = async (req, res, func) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active'&&(user.role==='cinema')) {
                await func(user)
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const verifydaccountant = async (req, res, func) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active'&&(user.role==='admin'||user.role==='manager'||user.role==='accountant')) {
                await func()
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const verifydcashier = async (req, res, func) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active'&&(user.role==='admin'||user.role==='manager'||user.role==='cashier')) {
                await func()
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const verifydeuser = async (req, res, func) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                await func()
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const setProfile = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active'&&user.role==='client') {
                let data = JSON.parse(req.body.data);
                if(data.password!==undefined&&data.password.length>0) {
                    user.email = data.email;
                    user.name = data.name;
                    user.surname = data.surname;
                    user.phonenumber = data.phonenumber;
                    user.password = data.password;
                    await user.save();
                } else {
                    await UserBiletiki.findOneAndUpdate({_id: user._id}, {$set: {email: data.email, name: data.name, surname: data.surname, phonenumber: data.phonenumber}});
                }
                res.status(200);
                res.end(JSON.stringify(await UserBiletiki.findOne({_id: user._id})));
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const getProfile = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                res.status(200);
                res.end(JSON.stringify(await UserBiletiki.findOne({_id: user._id})));
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const getHistory = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                res.status(200);
                res.end(JSON.stringify(await TicketBiletiki.find({user: user._id}).sort('-updatedAt')));
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const buy = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            let data = JSON.parse(req.body.data);
            console.log(data.event.where.name)
            let wallet = await WalletBiletiki.findOne({user: user._id})
            if (user&&user.status==='active'&&wallet.balance>data.fullPrice) {
                wallet.balance = wallet.balance-data.fullPrice
                await WalletBiletiki.findOneAndUpdate({_id: wallet._id}, {$set: wallet});

                let hash = randomstring.generate(20) + user._id + data.event._id;
                while (!await TicketBiletikiAction.checkHash(hash))
                    hash = randomstring.generate(20) + user._id + data.event._id;
                let qrname = randomstring.generate(7) + user._id + data.event._id+'.png';
                let pdfname = qrname.replace('.png','.pdf');
                let qrpath = path.join(app.dirname, 'public', 'qr', qrname);
                let fstream = fs.createWriteStream(qrpath);
                let qrTicket = await qr.image(hash, { type: 'png' });
                let stream = qrTicket.pipe(fstream)
                stream.on('finish', async () => {
                    let doc = new PDFDocument();
                    let pdfpath = path.join(app.dirname, 'public', 'ticket', pdfname);
                    let robotoBlack = path.join(app.dirname, 'public', 'font', 'roboto', 'NotoSans-Regular.ttf');
                    doc.registerFont('NotoSans', robotoBlack);
                    let fstream = fs.createWriteStream(pdfpath);
                    doc.pipe(fstream);
                    doc
                        .font('NotoSans')
                        .fontSize(20)
                        .text('Kassir.kg', {width: doc.page.width - 100, align: 'center'})
                    doc.moveDown()
                    doc
                        .font('NotoSans')
                        .fontSize(20)
                        .text('Площадка:', {width: doc.page.width - 100, align: 'center'})
                    doc
                        .font('NotoSans')
                        .fontSize(15)
                        .text(data.event.where.name, {width: doc.page.width - 100, align: 'justify'})
                    doc.moveDown()
                    doc
                        .font('NotoSans')
                        .fontSize(20)
                        .text('Мероприятие:', {width: doc.page.width - 100, align: 'center'})
                    doc
                        .font('NotoSans')
                        .fontSize(15)
                        .text(data.event.nameRu, {width: doc.page.width - 100, align: 'justify'})
                    doc.moveDown()
                    doc
                        .font('NotoSans')
                        .fontSize(20)
                        .text('Места:', {width: doc.page.width - 100, align: 'center'})
                    for(let i = 0; i<data.seats.length; i++){
                        doc
                            .font('NotoSans')
                            .fontSize(15)
                            .text('Место '+(i+1), {width: doc.page.width - 100, align: 'justify'})
                        let date = data.seats[i][1].split('T')[0].split('-')
                        let time = data.seats[i][1].split('T')[1].split(':')
                        let dateTime = date[2]+' '+myConst.month[date[1]]+' '+date[0]+', '+time[0]+':'+time[1];
                        doc
                            .font('NotoSans')
                            .fontSize(15)
                            .text('        Дата: '+dateTime, {width: doc.page.width - 100, align: 'justify'})
                        doc
                            .font('NotoSans')
                            .fontSize(15)
                            .text('        Место: '+data.seats[i][0]['name'], {width: doc.page.width - 100, align: 'justify'})
                        doc
                            .font('NotoSans')
                            .fontSize(15)
                            .text('        Цена: '+data.seats[i][0]['price']+' сом', {width: doc.page.width - 100, align: 'justify'})
                    }
                    doc.moveDown()
                    doc.addPage()
                    doc.moveDown()
                    doc.image(qrpath, (doc.page.width - 225) /2 )
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
                    status: 'продан',
                });
                await TicketBiletiki.create(_object);

                res.status(200);
                res.end('ok');
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const getWallet = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                res.status(200);
                res.end(JSON.stringify(await WalletBiletiki.findOne({user: user._id})));
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const buy1 = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            let data = JSON.parse(req.body.data);
            let wallet = await WalletBiletiki.findOne({user: user._id})
            console.log(data.seats)
            if (user&&user.status==='active'&&wallet.balance>data.fullPrice) {
                wallet.balance = wallet.balance-data.fullPrice
                await WalletBiletiki.findOneAndUpdate({_id: wallet._id}, {$set: wallet});
                let hash = randomstring.generate(20) + user._id + data.event._id;
                while (!await TicketBiletikiAction.checkHash(hash))
                    hash = randomstring.generate(20) + user._id + data.event._id;
                let qrname = randomstring.generate(7) + user._id + data.event._id+'.png';
                let pdfname = qrname.replace('.png','.pdf');
                let qrpath = path.join(app.dirname, 'public', 'qr', qrname);
                let fstream = fs.createWriteStream(qrpath);
                let qrTicket = await qr.image(hash, { type: 'png' });
                let stream = qrTicket.pipe(fstream)
                stream.on('finish', async () => {
                    let doc = new PDFDocument();
                    let pdfpath = path.join(app.dirname, 'public', 'ticket', pdfname);
                    let robotoBlack = path.join(app.dirname, 'public', 'font', 'roboto', 'NotoSans-Regular.ttf');
                    doc.registerFont('NotoSans', robotoBlack);
                    let fstream = fs.createWriteStream(pdfpath);
                    doc.pipe(fstream);
                    doc
                        .font('NotoSans')
                        .fontSize(20)
                        .text('Kassir.kg', {width: doc.page.width - 100, align: 'center'})
                    doc.moveDown()
                    doc
                        .font('NotoSans')
                        .fontSize(20)
                        .text('Кино:', {width: doc.page.width - 100, align: 'center'})
                    doc
                        .font('NotoSans')
                        .fontSize(15)
                        .text(data.movie, {width: doc.page.width - 100, align: 'justify'})
                    doc.moveDown()
                    doc
                        .font('NotoSans')
                        .fontSize(20)
                        .text('Кинотеатр:', {width: doc.page.width - 100, align: 'center'})
                    doc
                        .font('NotoSans')
                        .fontSize(15)
                        .text(data.cinema, {width: doc.page.width - 100, align: 'justify'})
                    doc.moveDown()
                    doc
                        .font('NotoSans')
                        .fontSize(20)
                        .text('Зал:', {width: doc.page.width - 100, align: 'center'})
                    doc
                        .font('NotoSans')
                        .fontSize(15)
                        .text(data.hall, {width: doc.page.width - 100, align: 'justify'})
                    doc.moveDown()
                    doc
                        .font('NotoSans')
                        .fontSize(20)
                        .text('Места:', {width: doc.page.width - 100, align: 'center'})
                    for(let i = 0; i<data.seats.length; i++){
                        doc
                            .font('NotoSans')
                            .fontSize(15)
                            .text('Место '+(i+1), {width: doc.page.width - 100, align: 'justify'})
                        doc
                            .font('NotoSans')
                            .fontSize(15)
                            .text('        Дата: '+data.seats[i].date, {width: doc.page.width - 100, align: 'justify'})
                        doc
                            .font('NotoSans')
                            .fontSize(15)
                            .text('        Место: '+data.seats[i].name, {width: doc.page.width - 100, align: 'justify'})
                        doc
                            .font('NotoSans')
                            .fontSize(15)
                            .text('        Цена: '+data.seats[i].priceSelect+' сом', {width: doc.page.width - 100, align: 'justify'})
                    }
                    doc.moveDown()
                    doc.addPage()
                    doc.moveDown()
                    doc.image(qrpath, (doc.page.width - 225) /2 )
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
                    status: 'продан',
                    movie: data.movie,
                    cinema: data.cinema,
                    hall: data.hall,
                });
                await TicketCinemaBiletiki.create(_object);

                res.status(200);
                res.end('ok');
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const getHistory1 = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                res.status(200);
                res.end(JSON.stringify(await TicketCinemaBiletiki.find({user: user._id}).sort('-updatedAt')));
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const signupuser = async (req, res) => {
    try{
        let _user = new UserBiletiki({
            email: req.query.email,
            role: 'client',
            status: 'active',
            name: '',
            surname: '',
            phonenumber: '',
            password: req.query.password,
        });
        const user = await UserBiletiki.create(_user);
        _user = new WalletBiletiki({user: _user._id, wallet: await WalletBiletikiAction.generateWallet(), balance: 0});
        await WalletBiletiki.create(_user);
        const payload = {
            id: user._id,
            email: user.email,
            status: user.status,
            role: user.role
        };
        const token = jwt.sign(payload, jwtsecret); //здесь создается JWT*/
        res.status(200);
        res.end(token)
    } catch (err) {
            console.error(err)
            res.status(401);
            res.end('email not be unique')
    }
}

const signinuser = (req, res) => {
    passport.authenticate('local', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                const payload = {
                    id: user._id,
                    email: user.email,
                    status: user.status,
                    role: user.role
                };
                const token = await jwt.sign(payload, jwtsecret); //здесь создается JWT
                res.status(200);
                res.end(token);
            } else {
                res.status(401);
                res.end('Login failed',401)
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('email not be unique')
        }
    })(req, res);
}

const getstatus = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                res.status(200);
                res.end(JSON.stringify({status: user.status, role: user.role, id: user._id}))
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)

}

module.exports.getWallet = getWallet;
module.exports.verifydrole = verifydrole;
module.exports.verifydcinema = verifydcinema;
module.exports.verifydcashier = verifydcashier;
module.exports.verifydaccountant = verifydaccountant;
module.exports.getHistory1 = getHistory1;
module.exports.getHistory = getHistory;
module.exports.setProfile = setProfile;
module.exports.getProfile = getProfile;
module.exports.getstatus = getstatus;
module.exports.signupuser = signupuser;
module.exports.verifydadmin = verifydadmin;
module.exports.start = start;
module.exports.verifydeuser = verifydeuser;
module.exports.signinuser = signinuser;
module.exports.buy = buy;
module.exports.buy1 = buy1;