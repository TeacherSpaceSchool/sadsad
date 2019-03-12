const MovieBiletiki = require('../models/movieBiletiki'), SeanceBiletiki = require('../models/seanceBiletiki')
const format = require('./const').stringifyDateTime

const getMovieByName = async (name) => {
    return await MovieBiletiki
        .findOne({name: name});
}

const getSoon = async () => {
    return await MovieBiletiki
        .find({type: 'скоро'});
}

const getNow = async (skip) => {
    return await MovieBiletiki
        .find({type: 'в прокате'})
        .sort('-updatedAt')
        .skip(parseInt(skip))
        .limit(16);
}

const getAll1 = async () => {
    return await MovieBiletiki
        .find({})
        .select('name _id');
}

const getAll = async () => {
    let id = await SeanceBiletiki
        .find({realDate: {$gte: new Date()}}).distinct('movie')
    return await MovieBiletiki
        .find({_id: {$in: id}})
        .select('name _id');
}

const getMovieBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'изображение',
            'название',
            'жанр',
            'тип',
            'продолжительность',
            'возраст',
            'премьера',
            'режиссеры',
            'актеры',
            'описание',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        else if(sort[0]=='название'&&sort[1]=='descending')
            sort = '-name';
        else if(sort[0]=='название'&&sort[1]=='ascending')
            sort = 'name';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        if(search == ''){
            count = await MovieBiletiki.count();
            findResult = await MovieBiletiki
                .find()
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('name typeVideo type genre description duration ageCategory premier producers actors video image updatedAt _id');
        } else {
            count = await MovieBiletiki.count({
                $or: [
                    {_id: {'$regex': search, '$options': 'i'}},
                    {name: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await MovieBiletiki.find({
                $or: [
                    {_id: {'$regex': search, '$options': 'i'}},
                    {name: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('name typeVideo type genre description duration ageCategory premier producers actors video image updatedAt _id');
        }
        for (let i=0; i<findResult.length; i++){
            let image=findResult[i].image.toString();
            while(image.includes(',http://'))
                image = image.replace(',http://', '\nhttp://');
            data.push([findResult[i].image,findResult[i].name,findResult[i].genre,findResult[i].type,findResult[i].duration,findResult[i].ageCategory, findResult[i].premier, findResult[i].producers,findResult[i].actors, findResult[i].description, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addMovieBiletiki = async (object) => {
    try{
        let _object = new MovieBiletiki(object);
        await MovieBiletiki.create(_object);
    } catch(error) {
        console.error(error)
    }
}


const setMovieBiletiki = async (object, id) => {
    try{
        await MovieBiletiki.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteMovieBiletiki = async (id) => {
    try{
        await MovieBiletiki.deleteMany({_id: {$in: id}});
        await SeanceBiletiki.deleteMany({movie: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getMovieByName = getMovieByName;
module.exports.getSoon = getSoon;
module.exports.getNow = getNow;
module.exports.getAll1 = getAll1;
module.exports.getAll = getAll;
module.exports.deleteMovieBiletiki = deleteMovieBiletiki;
module.exports.getMovieBiletiki = getMovieBiletiki;
module.exports.setMovieBiletiki = setMovieBiletiki;
module.exports.addMovieBiletiki = addMovieBiletiki;
