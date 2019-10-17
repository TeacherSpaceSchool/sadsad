
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
                coords: '42.878229, 74.587594',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Национальная Библиотека Кыргызской Республики'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Национальная Библиотека Кыргызской Республики',
                nameKg:  'Национальная Библиотека Кыргызской Республики',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.881552, 74.610975',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Республиканская Библиотека имени К. Баялинова'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Республиканская Библиотека имени К. Баялинова',
                nameKg:  'Республиканская Библиотека имени К. Баялинова',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.877526, 74.610815',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Национальный музей изобразительных искусств имени Гапара Айтиева'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Национальный музей изобразительных искусств имени Гапара Айтиева',
                nameKg:  'Национальный музей изобразительных искусств имени Гапара Айтиева',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.878699, 74.610927',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Кыргызский Государственный театр юных зрителей имени Б.Кыдыкеевой'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Кыргызский Государственный театр юных зрителей имени Б.Кыдыкеевой',
                nameKg:  'Кыргызский Государственный театр юных зрителей имени Б.Кыдыкеевойч',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.886422, 74.609594',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Кыргызский государственный театр имени М. Жангазиева'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Кыргызский государственный театр имени М. Жангазиева',
                nameKg:  'Кыргызский государственный театр имени М. Жангазиева',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.886543, 74.609707',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Бишкекский Городской Драматический Театр им. Умуралиева'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Бишкекский Городской Драматический Театр им. Умуралиева',
                nameKg:  'Бишкекский Городской Драматический Театр им. Умуралиева',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.874544, 74.633893',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Кинотеатр "Космо Парк"'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Кинотеатр "Космо Парк"',
                nameKg:  'Кинотеатр "Космо Парк"',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.837082, 74.615442',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Кинотеатр "Бродвей"'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Кинотеатр "Бродвей"',
                nameKg:  'Кинотеатр "Бродвей"',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.855597, 74.584980',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Кинотеатр "Дордой Плаза imax"'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Кинотеатр "Дордой Плаза imax"',
                nameKg:  'Кинотеатр "Дордой Плаза imax"',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.874976, 74.618084',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Кинотеатр "Манас"'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Кинотеатр "Манас"',
                nameKg:  'Кинотеатр "Манас"',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.844360, 74.584270',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Кинотеатр "Россия"'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Кинотеатр "Россия"',
                nameKg:  'Кинотеатр "Россия"',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.844360, 74.584270',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Кинотеатр "Ала –Тоо"'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Кинотеатр "Ала –Тоо"',
                nameKg:  'Кинотеатр "Ала –Тоо"',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.876187, 74.607600',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Кинотеатр "Бишкек Парк"'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Кинотеатр "Бишкек Парк"',
                nameKg:  'Кинотеатр "Бишкек Парк"',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.874681, 74.590262',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Кинотеатр "Вефа"'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Кинотеатр "Вефа"',
                nameKg:  'Кинотеатр "Вефа"',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.857428, 74.609702',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Кинотеатр "Октябрь"'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Кинотеатр "Октябрь"',
                nameKg:  'Кинотеатр "Октябрь"',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.876604, 74.576850',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Кинотеатр "Кино-Бокс"'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Кинотеатр "Кино-Бокс"',
                nameKg:  'Кинотеатр "Кино-Бокс"',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '40.564154, 72.804016',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Кинотеатр "Нур"'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Кинотеатр "Нур"',
                nameKg:  'Кинотеатр "Нур"',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '40.514914, 72.808369',
                city: 'Ош'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Кинотеатр "Ак – Буура"'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Кинотеатр "Ак – Буура"',
                nameKg:  'Кинотеатр "Ак – Буура"',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '40.549843, 72.787016',
                city: 'Ош'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Кинотеатр "Мэрлин"'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Кинотеатр "Мэрлин"',
                nameKg:  'Кинотеатр "Мэрлин"',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '40.529101, 72.797380',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Таласский областной музыкально-драматический театр имени К. Медетова'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Таласский областной музыкально-драматический театр имени К. Медетова',
                nameKg:  'Таласский областной музыкально-драматический театр имени К. Медетова',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '40.529101, 72.797380',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Нарынский областной музыкально-драматический театр имени М. Рыскулова'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Нарынский областной музыкально-драматический театр имени М. Рыскулова',
                nameKg:  'Нарынский областной музыкально-драматический театр имени М. Рыскулова',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '41.428710, 75.992850',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Жалал-Абадская областная филармония имени Т. Тыныбекова'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Жалал-Абадская областная филармония имени Т. Тыныбекова',
                nameKg:  'Жалал-Абадская областная филармония имени Т. Тыныбекова',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '41.428710, 75.992850',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Рух Ордо им. Ч. Айтматова, культурный центр'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Рух Ордо им. Ч. Айтматова, культурный центр',
                nameKg:  'Рух Ордо им. Ч. Айтматова, культурный центр',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.648005, 77.095157',
                city: 'Иссык–Куль'
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
                coords: '42.878084, 74.612549',
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
                coords: '42.877936, 74.587614',
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
                coords: '42.877936, 74.587614',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Кыргызская Национальная Филармония им. Т.С.'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Кыргызская Национальная Филармония им. Т.С.',
                nameKg:  'Кыргызская Национальная Филармония им. Т.С.',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.877936, 74.587614',
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
                coords: '42.877568, 74.608947',
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
                coords: '42.882437, 74.613106',
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
                coords: '42.880956, 74.596573',
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
                coords: '42.878374, 74.595275',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Дворец спорта'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Дворец спорта',
                nameKg:  'Дворец спорта',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.878374, 74.595275',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Асанбай Центр'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Асанбай Центр',
                nameKg:  'Асанбай Центр',
                image: '*',
                imageThumbnail: '*',
                address: '21, 11 Аалы Токомбаева, Бишкек',
                coords: '42.817424, 74.620439',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'MMA Дворец спорта им. К. Кожомкула'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'MMA Дворец спорта им. К. Кожомкула',
                nameKg:  'MMA Дворец спорта им. К. Кожомкула',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.878374, 74.595275',
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
                coords: '42.877727, 74.603827',
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
                coords: '42.878891, 74.602820',
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
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Ошский областной театр кукол имени  Н. Шамурзаева'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Ошский областной театр кукол имени  Н. Шамурзаева',
                nameKg:  'Ошский областной театр кукол имени  Н. Шамурзаева',
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
                coords: '40.519911, 72.801272',
                city: 'Ош'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Сулайман-Тоо Национальный историко-археологический музейный комплекс'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Сулайман-Тоо Национальный историко-археологический музейный комплекс',
                nameKg:  'Сулайман-Тоо Национальный историко-археологический музейный комплекс',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '40.528597, 72.782674',
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
                coords: '42.650019, 77.127227',
                city: 'Иссык–Куль'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Амфитеатр Dordoi Nomad'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Амфитеатр Dordoi Nomad',
                nameKg:  'Амфитеатр Dordoi Nomad',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.659139, 77.245868',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Иссык-Кульский областной кыргызский музыкально-драматический театр имени \n' +
        'К. Жантошева'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Иссык-Кульский областной кыргызский музыкально-драматический театр имени \n' +
                'К. Жантошева',
                nameKg:  'Иссык-Кульский областной кыргызский музыкально-драматический театр имени \n' +
                'К. Жантошева',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.659139, 77.245868',
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
                coords: '40.929586, 73.007207',
                city: 'Джалал-Абад'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Ошский государственный академический, музыкально-драматический театр имени Бабура'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Ошский государственный академический, музыкально-драматический театр имени Бабура',
                nameKg:  'Ошский государственный академический, музыкально-драматический театр имени Бабура',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '40.533022, 72.796783 ',
                city: 'Ош'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Мероприятие'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Мероприятие',
                nameKg:  'Мероприятие',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.878891, 74.602820',
                city: 'Бишкек'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Мероприятие'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Мероприятие',
                nameKg:  'Мероприятие',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.878891, 74.602820',
                city: 'Иссык–Куль'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Мероприятие'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Мероприятие',
                nameKg:  'Мероприятие',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.878891, 74.602820',
                city: 'Ош'
            });
            await WhereBiletiki.create(_user);
        }
        findAdmin = await WhereBiletiki.findOne({nameRu: 'Мероприятие'});
        if(findAdmin==null){
            let _user = new WhereBiletiki({
                nameRu: 'Мероприятие',
                nameKg:  'Мероприятие',
                image: '*',
                imageThumbnail: '*',
                address: '*',
                coords: '42.878891, 74.602820',
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
