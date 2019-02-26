import React, { useState } from 'react';
import '../Where.css';

const CutImage  = React.memo(
    (props)=>{
        let [selectSector, setSelectSector] = useState('');
        let {sector, selectDate, holderPart, event} = props
        let freeSeat = {}
        for(let i = 1; i <= 4; i++){
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
            <svg className='dont-select-text' width={510} height={326} xmlns='http://www.w3.org/2000/svg'>
                    {/* Created with Method Draw - http://github.com/duopixel/Method-Draw/ */}
                    <g>
                        <rect x={-1} y={-1} width={512} height={328} id='canvas_background' fill='#f8f8f8' />
                        <g id='canvasGrid' display='none'>
                            <rect id='svg_1' width={610} height={504} x={1} y={1} strokeWidth={0} fill='url(#gridpattern)' />
                        </g>
                    </g>
                    <g>
                        <rect fill='#191e28' stroke='#191e28' strokeWidth='1.5' x='528.5' y='92.4375' width={1} height={0} id='svg_4' />
                        <rect fill='#ffd600' strokeWidth={7} x='9.5' y={286} width={489} height={18} id='svg_42' stroke='#ffd600' />
                        <text fill='#ffffff' stroke='#5c76aa' strokeWidth={0} strokeOpacity='null' x='213.5' y='64.4375' id='svg_46' fontSize={17} fontFamily='Helvetica, Arial, sans-serif' textAnchor='start' xmlSpace='preserve'>Балкон</text>
                        <text fill='#000000' stroke='#5c76aa' strokeWidth={0} strokeOpacity='null' x='231.5' y={299} id='svg_49' fontSize={12} fontFamily='Helvetica, Arial, sans-serif' textAnchor='start' xmlSpace='preserve'>Сцена</text>
                        <g className='pointer-text'>
                            <title>
                                Свободно: {freeSeat['сектор 1']}
                            </title>
                            <rect id='svg_2' onClick={()=>{setSelectSector('сектор 1'); holderPart('сектор 1', event)}} height='102.999994' width={224} y='49.4375' x='23.499984' strokeWidth={0} fill={selectSector==='сектор 1'?'red':'#191e28'} stroke='#191e28' />
                        </g>
                        <g className='pointer-text'>
                            <title>
                                Свободно: {freeSeat['сектор 2']}
                            </title>
                            <rect id='svg_16' onClick={()=>{setSelectSector('сектор 2'); holderPart('сектор 2', event)}} height='102.999994' width={225} y='49.4375' x='249.499984' strokeWidth={0} fill={selectSector==='сектор 2'?'red':'#191e28'} stroke='#5c76aa' />
                        </g>
                        <text fill='#191e28' stroke='#191e28' strokeWidth={0} x='207.5' y='35.4375' id='svg_39' fontSize={17} fontFamily='Helvetica, Arial, sans-serif' textAnchor='start' xmlSpace='preserve'>План зала</text>
                        <text fill='#ffffff' stroke='#ffffff' strokeWidth={0} x='129.5' y='109.4375' id='svg_43' fontSize={17} fontFamily='Helvetica, Arial, sans-serif' textAnchor='start' xmlSpace='preserve'>A</text>
                        <text fill='#ffffff' stroke='#ffffff' strokeWidth={0} x='356.5' y='109.4375' id='svg_44' fontSize={17} fontFamily='Helvetica, Arial, sans-serif' textAnchor='start' xmlSpace='preserve'>B</text>
                        <rect fill='#ffffff' stroke='#5c76aa' strokeWidth={0} strokeOpacity='null' x='594.5' y='440.4375' width={1} height={0} id='svg_55' />
                        <g className='pointer-text'>
                            <title>
                                Свободно: {freeSeat['сектор 3']}
                            </title>
                            <rect id='svg_3' onClick={()=>{setSelectSector('сектор 3'); holderPart('сектор 3', event)}} height='102.999994' width={224} y='154.4375' x='23.499984' strokeWidth={0} fill={selectSector==='сектор 3'?'red':'#191e28'} stroke='#191e28' />
                        </g>
                        <g className='pointer-text'>
                            <title>
                                Свободно: {freeSeat['сектор 4']}
                            </title>
                            <rect id='svg_5' onClick={()=>{setSelectSector('сектор 4'); holderPart('сектор 4', event)}} height='102.999994' width={225} y='154.4375' x='249.499984' strokeWidth={0} fill={selectSector==='сектор 4'?'red':'#191e28'} stroke='#5c76aa' />
                        </g>
                        <text style={{cursor: 'move'}} fill='#ffffff' stroke='#ffffff' strokeWidth={0} x='129.5' y='214.4375' id='svg_6' fontSize={17} fontFamily='Helvetica, Arial, sans-serif' textAnchor='start' xmlSpace='preserve'>C</text>
                        <text style={{cursor: 'move'}} fill='#ffffff' stroke='#ffffff' strokeWidth={0} x='356.5' y='214.4375' id='svg_7' fontSize={17} fontFamily='Helvetica, Arial, sans-serif' textAnchor='start' xmlSpace='preserve'>D</text>
                    </g>
                </svg>
        )
    }
)

export default CutImage;
