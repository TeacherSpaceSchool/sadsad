const BillboardBiletiki = require('../models/billboardBiletiki');
const format = require('./const').stringifyDateTime ;


const getClient = async () => {
    let today = new Date();
    return await BillboardBiletiki.find({dateEnd: {$gte: today}, dateStart: {$lte: today}}).limit(30).populate({path: 'event'});
}

const getBillboardBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'фотографии',
            'имя',
            'событие',
            'дата начала',
            'дата окончания',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        else if(sort[0]=='имя'&&sort[1]=='descending')
            sort = '-name';
        else if(sort[0]=='имя'&&sort[1]=='ascending')
            sort = 'name';
        if(search == ''){
            count = await BillboardBiletiki.count();
            findResult = await BillboardBiletiki
                .find()
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('image name event dateStart dateEnd updatedAt _id')
                .populate({path: 'event', select: 'nameRu'});
        } else {
            count = await BillboardBiletiki.count({
                $or: [
                    {_id: {'$regex': search, '$options': 'i'}},
                    {name: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await BillboardBiletiki.find({
                $or: [
                    {_id: {'$regex': search, '$options': 'i'}},
                    {name: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('image name event dateStart dateEnd updatedAt _id')
                .populate({path: 'event', select: 'nameRu'});
        }
        for (let i=0; i<findResult.length; i++){
            let image=findResult[i].image.toString();
            while(image.includes(',http://'))
                image = image.replace(',http://', '\nhttp://');
            let event = '';
            if(findResult[i].event !=undefined)
                event = findResult[i].event.nameRu+'\n'+findResult[i].event._id
            data.push([image, findResult[i].name, event, format(findResult[i].dateStart), format(findResult[i].dateEnd), format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addBillboardBiletiki = async (object) => {
    try{
        let _object = new BillboardBiletiki(object);
        await BillboardBiletiki.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setBillboardBiletiki = async (object, id) => {
    try{
        await BillboardBiletiki.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteBillboardBiletiki = async (id) => {
    try{
        await BillboardBiletiki.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getClient = getClient;
module.exports.deleteBillboardBiletiki = deleteBillboardBiletiki;
module.exports.getBillboardBiletiki = getBillboardBiletiki;
module.exports.setBillboardBiletiki = setBillboardBiletiki;
module.exports.addBillboardBiletiki = addBillboardBiletiki;