const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const passportEngine = require('../module/passport');
const AboutBiletiki = require('../module/aboutBiletiki');
const AdsBiletiki = require('../module/adsBiletiki');
const ContactBiletiki = require('../module/contactBiletiki');
const EventBiletiki = require('../module/eventBiletiki');
const EventBiletikiModels = require('../models/eventBiletiki');
const FAQBiletiki = require('../module/FAQBiletiki');
const LogoBiletiki = require('../module/logoBiletiki');
const PersonalBiletiki = require('../module/personalBiletiki');
const StatisticBiletiki = require('../module/statisticBiletiki');
const PhoneBiletiki = require('../module/phoneBiletiki');
const SocialBiletiki = require('../module/socialBiletiki');
const TicketBiletiki = require('../module/ticketBiletiki');
const UserBiletiki = require('../module/userBiletiki');
const VacancyBiletiki = require('../module/vacancyBiletiki');
const EmailBiletiki = require('../module/emailBiletiki');
const WhereBiletiki = require('../module/whereBiletiki');
const BilboardBiletiki = require('../module/bilboardBiletiki');
const CinemaHallBiletiki = require('../module/cinemaHallBiletiki');
const MailingBiletiki = require('../module/mailingBiletiki');
const MovieBiletiki = require('../module/movieBiletiki');
const SeanceBiletiki = require('../module/seanceBiletiki');
const PaymentBiletiki = require('../module/paymentBiletiki');
const TicketCinemaBiletiki = require('../module/ticketCinemaBiletiki');
const CheckVisaBiletiki = require('../module/checkVisaBiletiki');
const CashboxBiletiki = require('../module/cashboxBiletiki');
const qr = require('qr-image');
const myConst = require('../module/const');
const randomstring = require('randomstring');
const app = require('../app');
const abc = require('../module/seats').abc;
const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');

router.post('/getclient', async (req, res) => {
    if(req.body.name == 'Телефон'){
        await res.send(await PhoneBiletiki.getClient())
    } else if(req.body.name == 'КодПлатежа'){
        await res.send(await PaymentBiletiki.generateWallet())
    } else if(req.body.name == 'Кассы'){
        await res.send(await CashboxBiletiki.getClient())
    } else if(req.body.name == 'Email'){
        await res.send(await EmailBiletiki.getClient())
    } else if(req.body.name == 'FAQ'){
        await res.send(await FAQBiletiki.getClient())
    } else if(req.body.name == 'LogoMain'){
        await res.send(await LogoBiletiki.getMain())
    } else if(req.body.name == 'ЛогоДругие'){
        await res.send(await LogoBiletiki.getOther())
    } else if(req.body.name == 'Контакты'){
        await res.send(await ContactBiletiki.getClient())
    } else if(req.body.name == 'Города'){
        await res.send(await WhereBiletiki.getCity())
    } else if(req.body.name == 'Социалки'){
        await res.send(await SocialBiletiki.getClient())
    } else if(req.body.name == 'Биллборды'){
        await res.send(await BilboardBiletiki.getClient())
    } else if(req.body.name == 'О нас'){
        await res.send(await AboutBiletiki.getClient())
    } else if(req.body.name == 'Вакансии'){
        await res.send(await VacancyBiletiki.getClient())
    } else if(req.body.name == 'Персонал'){
        await res.send(await PersonalBiletiki.getClient())
    } else if(req.body.name == 'Площадка'){
        await res.send(await WhereBiletiki.getClient())
    } else if(req.body.name == 'ПлощадкаПоИмени'){
        let data = JSON.parse(req.body.data);
        await res.send(await WhereBiletiki.getClientByName(data.name))
    } else if(req.body.name == 'ВосстановлениеПароля'){
        let data = JSON.parse(req.body.data);
        await res.send(await UserBiletiki.recoveryPass(data.email))
    } else if(req.body.name == 'Популярное'){
        let data = JSON.parse(req.body.data);
        await res.send({events: await EventBiletiki.getPopular(data.city), ads: await AdsBiletiki.getRandomTop()})
    } else if(req.body.name == 'События'){
        let data = JSON.parse(req.body.data);
        await res.send({events: await EventBiletiki.getEvents(data.city, data.date, data.genre, data.skip), ads: (await AdsBiletiki.getRandomTop())[0]})
    } else if(req.body.name == 'БегущаяСтрока'){
        await res.send(await AdsBiletiki.getBottom())
    } else if(req.body.name == 'Реклама'){
        await res.send((await AdsBiletiki.getRandomTop())[0])
    } else if(req.body.name == 'СобытиеПоНазванию'){
        let data = JSON.parse(req.body.data);
        data.date = new Date()
        await res.send({events: await EventBiletiki.getEventsByName(data.city, data.date, data.search), ads: (await AdsBiletiki.getRandomTop())[0]})
    } else if(req.body.name == 'КиноСкоро'){
        await res.send((await MovieBiletiki.getSoon()))
    } else if(req.body.name == 'КиноСейчас'){
        let data = JSON.parse(req.body.data);
        await res.send(await MovieBiletiki.getNow(data.skip))
    } else if(req.body.name == 'КиноПоНазванию'){
        let data = JSON.parse(req.body.data);
        await res.send(await MovieBiletiki.getMovieByName(data.name))
    } else if(req.body.name == 'КиноПоДате'){
        let data = JSON.parse(req.body.data);
        await res.send(await SeanceBiletiki.getSeanceHallByDate(data.movie, data.realDate))
    }  else if(req.body.name == 'СеансПоДате'){
        let data = JSON.parse(req.body.data);
        await res.send(await SeanceBiletiki.getSeanceByDate(data.movie, data.cinema, data.realDate))
    }  else if(req.body.name == 'ПроверитьМеста'){
        let data = JSON.parse(req.body.data);
        await res.send(await EventBiletiki.checkSeatsEventBiletiki(data.seats, data.eventId))
    }
});

router.post('/getclientsecure', async (req, res) => {
        if(req.body.name === 'Профиль'){
            await passportEngine.getProfile(req, res)
        } else if(req.body.name === 'ИзменитьПрофиль'){
            await passportEngine.setProfile(req, res)
        } else if(req.body.name === 'История'){
            await passportEngine.getHistory(req, res)
        } else if(req.body.name === 'ИсторияКино'){
            await passportEngine.getHistory1(req, res)
        } else if(req.body.name === 'Баланс'){
            await passportEngine.getWallet(req, res)
        } else if(req.body.name === 'Купить'){
            await passportEngine.verifydclientbuyticket(req, res);
        } else if(req.body.name === 'КупитьКино'){
            await passportEngine.verifydclientbuyticketcinema(req, res)
        }
});

router.post('/get', async (req, res) => {
    await passportEngine.verifydrole(req, res, async (role)=>{
        if(role==='admin'){
            await passportEngine.verifydadmin(req, res, async ()=>{
                if(req.body.name == 'О нас'){
                    await res.send(await AboutBiletiki.getAboutBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Рассылка'){
                    await res.send(await MailingBiletiki.getMailingBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Кассы'){
                    await res.send(await CashboxBiletiki.getCashboxBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Visa'){
                    await res.send(await CheckVisaBiletiki.getCheckVisaBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'СеансДаты'){
                    let data = JSON.parse(req.body.data);
                    await res.send(await SeanceBiletiki.getSeanceTimes(data.movie, data.user))
                }  else if(req.body.name == 'СеансПоДате'){
                    let data = JSON.parse(req.body.data);
                    await res.send(await SeanceBiletiki.getSeanceByDate(data.movie, data.user, data.realDate))
                } else if(req.body.name == 'Залы'){
                    await res.send(await CinemaHallBiletiki.getCinemaHallBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Реклама'){
                    await res.send(await AdsBiletiki.getAdsBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Контакт'){
                    await res.send(await ContactBiletiki.getContactBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Email'){
                    await res.send(await EmailBiletiki.getEmailBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Событие'){
                    await res.send(await EventBiletiki.getEventBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'FAQ'){
                    await res.send(await FAQBiletiki.getFAQBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Логотип'){
                    await res.send(await LogoBiletiki.getLogoBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Персонал'){
                    await res.send(await PersonalBiletiki.getPersonalBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Телефон'){
                    await res.send(await PhoneBiletiki.getPhoneBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Социалки'){
                    await res.send(await SocialBiletiki.getSocialBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Билеты'){
                    await res.send(await TicketBiletiki.getTicketBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Платежи'){
                    await res.send(await PaymentBiletiki.getPaymentBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Билеты кино'){
                    await res.send(await TicketCinemaBiletiki.getTicketCinemaBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Пользователи'){
                    await res.send(await UserBiletiki.getUserBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Кинотеатры'){
                    await res.send(await UserBiletiki.getCinemaUser())
                } else if(req.body.name == 'Вакансии'){
                    await res.send(await VacancyBiletiki.getVacancyBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Площадка'){
                    await res.send(await WhereBiletiki.getWhereBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'ГдеID'){
                    await res.send(await WhereBiletiki.getIds(JSON.parse(req.body.data).city))
                } else if(req.body.name == 'Биллборды'){
                    await res.send(await BilboardBiletiki.getBillboardBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'СобытиеID'){
                    await res.send(await EventBiletiki.getIds())
                } else if(req.body.name == 'Кино'){
                    await res.send(await MovieBiletiki.getMovieBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Сеанс'){
                    await res.send(await SeanceBiletiki.getSeanceBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'ВсеКино'){
                    await res.send(await MovieBiletiki.getAll())
                } else if(req.body.name == 'ВсеКино1'){
                    await res.send(await MovieBiletiki.getAll1())
                } else if(req.body.name == 'Статистика событий'){
                    await res.send(await StatisticBiletiki.getEventStatisticBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Статистика пользователя'){
                    await res.send(await StatisticBiletiki.getUserStatisticBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Статистика организаторов'){
                    await res.send(await StatisticBiletiki.getOrganizatorStatisticBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Статистика жанров'){
                    await res.send(await StatisticBiletiki.getGenreStatisticBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Статистика кинотеатров'){
                    await res.send(await StatisticBiletiki.getCinemaStatisticCinemaBiletiki())
                } else if(req.body.name == 'Статистика фильмов'){
                    await res.send(await StatisticBiletiki.getCinemaStatisticMovieBiletiki())
                } else if(req.body.name == 'Города'){
                    await res.send(await WhereBiletiki.getCity())
                } else if(req.body.name == 'СобытиеГород'){
                    await res.send(await EventBiletiki.getByCity(JSON.parse(req.body.data).city))
                } else if(req.body.name == 'СобытиеГородВсе'){
                    await res.send(await EventBiletiki.getByCityAll(JSON.parse(req.body.data).city))
                } else if(req.body.name == 'БилетыHash'){
                    await res.send(await TicketBiletiki.getByHash(JSON.parse(req.body.data).hash))
                } else if(req.body.name == 'БилетыКиноHash'){
                    await res.send(await TicketCinemaBiletiki.getByHash(JSON.parse(req.body.data).hash))
                } else if(req.body.name == 'Подтверждение'){
                    await res.send(await TicketBiletiki.approveTicketBiletiki(JSON.parse(req.body.data).hash))
                } else if(req.body.name == 'ПодтверждениеКино'){
                    await res.send(await TicketCinemaBiletiki.approveTicketCinemaBiletiki(JSON.parse(req.body.data).hash))
                }  else if(req.body.name == 'ПроверитьМеста'){
                    let data = JSON.parse(req.body.data);
                    await res.send(await EventBiletiki.checkSeatsEventBiletikiAdminka(data.seats, data.eventId))
                }  else if(req.body.name == 'Выгрузка'){
                    let data = JSON.parse(req.body.data);
                    await res.send(await TicketBiletiki.getUnlouding(data.event))
                }  else if(req.body.name == 'Выявление'){
                    let data = JSON.parse(req.body.data);
                    await res.send(await TicketBiletiki.detection(data.event, data.type))
                }
            });
        }
        else if(role==='turnstile'){
            await passportEngine.verifydadmin(req, res, async ()=>{
                if(req.body.name == 'Билеты'){
                    await res.send(await TicketBiletiki.getTicketBiletiki(req.body.search, req.body.sort, req.body.skip))
                }  else if(req.body.name == 'БилетыHash'){
                    await res.send(await TicketBiletiki.getByHash(JSON.parse(req.body.data).hash))
                } else if(req.body.name == 'БилетыКиноHash'){
                    await res.send(await TicketCinemaBiletiki.getByHash(JSON.parse(req.body.data).hash))
                } else if(req.body.name == 'Подтверждение'){
                    await res.send(await TicketBiletiki.approveTicketBiletiki(JSON.parse(req.body.data).hash))
                } else if(req.body.name == 'ПодтверждениеКино'){
                    await res.send(await TicketCinemaBiletiki.approveTicketCinemaBiletiki(JSON.parse(req.body.data).hash))
                }
            });
        }
        else if(role==='accountant'){
            await passportEngine.verifydaccountant(req, res, async ()=>{
                if(req.body.name == 'Статистика событий'){
                    await res.send(await StatisticBiletiki.getEventStatisticBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Статистика пользователя'){
                    await res.send(await StatisticBiletiki.getUserStatisticBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Статистика жанров'){
                    await res.send(await StatisticBiletiki.getGenreStatisticBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Статистика кинотеатров'){
                    await res.send(await StatisticBiletiki.getCinemaStatisticCinemaBiletiki())
                } else if(req.body.name == 'Статистика фильмов'){
                    await res.send(await StatisticBiletiki.getCinemaStatisticMovieBiletiki())
                }
                else if(req.body.name == 'Статистика организаторов'){
                    await res.send(await StatisticBiletiki.getOrganizatorStatisticBiletiki(req.body.search, req.body.sort, req.body.skip))
                }
            });
        }
        else if(role==='cashier'){
            await passportEngine.verifydcashier(req, res, async (user)=>{
                if(req.body.name == 'Города'){
                    await res.send(await WhereBiletiki.getCity())
                } else if(req.body.name == 'СобытиеГород'){
                    await res.send(await EventBiletiki.getByCity(JSON.parse(req.body.data).city))
                } else if(req.body.name == 'СобытиеГородВсе'){
                    await res.send(await EventBiletiki.getByCityAll(JSON.parse(req.body.data).city))
                } else if(req.body.name == 'БилетыHash'){
                    await res.send(await TicketBiletiki.getByHash(JSON.parse(req.body.data).hash))
                } else if(req.body.name == 'БилетыКиноHash'){
                    await res.send(await TicketCinemaBiletiki.getByHash(JSON.parse(req.body.data).hash))
                } else if(req.body.name == 'Билеты'){

                    await res.send(await TicketBiletiki.getTicketBiletiki1(req.body.search, req.body.sort, req.body.skip, user._id))
                } else if(req.body.name == 'Событие'){
                    await res.send(await EventBiletiki.getEventBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'ГдеID'){
                    await res.send(await WhereBiletiki.getIds(JSON.parse(req.body.data).city))
                }  else if(req.body.name == 'ПроверитьМеста'){
                    let data = JSON.parse(req.body.data);
                    await res.send(await EventBiletiki.checkSeatsEventBiletikiAdminka(data.seats, data.eventId))
                }
            });
        }
        else if(role==='cinema'){
            await passportEngine.verifydcinema(req, res, async (cinema)=>{
                if(req.body.name == 'БилетыКиноHash'){
                    await res.send(await TicketCinemaBiletiki.getByHash(JSON.parse(req.body.data).hash))
                } else if(req.body.name == 'СеансДаты'){
                    let data = JSON.parse(req.body.data);
                    await res.send(await SeanceBiletiki.getSeanceTimes(data.movie, data.user))
                }  else if(req.body.name == 'СеансПоДате'){
                    let data = JSON.parse(req.body.data);
                    await res.send(await SeanceBiletiki.getSeanceByDate(data.movie, data.user, data.realDate))
                } else if(req.body.name == 'Залы'){
                    await res.send(await CinemaHallBiletiki.getCinemaHallBiletiki1(req.body.search, req.body.sort, req.body.skip, cinema))
                } else if(req.body.name == 'Билеты кино'){
                    await res.send(await TicketCinemaBiletiki.getTicketCinemaBiletiki1(req.body.search, req.body.sort, req.body.skip, cinema))
                } else if(req.body.name == 'Кинотеатры'){
                    await res.send([cinema])
                } else if(req.body.name == 'Кино'){
                    await res.send(await MovieBiletiki.getMovieBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Сеанс'){
                    await res.send(await SeanceBiletiki.getSeanceBiletiki1(req.body.search, req.body.sort, req.body.skip,  cinema.name))
                } else if(req.body.name == 'ВсеКино'){
                    await res.send(await MovieBiletiki.getAll())
                }
            });
        }
        else if(role==='organizator'){
            await passportEngine.verifydorganizator(req, res, async (user)=>{
                if(req.body.name == 'Города'){
                    await res.send(await WhereBiletiki.getCity())
                } else if(req.body.name == 'СобытиеГород'){
                    await res.send(await EventBiletiki.getByCityOrganizator(JSON.parse(req.body.data).city, user))
                } else if(req.body.name == 'СобытиеГородВсе'){
                    await res.send(await EventBiletiki.getByCityAll(JSON.parse(req.body.data).city))
                } else if(req.body.name == 'Билеты'){
                    await res.send(await TicketBiletiki.getTicketBiletiki1(req.body.search, req.body.sort, req.body.skip, user._id))
                } else if(req.body.name == 'Статистика организаторов'){
                    await res.send(await StatisticBiletiki.getOrganizatorStatisticBiletiki1(req.body.search, req.body.sort, req.body.skip, user))
                }  else if(req.body.name == 'ПроверитьМеста'){
                    let data = JSON.parse(req.body.data);
                    await res.send(await EventBiletiki.checkSeatsEventBiletikiAdminka(data.seats, data.eventId))
                }
            });
        }
    })
});

router.post('/delete', async (req, res) => {
    await passportEngine.verifydrole(req, res, async (role)=> {
        if(role==='admin'){
            await passportEngine.verifydadmin(req, res, async ()=>{
                if(req.body.oldFile!=undefined) {
                    let image = req.body.oldFile.split('\n');
                    for(let i=0; i<image.length; i++){
                        if(image[i].length>0){
                            fs.unlink(image[i].replace(myConst.url + 'images/', path.join(app.dirname, 'public', 'images')+'\\'), ()=>{console.log('successfully deleted');})
                            fs.unlink(image[i].replace(myConst.url + 'images/', path.join(app.dirname, 'public', 'thumbnail')+'\\'), ()=>{console.log('successfully deleted');})
                        }
                    }
                }
                if(req.body.name == 'О нас'){
                    await AboutBiletiki.deleteAboutBiletiki(JSON.parse(req.body.deleted))
                    await res.send(await AboutBiletiki.getAboutBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Кассы'){
                    await CashboxBiletiki.deleteCashboxBiletiki(JSON.parse(req.body.deleted))
                    await res.send(await CashboxBiletiki.getCashboxBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Залы'){
                    await CinemaHallBiletiki.deleteCinemaHallBiletiki(JSON.parse(req.body.deleted))
                    await res.send(await CinemaHallBiletiki.getCinemaHallBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Рассылка'){
                    await MailingBiletiki.deleteMailingBiletiki(JSON.parse(req.body.deleted))
                    await res.send(await MailingBiletiki.getMailingBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Кино'){
                    await MovieBiletiki.deleteMovieBiletiki(JSON.parse(req.body.deleted))
                    await res.send(await MovieBiletiki.getMovieBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Реклама'){
                    await AdsBiletiki.deleteAdsBiletiki(JSON.parse(req.body.deleted))
                    await res.send(await AdsBiletiki.getAdsBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Контакт'){
                    await ContactBiletiki.deleteContactBiletiki(JSON.parse(req.body.deleted))
                    await res.send(await ContactBiletiki.getContactBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Событие'){
                    await EventBiletiki.deleteEventBiletiki(JSON.parse(req.body.deleted))
                    await res.send(await EventBiletiki.getEventBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'FAQ'){
                    await FAQBiletiki.deleteFAQBiletiki(JSON.parse(req.body.deleted))
                    await res.send(await FAQBiletiki.getFAQBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Логотип'){
                    await LogoBiletiki.deleteLogoBiletiki(JSON.parse(req.body.deleted))
                    await res.send(await LogoBiletiki.getLogoBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Персонал'){
                    await PersonalBiletiki.deletePersonalBiletiki(JSON.parse(req.body.deleted))
                    await res.send(await PersonalBiletiki.getPersonalBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Телефон'){
                    await PhoneBiletiki.deletePhoneBiletiki(JSON.parse(req.body.deleted))
                    await res.send(await PhoneBiletiki.getPhoneBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Email'){
                    await EmailBiletiki.deleteEmailBiletiki(JSON.parse(req.body.deleted))
                    await res.send(await EmailBiletiki.getEmailBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Социалки'){
                    await SocialBiletiki.deleteSocialBiletiki(JSON.parse(req.body.deleted))
                    await res.send(await SocialBiletiki.getSocialBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Билеты'){
                    await TicketBiletiki.deleteTicketBiletiki(JSON.parse(req.body.deleted))
                    await res.send(await TicketBiletiki.getTicketBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Пользователи'){
                    await UserBiletiki.deleteUserBiletiki(JSON.parse(req.body.deleted))
                    await res.send(await UserBiletiki.getUserBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Вакансии'){
                    await VacancyBiletiki.deleteVacancyBiletiki(JSON.parse(req.body.deleted))
                    await res.send(await VacancyBiletiki.getVacancyBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Площадка'){
                    await WhereBiletiki.deleteWhereBiletiki(JSON.parse(req.body.deleted))
                    await res.send(await WhereBiletiki.getWhereBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Биллборды'){
                    await BilboardBiletiki.deleteBillboardBiletiki(JSON.parse(req.body.deleted))
                    await res.send(await BilboardBiletiki.getIds())
                } else if(req.body.name == 'Сеанс'){
                    await SeanceBiletiki.deleteSeanceBiletiki(JSON.parse(req.body.deleted))
                    await res.send(await SeanceBiletiki.getSeanceBiletiki(req.body.search, req.body.sort, req.body.skip))
                }
                else if(req.body.name == 'Платежи') {
                    await PaymentBiletiki.deletePaymentBiletiki(JSON.parse(req.body.deleted))
                    await res.send(await PaymentBiletiki.getPaymentBiletiki(req.body.search, req.body.sort, req.body.skip))
                }
            });
        }
        else if(role==='cinema'){
            await passportEngine.verifydcinema(req, res, async (cinema)=>{
                if (req.body.oldFile != undefined) {
                    let image = req.body.oldFile.split('\n');
                    for (let i = 0; i < image.length; i++) {
                        if (image[i].length > 0) {
                            fs.unlink(image[i].replace(myConst.url + 'images/', path.join(app.dirname, 'public', 'images') + '\\'), () => {
                                console.log('successfully deleted');
                            })
                            fs.unlink(image[i].replace(myConst.url + 'images/', path.join(app.dirname, 'public', 'thumbnail') + '\\'), () => {
                                console.log('successfully deleted');
                            })
                        }
                    }
                }
                if(req.body.name == 'Залы'){
                    await CinemaHallBiletiki.deleteCinemaHallBiletiki(JSON.parse(req.body.deleted))
                    await res.send(await CinemaHallBiletiki.getCinemaHallBiletiki(req.body.search, req.body.sort, req.body.skip))
                }
                else if(req.body.name == 'Кино'){
                    await MovieBiletiki.deleteMovieBiletiki(JSON.parse(req.body.deleted))
                    await res.send(await MovieBiletiki.getMovieBiletiki(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Сеанс'){
                    await SeanceBiletiki.deleteSeanceBiletiki(JSON.parse(req.body.deleted))
                    await res.send(await SeanceBiletiki.getSeanceBiletiki1(req.body.search, req.body.sort, req.body.skip,  cinema.name))
                }
            })
            }
    })
});

router.post('/add', async (req, res) => {
    await passportEngine.verifydrole(req, res, async (role)=> {
        if(role==='admin'){
            await passportEngine.verifydadmin(req, res, async ()=>{
                let data, myNew = JSON.parse(req.body.new), image = [], imageThumbnail = [];
                if(req.body.oldFile!=undefined) {
                    image = req.body.oldFile.split('\n');
                    for(let i = 0; i< image.length; i++){
                        imageThumbnail.push(image[i].replace('images', 'thumbnail'))
                    }
                }
                if(req.body.fileLength>0) {
                    for(let i=0; i<image.length; i++){
                        if(image[i].length>0){
                            fs.unlink(image[i].replace(myConst.url + 'images/', path.join(app.dirname, 'public', 'images')+'\\'), ()=>{console.log('successfully deleted');})
                            fs.unlink(imageThumbnail[i].replace(myConst.url + 'thumbnail/', path.join(app.dirname, 'public', 'thumbnail')+'\\'), ()=>{console.log('successfully deleted');})
                        }
                    }
                    image = []
                    imageThumbnail = []
                    for (let i = 0; i < parseInt(req.body.fileLength); i++) {
                        let filename = randomstring.generate(7) + req.body['fileName' + i];
                        let filepath = path.join(app.dirname, 'public', 'images', filename);
                        let filepathThumbnail = path.join(app.dirname, 'public', 'thumbnail', filename);
                        let fstream = fs.createWriteStream(filepath);
                        let stream = await req.body['file' + i].pipe(fstream);
                        image.push(myConst.url + 'images/' + filename)
                        imageThumbnail.push(myConst.url + 'thumbnail/' + filename)
                        stream.on('finish', async () => {
                            let image1 = await Jimp.read(filepath)
                            if(image1.bitmap.width>1500||image1.bitmap.height>1500) {
                                await image1.resize(1500, Jimp.AUTO).write(filepath);
                            }
                            await image1.resize(320, Jimp.AUTO).write(filepathThumbnail);
                            if(i===parseInt(req.body.fileLength)-1){
                                if(req.body.name == 'О нас'){
                                    data = {
                                        descriptionRu: myNew.descriptionRu,
                                        descriptionKg: myNew.descriptionKg
                                    }
                                    if(req.body.id==undefined)
                                        await AboutBiletiki.addAboutBiletiki(data)
                                    else
                                        await AboutBiletiki.setAboutBiletiki(data, req.body.id)
                                    await res.send(await AboutBiletiki.getAboutBiletiki(req.body.search, req.body.sort, req.body.skip))
                                }
                                else if(req.body.name == 'Платежи') {
                                    data = {
                                        status: myNew.status
                                    };
                                    if(req.body.id!==undefined)
                                        await PaymentBiletiki.setPaymentBiletiki(data, req.body.id)
                                    await res.send(await PaymentBiletiki.getPaymentBiletiki(req.body.search, req.body.sort, req.body.skip))
                                }
                                else if(req.body.name == 'Кассы') {
                                    data = {
                                        name: myNew.name,
                                        address: myNew.address,
                                    };
                                    if(req.body.id===undefined)
                                        await CashboxBiletiki.addCashboxBiletiki(data)
                                    else
                                        await CashboxBiletiki.setCashboxBiletiki(data, req.body.id)
                                    await res.send(await CashboxBiletiki.getCashboxBiletiki(req.body.search, req.body.sort, req.body.skip))
                                }
                                else if(req.body.name == 'Рассылка') {
                                    data = {
                                        mailuser: myNew.mailuser,
                                        mailpass: myNew.mailpass,
                                        mailchimpInstance: myNew.mailchimpInstance,
                                        listUniqueId: myNew.listUniqueId,
                                        mailchimpApiKey: myNew.mailchimpApiKey
                                    };
                                    if(req.body.id===undefined)
                                        await MailingBiletiki.addMailingBiletiki(data)
                                    else
                                        await MailingBiletiki.setMailingBiletiki(data, req.body.id)
                                    await res.send(await MailingBiletiki.getMailingBiletiki(req.body.search, req.body.sort, req.body.skip))
                                }
                                else if(req.body.name == 'Биллборды') {
                                    data = {
                                        name: myNew.name,
                                        image: image,
                                        imageThumbnail: imageThumbnail,
                                        dateStart: new Date(myNew.dateStart+'Z'),
                                        dateEnd: new Date(myNew.dateEnd+'Z'),
                                        event: myNew.event
                                    };
                                    if(req.body.id===undefined)
                                        await BilboardBiletiki.addBillboardBiletiki(data)
                                    else
                                        await BilboardBiletiki.setBillboardBiletiki(data, req.body.id)
                                    await res.send(await BilboardBiletiki.getBillboardBiletiki(req.body.search, req.body.sort, req.body.skip))
                                }
                                else if(req.body.name == 'Кино') {
                                    data = {
                                        name: myNew.name,
                                        image: image,
                                        imageThumbnail: imageThumbnail,
                                        genre: myNew.genre,
                                        type: myNew.type,
                                        description: myNew.description,
                                        duration: myNew.duration,
                                        ageCategory: myNew.ageCategory,
                                        premier: myNew.premier,
                                        producers: myNew.producers,
                                        actors: myNew.actors
                                    }
                                    if(req.body.id==undefined)
                                        await MovieBiletiki.addMovieBiletiki(data)
                                    else
                                        await MovieBiletiki.setMovieBiletiki(data, req.body.id)
                                    await res.send(await MovieBiletiki.getMovieBiletiki(req.body.search, req.body.sort, req.body.skip))
                                }
                                else if(req.body.name == 'Реклама') {
                                    data = {
                                        type: myNew.type,
                                        name: myNew.name,
                                        image: image,
                                        imageThumbnail: imageThumbnail,
                                        link: myNew.link,
                                        dateStart: new Date(myNew.dateStart+'Z'),
                                        dateEnd: new Date(myNew.dateEnd+'Z'),
                                        descriptionRu: myNew.descriptionRu,
                                        descriptionKg: myNew.descriptionKg
                                    }
                                    if(req.body.id==undefined)
                                        await AdsBiletiki.addAdsBiletiki(data)
                                    else
                                        await AdsBiletiki.setAdsBiletiki(data, req.body.id)
                                    await res.send(await AdsBiletiki.getAdsBiletiki(req.body.search, req.body.sort, req.body.skip))
                                }
                                else if(req.body.name == 'Залы') {
                                    data = {
                                        name: myNew.name,
                                        user: myNew.user,
                                    }
                                    if(req.body.id==undefined)
                                        await CinemaHallBiletiki.addCinemaHallBiletiki(data)
                                    else
                                        await CinemaHallBiletiki.setCinemaHallBiletiki(data, req.body.id)
                                    await res.send(await CinemaHallBiletiki.getCinemaHallBiletiki(req.body.search, req.body.sort, req.body.skip))
                                }
                                else if(req.body.name == 'Контакт') {
                                    data = {
                                        coords: myNew.coords,
                                        cashbox: myNew.cashbox,
                                        address: myNew.address,
                                        booking: myNew.booking,
                                        connection: myNew.connection,
                                        return1: myNew.return1,
                                        general: myNew.general,
                                        cooperation: myNew.cooperation
                                    }
                                    if(req.body.id==undefined)
                                        await ContactBiletiki.addContactBiletiki(data)
                                    else
                                        await ContactBiletiki.setContactBiletiki(data, req.body.id)
                                    await res.send(await ContactBiletiki.getContactBiletiki(req.body.search, req.body.sort, req.body.skip))
                                }
                                else if(req.body.name == 'Сеанс') {
                                    let realDate = new Date(myNew.realDate+':00.000Z');
                                    data = {
                                        type: myNew.type,
                                        realDate: realDate,
                                        movie: myNew.movie,
                                        price: myNew.price,
                                        seats: JSON.parse(myNew.seats),
                                        cinema:  myNew.cinema
                                    }
                                    if(req.body.id==undefined)
                                        await SeanceBiletiki.addSeanceBiletiki(data)
                                    else
                                        await SeanceBiletiki.setSeanceBiletiki(data, req.body.id)
                                    await res.send(await SeanceBiletiki.getSeanceBiletiki(req.body.search, req.body.sort, req.body.skip))
                                }
                                else if(req.body.name == 'Событие') {
                                    let realDate = []
                                    for(let i=0; i<myNew.date.length; i++){
                                        realDate.push(new Date(myNew.date[i]+'Z'));
                                    }
                                    data = {
                                        realDate: realDate,
                                        popular: myNew.popular,
                                        active: myNew.active,
                                        nameRu: myNew.nameRu,
                                        nameKg:  myNew.nameKg,
                                        descriptionRu: myNew.descriptionRu,
                                        descriptionKg: myNew.descriptionKg,
                                        where: myNew.where,
                                        price: myNew.price,
                                        date: myNew.date,
                                        video: myNew.video,
                                        city: myNew.city,
                                        image: image,
                                        imageThumbnail: imageThumbnail,
                                        ageCategory: myNew.ageCategory,
                                        genre: myNew.genre,
                                        organizators: myNew.organizators,
                                    }
                                    if(req.body.id==undefined)
                                        await EventBiletiki.addEventBiletiki(data)
                                    else
                                        await EventBiletiki.setEventBiletiki(data, req.body.id)
                                    await res.send(await EventBiletiki.getEventBiletiki(req.body.search, req.body.sort, req.body.skip))
                                }
                                else if(req.body.name == 'FAQ') {
                                    data = {
                                        questionRu: myNew.questionRu,
                                        answerRu: myNew.answerRu,
                                        questionKg: myNew.questionKg,
                                        answerKg: myNew.answerKg
                                    }
                                    if(req.body.id==undefined)
                                        await FAQBiletiki.addFAQBiletiki(data)
                                    else
                                        await FAQBiletiki.setFAQBiletiki(data, req.body.id)
                                    await res.send(await FAQBiletiki.getFAQBiletiki(req.body.search, req.body.sort, req.body.skip))
                                }
                                else if(req.body.name == 'Логотип') {
                                    data = {
                                        image: image,
                                        imageThumbnail: imageThumbnail,
                                        name: myNew.name
                                    }
                                    if(req.body.id==undefined)
                                        await LogoBiletiki.addLogoBiletiki(data)
                                    else
                                        await LogoBiletiki.setLogoBiletiki(data, req.body.id)
                                    await res.send(await LogoBiletiki.getLogoBiletiki(req.body.search, req.body.sort, req.body.skip))
                                }
                                else if(req.body.name == 'Персонал') {
                                    data = {
                                        contact: myNew.contact,
                                        whoRu: myNew.whoRu,
                                        whoKg: myNew.whoKg
                                    }
                                    if(req.body.id==undefined)
                                        await PersonalBiletiki.addPersonalBiletiki(data)
                                    else
                                        await PersonalBiletiki.setPersonalBiletiki(data, req.body.id)
                                    await res.send(await PersonalBiletiki.getPersonalBiletiki(req.body.search, req.body.sort, req.body.skip))
                                }
                                else if(req.body.name == 'Телефон') {
                                    data = {
                                        phone: myNew.phone
                                    }
                                    if(req.body.id==undefined)
                                        await PhoneBiletiki.addPhoneBiletiki(data)
                                    else
                                        await PhoneBiletiki.setPhoneBiletiki(data, req.body.id)
                                    await res.send(await PhoneBiletiki.getPhoneBiletiki(req.body.search, req.body.sort, req.body.skip))
                                }
                                else if(req.body.name == 'Email') {
                                    data = {
                                        email: myNew.email
                                    }
                                    if(req.body.id==undefined)
                                        await EmailBiletiki.addEmailBiletiki(data)
                                    else
                                        await EmailBiletiki.setEmailBiletiki(data, req.body.id)
                                    await res.send(await EmailBiletiki.getEmailBiletiki(req.body.search, req.body.sort, req.body.skip))
                                }
                                else if(req.body.name == 'Социалки') {
                                    data = {
                                        name: myNew.name,
                                        image: image,
                                        imageThumbnail: imageThumbnail,
                                        url: myNew.url
                                    }
                                    if(req.body.id==undefined)
                                        await SocialBiletiki.addSocialBiletiki(data)
                                    else
                                        await SocialBiletiki.setSocialBiletiki(data, req.body.id)
                                    await res.send(await SocialBiletiki.getSocialBiletiki(req.body.search, req.body.sort, req.body.skip))
                                }
                                else if(req.body.name == 'Пользователи') {
                                    data = {
                                        email: myNew.email,
                                        name: myNew.name,
                                        surname: myNew.surname,
                                        phonenumber: myNew.phonenumber,
                                        role: myNew.role,
                                        password: myNew.password,
                                        status: myNew.status
                                    }
                                    if(req.body.id==undefined){
                                        await UserBiletiki.addUserBiletiki(data)
                                    } else {
                                        await UserBiletiki.setUserBiletiki(data, req.body.id)
                                    }
                                    await res.send(await UserBiletiki.getUserBiletiki(req.body.search, req.body.sort, req.body.skip))
                                }
                                else if(req.body.name == 'Вакансии') {
                                    data = {
                                        nameRu: myNew.nameRu,
                                        requirementsRu: myNew.requirementsRu,
                                        dutiesRu: myNew.dutiesRu,
                                        conditionsRu: myNew.conditionsRu,
                                        nameKg: myNew.nameKg,
                                        requirementsKg: myNew.requirementsKg,
                                        dutiesKg: myNew.dutiesKg,
                                        conditionsKg: myNew.conditionsKg
                                    }
                                    if(req.body.id==undefined)
                                        await VacancyBiletiki.addVacancyBiletiki(data)
                                    else
                                        await VacancyBiletiki.setVacancyBiletiki(data, req.body.id)
                                    await res.send(await VacancyBiletiki.getVacancyBiletiki(req.body.search, req.body.sort, req.body.skip))
                                }
                                else if(req.body.name == 'Площадка') {
                                    data = {
                                        nameRu: myNew.nameRu,
                                        nameKg:  myNew.nameKg,
                                        image: image,
                                        imageThumbnail: imageThumbnail,
                                        address: myNew.address,
                                        city: myNew.city,
                                        coords: myNew.coords
                                    }
                                    if(req.body.id==undefined)
                                        await WhereBiletiki.addWhereBiletiki(data)
                                    else
                                        await WhereBiletiki.setWhereBiletiki(data, req.body.id)
                                    await res.send(await WhereBiletiki.getWhereBiletiki(req.body.search, req.body.sort, req.body.skip))
                                }
                            }
                        })
                    }
                }
                else {
                    if(req.body.name == 'О нас'){
                        data = {
                            descriptionRu: myNew.descriptionRu,
                            descriptionKg: myNew.descriptionKg
                        }
                        if(req.body.id==undefined)
                            await AboutBiletiki.addAboutBiletiki(data)
                        else
                            await AboutBiletiki.setAboutBiletiki(data, req.body.id)
                        await res.send(await AboutBiletiki.getAboutBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
                    else if(req.body.name == 'Платежи') {
                        data = {
                            status: myNew.status
                        };
                        if(req.body.id!==undefined)
                            await PaymentBiletiki.setPaymentBiletiki(data, req.body.id)
                        await res.send(await PaymentBiletiki.getPaymentBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
                    else if(req.body.name == 'Кассы') {
                        data = {
                            name: myNew.name,
                            address: myNew.address,
                            geo: myNew.geo,
                        };
                        if(req.body.id===undefined)
                            await CashboxBiletiki.addCashboxBiletiki(data)
                        else
                            await CashboxBiletiki.setCashboxBiletiki(data, req.body.id)
                        await res.send(await CashboxBiletiki.getCashboxBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
                    else if(req.body.name == 'Рассылка') {
                        data = {
                            mailuser: myNew.mailuser,
                            mailpass: myNew.mailpass,
                            mailchimpInstance: myNew.mailchimpInstance,
                            listUniqueId: myNew.listUniqueId,
                            mailchimpApiKey: myNew.mailchimpApiKey
                        };
                        if(req.body.id===undefined)
                            await MailingBiletiki.addMailingBiletiki(data)
                        else
                            await MailingBiletiki.setMailingBiletiki(data, req.body.id)
                        await res.send(await MailingBiletiki.getMailingBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
                    else if(req.body.name == 'Биллборды') {
                        data = {
                            name: myNew.name,
                            image: image,
                            imageThumbnail: imageThumbnail,
                            dateStart: new Date(myNew.dateStart+'Z'),
                            dateEnd: new Date(myNew.dateEnd+'Z'),
                            event: myNew.event
                        };
                        if(req.body.id===undefined)
                            await BilboardBiletiki.addBillboardBiletiki(data)
                        else
                            await BilboardBiletiki.setBillboardBiletiki(data, req.body.id)
                        await res.send(await BilboardBiletiki.getBillboardBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
                    else if(req.body.name == 'Кино') {
                        data = {
                            name: myNew.name,
                            image: image,
                            imageThumbnail: imageThumbnail,
                            genre: myNew.genre,
                            type: myNew.type,
                            description: myNew.description,
                            duration: myNew.duration,
                            ageCategory: myNew.ageCategory,
                            premier: myNew.premier,
                            producers: myNew.producers,
                            actors: myNew.actors
                        }
                        if(req.body.id==undefined)
                            await MovieBiletiki.addMovieBiletiki(data)
                        else
                            await MovieBiletiki.setMovieBiletiki(data, req.body.id)
                        await res.send(await MovieBiletiki.getMovieBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
                    else if(req.body.name == 'Реклама') {
                        data = {
                            type: myNew.type,
                            name: myNew.name,
                            image: image,
                            imageThumbnail: imageThumbnail,
                            link: myNew.link,
                            dateStart: new Date(myNew.dateStart+'Z'),
                            dateEnd: new Date(myNew.dateEnd+'Z'),
                            descriptionRu: myNew.descriptionRu,
                            descriptionKg: myNew.descriptionKg
                        }
                        if(req.body.id==undefined)
                            await AdsBiletiki.addAdsBiletiki(data)
                        else
                            await AdsBiletiki.setAdsBiletiki(data, req.body.id)
                        await res.send(await AdsBiletiki.getAdsBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
                    else if(req.body.name == 'Залы') {
                        data = {
                            name: myNew.name,
                            user: myNew.user,
                        }
                        if(req.body.id==undefined)
                            await CinemaHallBiletiki.addCinemaHallBiletiki(data)
                        else
                            await CinemaHallBiletiki.setCinemaHallBiletiki(data, req.body.id)
                        await res.send(await CinemaHallBiletiki.getCinemaHallBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
                    else if(req.body.name == 'Контакт') {
                        data = {
                            coords: myNew.coords,
                            cashbox: myNew.cashbox,
                            address: myNew.address,
                            booking: myNew.booking,
                            connection: myNew.connection,
                            return1: myNew.return1,
                            general: myNew.general,
                            cooperation: myNew.cooperation
                        }
                        if(req.body.id==undefined)
                            await ContactBiletiki.addContactBiletiki(data)
                        else
                            await ContactBiletiki.setContactBiletiki(data, req.body.id)
                        await res.send(await ContactBiletiki.getContactBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
                    else if(req.body.name == 'Сеанс') {
                        let realDate = new Date(myNew.realDate+':00.000Z');
                        data = {
                            type: myNew.type,
                            realDate: realDate,
                            movie: myNew.movie,
                            price: myNew.price,
                            seats: JSON.parse(myNew.seats),
                            cinema:  myNew.cinema
                        }
                        if(req.body.id==undefined)
                            await SeanceBiletiki.addSeanceBiletiki(data)
                        else
                            await SeanceBiletiki.setSeanceBiletiki(data, req.body.id)
                        await res.send(await SeanceBiletiki.getSeanceBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
                    else if(req.body.name == 'Событие') {
                        let realDate = []
                        for(let i=0; i<myNew.date.length; i++){
                            realDate.push(new Date(myNew.date[i]+'Z'));
                        }
                        data = {
                            realDate: realDate,
                            organizators: myNew.organizators,
                            popular: myNew.popular,
                            active: myNew.active,
                            nameRu: myNew.nameRu,
                            nameKg:  myNew.nameKg,
                            descriptionRu: myNew.descriptionRu,
                            descriptionKg: myNew.descriptionKg,
                            where: myNew.where,
                            price: myNew.price,
                            date: myNew.date,
                            video: myNew.video,
                            city: myNew.city,
                            image: image,
                            imageThumbnail: imageThumbnail,
                            ageCategory: myNew.ageCategory,
                            genre: myNew.genre,
                        }

                        if(req.body.id==undefined)
                            await EventBiletiki.addEventBiletiki(data)
                        else
                            await EventBiletiki.setEventBiletiki(data, req.body.id)
                        await res.send(await EventBiletiki.getEventBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
                    else if(req.body.name == 'FAQ') {
                        data = {
                            questionRu: myNew.questionRu,
                            answerRu: myNew.answerRu,
                            questionKg: myNew.questionKg,
                            answerKg: myNew.answerKg
                        }
                        if(req.body.id==undefined)
                            await FAQBiletiki.addFAQBiletiki(data)
                        else
                            await FAQBiletiki.setFAQBiletiki(data, req.body.id)
                        await res.send(await FAQBiletiki.getFAQBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
                    else if(req.body.name == 'Логотип') {
                        data = {
                            image: image,
                            imageThumbnail: imageThumbnail,
                            name: myNew.name
                        }
                        if(req.body.id==undefined)
                            await LogoBiletiki.addLogoBiletiki(data)
                        else
                            await LogoBiletiki.setLogoBiletiki(data, req.body.id)
                        await res.send(await LogoBiletiki.getLogoBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
                    else if(req.body.name == 'Персонал') {
                        data = {
                            contact: myNew.contact,
                            whoRu: myNew.whoRu,
                            whoKg: myNew.whoKg
                        }
                        if(req.body.id==undefined)
                            await PersonalBiletiki.addPersonalBiletiki(data)
                        else
                            await PersonalBiletiki.setPersonalBiletiki(data, req.body.id)
                        await res.send(await PersonalBiletiki.getPersonalBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
                    else if(req.body.name == 'Телефон') {
                        data = {
                            phone: myNew.phone
                        }
                        if(req.body.id==undefined)
                            await PhoneBiletiki.addPhoneBiletiki(data)
                        else
                            await PhoneBiletiki.setPhoneBiletiki(data, req.body.id)
                        await res.send(await PhoneBiletiki.getPhoneBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
                    else if(req.body.name == 'Email') {
                        data = {
                            email: myNew.email
                        }
                        if(req.body.id==undefined)
                            await EmailBiletiki.addEmailBiletiki(data)
                        else
                            await EmailBiletiki.setEmailBiletiki(data, req.body.id)
                        await res.send(await EmailBiletiki.getEmailBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
                    else if(req.body.name == 'Социалки') {
                        data = {
                            name: myNew.name,
                            image: image,
                            imageThumbnail: imageThumbnail,
                            url: myNew.url
                        }
                        if(req.body.id==undefined)
                            await SocialBiletiki.addSocialBiletiki(data)
                        else
                            await SocialBiletiki.setSocialBiletiki(data, req.body.id)
                        await res.send(await SocialBiletiki.getSocialBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
                    else if(req.body.name == 'Пользователи') {
                        data = {
                            email: myNew.email,
                            name: myNew.name,
                            surname: myNew.surname,
                            phonenumber: myNew.phonenumber,
                            role: myNew.role,
                            password: myNew.password,
                            status: myNew.status
                        }
                        if(req.body.id==undefined){
                            await UserBiletiki.addUserBiletiki(data)
                        } else {
                            await UserBiletiki.setUserBiletiki(data, req.body.id)
                        }
                        await res.send(await UserBiletiki.getUserBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
                    else if(req.body.name == 'Вакансии') {
                        data = {
                            nameRu: myNew.nameRu,
                            requirementsRu: myNew.requirementsRu,
                            dutiesRu: myNew.dutiesRu,
                            conditionsRu: myNew.conditionsRu,
                            nameKg: myNew.nameKg,
                            requirementsKg: myNew.requirementsKg,
                            dutiesKg: myNew.dutiesKg,
                            conditionsKg: myNew.conditionsKg
                        }
                        if(req.body.id==undefined)
                            await VacancyBiletiki.addVacancyBiletiki(data)
                        else
                            await VacancyBiletiki.setVacancyBiletiki(data, req.body.id)
                        await res.send(await VacancyBiletiki.getVacancyBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
                    else if(req.body.name == 'Площадка') {
                        data = {
                            nameRu: myNew.nameRu,
                            nameKg:  myNew.nameKg,
                            image: image,
                            imageThumbnail: imageThumbnail,
                            address: myNew.address,
                            city: myNew.city,
                            coords: myNew.coords
                        }
                        if(req.body.id==undefined)
                            await WhereBiletiki.addWhereBiletiki(data)
                        else
                            await WhereBiletiki.setWhereBiletiki(data, req.body.id)
                        await res.send(await WhereBiletiki.getWhereBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
                    else if(req.body.name == 'Билеты') {
                        if(req.body.id==undefined){
                            let hash = randomstring.generate({length: 12, charset: 'numeric'});
                            while (!await TicketBiletiki.checkHash(hash))
                                hash = randomstring.generate({length: 12, charset: 'numeric'});
                            let qrname = randomstring.generate(5) + myNew.user + myNew.event._id+'.png';
                            let pdfname = qrname.replace('.png','.pdf');
                            let qrpath = path.join(app.dirname, 'public', 'qr', qrname);
                            let fstream = fs.createWriteStream(qrpath);
                            let qrTicket = await qr.image(hash, { type: 'png' });
                            let stream = qrTicket.pipe(fstream)
                            stream.on('finish', async () => {
                                let doc = new PDFDocument({
                                    size: [500, 200],
                                    margins : { // by default, all are 72
                                        top: 80,
                                        bottom:10,
                                        left: 10,
                                        right: 10
                                    }
                                });
                                let pdfpath = path.join(app.dirname, 'public', 'ticket', pdfname);
                                let robotoBlack = path.join(app.dirname, 'public', 'font', 'roboto', 'NotoSans-Regular.ttf');
                                doc.registerFont('NotoSans', robotoBlack);
                                let fstream = fs.createWriteStream(pdfpath);
                                doc.pipe(fstream);
                                doc
                                    .font('NotoSans')
                                    .fontSize(18)
                                    .text(myNew.event.nameRu, 60, 30)
                                doc.image(qrpath, 360, 30, {fit: [100, 100]})
                                if(!myNew.seats[0][0].newWithout)
                                    doc.fontSize(12)
                                        .text(myNew.event.where.name, 50, 70)
                                else
                                    doc.fontSize(12)
                                        .text('', 50, 70)
                                let dateTime;
                                let place1 = '';
                                let sector = ''
                                let ryad = ''
                                let sum = 0
                                for(let i = 0; i<myNew.seats.length; i++){
                                    sum+=parseInt(myNew.seats[i][0]['price'])
                                }
                                for (let i = 0; i < myNew.seats.length; i++) {
                                    let date = myNew.seats[i][1].split('T')[0].split('-')
                                    let time = myNew.seats[i][1].split('T')[1].split(':')
                                    dateTime = date[2] + ' ' + myConst.month[date[1]] + ' ' + date[0] + ', ' + time[0] + ':' + time[1];
                                    if(!myNew.seats[0][0].newWithout) {
                                        let place = myNew.seats[i][0]['name']
                                        if (i === 0 || sector != myNew.seats[i][2]) {
                                                sector = myNew.seats[i][2]
                                                if (i !== 0)
                                                    place1 += ', Сектор ' + sector
                                                else
                                                    place1 += 'Сектор ' + sector
                                            }
                                        if (myNew.seats[i][0]['name'].split(':')[1] !== undefined) {
                                                if (i === 0) {
                                                    ryad = myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]
                                                    place1 += ', Ряд ' + myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]
                                                } else if (ryad != myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]) {
                                                    ryad = myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]
                                                    place1 += ', Ряд ' + myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]
                                                }
                                                place = ' Место ' + myNew.seats[i][0]['name'].split(':')[1].split(' ')[0]
                                            }
                                        place1 += place
                                    } else {
                                        place1 = myNew.seats[0][0].name
                                    }
                                }
                                doc
                                    .font('NotoSans')
                                    .fontSize(12)
                                    .text(dateTime, {width: doc.page.width - 100, align: 'justify'})
                                doc
                                    .font('NotoSans')
                                    .fontSize(12)
                                    .text(place1, {width: doc.page.width - 100, align: 'justify'})
                                doc
                                    .font('NotoSans')
                                    .fontSize(12)
                                    .text('Цена: '+sum+' сом', {width: doc.page.width - 100, align: 'justify'})
                                doc.save()
                                
                                
                                doc.end()
                            })
                            
                            let _event_ = await EventBiletikiModels.findOne({_id: myNew.event._id})
                            if (!_event_.where.data[_event_.date[0]].without&&!_event_.where.data[_event_.date[0]].withoutNew) {
                                for (let x = 0; x < myNew.seats.length; x++) {
                                    for (let i = 0; i < _event_.date.length; i++) {
                                        let keys = Object.keys(_event_.where.data[_event_.date[i]]);
                                        for (let i1 = 0; i1 < keys.length; i1++) {
                                            for (let i2 = 0; i2 < _event_.where.data[_event_.date[i]][keys[i1]].length; i2++) {
                                                for (let i3 = 0; i3 < _event_.where.data[_event_.date[i]][keys[i1]][i2].length; i3++) {
                                                    if (_event_.where.data[_event_.date[i]][keys[i1]][i2][i3].name === myNew.seats[x][0].name &&
                                                        myNew.seats[x][1].includes(_event_.date[i])&&
                                                        abc[_event_.where.name][keys[i1]] === myNew.seats[x][2]
                                                    ) {
                                                        _event_.where.data[_event_.date[i]][keys[i1]][i2][i3].status = 'sold'
                                                        _event_.where.data[_event_.date[i]][keys[i1]][i2][i3].color = 'red'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                _event_ = myNew.event
                            }

                            data = {
                                seats: myNew.seats,
                                hash: hash,
                                where: myNew.event.where.name,
                                user: myNew.user,
                                genre: myNew.event.genre,
                                image: myNew.event.image,
                                event: myNew.event.nameRu,
                                ticket: myConst.url + 'ticket/' + pdfname,
                                status: myNew.status,
                            }
                             await TicketBiletiki.addTicketBiletiki(data);
                            await EventBiletiki.setEventBiletiki(_event_, myNew.event._id);
                            res.send(myConst.url + 'ticket/' + pdfname)
                        } else {
                            await TicketBiletiki.setTicketBiletiki({status: myNew.status}, req.body.id)
                            await res.send(await TicketBiletiki.getTicketBiletiki(req.body.search, req.body.sort, req.body.skip))
                        }
                    }
                    else if(req.body.name == 'Билеты кино') {
                        if(req.body.id==undefined){
                            let hash = randomstring.generate({length: 12, charset: 'numeric'});
                            while (!await TicketCinemaBiletiki.checkHash(hash))
                                hash = randomstring.generate({length: 12, charset: 'numeric'});
                            let qrname = randomstring.generate(5) + myNew.user + myNew.seance._id+'.png';
                            let pdfname = qrname.replace('.png','.pdf');
                            let qrpath = path.join(app.dirname, 'public', 'qr', qrname);
                            let fstream = fs.createWriteStream(qrpath);
                            let qrTicket = await qr.image(hash, { type: 'png' });
                            let stream = qrTicket.pipe(fstream)
                            stream.on('finish', async () => {
                                try{
                                    let doc = new PDFDocument({
                                        size: [500, 200],
                                        margins : { // by default, all are 72
                                            top: 80,
                                            bottom:10,
                                            left: 10,
                                            right: 10
                                        }
                                    });
                                    let pdfpath = path.join(app.dirname, 'public', 'ticket', pdfname);
                                    let robotoBlack = path.join(app.dirname, 'public', 'font', 'roboto', 'NotoSans-Regular.ttf');
                                    doc.registerFont('NotoSans', robotoBlack);
                                    let fstream = fs.createWriteStream(pdfpath);
                                    doc.pipe(fstream);
                                    doc
                                        .font('NotoSans')
                                        .fontSize(18)
                                        .text(myNew.movie, 60, 30) // the text and the position where the it should come
                                    doc.image(qrpath, 360, 30, {fit: [100, 100]})
                                    doc.fontSize(12)
                                        .text(myNew.cinema+' '+myNew.hall, 50, 70) // the text and the position where the it should come
                                    for(let i = 0; i<myNew.seats.length; i++){
                                        let date = myNew.seats[i][1].split('T')[0].split('-')
                                        let time = myNew.seats[i][1].split('T')[1].split(':')
                                        let dateTime = date[2] + ' ' + myConst.month[date[1]] + ' ' + date[0] + ', ' + time[0] + ':' + time[1];
                                        doc
                                            .font('NotoSans')
                                            .fontSize(12)
                                            .text(dateTime+' Ряд '+myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]+' Место '+myNew.seats[i][0]['name'].split(':')[1].split(' ')[0]+' Цена: '+myNew.seats[i][0]['price'] + ' сом', {width: doc.page.width - 100, align: 'justify'})
                                    }
                                    doc.end()
                                } catch(error) {
                                    console.error(error)
                                }})

                            data = {
                                seats: myNew.seats,
                                hash: hash,
                                user: myNew.user,
                                movie: myNew.movie,
                                cinema: myNew.cinema,
                                image: 'null',
                                hall: myNew.hall,
                                ticket: myConst.url + 'ticket/' + pdfname,
                                status: myNew.status,
                            }
                            await TicketCinemaBiletiki.addTicketCinemaBiletiki(data);
                            await SeanceBiletiki.setSeanceBiletiki(myNew.seance, myNew.seance._id);
                        } else {
                            await TicketCinemaBiletiki.setTicketCinemaBiletiki({status: myNew.status}, req.body.id)
                        }
                        await res.send(await TicketCinemaBiletiki.getTicketCinemaBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
                }
            });
        }
        else if(role==='cinema') {
            await passportEngine.verifydcinema(req, res, async (cinema)=> {
                let data, myNew = JSON.parse(req.body.new), image = [], imageThumbnail = [];
                if (req.body.oldFile != undefined) {
                    image = req.body.oldFile.split('\n');
                    for (let i = 0; i < image.length; i++) {
                        imageThumbnail.push(image[i].replace('images', 'thumbnail'))
                    }
                }
                if (req.body.fileLength > 0) {
                    for (let i = 0; i < image.length; i++) {
                        if (image[i].length > 0) {
                            fs.unlink(image[i].replace(myConst.url + 'images/', path.join(app.dirname, 'public', 'images') + '\\'), () => {
                                console.log('successfully deleted');
                            })
                            fs.unlink(imageThumbnail[i].replace(myConst.url + 'thumbnail/', path.join(app.dirname, 'public', 'thumbnail') + '\\'), () => {
                                console.log('successfully deleted');
                            })
                        }
                    }
                    image = []
                    imageThumbnail = []
                    for (let i = 0; i < parseInt(req.body.fileLength); i++) {
                        let filename = randomstring.generate(7) + req.body['fileName' + i];
                        let filepath = path.join(app.dirname, 'public', 'images', filename);
                        let filepathThumbnail = path.join(app.dirname, 'public', 'thumbnail', filename);
                        let fstream = fs.createWriteStream(filepath);
                        let stream = await req.body['file' + i].pipe(fstream);
                        image.push(myConst.url + 'images/' + filename)
                        imageThumbnail.push(myConst.url + 'thumbnail/' + filename)
                        stream.on('finish', async () => {
                            let image1 = await Jimp.read(filepath)
                            if (image1.bitmap.width > 1500 || image1.bitmap.height > 1500) {
                                await image1.resize(1500, Jimp.AUTO).write(filepath);
                            }
                            await image1.resize(320, Jimp.AUTO).write(filepathThumbnail);
                            if(i===parseInt(req.body.fileLength)-1)
                            {
                                if (req.body.name == 'Кино') {
                                data = {
                                    name: myNew.name,
                                    image: image,
                                    imageThumbnail: imageThumbnail,
                                    genre: myNew.genre,
                                    type: myNew.type,
                                    description: myNew.description,
                                    duration: myNew.duration,
                                    ageCategory: myNew.ageCategory,
                                    premier: myNew.premier,
                                    producers: myNew.producers,
                                    actors: myNew.actors,
                                    video: myNew.video,
                                }
                                if (req.body.id == undefined)
                                    await MovieBiletiki.addMovieBiletiki(data)
                                else
                                    await MovieBiletiki.setMovieBiletiki(data, req.body.id)
                                await res.send(await MovieBiletiki.getMovieBiletiki(req.body.search, req.body.sort, req.body.skip))
                            }
                                else if (req.body.name == 'Залы') {
                                data = {
                                    name: myNew.name,
                                    user: myNew.user,
                                }
                                if (req.body.id == undefined)
                                    await CinemaHallBiletiki.addCinemaHallBiletiki(data)
                                else
                                    await CinemaHallBiletiki.setCinemaHallBiletiki(data, req.body.id)
                                await res.send(await CinemaHallBiletiki.getCinemaHallBiletiki1(req.body.search, req.body.sort, req.body.skip, cinema))
                            }
                                else if (req.body.name == 'Сеанс') {
                                let realDate = new Date(myNew.realDate);
                                data = {
                                    realDate: realDate,
                                    movie: myNew.movie,
                                    price: myNew.price,
                                    seats: JSON.parse(myNew.seats),
                                    cinema: myNew.cinema
                                }
                                if (req.body.id == undefined)
                                    await SeanceBiletiki.addSeanceBiletiki(data)
                                else
                                    await SeanceBiletiki.setSeanceBiletiki(data, req.body.id)
                                await res.send(await SeanceBiletiki.getSeanceBiletiki1(req.body.search, req.body.sort, req.body.skip, cinema.name))
                            }
                                else if (req.body.name == 'Билеты кино') {
                                if (req.body.id == undefined) {
                                    let hash = randomstring.generate(20) + myNew.user + myNew.seance._id;
                                    while (!await TicketCinemaBiletiki.checkHash(hash))
                                        hash = randomstring.generate(20) + myNew.user + myNew.seance._id;
                                    let qrname = randomstring.generate(7) + myNew.user + myNew.seance._id + '.png';
                                    let pdfname = qrname.replace('.png', '.pdf');
                                    let qrpath = path.join(app.dirname, 'public', 'qr', qrname);
                                    let fstream = fs.createWriteStream(qrpath);
                                    let qrTicket = await qr.image(hash, {type: 'png'});
                                    let stream = qrTicket.pipe(fstream)
                                    stream.on('finish', async () => {
                                        try {
                                            let doc = new PDFDocument({
                                                size: [500, 200],
                                                margins : { // by default, all are 72
                                                    top: 80,
                                                    bottom:10,
                                                    left: 10,
                                                    right: 10
                                                }
                                            });
                                            let pdfpath = path.join(app.dirname, 'public', 'ticket', pdfname);
                                            let robotoBlack = path.join(app.dirname, 'public', 'font', 'roboto', 'NotoSans-Regular.ttf');
                                            doc.registerFont('NotoSans', robotoBlack);
                                            let fstream = fs.createWriteStream(pdfpath);
                                            doc.pipe(fstream);
                                            doc
                                                .font('NotoSans')
                                                .fontSize(18)
                                                .text(myNew.movie, 60, 30) // the text and the position where the it should come
                                            doc.image(qrpath, 360, 30, {fit: [100, 100]})
                                            doc.fontSize(12)
                                                .text(myNew.cinema+' '+myNew.hall, 50, 70) // the text and the position where the it should come
                                            for(let i = 0; i<myNew.seats.length; i++){
                                                let date = myNew.seats[i][1].split('T')[0].split('-')
                                                let time = myNew.seats[i][1].split('T')[1].split(':')
                                                let dateTime = date[2] + ' ' + myConst.month[date[1]] + ' ' + date[0] + ', ' + time[0] + ':' + time[1];
                                                doc
                                                    .font('NotoSans')
                                                    .fontSize(12)
                                                    .text(dateTime+' Ряд '+myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]+' Место '+myNew.seats[i][0]['name'].split(':')[1].split(' ')[0]+' Цена: '+myNew.seats[i][0]['price'] + ' сом', {width: doc.page.width - 100, align: 'justify'})
                                            }
                                            doc.end()
                                        } catch (error) {
                                            console.error(error)
                                        }
                                    })

                                    data = {
                                        seats: myNew.seats,
                                        hash: hash,
                                        user: myNew.user,
                                        movie: myNew.movie,
                                        cinema: myNew.cinema,
                                        hall: myNew.hall,
                                        ticket: myConst.url + 'ticket/' + pdfname,
                                        status: myNew.status,
                                    }
                                    await TicketCinemaBiletiki.addTicketCinemaBiletiki(data);
                                    await SeanceBiletiki.setSeanceBiletiki(myNew.seance, myNew.seance._id);
                                } else {
                                    await TicketCinemaBiletiki.setTicketCinemaBiletiki({status: myNew.status}, req.body.id)
                                }
                                await res.send(await TicketCinemaBiletiki.getTicketCinemaBiletiki1(req.body.search, req.body.sort, req.body.skip, cinema))
                            }
                            }
                        })
                    }
                } else {
                    if (req.body.name == 'Кино') {
                        data = {
                            name: myNew.name,
                            image: image,
                            imageThumbnail: imageThumbnail,
                            genre: myNew.genre,
                            type: myNew.type,
                            description: myNew.description,
                            duration: myNew.duration,
                            ageCategory: myNew.ageCategory,
                            premier: myNew.premier,
                            producers: myNew.producers,
                            actors: myNew.actors,
                            video: myNew.video,
                        }
                        if (req.body.id == undefined)
                            await MovieBiletiki.addMovieBiletiki(data)
                        else
                            await MovieBiletiki.setMovieBiletiki(data, req.body.id)
                        await res.send(await MovieBiletiki.getMovieBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
                    else if (req.body.name == 'Залы') {
                        data = {
                            name: myNew.name,
                            user: myNew.user,
                        }
                        if (req.body.id == undefined)
                            await CinemaHallBiletiki.addCinemaHallBiletiki(data)
                        else
                            await CinemaHallBiletiki.setCinemaHallBiletiki(data, req.body.id)
                        await res.send(await CinemaHallBiletiki.getCinemaHallBiletiki1(req.body.search, req.body.sort, req.body.skip, cinema))
                    }
                    else if (req.body.name == 'Сеанс') {
                        let realDate = new Date(myNew.realDate);
                        data = {
                            realDate: realDate,
                            movie: myNew.movie,
                            price: myNew.price,
                            seats: JSON.parse(myNew.seats),
                            cinema: myNew.cinema
                        }
                        if (req.body.id == undefined)
                            await SeanceBiletiki.addSeanceBiletiki(data)
                        else
                            await SeanceBiletiki.setSeanceBiletiki(data, req.body.id)
                        await res.send(await SeanceBiletiki.getSeanceBiletiki1(req.body.search, req.body.sort, req.body.skip, cinema.name))
                    }
                    else if (req.body.name == 'Билеты кино') {
                        if (req.body.id == undefined) {
                            let hash = randomstring.generate(20) + myNew.user + myNew.seance._id;
                            while (!await TicketCinemaBiletiki.checkHash(hash))
                                hash = randomstring.generate(20) + myNew.user + myNew.seance._id;
                            let qrname = randomstring.generate(7) + myNew.user + myNew.seance._id + '.png';
                            let pdfname = qrname.replace('.png', '.pdf');
                            let qrpath = path.join(app.dirname, 'public', 'qr', qrname);
                            let fstream = fs.createWriteStream(qrpath);
                            let qrTicket = await qr.image(hash, {type: 'png'});
                            let stream = qrTicket.pipe(fstream)
                            stream.on('finish', async () => {
                                try {
                                    let doc = new PDFDocument({
                                        size: [500, 200],
                                        margins : { // by default, all are 72
                                            top: 80,
                                            bottom:10,
                                            left: 10,
                                            right: 10
                                        }
                                    });
                                    let pdfpath = path.join(app.dirname, 'public', 'ticket', pdfname);
                                    let robotoBlack = path.join(app.dirname, 'public', 'font', 'roboto', 'NotoSans-Regular.ttf');
                                    doc.registerFont('NotoSans', robotoBlack);
                                    let fstream = fs.createWriteStream(pdfpath);
                                    doc.pipe(fstream);
                                    doc
                                        .font('NotoSans')
                                        .fontSize(18)
                                        .text(myNew.movie, 60, 30) // the text and the position where the it should come
                                    doc.image(qrpath, 360, 30, {fit: [100, 100]})
                                    doc.fontSize(12)
                                        .text(myNew.cinema+' '+myNew.hall, 50, 70) // the text and the position where the it should come
                                    for(let i = 0; i<myNew.seats.length; i++){
                                        let date = myNew.seats[i][1].split('T')[0].split('-')
                                        let time = myNew.seats[i][1].split('T')[1].split(':')
                                        let dateTime = date[2] + ' ' + myConst.month[date[1]] + ' ' + date[0] + ', ' + time[0] + ':' + time[1];
                                        doc
                                            .font('NotoSans')
                                            .fontSize(12)
                                            .text(dateTime+' Ряд '+myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]+' Место '+myNew.seats[i][0]['name'].split(':')[1].split(' ')[0]+' Цена: '+myNew.seats[i][0]['price'] + ' сом', {width: doc.page.width - 100, align: 'justify'})
                                    }
                                    doc.end()
                                } catch (error) {
                                    console.error(error)
                                }
                            })

                            data = {
                                seats: myNew.seats,
                                hash: hash,
                                user: myNew.user,
                                movie: myNew.movie,
                                cinema: myNew.cinema,
                                hall: myNew.hall,
                                ticket: myConst.url + 'ticket/' + pdfname,
                                status: myNew.status,
                            }
                            await TicketCinemaBiletiki.addTicketCinemaBiletiki(data);
                            await SeanceBiletiki.setSeanceBiletiki(myNew.seance, myNew.seance._id);
                        } else {
                            await TicketCinemaBiletiki.setTicketCinemaBiletiki({status: myNew.status}, req.body.id)
                        }
                        await res.send(await TicketCinemaBiletiki.getTicketCinemaBiletiki1(req.body.search, req.body.sort, req.body.skip, cinema))
                    }
                }
            })
        }
        else if(role==='cashier') {
            await passportEngine.verifydcashier(req, res, async (user)=>{
                let data, myNew = JSON.parse(req.body.new), image = [], imageThumbnail = [];
                if(req.body.oldFile!=undefined) {
                    image = req.body.oldFile.split('\n');
                    for(let i = 0; i< image.length; i++){
                        imageThumbnail.push(image[i].replace('images', 'thumbnail'))
                    }
                }
                if(req.body.fileLength>0) {
                    for(let i=0; i<image.length; i++){
                        if(image[i].length>0){
                            fs.unlink(image[i].replace(myConst.url + 'images/', path.join(app.dirname, 'public', 'images')+'\\'), ()=>{console.log('successfully deleted');})
                            fs.unlink(imageThumbnail[i].replace(myConst.url + 'thumbnail/', path.join(app.dirname, 'public', 'thumbnail')+'\\'), ()=>{console.log('successfully deleted');})
                        }
                    }
                    image = []
                    imageThumbnail = []
                    for (let i = 0; i < parseInt(req.body.fileLength); i++) {
                        let filename = randomstring.generate(7) + req.body['fileName' + i];
                        let filepath = path.join(app.dirname, 'public', 'images', filename);
                        let filepathThumbnail = path.join(app.dirname, 'public', 'thumbnail', filename);
                        let fstream = fs.createWriteStream(filepath);
                        let stream = await req.body['file' + i].pipe(fstream);
                        image.push(myConst.url + 'images/' + filename)
                        imageThumbnail.push(myConst.url + 'thumbnail/' + filename)
                        stream.on('finish', async () => {
                            let image1 = await Jimp.read(filepath)
                            if(image1.bitmap.width>1500||image1.bitmap.height>1500) {
                                await image1.resize(1500, Jimp.AUTO).write(filepath);
                            }
                            await image1.resize(320, Jimp.AUTO).write(filepathThumbnail);
                            if(i===parseInt(req.body.fileLength)-1){
                                if(req.body.name == 'Событие') {
                                    let realDate = []
                                    for(let i=0; i<myNew.date.length; i++){
                                        realDate.push(new Date(myNew.date[i]+'Z'));
                                    }
                                    data = {
                                        realDate: realDate,
                                        popular: myNew.popular,
                                        active: myNew.active,
                                        nameRu: myNew.nameRu,
                                        nameKg:  myNew.nameKg,
                                        descriptionRu: myNew.descriptionRu,
                                        descriptionKg: myNew.descriptionKg,
                                        where: myNew.where,
                                        price: myNew.price,
                                        date: myNew.date,
                                        video: myNew.video,
                                        city: myNew.city,
                                        image: image,
                                        imageThumbnail: imageThumbnail,
                                        ageCategory: myNew.ageCategory,
                                        genre: myNew.genre,
                                        organizators: myNew.organizators,
                                    }
                                    if(req.body.id==undefined)
                                        await EventBiletiki.addEventBiletiki(data)
                                    else
                                        await EventBiletiki.setEventBiletiki(data, req.body.id)
                                    await res.send(await EventBiletiki.getEventBiletiki(req.body.search, req.body.sort, req.body.skip))
                                }
                            }
                        })
                    }
                }
                else {
                    if(req.body.name == 'Билеты'){
                        if(req.body.id==undefined){
                            let hash = randomstring.generate({length: 12, charset: 'numeric'});
                            while (!await TicketBiletiki.checkHash(hash))
                                hash = randomstring.generate({length: 12, charset: 'numeric'});
                            let qrname = randomstring.generate(5) + myNew.user + myNew.event._id+'.png';
                            let pdfname = qrname.replace('.png','.pdf');
                            let qrpath = path.join(app.dirname, 'public', 'qr', qrname);
                            let fstream = fs.createWriteStream(qrpath);
                            let qrTicket = await qr.image(hash, { type: 'png' });
                            let stream = qrTicket.pipe(fstream)
                            stream.on('finish', async () => {
                                let doc = new PDFDocument({
                                    size: [500, 200],
                                    margins : { // by default, all are 72
                                        top: 80,
                                        bottom:10,
                                        left: 10,
                                        right: 10
                                    }
                                });
                                let pdfpath = path.join(app.dirname, 'public', 'ticket', pdfname);
                                let robotoBlack = path.join(app.dirname, 'public', 'font', 'roboto', 'NotoSans-Regular.ttf');
                                doc.registerFont('NotoSans', robotoBlack);
                                let fstream = fs.createWriteStream(pdfpath);
                                doc.pipe(fstream);
                                doc
                                    .font('NotoSans')
                                    .fontSize(18)
                                    .text(myNew.event.nameRu, 60, 30)
                                doc.image(qrpath, 360, 30, {fit: [100, 100]})
                                if(!myNew.seats[0][0].newWithout)
                                    doc.fontSize(12)
                                        .text(myNew.event.where.name, 50, 70)
                                else
                                    doc.fontSize(12)
                                        .text('', 50, 70)
                                let dateTime;
                                let place1 = '';
                                let sector = ''
                                let ryad = ''
                                let sum = 0

                                for(let i = 0; i<myNew.seats.length; i++){
                                    sum+=parseInt(myNew.seats[i][0]['price'])
                                }
                                for (let i = 0; i < myNew.seats.length; i++) {
                                    let date = myNew.seats[i][1].split('T')[0].split('-')
                                    let time = myNew.seats[i][1].split('T')[1].split(':')
                                    dateTime = date[2] + ' ' + myConst.month[date[1]] + ' ' + date[0] + ', ' + time[0] + ':' + time[1];
                                    if(!myNew.seats[0][0].newWithout) {
                                        let place = myNew.seats[i][0]['name']
                                        if (i === 0 || sector != myNew.seats[i][2]) {
                                            sector = myNew.seats[i][2]
                                            if (i !== 0)
                                                place1 += ', Сектор ' + sector
                                            else
                                                place1 += 'Сектор ' + sector
                                        }
                                        if (myNew.seats[i][0]['name'].split(':')[1] !== undefined) {
                                            if (i === 0) {
                                                ryad = myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]
                                                place1 += ', Ряд ' + myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]
                                            } else if (ryad != myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]) {
                                                ryad = myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]
                                                place1 += ', Ряд ' + myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]
                                            }
                                            place = ' Место ' + myNew.seats[i][0]['name'].split(':')[1].split(' ')[0]
                                        }
                                        place1 += place
                                    } else {
                                        place1 = myNew.seats[0][0].name
                                    }
                                }
                                doc
                                    .font('NotoSans')
                                    .fontSize(12)
                                    .text(dateTime, {width: doc.page.width - 100, align: 'justify'})
                                doc
                                    .font('NotoSans')
                                    .fontSize(12)
                                    .text(place1, {width: doc.page.width - 100, align: 'justify'})
                                doc
                                    .font('NotoSans')
                                    .fontSize(12)
                                    .text('Цена: '+sum+' сом', {width: doc.page.width - 100, align: 'justify'})
                                doc.save()


                                doc.end()
                            })

                            let _event_ = await EventBiletikiModels.findOne({_id: myNew.event._id})
                            if (!_event_.where.data[_event_.date[0]].without&&!_event_.where.data[_event_.date[0]].withoutNew) {
                                for (let x = 0; x < myNew.seats.length; x++) {
                                    for (let i = 0; i < _event_.date.length; i++) {
                                        let keys = Object.keys(_event_.where.data[_event_.date[i]]);
                                        for (let i1 = 0; i1 < keys.length; i1++) {
                                            for (let i2 = 0; i2 < _event_.where.data[_event_.date[i]][keys[i1]].length; i2++) {
                                                for (let i3 = 0; i3 < _event_.where.data[_event_.date[i]][keys[i1]][i2].length; i3++) {
                                                    if (_event_.where.data[_event_.date[i]][keys[i1]][i2][i3].name === myNew.seats[x][0].name &&
                                                        myNew.seats[x][1].includes(_event_.date[i])&&
                                                        abc[_event_.where.name][keys[i1]] === myNew.seats[x][2]
                                                    ) {
                                                        _event_.where.data[_event_.date[i]][keys[i1]][i2][i3].status = 'sold'
                                                        _event_.where.data[_event_.date[i]][keys[i1]][i2][i3].color = 'red'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                _event_ = myNew.event
                            }

                            data = {
                                seats: myNew.seats,
                                hash: hash,
                                where: myNew.event.where.name,
                                user: myNew.user,
                                genre: myNew.event.genre,
                                image: myNew.event.image,
                                event: myNew.event.nameRu,
                                ticket: myConst.url + 'ticket/' + pdfname,
                                status: myNew.status,
                                cashier: user._id,
                            }
                            await TicketBiletiki.addTicketBiletiki(data);
                            await EventBiletiki.setEventBiletiki(_event_, myNew.event._id);
                            res.send(myConst.url + 'ticket/' + pdfname)
                        } else {
                            await TicketBiletiki.setTicketBiletiki({status: myNew.status}, req.body.id)
                            await res.send(await TicketBiletiki.getTicketBiletiki(req.body.search, req.body.sort, req.body.skip))
                        }
                    }
                    else if(req.body.name == 'Билеты кино'){
                        if(req.body.id==undefined){
                            let hash = randomstring.generate({length: 12, charset: 'numeric'});
                            while (!await TicketCinemaBiletiki.checkHash(hash))
                                hash = randomstring.generate({length: 12, charset: 'numeric'});
                            let qrname = randomstring.generate(5) + myNew.user + myNew.seance._id+'.png';
                            let pdfname = qrname.replace('.png','.pdf');
                            let qrpath = path.join(app.dirname, 'public', 'qr', qrname);
                            let fstream = fs.createWriteStream(qrpath);
                            let qrTicket = await qr.image(hash, { type: 'png' });
                            let stream = qrTicket.pipe(fstream)
                            stream.on('finish', async () => {
                                let doc = new PDFDocument({
                                    size: [500, 200],
                                    margins : { // by default, all are 72
                                        top: 80,
                                        bottom:10,
                                        left: 10,
                                        right: 10
                                    }
                                });
                                let pdfpath = path.join(app.dirname, 'public', 'ticket', pdfname);
                                let robotoBlack = path.join(app.dirname, 'public', 'font', 'roboto', 'NotoSans-Regular.ttf');
                                doc.registerFont('NotoSans', robotoBlack);
                                let fstream = fs.createWriteStream(pdfpath);
                                doc.pipe(fstream);
                                doc
                                    .font('NotoSans')
                                    .fontSize(18)
                                    .text(myNew.movie, 60, 30) // the text and the position where the it should come
                                doc.image(qrpath, 360, 30, {fit: [100, 100]})
                                doc.fontSize(12)
                                    .text(myNew.cinema+' '+myNew.hall, 50, 70) // the text and the position where the it should come
                                for(let i = 0; i<myNew.seats.length; i++){
                                    let date = myNew.seats[i][1].split('T')[0].split('-')
                                    let time = myNew.seats[i][1].split('T')[1].split(':')
                                    let dateTime = date[2] + ' ' + myConst.month[date[1]] + ' ' + date[0] + ', ' + time[0] + ':' + time[1];
                                    doc
                                        .font('NotoSans')
                                        .fontSize(12)
                                        .text(dateTime+' Ряд '+myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]+' Место '+myNew.seats[i][0]['name'].split(':')[1].split(' ')[0]+' Цена: '+myNew.seats[i][0]['price'] + ' сом', {width: doc.page.width - 100, align: 'justify'})
                                }
                                doc.end()
                            })

                            data = {
                                seats: myNew.seats,
                                hash: hash,
                                user: myNew.user,
                                movie: myNew.movie,
                                cinema: myNew.cinema,
                                hall: myNew.hall,
                                ticket: myConst.url + 'ticket/' + pdfname,
                                status: myNew.status,
                                image: 'null',
                            }
                            await TicketCinemaBiletiki.addTicketCinemaBiletiki(data);
                            await SeanceBiletiki.setSeanceBiletiki(myNew.seance, myNew.seance._id);
                        } else {
                            await TicketCinemaBiletiki.setTicketCinemaBiletiki({status: myNew.status}, req.body.id)
                        }
                        await res.send(await TicketCinemaBiletiki.getTicketCinemaBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
                    else if(req.body.name == 'Событие') {
                        let realDate = []
                        for(let i=0; i<myNew.date.length; i++){
                            realDate.push(new Date(myNew.date[i]+'Z'));
                        }
                        data = {
                            realDate: realDate,
                            popular: myNew.popular,
                            active: myNew.active,
                            nameRu: myNew.nameRu,
                            nameKg:  myNew.nameKg,
                            descriptionRu: myNew.descriptionRu,
                            descriptionKg: myNew.descriptionKg,
                            where: myNew.where,
                            price: myNew.price,
                            date: myNew.date,
                            video: myNew.video,
                            city: myNew.city,
                            image: image,
                            imageThumbnail: imageThumbnail,
                            ageCategory: myNew.ageCategory,
                            genre: myNew.genre,
                            organizators: myNew.organizators,
                        }
                        if(req.body.id==undefined)
                            await EventBiletiki.addEventBiletiki(data)
                        else
                            await EventBiletiki.setEventBiletiki(data, req.body.id)
                        await res.send(await EventBiletiki.getEventBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
                }




            });
        }
        else if(role==='organizator') {
            await passportEngine.verifydorganizator(req, res, async (user)=>{
                let data, myNew = JSON.parse(req.body.new);
                    if(req.body.name == 'Билеты'){
                        if(req.body.id==undefined){
                            let hash = randomstring.generate({length: 12, charset: 'numeric'});
                            while (!await TicketBiletiki.checkHash(hash))
                                hash = randomstring.generate({length: 12, charset: 'numeric'});
                            let qrname = randomstring.generate(5) + myNew.user + myNew.event._id+'.png';
                            let pdfname = qrname.replace('.png','.pdf');
                            let qrpath = path.join(app.dirname, 'public', 'qr', qrname);
                            let fstream = fs.createWriteStream(qrpath);
                            let qrTicket = await qr.image(hash, { type: 'png' });
                            let stream = qrTicket.pipe(fstream)
                            stream.on('finish', async () => {
                                let doc = new PDFDocument({
                                    size: [500, 200],
                                    margins : { // by default, all are 72
                                        top: 80,
                                        bottom:10,
                                        left: 10,
                                        right: 10
                                    }
                                });
                                let pdfpath = path.join(app.dirname, 'public', 'ticket', pdfname);
                                let robotoBlack = path.join(app.dirname, 'public', 'font', 'roboto', 'NotoSans-Regular.ttf');
                                doc.registerFont('NotoSans', robotoBlack);
                                let fstream = fs.createWriteStream(pdfpath);
                                doc.pipe(fstream);
                                doc
                                    .font('NotoSans')
                                    .fontSize(18)
                                    .text(myNew.event.nameRu, 60, 30) // the text and the position where the it should come
                                doc.image(qrpath, 360, 30, {fit: [100, 100]})
                                doc.fontSize(12)
                                    .text(myNew.event.where.name, 50, 70) // the text and the position where the it should come
                                let dateTime;
                                let place1 = '';
                                let sector = ''
                                let ryad = ''
                                let sum = 0
                                for(let i = 0; i<myNew.seats.length; i++){
                                    sum+=parseInt(myNew.seats[i][0]['price'])
                                }
                                for(let i = 0; i<myNew.seats.length; i++){
                                    let date = myNew.seats[i][1].split('T')[0].split('-')
                                    let time = myNew.seats[i][1].split('T')[1].split(':')
                                    dateTime = date[2] + ' ' + myConst.month[date[1]] + ' ' + date[0] + ', ' + time[0] + ':' + time[1];
                                    let place = myNew.seats[i][0]['name']
                                    if(i===0||sector != myNew.seats[i][2]){
                                        sector = myNew.seats[i][2]
                                        if(i != 0)
                                            place1+=', Сектор '+sector
                                        else
                                            place1+='Сектор '+sector
                                    }
                                    if(myNew.seats[i][0]['name'].split(':')[1]!==undefined){
                                        if(i===0){
                                            ryad = myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]
                                            place1+=' Ряд '+myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]
                                        } else if(ryad != myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]){
                                            ryad = myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]
                                            place1+=', Ряд '+myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]
                                        }
                                        place = ' Место '+myNew.seats[i][0]['name'].split(':')[1].split(' ')[0]
                                    }
                                    place1+=place
                                }
                                doc
                                    .font('NotoSans')
                                    .fontSize(12)
                                    .text(dateTime, {width: doc.page.width - 100, align: 'justify'})
                                doc
                                    .font('NotoSans')
                                    .fontSize(12)
                                    .text(place1, {width: doc.page.width - 100, align: 'justify'})
                                doc
                                    .font('NotoSans')
                                    .fontSize(12)
                                    .text('Цена: '+sum+' сом', {width: doc.page.width - 100, align: 'justify'})
                                doc.save()


                                doc.end()


                            })

                            let _event_ = await EventBiletikiModels.findOne({_id: myNew.event._id})
                            if (!_event_.where.data[_event_.date[0]].without&&!_event_.where.data[_event_.date[0]].withoutNew) {
                                for (let x = 0; x < myNew.seats.length; x++) {
                                    for (let i = 0; i < _event_.date.length; i++) {
                                        let keys = Object.keys(_event_.where.data[_event_.date[i]]);
                                        for (let i1 = 0; i1 < keys.length; i1++) {
                                            for (let i2 = 0; i2 < _event_.where.data[_event_.date[i]][keys[i1]].length; i2++) {
                                                for (let i3 = 0; i3 < _event_.where.data[_event_.date[i]][keys[i1]][i2].length; i3++) {
                                                    if (_event_.where.data[_event_.date[i]][keys[i1]][i2][i3].name === myNew.seats[x][0].name &&
                                                        myNew.seats[x][1].includes(_event_.date[i])&&
                                                        abc[_event_.where.name][keys[i1]] === myNew.seats[x][2]
                                                    ) {
                                                        _event_.where.data[_event_.date[i]][keys[i1]][i2][i3].status = 'sold'
                                                        _event_.where.data[_event_.date[i]][keys[i1]][i2][i3].color = 'red'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                _event_ = myNew.event
                            }


                            data = {
                                seats: myNew.seats,
                                hash: hash,
                                where: myNew.event.where.name,
                                user: myNew.user,
                                genre: myNew.event.genre,
                                image: myNew.event.image,
                                event: myNew.event.nameRu,
                                ticket: myConst.url + 'ticket/' + pdfname,
                                status: myNew.status,
                                cashier: user._id,
                            }
                            await TicketBiletiki.addTicketBiletiki(data);
                            await EventBiletiki.setEventBiletiki(_event_, myNew.event._id);
                            res.send(myConst.url + 'ticket/' + pdfname)
                        }
                    }






            });
        }
        else if(role==='turnstile'){
            await passportEngine.verifydadmin(req, res, async ()=>{
                let data, myNew = JSON.parse(req.body.new), image = [], imageThumbnail = [];
                if(req.body.name == 'Билеты') {
                        if(req.body.id==undefined){
                            let hash = randomstring.generate({length: 12, charset: 'numeric'});
                            while (!await TicketBiletiki.checkHash(hash))
                                hash = randomstring.generate({length: 12, charset: 'numeric'});
                            let qrname = randomstring.generate(5) + myNew.user + myNew.event._id+'.png';
                            let pdfname = qrname.replace('.png','.pdf');
                            let qrpath = path.join(app.dirname, 'public', 'qr', qrname);
                            let fstream = fs.createWriteStream(qrpath);
                            let qrTicket = await qr.image(hash, { type: 'png' });
                            let stream = qrTicket.pipe(fstream)
                            stream.on('finish', async () => {
                                let doc = new PDFDocument({
                                    size: [500, 200],
                                    margins : { // by default, all are 72
                                        top: 80,
                                        bottom:10,
                                        left: 10,
                                        right: 10
                                    }
                                });
                                let pdfpath = path.join(app.dirname, 'public', 'ticket', pdfname);
                                let robotoBlack = path.join(app.dirname, 'public', 'font', 'roboto', 'NotoSans-Regular.ttf');
                                doc.registerFont('NotoSans', robotoBlack);
                                let fstream = fs.createWriteStream(pdfpath);
                                doc.pipe(fstream);
                                doc
                                    .font('NotoSans')
                                    .fontSize(18)
                                    .text(myNew.event.nameRu, 60, 30)
                                doc.image(qrpath, 360, 30, {fit: [100, 100]})
                                if(!myNew.seats[0][0].newWithout)
                                    doc.fontSize(12)
                                        .text(myNew.event.where.name, 50, 70)
                                else
                                    doc.fontSize(12)
                                        .text('', 50, 70)
                                let dateTime;
                                let place1 = '';
                                let sector = ''
                                let ryad = ''
                                let sum = 0
                                for(let i = 0; i<myNew.seats.length; i++){
                                    sum+=parseInt(myNew.seats[i][0]['price'])
                                }
                                for (let i = 0; i < myNew.seats.length; i++) {
                                    let date = myNew.seats[i][1].split('T')[0].split('-')
                                    let time = myNew.seats[i][1].split('T')[1].split(':')
                                    dateTime = date[2] + ' ' + myConst.month[date[1]] + ' ' + date[0] + ', ' + time[0] + ':' + time[1];
                                    if(!myNew.seats[0][0].newWithout) {
                                        let place = myNew.seats[i][0]['name']
                                        if (i === 0 || sector != myNew.seats[i][2]) {
                                            sector = myNew.seats[i][2]
                                            if (i !== 0)
                                                place1 += ', Сектор ' + sector
                                            else
                                                place1 += 'Сектор ' + sector
                                        }
                                        if (myNew.seats[i][0]['name'].split(':')[1] !== undefined) {
                                            if (i === 0) {
                                                ryad = myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]
                                                place1 += ', Ряд ' + myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]
                                            } else if (ryad != myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]) {
                                                ryad = myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]
                                                place1 += ', Ряд ' + myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]
                                            }
                                            place = ' Место ' + myNew.seats[i][0]['name'].split(':')[1].split(' ')[0]
                                        }
                                        place1 += place
                                    } else {
                                        place1 = myNew.seats[0][0].name
                                    }
                                }
                                doc
                                    .font('NotoSans')
                                    .fontSize(12)
                                    .text(dateTime, {width: doc.page.width - 100, align: 'justify'})
                                doc
                                    .font('NotoSans')
                                    .fontSize(12)
                                    .text(place1, {width: doc.page.width - 100, align: 'justify'})
                                doc
                                    .font('NotoSans')
                                    .fontSize(12)
                                    .text('Цена: '+sum+' сом', {width: doc.page.width - 100, align: 'justify'})
                                doc.save()


                                doc.end()
                            })

                            let _event_ = await EventBiletikiModels.findOne({_id: myNew.event._id})
                            if (!_event_.where.data[_event_.date[0]].without&&!_event_.where.data[_event_.date[0]].withoutNew) {
                                for (let x = 0; x < myNew.seats.length; x++) {
                                    for (let i = 0; i < _event_.date.length; i++) {
                                        let keys = Object.keys(_event_.where.data[_event_.date[i]]);
                                        for (let i1 = 0; i1 < keys.length; i1++) {
                                            for (let i2 = 0; i2 < _event_.where.data[_event_.date[i]][keys[i1]].length; i2++) {
                                                for (let i3 = 0; i3 < _event_.where.data[_event_.date[i]][keys[i1]][i2].length; i3++) {
                                                    if (_event_.where.data[_event_.date[i]][keys[i1]][i2][i3].name === myNew.seats[x][0].name &&
                                                        myNew.seats[x][1].includes(_event_.date[i])&&
                                                        abc[_event_.where.name][keys[i1]] === myNew.seats[x][2]
                                                    ) {
                                                        _event_.where.data[_event_.date[i]][keys[i1]][i2][i3].status = 'sold'
                                                        _event_.where.data[_event_.date[i]][keys[i1]][i2][i3].color = 'red'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                _event_ = myNew.event
                            }

                            data = {
                                seats: myNew.seats,
                                hash: hash,
                                where: myNew.event.where.name,
                                user: myNew.user,
                                genre: myNew.event.genre,
                                image: myNew.event.image,
                                event: myNew.event.nameRu,
                                ticket: myConst.url + 'ticket/' + pdfname,
                                status: myNew.status,
                            }
                            await TicketBiletiki.addTicketBiletiki(data);
                            await EventBiletiki.setEventBiletiki(_event_, myNew.event._id);
                            res.send(myConst.url + 'ticket/' + pdfname)
                        } else {
                            await TicketBiletiki.setTicketBiletiki({status: myNew.status}, req.body.id)
                            await res.send(await TicketBiletiki.getTicketBiletiki(req.body.search, req.body.sort, req.body.skip))
                        }
                    }
                else if(req.body.name == 'Билеты кино') {
                        if(req.body.id==undefined){
                            let hash = randomstring.generate({length: 12, charset: 'numeric'});
                            while (!await TicketCinemaBiletiki.checkHash(hash))
                                hash = randomstring.generate({length: 12, charset: 'numeric'});
                            let qrname = randomstring.generate(5) + myNew.user + myNew.seance._id+'.png';
                            let pdfname = qrname.replace('.png','.pdf');
                            let qrpath = path.join(app.dirname, 'public', 'qr', qrname);
                            let fstream = fs.createWriteStream(qrpath);
                            let qrTicket = await qr.image(hash, { type: 'png' });
                            let stream = qrTicket.pipe(fstream)
                            stream.on('finish', async () => {
                                try{
                                    let doc = new PDFDocument({
                                        size: [500, 200],
                                        margins : { // by default, all are 72
                                            top: 80,
                                            bottom:10,
                                            left: 10,
                                            right: 10
                                        }
                                    });
                                    let pdfpath = path.join(app.dirname, 'public', 'ticket', pdfname);
                                    let robotoBlack = path.join(app.dirname, 'public', 'font', 'roboto', 'NotoSans-Regular.ttf');
                                    doc.registerFont('NotoSans', robotoBlack);
                                    let fstream = fs.createWriteStream(pdfpath);
                                    doc.pipe(fstream);
                                    doc
                                        .font('NotoSans')
                                        .fontSize(18)
                                        .text(myNew.movie, 60, 30) // the text and the position where the it should come
                                    doc.image(qrpath, 360, 30, {fit: [100, 100]})
                                    doc.fontSize(12)
                                        .text(myNew.cinema+' '+myNew.hall, 50, 70) // the text and the position where the it should come
                                    for(let i = 0; i<myNew.seats.length; i++){
                                        let date = myNew.seats[i][1].split('T')[0].split('-')
                                        let time = myNew.seats[i][1].split('T')[1].split(':')
                                        let dateTime = date[2] + ' ' + myConst.month[date[1]] + ' ' + date[0] + ', ' + time[0] + ':' + time[1];
                                        doc
                                            .font('NotoSans')
                                            .fontSize(12)
                                            .text(dateTime+' Ряд '+myNew.seats[i][0]['name'].split(':')[0].split(' ')[1]+' Место '+myNew.seats[i][0]['name'].split(':')[1].split(' ')[0]+' Цена: '+myNew.seats[i][0]['price'] + ' сом', {width: doc.page.width - 100, align: 'justify'})
                                    }
                                    doc.end()
                                } catch(error) {
                                    console.error(error)
                                }})

                            data = {
                                seats: myNew.seats,
                                hash: hash,
                                user: myNew.user,
                                movie: myNew.movie,
                                cinema: myNew.cinema,
                                image: 'null',
                                hall: myNew.hall,
                                ticket: myConst.url + 'ticket/' + pdfname,
                                status: myNew.status,
                            }
                            await TicketCinemaBiletiki.addTicketCinemaBiletiki(data);
                            await SeanceBiletiki.setSeanceBiletiki(myNew.seance, myNew.seance._id);
                        } else {
                            await TicketCinemaBiletiki.setTicketCinemaBiletiki({status: myNew.status}, req.body.id)
                        }
                        await res.send(await TicketCinemaBiletiki.getTicketCinemaBiletiki(req.body.search, req.body.sort, req.body.skip))
                    }
            });
        }
        })
});

module.exports = router;
