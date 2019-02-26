export const month = {
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

export const stringifyDateStartEnd = (dateTime) => {
    let dateStart = dateTime[0].split('T')[0].split('-')
    let dateEnd = dateTime[dateTime.length-1].split('T')[0].split('-')
    return [dateStart[2], month[dateStart[1]], dateEnd[2], month[dateEnd[1]]]
}

export const stringifyTime = (dateTime) => {
    let time = dateTime.split('T')[1].split(':')
    dateTime = time[0]+':'+time[1];
    return dateTime
}

export const stringifyDateTime = (dateTime) => {
    let date = dateTime.split('T')[0].split('-')
    let time = dateTime.split('T')[1].split(':')
    dateTime = date[2]+' '+month[date[1]]+' '+date[0]+', '+time[0]+':'+time[1];
    return dateTime
}

export const stringifyDate = (date) => {
    date = JSON.stringify(date)
    let date1 = date.split('T')[0].split('-')
    date = date1[2]+' '+month[date1[1]];
    return date
}

export const where = {
    'Русский драм театр им. Ч.Айтматова': 1,
    'Кыргызская Государственная Филармония': 1,
    'Ош Филармония им. Р. Абдыкадырова': 1,
    'Кыргызская Государственная Филармония - Малый зал': 1,
    'Национальный Центр детей и юношества "Сейтек"': 1,
    'Киргизский национальный академический театр оперы и балета им. Абдыласа Малдыбаева': 1,
    'Цирк Шапито': 1,
    'Кыргызский государственный цирк им. А. Изибаева': 1,
    'Стадион Спартак имени Долона Омурзакова': 3,
    'Дворец спорта им. К. Кожомкула': 1,
    'Ош улуттук драма театры': 1,
    'Барыпы атындагы кыргыз драма театры': 1,
    'Киргизский государственный исторический музей': 3,
    'Кыргызский драм. театр им. Т. Абдумомунова': 3,
}