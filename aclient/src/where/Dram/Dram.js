import React, { useState } from 'react';
import '../Where.css';

const CutImage  = React.memo(
    (props)=>{
        let [selectSector, setSelectSector] = useState('');
        let {sector, selectDate, holderPart, event} = props
        let freeSeat = {}
        for(let i = 1; i <= 1; i++){
            let free = 0;
            for(let i1 = 0; i1 < sector[selectDate]['сектор '+i].length; i1++){
                for(let i2 = 0; i2 < sector[selectDate]['сектор '+i][i1].length; i2++){
                    if(sector[selectDate]['сектор '+i][i1][i2].status==='free'&&sector[selectDate]['сектор '+i][i1][i2].type==='seat')
                        free+=1
                }
            }
            freeSeat['сектор '+i] = free;
        }
        return (
            <svg className='dont-select-text' width={530} height={356} xmlns='http://www.w3.org/2000/svg'>
                    {/* Created with Method Draw - http://github.com/duopixel/Method-Draw/ */}
                    <g>
                        <rect x={-1} y={-1} width={532} height={358} id='canvas_background' fill='#f8f8f8' />
                        <g id='canvasGrid' display='none'>
                            <rect id='svg_1' width={610} height={504} x={1} y={1} strokeWidth={0} fill='url(#gridpattern)' />
                        </g>
                    </g>
                    <g>
                        <rect stroke='#ffd600' fill='#ffd600' strokeWidth={7} x='77.5' y={305} width='373.00002' height={18} id='svg_42' />
                        <text fill='#000000' stroke='#5c76aa' strokeWidth={0} strokeOpacity='null' x='251.5' y={319} id='svg_49' fontSize={12} fontFamily='Helvetica, Arial, sans-serif' textAnchor='start' xmlSpace='preserve'>Сцена</text>
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 1']}
                            </title>
                            <rect onClick={()=>{setSelectSector('сектор 1'); holderPart('сектор 1', event)}} className='pointer-text' stroke='#191e28' id='svg_2' height='202.999993' width='478.000015' y='55.4375' x='25.499986' strokeWidth={0} fill={selectSector==='сектор 1'?'red':'#191e28'} />
                        </g>
                        <text style={{cursor: 'move'}} fill='#191e28' stroke='#191e28' strokeWidth={0} x='221.5' y='37.4375' id='svg_39' fontSize={17} fontFamily='Helvetica, Arial, sans-serif' textAnchor='start' xmlSpace='preserve'>План зала</text>
                        <text fill='#ffffff' stroke='#ffffff' strokeWidth={0} x='259.5' y='166.4375' id='svg_43' fontSize={17} fontFamily='Helvetica, Arial, sans-serif' textAnchor='start' xmlSpace='preserve'>A</text>
                    </g>
                </svg>

        )
    }
)

export default CutImage;
