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
            'отмена',
            'прибыль'
        ];
        movies = await MovieBiletiki.find().distinct('name');
        count = movies.length;
        for(let i = 0; i<movies.length; i++) {
            let sold = await TicketCinemaBiletiki.count({$or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], movie: movies[i]})
            let cancel = await TicketCinemaBiletiki.count({status: 'отмена', movie: movies[i]})
            let ticketSoldAndReturned = await TicketCinemaBiletiki.find({$or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], movie: movies[i]});
            let cash = 0
            for(let i = 0; i<ticketSoldAndReturned.length; i++){
                    for(let i1 = 0; i1<ticketSoldAndReturned[i].seats.length; i1++){
                        if(ticketSoldAndReturned[i].seats[i1].priceSelect===undefined)
                            ticketSoldAndReturned[i].seats[i1].priceSelect=0
                        cash+=parseInt(ticketSoldAndReturned[i].seats[i1].priceSelect);
                    }
            }
            data.push([movies[i], sold, cancel, cash]);
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
            'отмена',
            'прибыль'
        ];
        cinemas = await UserBiletiki.find({status: 'active', role: 'cinema'}).distinct('name')
        count = cinemas.length;
        for(let i = 0; i<cinemas.length; i++) {
            let sold = await TicketCinemaBiletiki.count({$or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], cinema: cinemas[i]})
            let cancel = await TicketCinemaBiletiki.count({status: 'отмена', cinema: cinemas[i]})
            let ticketSoldAndReturned = await TicketCinemaBiletiki.find({$or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], cinema: cinemas[i]});
            let cash = 0
            for(let i = 0; i<ticketSoldAndReturned.length; i++){
                    for(let i1 = 0; i1<ticketSoldAndReturned[i].seats.length; i1++){
                        if(ticketSoldAndReturned[i].seats[i1].priceSelect===undefined)
                            ticketSoldAndReturned[i].seats[i1].priceSelect=0
                        cash+=parseInt(ticketSoldAndReturned[i].seats[i1].priceSelect);
                    }
            }
            data.push([cinemas[i], sold, cancel, cash]);
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
            'отмена',
            'прибыль'
        ];
        genres = ['Концерт', 'Театр', 'Кино', 'Детям', 'Спорт', 'Туризм', 'Развитие']
        count = genres.length;
        for(let i = 0; i<genres.length; i++) {
            let sold = await TicketBiletiki.find({$or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], genre: genres[i]})
            sold = sold.length
            let canceled = await TicketBiletiki.find({status: 'отмена', genre: genres[i]})
            canceled = canceled.length
            let ticketSoldAndReturned = await TicketBiletiki.find({$or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], genre: genres[i]});
            let cash = 0
            for(let i = 0; i<ticketSoldAndReturned.length; i++){
                    for(let i1 = 0; i1<ticketSoldAndReturned[i].seats.length; i1++){
                        if(!(ticketSoldAndReturned[i].seats[i1][0]===undefined||ticketSoldAndReturned[i].seats[i1][0].price===undefined))
                            cash+=parseInt(ticketSoldAndReturned[i].seats[i1][0].price);
                    }
            }
            data.push([genres[i], sold, canceled, cash]);
        }
        let sold = await TicketCinemaBiletiki.count({$or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}]})
        let canceled = await TicketCinemaBiletiki.count({status: 'отмена'})
        let ticketSoldAndReturned = await TicketCinemaBiletiki.find({$or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}]})
        let cash = 0
        for(let i = 0; i<ticketSoldAndReturned.length; i++){
                for(let i1 = 0; i1<ticketSoldAndReturned[i].seats.length; i1++){
                    if(ticketSoldAndReturned[i].seats[i1].priceSelect===undefined)
                        ticketSoldAndReturned[i].seats[i1].priceSelect=0
                    cash+=parseInt(ticketSoldAndReturned[i].seats[i1].priceSelect);
                }
        }
        data.push(['Кинотеатр', sold, canceled, cash]);
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
            'отмена',
            'прибыль'
        ];
        count = await EventBiletiki.count({});
        events = await EventBiletiki.find({nameRu: {'$regex': search, '$options': 'i'}}).select('nameRu _id').sort('updatedAt').skip(parseInt(skip)).limit(10);
        for(let i = 0; i<events.length; i++){
            let event = events[i].nameRu

            let sold = await TicketBiletiki.count({event: events[i].nameRu, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}]})
            let cancel = await TicketBiletiki.count({event: events[i].nameRu, status: 'отмена'})
            let cash = 0
            let ticketSoldAndReturned = await TicketBiletiki.find({event: events[i].nameRu, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}]});
            for(let i = 0; i<ticketSoldAndReturned.length; i++){
                    for(let i1 = 0; i1<ticketSoldAndReturned[i].seats.length; i1++){
                            if(!(ticketSoldAndReturned[i].seats[i1][0]===undefined||ticketSoldAndReturned[i].seats[i1][0].price===undefined))
                            cash+=parseInt(ticketSoldAndReturned[i].seats[i1][0].price);
                    }
            }
            data.push([event, sold, cancel, cash]);
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
            'прибыль',
            'купил',
            'отмена',
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
            let cash = 0

            let ticketSoldAndReturned = await TicketBiletiki.find({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}]});
            for(let i = 0; i<ticketSoldAndReturned.length; i++){
                    for(let i1 = 0; i1<ticketSoldAndReturned[i].seats.length; i1++){
                        if(!(ticketSoldAndReturned[i].seats[i1][0]===undefined||ticketSoldAndReturned[i].seats[i1][0].price===undefined))
                            cash+=parseInt(ticketSoldAndReturned[i].seats[i1][0].price);
                    }
            }

            let sold = await TicketBiletiki.count({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}]})
            sold += await TicketCinemaBiletiki.count({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}]})
            let cancel = await TicketBiletiki.count({user: users[i]._id, status: 'отмена'})
            cancel += await TicketCinemaBiletiki.count({user: users[i]._id, status: 'отмена'})

            let sold1 = await TicketBiletiki.find({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], genre: 'Концерт'})
            sold1 = sold1.length

            let sold2 = await TicketBiletiki.find({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], genre: 'Театр'})
            sold2 = sold2.length

            let sold3 = await TicketBiletiki.find({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], genre: 'Кино'})
            sold3 = sold3.length

            let sold4 = await TicketBiletiki.find({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], genre: 'Детям'})
            sold4 = sold4.length

            let sold5 = await TicketBiletiki.find({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], genre: 'Спорт'})
            sold5 = sold5.length

            let sold6 = await TicketBiletiki.find({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], genre: 'Туризм'})
            sold6 = sold6.length

            let sold7 = await TicketBiletiki.find({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], genre: 'Развитие'})
            sold7 = sold7.length

            data.push([user, cash, sold, cancel, sold1, sold2, sold3, sold4, sold5, sold6, sold7]);
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
            'прибыль',
            'купил',
            'отмена',
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

            let cash = 0
            let ticketSoldAndReturned = await TicketBiletiki.find({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}]});
            for(let i = 0; i<ticketSoldAndReturned.length; i++){
                    for(let i1 = 0; i1<ticketSoldAndReturned[i].seats.length; i1++){
                        if(!(ticketSoldAndReturned[i].seats[i1][0]===undefined||ticketSoldAndReturned[i].seats[i1][0].price===undefined))
                            cash+=parseInt(ticketSoldAndReturned[i].seats[i1][0].price);
                    }
            }

            let sold = await TicketBiletiki.count({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}]})
            sold += await TicketCinemaBiletiki.count({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}]})
            let cancel = await TicketBiletiki.count({user: users[i]._id, status: 'отмена'})
            cancel += await TicketCinemaBiletiki.count({user: users[i]._id, status: 'отмена'})

            let sold1 = await TicketBiletiki.find({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], genre: 'Концерт'})
            sold1 = sold1.length

            let sold2 = await TicketBiletiki.find({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], genre: 'Театр'})
            sold2 = sold2.length

            let sold3 = await TicketBiletiki.find({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], genre: 'Кино'})
            sold3 = sold3.length

            let sold4 = await TicketBiletiki.find({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], genre: 'Детям'})
            sold4 = sold4.length

            let sold5 = await TicketBiletiki.find({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], genre: 'Спорт'})
            sold5 = sold5.length

            let sold6 = await TicketBiletiki.find({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], genre: 'Туризм'})
            sold6 = sold6.length

            let sold7 = await TicketBiletiki.find({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], genre: 'Развитие'})
            sold7 = sold7.length

            data.push([user, cash, sold, cancel, sold1, sold2, sold3, sold4, sold5, sold6, sold7]);
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
            'прибыль',
            'купил',
            'отмена',
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

            let cash = 0
            let ticketSoldAndReturned = await TicketBiletiki.find({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}]});
            for(let i = 0; i<ticketSoldAndReturned.length; i++){
                for(let i1 = 0; i1<ticketSoldAndReturned[i].seats.length; i1++){
                    if(!(ticketSoldAndReturned[i].seats[i1][0]===undefined||ticketSoldAndReturned[i].seats[i1][0].price===undefined))
                        cash+=parseInt(ticketSoldAndReturned[i].seats[i1][0].price);
                }
            }

            let user = users[i].email+'\n'+users[i]._id
            let sold = await TicketBiletiki.count({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}]})
            sold += await TicketCinemaBiletiki.count({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}]})
            let cancel = await TicketBiletiki.count({user: users[i]._id, status: 'отмена'})
            cancel += await TicketCinemaBiletiki.count({user: users[i]._id, status: 'отмена'})

            let sold1 = await TicketBiletiki.find({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], genre: 'Концерт'})
            sold1 = sold1.length

            let sold2 = await TicketBiletiki.find({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], genre: 'Театр'})
            sold2 = sold2.length

            let sold3 = await TicketBiletiki.find({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], genre: 'Кино'})
            sold3 = sold3.length

            let sold4 = await TicketBiletiki.find({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], genre: 'Детям'})
            sold4 = sold4.length

            let sold5 = await TicketBiletiki.find({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], genre: 'Спорт'})
            sold5 = sold5.length

            let sold6 = await TicketBiletiki.find({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], genre: 'Туризм'})
            sold6 = sold6.length

            let sold7 = await TicketBiletiki.find({user: users[i]._id, $or: [{status: 'использован'}, {status: 'продан'}, {status: 'возвращен'}], genre: 'Развитие'})
            sold7 = sold7.length

            data.push([user, cash, sold, cancel, sold1, sold2, sold3, sold4, sold5, sold6, sold7]);
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