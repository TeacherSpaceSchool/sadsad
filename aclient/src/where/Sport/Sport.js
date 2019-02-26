import React, { useState } from 'react';
import '../Where.css';

const CutImage  = React.memo(
    (props)=>{
        let [selectSector, setSelectSector] = useState('');
        let {sector, selectDate, holderPart, event} = props
        let freeSeat = {}
        for(let i = 1; i <= 9; i++){
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
               <svg className='dont-select-text' width={540} height={520} xmlns='http://www.w3.org/2000/svg'>
                    {/* Created with Method Draw - http://github.com/duopixel/Method-Draw/ */}
                    <g>
                        <rect fill='#f8f8f8' id='canvas_background' height={708} width={542} y={-1} x={-1} />
                        <g display='none' id='canvasGrid'>
                            <rect fill='url(#gridpattern)' strokeWidth={0} y={1} x={1} height={504} width={610} id='svg_1' />
                        </g>
                    </g>
                    <g>
                        <rect stroke='#ffd600' id='svg_42' height={18} width='508.000022' y={462} x='10.5' strokeWidth={7} fill='#ffd600' />
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={12} id='svg_49' y={475} x='252.5' strokeOpacity='null' strokeWidth={0} stroke='#5c76aa' fill='#000000'>Сцена</text>
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 1']}
                            </title>
                            <rect onClick={()=>{setSelectSector('сектор 1'); holderPart('сектор 1', event)}} className='pointer-text' stroke='#191e28' fill={selectSector==='сектор 1'?'red':'#191e28'} strokeWidth={0} x='73.499985' y='53.4375' width='127.000004' height='102.999994' id='svg_2' />
                        </g>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_39' y='37.4375' x='221.5' strokeWidth={0} stroke='#191e28' fill='#191e28'>Амфитеатр</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_43' y='116.4375' x='129.5' strokeWidth={0} stroke='#ffffff' fill='#ffffff'>A</text>
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 2']}
                            </title>
                            <rect onClick={()=>{setSelectSector('сектор 2'); holderPart('сектор 2', event)}} className='pointer-text' stroke='#191e28' fill={selectSector==='сектор 2'?'red':'#191e28'} strokeWidth={0} x='201.499985' y='53.4375' width={127} height='102.999994' id='svg_56' />
                        </g>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_57' y='116.4375' x='262.5' strokeWidth={0} stroke='#ffffff' fill='#ffffff'>B</text>
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 4']}
                            </title>
                            <rect onClick={()=>{setSelectSector('сектор 4'); holderPart('сектор 4', event)}} className='pointer-text' stroke='#191e28' fill={selectSector==='сектор 4'?'red':'#191e28'} strokeWidth={0} x='73.499985' y='157.4375' width='127.000004' height='102.999994' id='svg_78' />
                        </g>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_80' y='217.4375' x='130.5' strokeWidth={0} stroke='#ffffff' fill='#ffffff'>D</text>
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 5']}
                            </title>
                            <rect onClick={()=>{setSelectSector('сектор 5'); holderPart('сектор 5', event)}} className='pointer-text' stroke='#191e28' fill={selectSector==='сектор 5'?'red':'#191e28'} strokeWidth={0} x='201.499985' y='157.4375' width={127} height='102.999994' id='svg_82' />
                        </g>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_83' y='217.4375' x='262.5' strokeWidth={0} stroke='#ffffff' fill='#ffffff'>E</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_102' y='331.4375' x='263.5' strokeOpacity='null' strokeWidth={0} stroke='#5c76aa' fill='#ffffff'>Балкон</text>
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 7']}
                            </title>
                            <rect onClick={()=>{setSelectSector('сектор 7'); holderPart('сектор 7', event)}} className='pointer-text' stroke='#191e28' fill={selectSector==='сектор 7'?'red':'#191e28'} strokeWidth={0} x='73.499985' y='316.4375' width='127.000004' height='102.999994' id='svg_103' />
                        </g>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_105' y='376.4375' x='132.5' strokeWidth={0} stroke='#ffffff' fill='#ffffff'>A</text>
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 8']}
                            </title>
                            <rect onClick={()=>{setSelectSector('сектор 8'); holderPart('сектор 8', event)}} className='pointer-text' stroke='#191e28' fill={selectSector==='сектор 8'?'red':'#191e28'} strokeWidth={0} x='201.499985' y='316.4375' width={127} height='102.999994' id='svg_107' />
                        </g>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_108' y='376.4375' x='262.5' strokeWidth={0} stroke='#ffffff' fill='#ffffff'>B</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_123' y='299.4375' x='238.5' strokeWidth={0} stroke='#191e28' fill='#191e28'>Партер</text>
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 3']}
                            </title>
                            <rect onClick={()=>{setSelectSector('сектор 3'); holderPart('сектор 3', event)}} className='pointer-text' stroke='#191e28' fill={selectSector==='сектор 3'?'red':'#191e28'} strokeWidth={0} x='329.499985' y='53.4375' width='127.000004' height='102.999994' id='svg_7' />
                        </g>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_8' y='116.4375' x='385.5' strokeWidth={0} stroke='#ffffff' fill='#ffffff'>С</text>
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 6']}
                            </title>
                            <rect onClick={()=>{setSelectSector('сектор 6'); holderPart('сектор 6', event)}} className='pointer-text' stroke='#191e28' fill={selectSector==='сектор 6'?'red':'#191e28'} strokeWidth={0} x='329.499985' y='157.4375' width={127} height='102.999994' id='svg_9' />
                        </g>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_10' y='217.4375' x='389.5' strokeWidth={0} stroke='#ffffff' fill='#ffffff'>F</text>
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 9']}
                            </title>
                            <rect onClick={()=>{setSelectSector('сектор 9'); holderPart('сектор 9', event)}} className='pointer-text' stroke='#191e28' fill={selectSector==='сектор 9'?'red':'#191e28'} strokeWidth={0} x='329.499985' y='316.4375' width='127.000004' height='102.999994' id='svg_4' />
                        </g>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_5' y='379.4375' x='387.5' strokeWidth={0} stroke='#ffffff' fill='#ffffff'>С</text>
                    </g>
                </svg>
        )
    }
)

export default CutImage;
