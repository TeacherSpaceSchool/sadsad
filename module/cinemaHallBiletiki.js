const CinemaHallBiletiki = require('../models/cinemaHallBiletiki')
const format = require('./const').stringifyDateTime


const getCinemaHallBiletiki1 = async (search, sort, skip, user) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'название',
            'кинотеатр',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        else if(sort[0]=='название'&&sort[1]=='descending')
            sort = '-name';
        else if(sort[0]=='название'&&sort[1]=='ascending')
            sort = 'name';
        else if(sort[0]=='кинотеатр'&&sort[1]=='descending')
            sort = '-user';
        else if(sort[0]=='кинотеатр'&&sort[1]=='ascending')
            sort = 'user';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        if(search == ''){
            count = await CinemaHallBiletiki.count();
            findResult = await CinemaHallBiletiki
                .find({user: user._id})
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('user updatedAt name _id')
                .populate({
                    path: 'user',
                    select: 'name'
                });
        } else {
            count = await CinemaHallBiletiki.count({
                $and: [
                    {user: user._id},
                    {
                        $or: [
                            {_id: {'$regex': search, '$options': 'i'}},
                            {name: {'$regex': search, '$options': 'i'}},
                        ]
                    }
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('user updatedAt name _id')
                .populate({
                    path: 'user',
                    select: 'name'
                });
            findResult = await CinemaHallBiletiki.find({
                $and: [
                    {user: user._id},
                    {
                        $or: [
                            {_id: {'$regex': search, '$options': 'i'}},
                            {name: {'$regex': search, '$options': 'i'}},
                        ]
                    }
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('user updatedAt name _id')
                .populate({
                    path: 'user',
                    select: 'name'
                });
        }
        for (let i=0; i<findResult.length; i++){
            let user = '';
            if(findResult[i].user !=undefined)
                user = findResult[i].user.name+'\n'+findResult[i].user._id
            data.push([findResult[i].name, user, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}


const getCinemaHallBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'название',
            'кинотеатр',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        else if(sort[0]=='название'&&sort[1]=='descending')
            sort = '-name';
        else if(sort[0]=='название'&&sort[1]=='ascending')
            sort = 'name';
        else if(sort[0]=='кинотеатр'&&sort[1]=='descending')
            sort = '-user';
        else if(sort[0]=='кинотеатр'&&sort[1]=='ascending')
            sort = 'user';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        if(search == ''){
            count = await CinemaHallBiletiki.count();
            findResult = await CinemaHallBiletiki
                .find()
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('user updatedAt name _id')
                .populate({
                    path: 'user',
                    select: 'name'
                });
        } else {
            findResult = await CinemaHallBiletiki.find({
                $or: [
                    {_id: {'$regex': search, '$options': 'i'}},
                    {name: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('user updatedAt name _id')
                .populate({
                    path: 'user',
                    select: 'name'
                });
        }
        for (let i=0; i<findResult.length; i++){
            let user = '';
           if(findResult[i].user !== null)
                user = findResult[i].user.name+'\n'+findResult[i].user._id
            data.push([findResult[i].name, user, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addCinemaHallBiletiki = async (object) => {
    try{
        let _object = new CinemaHallBiletiki(object);
        await CinemaHallBiletiki.create(_object);
    } catch(error) {
        console.error(error)
    }
}


const setCinemaHallBiletiki = async (object, id) => {
    try{
        await CinemaHallBiletiki.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteCinemaHallBiletiki = async (id) => {
    try{
        await CinemaHallBiletiki.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getCinemaHallBiletiki1 = getCinemaHallBiletiki1;
module.exports.deleteCinemaHallBiletiki = deleteCinemaHallBiletiki;
module.exports.getCinemaHallBiletiki = getCinemaHallBiletiki;
module.exports.setCinemaHallBiletiki = setCinemaHallBiletiki;
module.exports.addCinemaHallBiletiki = addCinemaHallBiletiki;
