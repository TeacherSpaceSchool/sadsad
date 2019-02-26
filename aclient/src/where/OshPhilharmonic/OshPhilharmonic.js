import React, { useState } from 'react';
import '../Where.css';

const CutImage  = React.memo(
    (props)=>{
        let [selectSector, setSelectSector] = useState('');
        let {sector, selectDate, holderPart, event} = props
        let freeSeat = {}
        for(let i = 1; i <= 2; i++){
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
            <svg className='dont-select-text' width={330} height={386} xmlns='http://www.w3.org/2000/svg'>
                    {/* Created with Method Draw - http://github.com/duopixel/Method-Draw/ */}
                    <g>
                        <rect fill='#f8f8f8' id='canvas_background' height={388} width={332} y={-1} x={-1} />
                        <g display='none' id='canvasGrid'>
                            <rect fill='url(#gridpattern)' strokeWidth={0} y={1} x={1} height={504} width={610} id='svg_1' />
                        </g>
                    </g>
                    <g>
                        <rect stroke='#ffd600' id='svg_42' height={18} width='276.999988' y={357} x='22.500008' strokeWidth={7} fill='#ffd600' />
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_46' y='51.4375' x='127.5' strokeOpacity='null' strokeWidth={0} stroke='#5c76aa' fill='#ffffff'>Балкон</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={12} id='svg_49' y={370} x='148.5' strokeOpacity='null' strokeWidth={0} stroke='#5c76aa' fill='#000000'>Сцена</text>
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 2']}
                            </title>
                            <rect onClick={()=>{setSelectSector('сектор 2'); holderPart('сектор 2', event)}} className='pointer-text' stroke='#191e28' fill={selectSector==='сектор 2'?'red':'#191e28'} strokeWidth={0} x='9.499962' y='37.4375' width='305.00001' height='142.999989' id='svg_2' />
                        </g>
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 1']}
                            </title>
                            <rect onClick={()=>{setSelectSector('сектор 1'); holderPart('сектор 1', event)}} className='pointer-text' stroke='#5c76aa' fill={selectSector==='сектор 1'?'red':'#191e28'} strokeWidth={0} x='9.499984' y='182.4375' width={305} height={143} id='svg_16' />
                        </g>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_39' y='20.4375' x='118.5' strokeWidth={0} stroke='#191e28' fill='#191e28'>План зала</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_43' y='120.4375' x='153.5' strokeWidth={0} stroke='#ffffff' fill='#ffffff'>A</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_44' y='268.4375' x='158.5' strokeWidth={0} stroke='#ffffff' fill='#ffffff'>B</text>
                        <rect id='svg_55' height={0} width={1} y='440.4375' x='594.5' strokeOpacity='null' strokeWidth={0} stroke='#5c76aa' fill='#ffffff' />
                    </g>
                </svg>
        )
    }
)

export default CutImage;
