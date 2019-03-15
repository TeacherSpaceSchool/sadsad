const CheckVisaBiletiki = require('../models/checkVisaBiletiki');
const format = require('./const').stringifyDateTime ;

const getCheckVisaBiletiki = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'ссылка',
            'кошелек',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        if(search == ''){
            count = await CheckVisaBiletiki.count();
            findResult = await CheckVisaBiletiki
                .find()
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('wallet link updatedAt _id');
        } else {
            count = await CheckVisaBiletiki.count({
                $or: [
                    {wallet: {'$regex': search, '$options': 'i'}},
                ]
            });
            findResult = await CheckVisaBiletiki.find({
                $or: [
                    {wallet: {'$regex': search, '$options': 'i'}},
                ]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10)
                .select('wallet link updatedAt _id');
        }
        for (let i=0; i<findResult.length; i++){
            data.push([findResult[i].link, findResult[i].wallet, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

module.exports.getCheckVisaBiletiki = getCheckVisaBiletiki;
