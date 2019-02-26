const url = 'http://88.212.253.143/',
    adminLogin = 'admin',
    adminPass = 'SehzHp',
    month = {
    '01':'янв',
    '02':'фев',
    '03':'мар',
    '04':'апр',
    '05':'май',
    '06':'июн',
    '07':'июл',
    '08':'авг',
    '09':'сен',
    '10':'окт',
    '11':'ноя',
    '12':'дек'

}
const stringifyDateTime = (dateTime) => {
    dateTime = JSON.stringify(dateTime)
    let date = dateTime.split('T')[0].split('-')
    let time = dateTime.split('T')[1].split(':')
    dateTime = date[2]+'.'+date[1]+'.'+date[0]+' '+time[0]+':'+time[1];
    dateTime = dateTime.replace('"', '');
    return dateTime
}
module.exports.stringifyDateTime = stringifyDateTime;
module.exports.month = month;
module.exports.adminPass = adminPass;
module.exports.adminLogin = adminLogin;
module.exports.url = url;
