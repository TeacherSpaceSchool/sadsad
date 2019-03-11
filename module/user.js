
const UserBiletiki = require('../models/userBiletiki');
const WhereBiletiki = require('../models/whereBiletiki');
let adminId = '';
const adminLogin = require('./const').adminLogin,
    adminPass = require('./const').adminPass;

let getAdminId = () => {
    return adminId
}

let checkAdmin = async (role, status) => {
    return (role=='admin'&&status=='active')
}

let createAdmin = async () => {
    try{
        let findAdmin = await UserBiletiki.findOne({email: adminLogin});
        if(findAdmin==null){
            let _user = new UserBiletiki({
                email: adminLogin,
                role: 'admin',
                status: 'active',
                password: adminPass,
            });
            findAdmin = await UserBiletiki.create(_user);
         }
        adminId = findAdmin._id.toString();
        findAdmin = await UserBiletiki.findOne({name: 'KinoBox'});
        if(findAdmin==null){
            let _user = new UserBiletiki({
                email: 'KinoBox',
                name: 'KinoBox',
                surname: 'KinoBox',
                phonenumber: '',
                role: 'cinema',
                status: 'active',
                password: '12345678',
            });
            await UserBiletiki.create(_user);
        }
        findAdmin = await UserBiletiki.findOne({name: 'Нур Синема'});
        if(findAdmin==null){
            let _user = new UserBiletiki({
                email: 'NurCinema',
                name: 'Нур Синема',
                surname: 'Нур Синема',
                phonenumber: '',
                role: 'cinema',
                status: 'active',
                password: '12345678',
            });
            await UserBiletiki.create(_user);
        }
        findAdmin = await UserBiletiki.findOne({name: 'Россия'});
        if(findAdmin==null){
            let _user = new UserBiletiki({
                email: 'Russia',
                name: 'Россия',
                surname: 'Россия',
                phonenumber: '',
                role: 'cinema',
                status: 'active',
                password: '12345678',
            });
            await UserBiletiki.create(_user);
        }
        findAdmin = await UserBiletiki.findOne({name: 'Манас'});
        if(findAdmin==null){
            let _user = new UserBiletiki({
                email: 'Manas',
                name: 'Манас',
                surname: 'Манас',
                phonenumber: '',
                role: 'cinema',
                status: 'active',
                password: '12345678',
            });
            await UserBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Национальный Центр детей и юношества "Сейтек"'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Национальный Центр детей и юношества "Сейтек"',
                nameKg:  'Национальный Центр детей и юношества "Сейтек"',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '*',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Киргизский национальный академический театр оперы и балета им. Абдыласа Малдыбаева'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Киргизский национальный академический театр оперы и балета им. Абдыласа Малдыбаева',
                nameKg:  'Киргизский национальный академический театр оперы и балета им. Абдыласа Малдыбаева',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '*',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Кыргызская Государственная Филармония - Малый зал'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Кыргызская Государственная Филармония - Малый зал',
                nameKg:  'Кыргызская Государственная Филармония - Малый зал',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '*',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Кыргызская Государственная Филармония'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Кыргызская Государственная Филармония',
                nameKg:  'Кыргызская Государственная Филармония',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '*',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Русский драм театр им. Ч.Айтматова'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Русский драм театр им. Ч.Айтматова',
                nameKg:  'Русский драм театр им. Ч.Айтматова',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '*',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Кыргызский государственный цирк им. А. Изибаева'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Кыргызский государственный цирк им. А. Изибаева',
                nameKg:  'Кыргызский государственный цирк им. А. Изибаева',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '*',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Цирк Шапито'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Цирк Шапито',
                nameKg:  'Цирк Шапито',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '*',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Стадион Спартак имени Долона Омурзакова'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Стадион Спартак имени Долона Омурзакова',
                nameKg:  'Стадион Спартак имени Долона Омурзакова',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '*',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Дворец спорта им. К. Кожомкула'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Дворец спорта им. К. Кожомкула',
                nameKg:  'Дворец спорта им. К. Кожомкула',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '*',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Киргизский государственный исторический музей'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Киргизский государственный исторический музей',
                nameKg:  'Киргизский государственный исторический музей',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '*',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Кыргызский драм. театр им. Т. Абдумомунова'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Кыргызский драм. театр им. Т. Абдумомунова',
                nameKg:  'Кыргызский драм. театр им. Т. Абдумомунова',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '*',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Ош Филармония им. Р. Абдыкадырова'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Ош Филармония им. Р. Абдыкадырова',
                nameKg:  'Ош Филармония им. Р. Абдыкадырова',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '*',
                city: 'Ош'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Ош улуттук драма театры'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Ош улуттук драма театры',
                nameKg:  'Ош улуттук драма театры',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '*',
                city: 'Ош'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Ипподром Иссык–Куль'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Ипподром Иссык–Куль',
                nameKg:  'Ипподром Иссык–Куль',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '*',
                city: 'Иссык–Куль'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Барыпы атындагы кыргыз драма театры'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Барыпы атындагы кыргыз драма театры',
                nameKg:  'Барыпы атындагы кыргыз драма театры',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '*',
                city: 'Джалал-Абад'
            });
            await WhereBiletiki.create(_user);
        }
    } catch(error) {
        console.log(error)
    }
}


module.exports.createAdmin = createAdmin;
module.exports.createAdmin = createAdmin;
module.exports.getAdminId = getAdminId;
module.exports.checkAdmin = checkAdmin;
