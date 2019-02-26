import React, { useState, useEffect } from 'react';
import './Render.css';
import Tooltip from 'react-simple-tooltip'

const CutImage  = (
    (props)=>{
        let {seats, holderSeats, seance} = props;
        const [anchorEl, setAnchorEl] = useState([]);
        let closeAnchorEl = ()=>{
            let _anchorEl = []
            for (let i = 0; i < seats.length; i++) {
                _anchorEl[i]=[]
                for (let i1 = 0; i1 < seats[i].length; i1++) {
                    _anchorEl[i][i1]=false
                }
            }
            setAnchorEl(_anchorEl)

        }
        let handleAnchorEl = (i11, i22)=>{
            let _anchorEl = anchorEl
            _anchorEl[i11][i22]=!_anchorEl[i11][i22]
            setAnchorEl(_anchorEl)

        }
        useEffect(async()=>{
            if(seats!==undefined){
                let _anchorEl = []
                for (let i = 0; i < seats.length; i++) {
                    _anchorEl[i]=[]
                    for (let i1 = 0; i1 < seats[i].length; i1++) {
                        _anchorEl[i][i1]=false
                    }
                }
                setAnchorEl(_anchorEl)
            }
        },[seats])
        return (
            <>
            {seats!==undefined?
                    <div style={{width: ((seats[0].length)*26+150)+'px'}}>
                        <div className='part-div-price' style={{width: '500px'}}>
                            <div className='part-number'/>
                            <div className='part-empty' style={{background: 'black'}}/>
                            <div className='part-price'>
                                {'Забронировано'}
                            </div>
                            <div className='part-empty' style={{background: 'red'}}/>
                            <div className='part-price'>
                                {'Продано'}
                            </div>
                        </div>
                        {seats.map((row, rowId) => {
                            return (
                                <div>
                                    <div className='part-number'>
                                        {'Ряд: ' + (row[0].name.split(':')[0].split(' ')[1])}
                                    </div>
                                    {
                                        row.map((place, placeId) => {
                                            if (place.type === 'seat' && place.status !== 'reserve') {
                                                return (
                                                    <div style={{display: 'inline-block'}}>
                                                           <div onClick={async () => {
                                                                if(place.status !== 'block' && place.status !== 'sold' && place.status !== 'reserve'){
                                                                    if(place.color!=='red') {
                                                                        await closeAnchorEl()
                                                                        await handleAnchorEl(rowId, placeId)
                                                                    } else {
                                                                        seats[rowId][placeId].status = 'free'
                                                                        seats[rowId][placeId].color = 'indigo'
                                                                        seance.seats = seats;
                                                                        holderSeats(place, seance)
                                                                    }
                                                                }
                                                                    }} className='part' style={{background: place.color}}>
                                                                <div className='part-text'>
                                                                    {place.name.split(':')[1].split(' ')[0]}
                                                                </div>
                                                            </div>
                                                     {anchorEl.length>0&&anchorEl[rowId][placeId]?
                                                        <>
                                                            <div className='gallery-subbackground' onClick={()=>{closeAnchorEl()}}/>
                                                            <div className='header-submenu'>
                                                                <div className='header-submenu-item' onClick={()=>{seats[rowId][placeId].priceSelect = place.price;seats[rowId][placeId].color = 'red';seats[rowId][placeId].status = 'hold';seance.seats = seats;holderSeats(place, seance);closeAnchorEl()}}>
                                                                    Взрослый: {place.price}
                                                                </div>
                                                                {place.priceKid.length>0&&parseInt(place.priceKid)>0?
                                                                    <div className='header-submenu-item' onClick={()=>{seats[rowId][placeId].priceSelect = place.priceKid;seats[rowId][placeId].color = 'red';seats[rowId][placeId].status = 'hold';seance.seats = seats;holderSeats(place, seance);closeAnchorEl()}}>
                                                                        Детский: {place.priceKid}
                                                                    </div>:null}
                                                                {place.priceStud.length>0&&parseInt(place.priceStud)>0?
                                                                    <div className='header-submenu-item' onClick={()=>{seats[rowId][placeId].priceSelect = place.priceStud;seats[rowId][placeId].color = 'red';seats[rowId][placeId].status = 'hold';seance.seats = seats;holderSeats(place, seance);closeAnchorEl()}}>
                                                                        Студен: {place.priceStud}
                                                                    </div>:null}
                                                            </div>
                                                        </>
                                                        :null}
                                                    </div>
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

export default CutImage;
