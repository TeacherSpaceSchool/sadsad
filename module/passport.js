const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtsecret = '@615141ViDiK141516@';
const UserBiletiki = require('../models/userBiletiki');
const TicketBiletiki = require('../models/ticketBiletiki');
const TicketBiletikiAction = require('../module/ticketBiletiki');
const TicketCinemaBiletiki = require('../models/ticketCinemaBiletiki');
const TicketCinemaBiletikiAction = require('../module/ticketCinemaBiletiki');
const MailChimp = require('../module/mailchimp');
const jwt = require('jsonwebtoken');

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

const verifydclientbuyticket = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active'&&user.role==='client') {
                await TicketBiletikiAction.buy(req, res, user)
                console.log('ok')
                return user
            } else {
                user = await UserBiletiki.findOne({role: 'admin'})
                await TicketBiletikiAction.buy(req, res, user)
                console.log('ok')
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const verifydclientbuyticketcinema = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active'&&user.role==='client') {
                await TicketCinemaBiletikiAction.buy(req, res, user)
                console.log('ok')
                res.status(200);
                res.end('ok');
                return user
            } else {
                user = await UserBiletiki.findOne({role: 'admin'})
                await TicketCinemaBiletikiAction.buy(req, res, user)
                console.log('ok')
                res.status(200);
                res.end('ok');
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

const verifydturnstile = async (req, res, func) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active'&&(user.role==='admin'||user.role==='manager'||user.role==='turnstile')) {
                await func()
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
                await func(user)
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
                    await UserBiletiki.updateOne({_id: user._id}, {$set: {email: data.email, name: data.name, surname: data.surname, phonenumber: data.phonenumber}});
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
        const payload = {
            id: user._id,
            email: user.email,
            status: user.status,
            role: user.role
        };
        MailChimp.send(user.email)
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
module.exports.verifydturnstile = verifydturnstile;
module.exports.verifydclientbuyticket = verifydclientbuyticket;
module.exports.verifydclientbuyticketcinema = verifydclientbuyticketcinema;