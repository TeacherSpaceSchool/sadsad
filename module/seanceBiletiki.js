const SeanceBiletiki = require('../models/seanceBiletiki');
const format = require('./const').stringifyDateTime

const getSeanceByDate = async (movie, user, realDate) => {
    return await SeanceBiletiki.findOne({movie: movie, cinema: user, realDate: realDate})
}

const getSeanceHallByDate = async (movie, realDate) => {
    let yesterday = realDate.split('T')[0]+'T00:00:00.000Z'
    yesterday = new Date(yesterday)
    let tomorrow = realDate.split('T')[0]+'T00:00:00.000Z'
    tomorrow = new Date(tomorrow)
    tomorrow.setDate(tomorrow.getDate() + 1)
    let cinemas = await SeanceBiletiki.find({movie: movie, $and: [{realDate: {$gte: yesterday}}, {realDate: {$lte: tomorrow}}]}).distinct('cinema')
    let seanceHall = []
    for(let i=0; i<cinemas.length; i++) {
        seanceHall[i] = {name: cinemas[i]}
        seanceHall[i].seance = await SeanceBiletiki.find({cinema: cinemas[i], movie: movie, $and: [{realDate: {$gte: yesterday}}, {realDate: {$lte: tomorrow}}]}).sort('realDate')
    }
    return seanceHall

}

const getSeanceTimes = async (movie, user) => {
    let tomorrow = new Date()
    return await SeanceBiletiki.find({realDate: {$gte: tomorrow}, movie: movie, cinema: {'$regex': user, '$options': 'i'}}).sort('realDate').distinct('realDate')
}

const getSeanceBiletiki1 = async (search, sort, skip, cinema) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'дата',
            'кино',
            'цена',
            'места',
            'кинотеатр',
            'тип',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        else if(sort[0]=='название'&&sort[1]=='descending')
            sort = '-nameRu';
        else if(sort[0]=='название'&&sort[1]=='ascending')
            sort = 'nameRu';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        if(search == ''){
            count = await SeanceBiletiki.count({cinema: {'$regex': cinema, '$options': 'i'}});
            findResult = await SeanceBiletiki
                .find({cinema: {'$regex': cinema, '$options': 'i'}})
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('realDate movie price type seats cinema updatedAt _id')
                .populate({
                    path: 'movie',
                    select: 'name'
                });
        } else {
            count = await SeanceBiletiki.count({cinema: {'$regex': cinema, '$options': 'i'}});
            findResult = await SeanceBiletiki
                .find({cinema: {'$regex': cinema, '$options': 'i'}})
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('realDate movie price type seats cinema updatedAt _id')
                .populate({
                    path: 'movie',
                    select: 'name'
                });
        }
        for (let i=0; i<findResult.length; i++){
            let seats = ''
            if(findResult[i].seats!=undefined){
                seats = findResult[i].seats
            }
            let type = ''
            if(findResult[i].type!=undefined)
                type = findResult[i].type
            data.push([format(findResult[i].realDate), findResult[i].movie.name+'\n'+findResult[i].movie._id, findResult[i].price, JSON.stringify(seats), findResult[i].cinema, type, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const getSeanceBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'дата',
            'кино',
            'цена',
            'места',
            'кинотеатр',
            'тип',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        else if(sort[0]=='название'&&sort[1]=='descending')
            sort = '-nameRu';
        else if(sort[0]=='название'&&sort[1]=='ascending')
            sort = 'nameRu';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        if(search == ''){
            count = await SeanceBiletiki.count();
            findResult = await SeanceBiletiki
                .find()
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('realDate movie type price seats cinema updatedAt _id')
                .populate({
                    path: 'movie',
                    select: 'name'
                });
        } else {
            count = await SeanceBiletiki.count();
            findResult = await SeanceBiletiki.find()
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('realDate movie type price seats cinema updatedAt _id')
                .populate({
                    path: 'movie',
                    select: 'name'
                });
        }
        for (let i=0; i<findResult.length; i++){
            let seats = ''
            if(findResult[i].seats!=undefined){
                seats = findResult[i].seats
            }
            let movie = ''
            if(findResult[i].movie!=undefined)
                movie = findResult[i].movie.name+'\n'+findResult[i].movie._id
            let type = ''
            if(findResult[i].type!=undefined)
                type = findResult[i].type
            data.push([format(findResult[i].realDate), movie, findResult[i].price, JSON.stringify(seats), findResult[i].cinema, type, format( findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addSeanceBiletiki = async (object) => {
    try{
        let _object = new SeanceBiletiki(object);
        await SeanceBiletiki.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setSeanceBiletiki = async (object, id) => {
    try{
        await SeanceBiletiki.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteSeanceBiletiki = async (id) => {
    try{
        await SeanceBiletiki.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}
module.exports.getSeanceBiletiki1 = getSeanceBiletiki1;
module.exports.getSeanceHallByDate = getSeanceHallByDate;
module.exports.getSeanceByDate = getSeanceByDate;
module.exports.getSeanceTimes = getSeanceTimes;
module.exports.deleteSeanceBiletiki = deleteSeanceBiletiki;
module.exports.getSeanceBiletiki = getSeanceBiletiki;
module.exports.setSeanceBiletiki = setSeanceBiletiki;
module.exports.addSeanceBiletiki = addSeanceBiletiki;