import React, { useState } from 'react';
import '../Where.css';
import Part from '../RenderSeats/RenderSeats';

const ArchiCoin  = (
    (props)=>{
        let [selectSector, setSelectSector] = useState('part1');
        let {prices, sector, setWhereData, selectDate, cashbox, addSeats, _event } = props
        return (
            <div className='sector'>
                <Part className='sector-part' setWhereData={setWhereData} selectSector={selectSector} seats={sector} price={prices} selectDate={selectDate} cashbox={cashbox} addSeats={addSeats} _event={_event}/>
            </div>
        )
    }
)

export default ArchiCoin;
