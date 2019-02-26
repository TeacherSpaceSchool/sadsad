import React, { useState } from 'react';
import '../Where.css';

const CutImage  = React.memo(
    (props)=>{
        let [selectSector, setSelectSector] = useState('');
        let {sector, selectDate, holderPart, event} = props
        let freeSeat = {}
        for(let i = 1; i <= 3; i++){
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
            <svg className='dont-select-text' width={482} height={546} xmlns='http://www.w3.org/2000/svg'>
                    {/* Created with Method Draw - http://github.com/duopixel/Method-Draw/ */}
                    <g>
                        <rect x={-1} y={-1} width={484} height={548} id='canvas_background' fill='#fff' />
                        <g id='canvasGrid' display='none'>
                            <rect id='svg_1' width={610} height={504} x={1} y={1} strokeWidth={0} fill='url(#gridpattern)' />
                        </g>
                    </g>
                    <g>
                        <ellipse fill='#191e28' strokeWidth='1.5' strokeOpacity='null' cx={242} cy='301.437501' id='svg_58' rx={210} ry={210} stroke='#5c76aa' />
                        <path fill='#ffffff' strokeWidth='1.5' d='m187.6886,243.70787l21.18751,-152.8405l70.62502,0l21.18749,152.8405l-113.00002,0z' id='svg_60' transform='rotate(-178.22776794433594 244.1885986328125,167.28762817382815) ' stroke='#ffffff' />
                        <ellipse fill='#ffffff' strokeWidth='1.5' cx='243.499999' cy='300.937498' id='svg_63' rx={80} ry={80} stroke='#ffffff' />
                        <path fill='#ffffff' strokeWidth='1.5' d='m92.6886,485.70787l21.18751,-152.8405l70.62502,0l21.18749,152.8405l-113.00002,0z' id='svg_65' transform='rotate(43.67987060546875 149.18859863281247,409.2876281738281) ' stroke='#ffffff' />
                        <path fill='#ffffff' strokeWidth='1.5' d='m351.95227,423.63979l8.36462,-138.53701l27.88207,0l8.36462,138.53701l-44.61131,0z' id='svg_66' transform='rotate(-62.66080093383789 374.25793457031256,354.3712768554688) ' stroke='#ffffff' />
                        <ellipse fill='#191e28' strokeWidth='1.5' strokeOpacity='null' cx='243.500002' cy='299.937501' id='svg_68' rx={60} ry={60} stroke='#ffffff' />
                        <ellipse fill='#191e28' strokeWidth='1.5' strokeOpacity='null' fillOpacity='null' cx={242} cy={302} id='svg_72' rx={230} ry={230} opacity='0.1' stroke='#ffffff' />
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 1']}
                            </title>
                            <ellipse stroke='#191e28' ry={35} rx={35} id='svg_3' cy='253.9375' cx='105.000004' strokeWidth='1.5' onClick={()=>{setSelectSector('сектор 1'); holderPart('сектор 1', event)}} className='pointer-text' fill={selectSector==='сектор 1'?'red':'#191e28'} />
                        </g>
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 2']}
                            </title>
                            <ellipse stroke='#191e28' ry={35} rx={35} id='svg_4' cy='235.437497' cx='372.500002' strokeWidth='1.5' onClick={()=>{setSelectSector('сектор 2'); holderPart('сектор 2', event)}} className='pointer-text' fill={selectSector==='сектор 2'?'red':'#191e28'} />
                        </g>
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 3']}
                            </title>
                            <ellipse stroke='#191e28' ry={35} rx={35} id='svg_5' cy='439.437497' cx='287.500002' strokeWidth='1.5' onClick={()=>{setSelectSector('сектор 3'); holderPart('сектор 3', event)}} className='pointer-text' fill={selectSector==='сектор 3'?'red':'#191e28'} />
                        </g>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_7' y='261.4375' x='94.5' strokeWidth={0} stroke='#ffffff' fill='#ffffff'>А</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_9' y='243.4375' x='363.5' strokeWidth={0} stroke='#ffffff' fill='#ffffff'>B</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_10' y='447.4375' x='277.5' strokeWidth={0} stroke='#ffffff' fill='#ffffff'>C</text>
                        <text stroke='#ffffff' xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_12' y='38.4375' x='180.5' strokeWidth={0} fill='#191e28'>План зала</text>
                        <text stroke='#ffffff' transform='matrix(0.9840835332870483,0,0,1,3.5732467770576477,0) ' xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={15} id='svg_15' y='307.4375' x='215.354435' strokeOpacity='null' strokeWidth={0} fill='#ffffff'>МАНЕЖ</text>
                    </g>
                </svg>
        )
    }
)

export default CutImage;
