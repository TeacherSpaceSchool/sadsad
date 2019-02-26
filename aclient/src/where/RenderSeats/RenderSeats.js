import React, { useState } from 'react';
import './RenderSeats.css';
import Tooltip from 'react-simple-tooltip'

const CutImage  = (
    (props)=>{
        let i;
        let {seats, price, selectDate, selectPart, holderSeats, event } = props;
        return (
            <>
            {seats[selectDate][selectPart]!==undefined?
                    <div style={{width: ((seats[selectDate][selectPart][0].length)*26+150)+'px', marginBottom: '20px'}}>
                        {price!==undefined&&price.length>0?
                            <div className='part-div-price' style={{width: ((seats[selectDate][selectPart][0].length)*26+150)+'px'}}>
                                <div className='part-number'/>
                                <div className='part-empty' style={{background: 'red'}}/>
                                <div className='part-price'>
                                    {'Продано'}
                                </div>
                                {
                                    price.map((element) => {
                                        return(
                                            <>
                                            <div className='part-empty' style={{background: element.color}}/>
                                            <div className='part-price'>
                                                {element.price + ' сом'}
                                            </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                            :
                            null}
                        {seats[selectDate][selectPart].map((row, rowId) => {
                            i=1;
                            for(let i1 = 0; i1 < row.length; i1++){
                                if(row[i1].type!=='empty')
                                    i+=1
                            }
                            return (
                                <div>
                                    <div className='part-number'>
                                        {'Ряд: ' + (row[0].name.split(':')[0].split(' ')[1])}
                                    </div>
                                    {
                                        row.map((place, placeId) => {
                                            if (place.type === 'seat' && place.status !== 'reserve') {
                                                i-=1;
                                                return (
                                                    <Tooltip style={{fontSize: '13px'}} content={place.color!=='red'?'Места: '+seats[selectDate][selectPart][rowId][placeId].name+(place.color!=='gray'?' Цена: '+seats[selectDate][selectPart][rowId][placeId].price:''):'Продано'}>
                                                        <div onClick={() => {
                                                            if(place.status !== 'block' && place.status !== 'sold' && place.status !== 'reserve'){
                                                                if(place.color!=='red') {
                                                                    seats[selectDate][selectPart][rowId][placeId].color = 'red'
                                                                    seats[selectDate][selectPart][rowId][placeId].status = 'hold'
                                                                } else {
                                                                    seats[selectDate][selectPart][rowId][placeId].status = 'free'
                                                                    for(let i = 0; i< price.length; i++){
                                                                        if(price[i].price===place.price)
                                                                            seats[selectDate][selectPart][rowId][placeId].color = price[i].color
                                                                    }
                                                                }
                                                                event.where.data = seats;
                                                                holderSeats(place, event, selectPart)
                                                            }
                                                        }} className='part' style={{background: place.color}}>
                                                            <div className='part-text'>
                                                                {place.name.split(':')[1].split(' ')[0]}
                                                            </div>
                                                        </div>
                                                    </Tooltip>
                                                )
                                            } else
                                                return (
                                                    <div className='part-empty' style={{background: place.color}}/>
                                                )
                                        })
                                    }
                                </div>
                            )
                        })}
                    </div>

                :
                null
            }
            </>
        )
    }
)

export default (CutImage);
