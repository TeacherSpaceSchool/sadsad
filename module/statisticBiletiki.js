const TicketBiletiki = require('../models/ticketBiletiki');
const EventBiletiki = require('../models/eventBiletiki');
const UserBiletiki = require('../models/userBiletiki');
const TicketCinemaBiletiki = require('../models/ticketCinemaBiletiki');
const MovieBiletiki = require('../models/movieBiletiki');

const getCinemaStatisticMovieBiletiki = async () => {
    try{
        let data = [], count, movies;
        const row = [
            'кино',
            'проданно',
            'возврат',
            'использованно',
            'прибыль'
        ];
        movies = await MovieBiletiki.find().distinct('name');
        count = movies.length;
        for(let i = 0; i<movies.length; i++) {
            let sold = await TicketCinemaBiletiki.count({status: 'продан', movie: movies[i]})
            let returned = await TicketCinemaBiletiki.count({status: 'возвращен', movie: movies[i]})
            let used = await TicketCinemaBiletiki.count({status: 'использован', movie: movies[i]})
            let ticketSoldAndReturned = await TicketCinemaBiletiki.find({$or: [{status: 'использован'}, {status: 'продан'}], movie: movies[i]});
            let cash = 0
            for(let i = 0; i<ticketSoldAndReturned.length; i++){
                if(ticketSoldAndReturned[i].status==='использован'||ticketSoldAndReturned[i].status==='продан'){
                    for(let i1 = 0; i1<ticketSoldAndReturned[i].seats.length; i1++){
                        if(ticketSoldAndReturned[i].seats[i1].priceSelect===undefined)
                            ticketSoldAndReturned[i].seats[i1].priceSelect=0
                        cash+=parseInt(ticketSoldAndReturned[i].seats[i1].priceSelect);
                    }
                }
            }
            data.push([movies[i], sold, returned, used, cash]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const getCinemaStatisticCinemaBiletiki = async () => {
    try{
        let data = [], count, cinemas;
        const row = [
            'кинотеатр',
            'проданно',
            'возврат',
            'использованно',
            'прибыль'
        ];
        cinemas = await UserBiletiki.find({status: 'active', role: 'cinema'}).distinct('name')
        count = cinemas.length;
        for(let i = 0; i<cinemas.length; i++) {
            let sold = await TicketCinemaBiletiki.count({status: 'продан', cinema: cinemas[i]})
            let returned = await TicketCinemaBiletiki.count({status: 'возвращен', cinema: cinemas[i]})
            let used = await TicketCinemaBiletiki.count({status: 'использован', cinema: cinemas[i]})
            let ticketSoldAndReturned = await TicketCinemaBiletiki.find({$or: [{status: 'использован'}, {status: 'продан'}], cinema: cinemas[i]});
            let cash = 0
            for(let i = 0; i<ticketSoldAndReturned.length; i++){
                if(ticketSoldAndReturned[i].status==='использован'||ticketSoldAndReturned[i].status==='продан'){
                    for(let i1 = 0; i1<ticketSoldAndReturned[i].seats.length; i1++){
                        if(ticketSoldAndReturned[i].seats[i1].priceSelect===undefined)
                            ticketSoldAndReturned[i].seats[i1].priceSelect=0
                        cash+=parseInt(ticketSoldAndReturned[i].seats[i1].priceSelect);
                    }
                }
            }
            data.push([cinemas[i], sold, returned, used, cash]);
        }
        return ({data: data, count: count, row: row})
    } catch(error) {
        console.error(error)
    }
}

const getGenreStatisticBiletiki = async () => {
    try{
        let data = [], count, genres;
        const row = [
            'жанр',
            'проданно',
            'возврат',
            'использованно',
            'прибыль'
        ];
        genres = ['Концерт', 'Театр', 'Кино', 'Детям', 'Спорт', 'Туризм', 'Развитие']
        count = genres.length;
        for(let i = 0; i<genres.length; i++) {
            let sold = await TicketBiletiki.find({status: 'продан', genre: genres[i]})
            sold = sold.length
            let returned = await TicketBiletiki.find({status: 'возвращен', genre: genres[i]})
            returned = returned.length
            let used = await TicketBiletiki.find({status: 'использован', genre: genres[i]})
            used = used.length
            let ticketSoldAndReturned = await TicketBiletiki.find({$or: [{status: 'использован'}, {status: 'продан'}], genre: genres[i]});
            let cash = 0
            for(let i = 0; i<ticketSoldAndReturned.length; i++){
                if(ticketSoldAndReturned[i].status==='использован'||ticketSoldAndReturned[i].status==='продан'){
                    for(let i1 = 0; i1<ticketSoldAndReturned[i].seats.length; i1++){
                        if(!(ticketSoldAndReturned[i].seats[i1][0]===undefined||ticketSoldAndReturned[i].seats[i1][0].price===undefined))
                            cash+=parseInt(ticketSoldAndReturned[i].seats[i1][0].price);
                    }
                }
            }
            data.push([genres[i], sold, returned, used, cash]);
        }
        let sold = await TicketCinemaBiletiki.count({status: 'продан'})
        let returned = await TicketCinemaBiletiki.count({status: 'возвращен'})
        let used = await TicketCinemaBiletiki.count({status: 'использован'})
        let ticketSoldAndReturned = await TicketCinemaBiletiki.find({$or: [{status: 'использован'}, {status: 'продан'}]})
        let cash = 0
        for(let i = 0; i<ticketSoldAndReturned.length; i++){
            if(ticketSoldAndReturned[i].status==='использован'||ticketSoldAndReturned[i].status==='продан'){
                for(let i1 = 0; i1<ticketSoldAndReturned[i].seats.length; i1++){
                    if(ticketSoldAndReturned[i].seats[i1].priceSelect===undefined)
                        ticketSoldAndReturned[i].seats[i1].priceSelect=0
                    cash+=parseInt(ticketSoldAndReturned[i].seats[i1].priceSelect);
                }
            }
        }
        data.push(['Кинотеатр', sold, returned, used, cash]);
        console.log(data)
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const getEventStatisticBiletiki = async (search, sort, skip) => {
    try{
        let data = [], count, events;
        const row = [
            'событие',
            'проданно',
            'возврат',
            'использованно',
            'прибыль'
        ];
        count = await EventBiletiki.count({});
        events = await EventBiletiki.find({nameRu: {'$regex': search, '$options': 'i'}}).select('nameRu _id').sort('updatedAt').skip(parseInt(skip)).limit(10);
        for(let i = 0; i<events.length; i++){
            let event = events[i].nameRu

            let sold = await TicketBiletiki.count({event: events[i].nameRu, status: 'продан'})
            let returned = await TicketBiletiki.count({event: events[i].nameRu, status: 'возвращен'})
            let used = await TicketBiletiki.count({event: events[i].nameRu, status: 'использован'})
            let cash = 0
            let ticketSoldAndReturned = await TicketBiletiki.find({event: events[i].nameRu, $or: [{status: 'использован'}, {status: 'продан'}]});
            for(let i = 0; i<ticketSoldAndReturned.length; i++){
                if(ticketSoldAndReturned[i].status==='использован'||ticketSoldAndReturned[i].status==='продан'){
                    for(let i1 = 0; i1<ticketSoldAndReturned[i].seats.length; i1++){
                            if(!(ticketSoldAndReturned[i].seats[i1][0]===undefined||ticketSoldAndReturned[i].seats[i1][0].price===undefined))
                            cash+=parseInt(ticketSoldAndReturned[i].seats[i1][0].price);
                    }
                }
            }
            data.push([event, sold, returned, used, cash]);
        }
       return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const getUserStatisticBiletiki = async (search, sort, skip) => {
    try{
        let data = [], count, users;
        const row = [
            'пользователь',
            'купил',
            'возвратил',
            'использовал',
            'Концерт',
            'Театр',
            'Кино',
            'Детям',
            'Спорт',
            'Туризм',
            'Развитие'
        ];
        count = await UserBiletiki.count();
        users = await UserBiletiki.find({email: {'$regex': search, '$options': 'i'}}).select('email _id').sort('updatedAt').skip(parseInt(skip)).limit(10);
        for(let i = 0; i<users.length; i++){
            let user = users[i].email+'\n'+users[i]._id
            let sold = await TicketBiletiki.count({user: users[i]._id, status: 'продан'})
            sold += await TicketCinemaBiletiki.count({user: users[i]._id, status: 'продан'})
            let returned = await TicketBiletiki.count({user: users[i]._id, status: 'возвращен'})
            returned += await TicketCinemaBiletiki.count({user: users[i]._id, status: 'возвращен'})
            let used = await TicketBiletiki.count({user: users[i]._id, status: 'использован'})
            used += await TicketCinemaBiletiki.count({user: users[i]._id, status: 'использован'})

            let sold1 = await TicketBiletiki.find({user: users[i]._id, status: 'продан', genre: 'Концерт'})
            sold1 = sold1.length
            let sold11 = await TicketBiletiki.find({user: users[i]._id, status: 'использован', genre: 'Концерт'})
            sold1 += sold11.length

            let sold2 = await TicketBiletiki.find({user: users[i]._id, status: 'продан', genre: 'Театр'})
            sold2 = sold2.length
            let sold22 = await TicketBiletiki.find({user: users[i]._id, status: 'использован', genre: 'Театр'})
            sold2 += sold22.length

            let sold3 = await TicketBiletiki.find({user: users[i]._id, status: 'продан', genre: 'Кино'})
            sold3 = sold3.length
            let sold33 = await TicketBiletiki.find({user: users[i]._id, status: 'использован', genre: 'Кино'})
            sold3 += sold33.length

            let sold4 = await TicketBiletiki.find({user: users[i]._id, status: 'продан', genre: 'Детям'})
            sold4 = sold4.length
            let sold44 =  await TicketBiletiki.find({user: users[i]._id, status: 'использован', genre: 'Детям'})
            sold4 +=  sold44.length

            let sold5 = await TicketBiletiki.find({user: users[i]._id, status: 'продан', genre: 'Спорт'})
            sold5 = sold5.length
            let sold55 = await TicketBiletiki.find({user: users[i]._id, status: 'использован', genre: 'Спорт'})
            sold5 += sold55.length

            let sold6 = await TicketBiletiki.find({user: users[i]._id, status: 'продан', genre: 'Туризм'})
            sold6 = sold6.length
            let sold66 = await TicketBiletiki.find({user: users[i]._id, status: 'использован', genre: 'Туризм'})
            sold6 += sold66.length

            let sold7 = await TicketBiletiki.find({user: users[i]._id, status: 'продан', genre: 'Развитие'})
            sold7 = sold7.length
            let sold77 = await TicketBiletiki.find({user: users[i]._id, status: 'использован', genre: 'Развитие'})
            sold7 += sold77.length

            data.push([user, sold, returned, used, sold1, sold2, sold3, sold4, sold5, sold6, sold7]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const getOrganizatorStatisticBiletiki = async (search, sort, skip) => {
    try{
        let data = [], count, users;
        const row = [
            'пользователь',
            'купил',
            'возвратил',
            'использовал',
            'Концерт',
            'Театр',
            'Кино',
            'Детям',
            'Спорт',
            'Туризм',
            'Развитие'
        ];
        count = await UserBiletiki.count({role: 'organizator'});
        users = await UserBiletiki.find({role: 'organizator', email: {'$regex': search, '$options': 'i'}}).select('email _id').sort('updatedAt').skip(parseInt(skip)).limit(10);
        for(let i = 0; i<users.length; i++){
            let user = users[i].email+'\n'+users[i]._id
            let sold = await TicketBiletiki.count({user: users[i]._id, status: 'продан'})
            sold += await TicketCinemaBiletiki.count({user: users[i]._id, status: 'продан'})
            let returned = await TicketBiletiki.count({user: users[i]._id, status: 'возвращен'})
            returned += await TicketCinemaBiletiki.count({user: users[i]._id, status: 'возвращен'})
            let used = await TicketBiletiki.count({user: users[i]._id, status: 'использован'})
            used += await TicketCinemaBiletiki.count({user: users[i]._id, status: 'использован'})

            let sold1 = await TicketBiletiki.find({user: users[i]._id, status: 'продан', genre: 'Концерт'})
            sold1 = sold1.length
            let sold11 = await TicketBiletiki.find({user: users[i]._id, status: 'использован', genre: 'Концерт'})
            sold1 += sold11.length

            let sold2 = await TicketBiletiki.find({user: users[i]._id, status: 'продан', genre: 'Театр'})
            sold2 = sold2.length
            let sold22 = await TicketBiletiki.find({user: users[i]._id, status: 'использован', genre: 'Театр'})
            sold2 += sold22.length

            let sold3 = await TicketBiletiki.find({user: users[i]._id, status: 'продан', genre: 'Кино'})
            sold3 = sold3.length
            let sold33 = await TicketBiletiki.find({user: users[i]._id, status: 'использован', genre: 'Кино'})
            sold3 += sold33.length

            let sold4 = await TicketBiletiki.find({user: users[i]._id, status: 'продан', genre: 'Детям'})
            sold4 = sold4.length
            let sold44 =  await TicketBiletiki.find({user: users[i]._id, status: 'использован', genre: 'Детям'})
            sold4 +=  sold44.length

            let sold5 = await TicketBiletiki.find({user: users[i]._id, status: 'продан', genre: 'Спорт'})
            sold5 = sold5.length
            let sold55 = await TicketBiletiki.find({user: users[i]._id, status: 'использован', genre: 'Спорт'})
            sold5 += sold55.length

            let sold6 = await TicketBiletiki.find({user: users[i]._id, status: 'продан', genre: 'Туризм'})
            sold6 = sold6.length
            let sold66 = await TicketBiletiki.find({user: users[i]._id, status: 'использован', genre: 'Туризм'})
            sold6 += sold66.length

            let sold7 = await TicketBiletiki.find({user: users[i]._id, status: 'продан', genre: 'Развитие'})
            sold7 = sold7.length
            let sold77 = await TicketBiletiki.find({user: users[i]._id, status: 'использован', genre: 'Развитие'})
            sold7 += sold77.length

            data.push([user, sold, returned, used, sold1, sold2, sold3, sold4, sold5, sold6, sold7]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const getOrganizatorStatisticBiletiki1 = async (search, sort, skip, user) => {
    try{
        let data = [], count, users;
        const row = [
            'пользователь',
            'купил',
            'возвратил',
            'использовал',
            'Концерт',
            'Театр',
            'Кино',
            'Детям',
            'Спорт',
            'Туризм',
            'Развитие'
        ];
        count = 1
        users = [user];
        for(let i = 0; i<users.length; i++){
            let user = users[i].email+'\n'+users[i]._id
            let sold = await TicketBiletiki.count({user: users[i]._id, status: 'продан'})
            sold += await TicketCinemaBiletiki.count({user: users[i]._id, status: 'продан'})
            let returned = await TicketBiletiki.count({user: users[i]._id, status: 'возвращен'})
            returned += await TicketCinemaBiletiki.count({user: users[i]._id, status: 'возвращен'})
            let used = await TicketBiletiki.count({user: users[i]._id, status: 'использован'})
            used += await TicketCinemaBiletiki.count({user: users[i]._id, status: 'использован'})

            let sold1 = await TicketBiletiki.find({user: users[i]._id, status: 'продан', genre: 'Концерт'})
            sold1 = sold1.length
            let sold11 = await TicketBiletiki.find({user: users[i]._id, status: 'использован', genre: 'Концерт'})
            sold1 += sold11.length

            let sold2 = await TicketBiletiki.find({user: users[i]._id, status: 'продан', genre: 'Театр'})
            sold2 = sold2.length
            let sold22 = await TicketBiletiki.find({user: users[i]._id, status: 'использован', genre: 'Театр'})
            sold2 += sold22.length

            let sold3 = await TicketBiletiki.find({user: users[i]._id, status: 'продан', genre: 'Кино'})
            sold3 = sold3.length
            let sold33 = await TicketBiletiki.find({user: users[i]._id, status: 'использован', genre: 'Кино'})
            sold3 += sold33.length

            let sold4 = await TicketBiletiki.find({user: users[i]._id, status: 'продан', genre: 'Детям'})
            sold4 = sold4.length
            let sold44 =  await TicketBiletiki.find({user: users[i]._id, status: 'использован', genre: 'Детям'})
            sold4 +=  sold44.length

            let sold5 = await TicketBiletiki.find({user: users[i]._id, status: 'продан', genre: 'Спорт'})
            sold5 = sold5.length
            let sold55 = await TicketBiletiki.find({user: users[i]._id, status: 'использован', genre: 'Спорт'})
            sold5 += sold55.length

            let sold6 = await TicketBiletiki.find({user: users[i]._id, status: 'продан', genre: 'Туризм'})
            sold6 = sold6.length
            let sold66 = await TicketBiletiki.find({user: users[i]._id, status: 'использован', genre: 'Туризм'})
            sold6 += sold66.length

            let sold7 = await TicketBiletiki.find({user: users[i]._id, status: 'продан', genre: 'Развитие'})
            sold7 = sold7.length
            let sold77 = await TicketBiletiki.find({user: users[i]._id, status: 'использован', genre: 'Развитие'})
            sold7 += sold77.length

            data.push([user, sold, returned, used, sold1, sold2, sold3, sold4, sold5, sold6, sold7]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

module.exports.getOrganizatorStatisticBiletiki = getOrganizatorStatisticBiletiki;
module.exports.getOrganizatorStatisticBiletiki1 = getOrganizatorStatisticBiletiki1;
module.exports.getGenreStatisticBiletiki = getGenreStatisticBiletiki;
module.exports.getUserStatisticBiletiki = getUserStatisticBiletiki;
module.exports.getEventStatisticBiletiki = getEventStatisticBiletiki;
module.exports.getCinemaStatisticCinemaBiletiki = getCinemaStatisticCinemaBiletiki;
module.exports.getCinemaStatisticMovieBiletiki = getCinemaStatisticMovieBiletiki;