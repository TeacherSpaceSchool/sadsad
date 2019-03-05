const LogoBiletiki = require('../models/logoBiletiki');
const format = require('./const').stringifyDateTime

const getOther = async () => {
    return {vertical: (await LogoBiletiki.findOne({name: 'vertical'})).image, square: (await LogoBiletiki.findOne({name: 'square'})).image, horizontal: (await LogoBiletiki.findOne({name: 'horizontal'})).image};
}

const getMain = async () => {
    return {kg: await LogoBiletiki.findOne({name: 'mainKG'}), ru: await LogoBiletiki.findOne({name: 'main'})}
}

const getClient = async () => {
    return await LogoBiletiki.find();
}

const getLogoBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'изображение',
            'имя',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        else if(sort[0]=='имя'&&sort[1]=='descending')
            sort = '-name';
        else if(sort[0]=='имя'&&sort[1]=='ascending')
            sort = 'name';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        if(search == ''){
            count = await LogoBiletiki.count();
            findResult = await LogoBiletiki
                .find()
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('image name updatedAt _id');
        } else {
            count = await LogoBiletiki.count({
                $or: [
                    {name: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await LogoBiletiki.find({
                $or: [
                    {name: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('image name updatedAt _id');
        }
        for (let i=0; i<findResult.length; i++){
            let image=findResult[i].image.toString();
            while(image.includes(',http://'))
                image = image.replace(',http://', '\nhttp://');
            data.push([image, findResult[i].name, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addLogoBiletiki = async (object) => {
    try{
            let _object = new LogoBiletiki(object);
            await LogoBiletiki.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setLogoBiletiki = async (object, id) => {
    try{
        await LogoBiletiki.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteLogoBiletiki = async (id) => {
    try{
        await LogoBiletiki.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getOther = getOther;
module.exports.getMain = getMain;
module.exports.getClient = getClient;
module.exports.deleteLogoBiletiki = deleteLogoBiletiki;
module.exports.getLogoBiletiki = getLogoBiletiki;
module.exports.setLogoBiletiki = setLogoBiletiki;
module.exports.addLogoBiletiki = addLogoBiletiki;