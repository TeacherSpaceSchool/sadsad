import React, { useState } from 'react';
import '../Where.css';

const CutImage  = React.memo(
    (props)=>{
        let [selectSector, setSelectSector] = useState('');
        let {sector, selectDate, holderPart, event} = props
        let freeSeat = {}
        for(let i = 1; i <= 5; i++){
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
            <svg className='dont-select-text' width={652} height={606} xmlns="http://www.w3.org/2000/svg">
                    {/* Created with Method Draw - http://github.com/duopixel/Method-Draw/ */}
                    <g>
                        <rect x={-1} y={-1} width={654} height={608} id="canvas_background" fill="#fff" />
                        <g id="canvasGrid" display="none">
                            <rect id="svg_1" width={610} height={504} x={1} y={1} strokeWidth={0} fill="url(#gridpattern)" />
                        </g>
                    </g>
                    <g>
                        <rect fill="#191e28" stroke="#191e28" strokeWidth="1.5" x="667.5" y="189.4375" width={1} height={0} id="svg_4" />
                        <g className='pointer-text'>
                            <title>
                                Свободно: {freeSeat['сектор 7']}
                            </title>
                            <path onClick={()=>{setSelectSector('сектор 7'); holderPart('сектор 7', event)}} fill={selectSector==='сектор 7'?'red':'#191e28'} d="m448.038234,123.848848l199.880053,-12.935561l0,64.677817l-199.880053,0l0,-51.742255l0,-0.000001z" id="svg_27" transform="rotate(48 547.9782714843751,143.252197265625) " />
                        </g>
                        <g className='pointer-text'>
                            <title>
                                Свободно: {freeSeat['сектор 1']}
                            </title>
                            <rect onClick={()=>{setSelectSector('сектор 1'); holderPart('сектор 1', event)}} stroke="#191e28" fill={selectSector==='сектор 1'?'red':'#191e28'} strokeWidth="1.5" x="151.5" y="55.4375" width="343.000007" height={51} id="svg_28" />
                        </g>
                        <rect fill="#ffd600" strokeWidth={7} x="44.5" y={564} width={557} height={18} id="svg_42" stroke="#ffd600" />
                        <text fill="#ffffff" stroke="#5c76aa" strokeWidth={0} strokeOpacity="null" x="276.5" y="186.4375" id="svg_47" fontSize={17} fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" xmlSpace="preserve">Амфитеатр</text>
                        <text fill="#000000" stroke="#5c76aa" strokeWidth={0} strokeOpacity="null" x="306.5" y="577.4375" id="svg_49" fontSize={12} fontFamily="Helvetica, Arial, sans-serif" textAnchor="start" xmlSpace="preserve">Сцена</text>
                        <g className='pointer-text'>
                            <title>
                                Свободно: {freeSeat['сектор 2']}
                            </title>
                            <rect onClick={()=>{setSelectSector('сектор 2'); holderPart('сектор 2', event)}} stroke="#191e28" id="svg_2" height="167.999998" width={172} y="150.4375" x="150.499977" strokeWidth={0} fill={selectSector==='сектор 2'?'red':'#191e28'} />
                        </g>
                        <g className='pointer-text'>
                            <title>
                                Свободно: {freeSeat['сектор 3']}
                            </title>
                            <rect onClick={()=>{setSelectSector('сектор 3'); holderPart('сектор 3', event)}} stroke="#191e28" id="svg_8" height={168} width={172} y="150.4375" x="323.499982" strokeWidth={0} fill={selectSector==='сектор 3'?'red':'#191e28'} />
                        </g>
                        <g className='pointer-text'>
                            <title>
                                Свободно: {freeSeat['сектор 6']}
                            </title>
                            <path onClick={()=>{setSelectSector('сектор 6'); holderPart('сектор 6', event)}} stroke="#191e28" transform="rotate(135.90525817871094 100.97825622558595,149.252197265625) " fill={selectSector==='сектор 6'?'red':'#191e28'} strokeWidth="1.5" d="m1.038234,129.848848l199.880053,-12.935561l0,64.677818l-199.880053,0l0,-51.742255l0,-0.000002z" id="svg_9" />
                        </g>
                        <g className='pointer-text'>
                            <title>
                                Свободно: {freeSeat['сектор 4']}
                            </title>
                            <rect onClick={()=>{setSelectSector('сектор 4'); holderPart('сектор 4', event)}} stroke="#191e28" id="svg_11" height="167.999998" width={172} y="362.4375" x="150.499977" strokeWidth={0} fill={selectSector==='сектор 4'?'red':'#191e28'} />
                        </g>
                            <g className='pointer-text'>
                                <title>
                                    Свободно: {freeSeat['сектор 5']}
                                </title>
                                <rect onClick={()=>{setSelectSector('сектор 5'); holderPart('сектор 5', event)}} stroke="#191e28" id="svg_12" height={168} width={172} y="362.4375" x="323.499982" strokeWidth={0} fill={selectSector==='сектор 5'?'red':'#191e28'} />
                            </g>
                                <text xmlSpace="preserve" textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize={17} id="svg_15" y="135.4375" x="277.5" strokeOpacity="null" strokeWidth={0} stroke="#191e28" fill="#191e28">Амфитеатр</text>
                        <text xmlSpace="preserve" textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize={17} id="svg_17" y="347.4375" x="293.5" fillOpacity="null" strokeOpacity="null" strokeWidth={0} stroke="#191e28" fill="#191e28">Партер</text>
                        <text xmlSpace="preserve" textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize={17} id="svg_18" y={39} x="292.5" fillOpacity="null" strokeOpacity="null" strokeWidth={0} stroke="#191e28" fill="#191e28">Балкон</text>
                        <text stroke="#191e28" xmlSpace="preserve" textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize={17} id="svg_19" y={89} x="316.5" strokeWidth={0} fill="#ffffff">А</text>
                        <text xmlSpace="preserve" textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize={17} id="svg_22" y={248} x="232.5" strokeWidth={0} stroke="#191e28" fill="#ffffff">B</text>
                        <text xmlSpace="preserve" textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize={17} id="svg_23" y={248} x="404.5" strokeWidth={0} stroke="#191e28" fill="#ffffff">C</text>
                        <text xmlSpace="preserve" textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize={17} id="svg_25" y={461} x="232.5" strokeWidth={0} stroke="#191e28" fill="#ffffff">D</text>
                        <text xmlSpace="preserve" textAnchor="start" fontFamily="Helvetica, Arial, sans-serif" fontSize={17} id="svg_26" y={461} x="404.5" strokeWidth={0} stroke="#191e28" fill="#ffffff">E</text>
                    </g>
                </svg>
        )
    }
)

export default CutImage;
