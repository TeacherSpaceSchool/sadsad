import React from 'react';
import Philharmonic from './Philharmonic/Philharmonic';
import Barpy from './Barpy/Barpy';
import ChyngysAitmatov from './ChyngysAitmatov/ChyngysAitmatov';
import Circus from './Circus/Circus';
import Dram from './Dram/Dram';
import History from './History/History';
import Maldybaeva from './Maldybaeva/Maldybaeva';
import OshDrama from './OshDrama/OshDrama';
import OshPhilharmonic from './OshPhilharmonic/OshPhilharmonic';
import PhilharmonicSmall from './PhilharmonicSmall/PhilharmonicSmall';
import Seitek from './Seitek/Seitek';
import Shapito from './Shapito/Shapito';
import Spartak from './Spartak/Spartak';
import Sport from './Sport/Sport';


import RenderSeats from './RenderSeats/RenderSeats';

export const getWhere = async (name, sector, selectDate, holderPart, event) => {
    if(name==='Русский драм театр им. Ч.Айтматова')
        return <ChyngysAitmatov  sector={sector} selectDate={selectDate} holderPart={holderPart} event={event}/>;
    else if(name==='Ош Филармония им. Р. Абдыкадырова')
        return <OshPhilharmonic  sector={sector} selectDate={selectDate} holderPart={holderPart} event={event}/>;
    else if(name==='Кыргызская Государственная Филармония')
        return <Philharmonic sector={sector} selectDate={selectDate} holderPart={holderPart} event={event}/>;
    else if(name==='Кыргызская Государственная Филармония - Малый зал')
        return <PhilharmonicSmall sector={sector} selectDate={selectDate} holderPart={holderPart} event={event}/>;
    else if(name==='Национальный Центр детей и юношества "Сейтек"')
        return <Seitek sector={sector} selectDate={selectDate} holderPart={holderPart} event={event}/>;
    else if(name==='Киргизский национальный академический театр оперы и балета им. Абдыласа Малдыбаева')
        return <Maldybaeva sector={sector} selectDate={selectDate} holderPart={holderPart} event={event}/>;
    else if(name==='Цирк Шапито')
        return <Shapito sector={sector} selectDate={selectDate} holderPart={holderPart} event={event}/>;
    else if(name==='Кыргызский государственный цирк им. А. Изибаева')
        return <Circus sector={sector} selectDate={selectDate} holderPart={holderPart} event={event}/>;
    else if(name==='Стадион Спартак имени Долона Омурзакова')
        return <Spartak sector={sector} selectDate={selectDate} holderPart={holderPart} event={event}/>;
    else if(name==='Дворец спорта им. К. Кожомкула')
        return <Sport sector={sector} selectDate={selectDate} holderPart={holderPart} event={event}/>;
    else if(name==='Ош улуттук драма театры')
        return <OshDrama sector={sector} selectDate={selectDate} holderPart={holderPart} event={event}/>;
    else if(name==='Барыпы атындагы кыргыз драма театры')
        return <Barpy sector={sector} selectDate={selectDate} holderPart={holderPart} event={event}/>;
    else if(name==='Киргизский государственный исторический музей')
        return <History sector={sector} selectDate={selectDate} holderPart={holderPart} event={event}/>;
    else if(name==='Кыргызский драм. театр им. Т. Абдумомунова')
        return <Dram sector={sector} selectDate={selectDate} holderPart={holderPart} event={event}/>;
    else if(name==='')
        return null;
}

export const getRenderSeats = async (seats, price, selectDate, selectPart, holderSeats, event) => {
    return <RenderSeats seats={seats} price={price} selectDate={selectDate} selectPart={selectPart} holderSeats={holderSeats} event={event}/>;
}
