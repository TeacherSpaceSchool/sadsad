import React, { useState } from 'react';
import '../Where.css';

const CutImage  = React.memo(
    (props)=>{
        let [selectSector, setSelectSector] = useState('');
        let {sector, selectDate, holderPart, event} = props
        let freeSeat = {}
        for(let i = 1; i <= 8; i++){
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
            <svg className='dont-select-text' width={510} height={546} xmlns='http://www.w3.org/2000/svg'>
                    {/* Created with Method Draw - http://github.com/duopixel/Method-Draw/ */}
                    <g>
                        <rect fill='#f8f8f8' id='canvas_background' height={548} width={512} y={-1} x={-1} />
                        <g display='none' id='canvasGrid'>
                            <rect fill='url(#gridpattern)' strokeWidth={0} y={1} x={1} height={504} width={610} id='svg_1' />
                        </g>
                    </g>
                    <g>
                        <rect id='svg_4' height={0} width={1} y='92.4375' x='528.5' strokeWidth='1.5' stroke='#191e28' fill='#191e28' />
                        <rect stroke='#ffd600' id='svg_42' height={18} width={489} y={503} x='7.5' strokeWidth={7} fill='#ffd600' />
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_46' y='64.4375' x='213.5' strokeOpacity='null' strokeWidth={0} stroke='#5c76aa' fill='#ffffff'>Балкон</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_47' y='237.4375' x='198.5' strokeOpacity='null' strokeWidth={0} stroke='#5c76aa' fill='#ffffff'>Амфитеатр</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={12} id='svg_49' y={516} x='232.5' strokeOpacity='null' strokeWidth={0} stroke='#5c76aa' fill='#000000'>Сцена</text>
                        <g className='pointer-text'>
                            <title>
                                Свободно: {freeSeat['сектор 1']}
                            </title>
                            <rect onClick={()=>{setSelectSector('сектор 1'); holderPart('сектор 1', event)}}  stroke='#191e28'  fill={selectSector==='сектор 1'?'red':'#191e28'} strokeWidth={0} x='23.499984' y='49.4375' width={224} height='102.999994' id='svg_2' />
                        </g>
                        <g className='pointer-text'>
                            <title>
                                Свободно: {freeSeat['сектор 3']}
                            </title>
                            <rect onClick={()=>{setSelectSector('сектор 3'); holderPart('сектор 3', event)}}  stroke='#5c76aa' fill={selectSector==='сектор 3'?'red':'#191e28'} strokeWidth={0} strokeOpacity='null' x='23.499983' y='220.4375' width={149} height='122.000004' id='svg_5' />
                        </g>
                        <g className='pointer-text'>
                            <title>
                                Свободно: {freeSeat['сектор 2']}
                            </title>
                            <rect onClick={()=>{setSelectSector('сектор 2'); holderPart('сектор 2', event)}}  stroke='#5c76aa' fill={selectSector==='сектор 2'?'red':'#191e28'} strokeWidth={0} x='249.499984' y='49.4375' width={225} height='102.999994' id='svg_16' />
                        </g>
                        <g className='pointer-text'>
                            <title>
                                Свободно: {freeSeat['сектор 5']}
                            </title>
                            <rect onClick={()=>{setSelectSector('сектор 5'); holderPart('сектор 5', event)}}  stroke='#191e28' fill={selectSector==='сектор 5'?'red':'#191e28'} strokeWidth={0} x='325.499977' y='220.4375' width={149} height='122.000004' id='svg_28' />
                        </g>
                        <g className='pointer-text'>
                            <title>
                                Свободно: {freeSeat['сектор 4']}
                            </title>
                            <rect onClick={()=>{setSelectSector('сектор 4'); holderPart('сектор 4', event)}}  stroke='#191e28' fill={selectSector==='сектор 4'?'red':'#191e28'} strokeWidth={0} x='174.499983' y='220.4375' width={149} height='122.000004' id='svg_27' />
                        </g>
                        <g className='pointer-text'>
                            <title>
                                Свободно: {freeSeat['сектор 6']}
                            </title>
                            <rect onClick={()=>{setSelectSector('сектор 6'); holderPart('сектор 6', event)}}  stroke='#191e28' fill={selectSector==='сектор 6'?'red':'#191e28'} strokeWidth={0} x='23.499983' y='344.4375' width={149} height='122.000004' id='svg_30' />
                        </g>
                        <g className='pointer-text'>
                            <title>
                                Свободно: {freeSeat['сектор 8']}
                            </title>
                            <rect onClick={()=>{setSelectSector('сектор 8'); holderPart('сектор 8', event)}}  stroke='#191e28' fill={selectSector==='сектор 8'?'red':'#191e28'} strokeWidth={0} x='325.499977' y='344.4375' width={149} height='122.000004' id='svg_31' />
                        </g>
                        <g className='pointer-text'>
                            <title>
                                Свободно: {freeSeat['сектор 7']}
                            </title>
                            <rect onClick={()=>{setSelectSector('сектор 7'); holderPart('сектор 7', event)}}  stroke='#191e28' fill={selectSector==='сектор 7'?'red':'#191e28'} strokeWidth={0} x='174.499983' y='344.4375' width={149} height='122.000004' id='svg_32' />
                        </g>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_39' y='35.4375' x='217.5' strokeWidth={0} stroke='#191e28' fill='#191e28'>Балкон</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_40' y={204} x='218.5' strokeWidth={0} stroke='#191e28' fill='#191e28'>Партер</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_43' y='109.4375' x='129.5' strokeWidth={0} stroke='#ffffff' fill='#ffffff'>A</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_44' y='109.4375' x='356.5' strokeWidth={0} stroke='#ffffff' fill='#ffffff'>B</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_45' y='295.4375' x='92.5' strokeWidth={0} stroke='#ffffff' fill='#ffffff'>A</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_48' y='295.4375' x='244.5' strokeWidth={0} stroke='#ffffff' fill='#ffffff'>B</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_50' y='295.4375' x='393.5' strokeWidth={0} stroke='#ffffff' fill='#ffffff'>C</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_51' y='417.4375' x='91.5' strokeWidth={0} stroke='#ffffff' fill='#ffffff'>D</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_52' y='417.4375' x='246.5' strokeWidth={0} stroke='#ffffff' fill='#ffffff'>E</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_53' y='417.4375' x='397.5' strokeWidth={0} stroke='#ffffff' fill='#ffffff'>F</text>
                        <rect id='svg_55' height={0} width={1} y='440.4375' x='594.5' strokeOpacity='null' strokeWidth={0} stroke='#5c76aa' fill='#ffffff' />
                    </g>
                </svg>
        )
    }
)

export default CutImage;
