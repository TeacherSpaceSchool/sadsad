import React, { useState } from 'react';
import '../Where.css';

const CutImage  = React.memo(
    (props)=>{
        let [selectSector, setSelectSector] = useState('');
        let {sector, selectDate, holderPart, event} = props
        let freeSeat = {};
        for(let i = 1; i <= 10; i++){
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
            <svg className='dont-select-text' width={482} height={526} xmlns='http://www.w3.org/2000/svg'>
                    {/* Created with Method Draw - http://github.com/duopixel/Method-Draw/ */}
                    <g>
                        <rect x={-1} y={-1} width={484} height={528} id='canvas_background' fill='#fff' />
                        <g id='canvasGrid' display='none'>
                            <rect id='svg_1' width={610} height={504} x={1} y={1} strokeWidth={0} fill='url(#gridpattern)' />
                        </g>
                    </g>
                    <g>
                        <ellipse fill='#191e28' strokeWidth='1.5' strokeOpacity='null' cx='241.999969' cy='284.43749' id='svg_58' rx={210} ry={210} stroke='#5c76aa' />
                        <ellipse fill='#ffffff' strokeWidth='1.5' cx='246.499968' cy='283.937487' id='svg_63' rx={80} ry={80} stroke='#ffffff' />
                        <ellipse fill='#191e28' strokeWidth='1.5' strokeOpacity='null' cx='246.49997' cy='283.93749' id='svg_68' rx={60} ry={60} stroke='#ffffff' />
                        <ellipse fill='#191e28' strokeWidth='1.5' strokeOpacity='null' fillOpacity='null' cx='241.499625' cy='285.937422' id='svg_72' rx={230} ry={230} opacity='0.1' stroke='#ffffff' />
                        <rect fill='#ffffff' strokeWidth='1.5' x='234.499969' y='72.999994' width='22.999999' height='129.999995' id='svg_83' stroke='#ffffff' />
                        <rect fill='#ffffff' strokeWidth='1.5' strokeOpacity='null' x='235.499969' y='361.999989' width='22.999999' height='132.99999' id='svg_84' stroke='#ffffff' />
                        <rect fill='#ffffff' strokeWidth='1.5' strokeOpacity='null' fillOpacity='null' x='149.609911' y='101.292906' width={15} height='133.241289' id='svg_89' transform='rotate(-38.21296691894531 157.10990905761727,167.91355895996094) ' stroke='#ffffff' />
                        <rect fill='#ffffff' strokeWidth='1.5' strokeOpacity='null' fillOpacity='null' x='100.656898' y='164.893604' width={15} height='136.485279' id='svg_90' transform='rotate(-66.66184997558594 108.15690612792973,233.13623046875003) ' stroke='#ffffff' />
                        <rect fill='#ffffff' strokeWidth='1.5' strokeOpacity='null' fillOpacity='null' x='94.445263' y='242.892697' width={15} height='138.011912' id='svg_91' transform='rotate(-92.9472427368164 101.94526672363278,311.8986511230469) ' stroke='#ffffff' />
                        <rect fill='#ffffff' strokeWidth='1.5' strokeOpacity='null' fillOpacity='null' x='139.671416' y='322.027231' width={15} height='137.549217' id='svg_92' transform='rotate(-130.30844116210938 147.17141723632812,390.8018493652344) ' stroke='#ffffff' />
                        <rect fill='#ffffff' strokeWidth='1.5' strokeOpacity='null' fillOpacity='null' x='324.295352' y='103.493209' width={15} height='129.023217' id='svg_93' transform='rotate(38 331.79534912109375,168.00483703613284) ' stroke='#ffffff' />
                        <rect fill='#ffffff' strokeWidth='1.5' strokeOpacity='null' fillOpacity='null' x='370.496008' y='166.011896' width={15} height='128.894375' id='svg_94' transform='rotate(67 377.9960021972656,230.4591064453125) ' stroke='#ffffff' />
                        <rect fill='#ffffff' strokeWidth='1.5' strokeOpacity='null' fillOpacity='null' x='380.666529' y='244.41299' width={15} height='126.522131' id='svg_95' transform='rotate(97 388.1665344238281,307.67407226562494) ' stroke='#ffffff' />
                        <rect fill='#ffffff' strokeWidth='1.5' strokeOpacity='null' fillOpacity='null' x='339.610145' y='320.321822' width={15} height='130.763302' id='svg_96' transform='rotate(130 347.11013793945307,385.7034912109376) ' stroke='#ffffff' />
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 10']}
                            </title>
                            <ellipse ry={25} rx={25} id='svg_2' cy='135.4375' cx='193.5' strokeWidth='1.5' stroke='#76b2f2' onClick={()=>{setSelectSector('сектор 10'); holderPart('сектор 10', event)}} className='pointer-text' fill={selectSector==='сектор 10'?'red':'#191e28'} />
                        </g>
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 1']}
                            </title>
                            <ellipse ry={25} rx={25} id='svg_3' cy='135.4375' cx='296.5' strokeWidth='1.5' stroke='#76b2f2' onClick={()=>{setSelectSector('сектор 1'); holderPart('сектор 1', event)}} className='pointer-text' fill={selectSector==='сектор 1'?'red':'#191e28'} />
                        </g>
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 2']}
                            </title>
                            <ellipse ry={25} rx={25} id='svg_4' cy='183.4375' cx='376.5' strokeWidth='1.5' stroke='#76b2f2' onClick={()=>{setSelectSector('сектор 2'); holderPart('сектор 2', event)}} className='pointer-text' fill={selectSector==='сектор 2'?'red':'#191e28'} />
                        </g>
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 3']}
                            </title>
                            <ellipse ry={25} rx={25} id='svg_5' cy='267.4375' cx='402.5' strokeWidth='1.5' stroke='#76b2f2' onClick={()=>{setSelectSector('сектор 3'); holderPart('сектор 3', event)}} className='pointer-text' fill={selectSector==='сектор 3'?'red':'#191e28'} />
                        </g>
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 4']}
                            </title>
                            <ellipse ry={25} rx={25} id='svg_6' cy='354.4375' cx='385.5' strokeWidth='1.5' stroke='#76b2f2' onClick={()=>{setSelectSector('сектор 4'); holderPart('сектор 4', event)}} className='pointer-text' fill={selectSector==='сектор 4'?'red':'#191e28'} />
                        </g>
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 5']}
                            </title>
                            <ellipse ry={25} rx={25} id='svg_7' cy='424.4375' cx='306.5' strokeWidth='1.5' stroke='#76b2f2' onClick={()=>{setSelectSector('сектор 5'); holderPart('сектор 5', event)}} className='pointer-text' fill={selectSector==='сектор 5'?'red':'#191e28'} />
                        </g>
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 6']}
                            </title>
                            <ellipse ry={25} rx={25} id='svg_8' cy='429.4375' cx='187.5' strokeWidth='1.5' stroke='#76b2f2' onClick={()=>{setSelectSector('сектор 6'); holderPart('сектор 6', event)}} className='pointer-text' fill={selectSector==='сектор 6'?'red':'#191e28'} />
                        </g>
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 7']}
                            </title>
                            <ellipse ry={25} rx={25} id='svg_9' cy='359.4375' cx='102.5' strokeWidth='1.5' stroke='#76b2f2' onClick={()=>{setSelectSector('сектор 7'); holderPart('сектор 7', event)}} className='pointer-text' fill={selectSector==='сектор 7'?'red':'#191e28'} />
                        </g>
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 8']}
                            </title>
                            <ellipse ry={25} rx={25} id='svg_10' cy='268.4375' cx='79.5' strokeWidth='1.5' stroke='#76b2f2' onClick={()=>{setSelectSector('сектор 8'); holderPart('сектор 8', event)}} className='pointer-text' fill={selectSector==='сектор 8'?'red':'#191e28'} />
                        </g>
                        <g>
                            <title>
                                Свободно: {freeSeat['сектор 9']}
                            </title>
                            <ellipse ry={25} rx={25} id='svg_11' cy='188.4375' cx='114.5' strokeWidth='1.5' stroke='#76b2f2' onClick={()=>{setSelectSector('сектор 9'); holderPart('сектор 9', event)}} className='pointer-text' fill={selectSector==='сектор 9'?'red':'#191e28'} />
                        </g>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_12' y='141.4375' x='292.5' strokeWidth={0} stroke='#76b2f2' fill='#ffffff'>1</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_13' y='189.4375' x='372.5' strokeWidth={0} stroke='#76b2f2' fill='#ffffff'>2</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_14' y='273.4375' x='398.5' strokeWidth={0} stroke='#76b2f2' fill='#ffffff'>3</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_15' y='360.4375' x='381.5' strokeWidth={0} stroke='#76b2f2' fill='#ffffff'>4</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_16' y='431.4375' x='301.5' strokeWidth={0} stroke='#76b2f2' fill='#ffffff'>5</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_17' y='435.4375' x='183.5' strokeWidth={0} stroke='#76b2f2' fill='#ffffff'>6</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_18' y='366.4375' x='97.5' strokeWidth={0} stroke='#76b2f2' fill='#ffffff'>7</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_19' y='274.4375' x='75.5' strokeWidth={0} stroke='#76b2f2' fill='#ffffff'>8</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_20' y='194.4375' x='110.5' strokeWidth={0} stroke='#76b2f2' fill='#ffffff'>9</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_21' y='141.4375' x='183.5' strokeWidth={0} stroke='#76b2f2' fill='#ffffff'>10</text>
                        <text stroke='#191e28' xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={17} id='svg_27' y='24.4375' x='156.5' strokeWidth={0} fill='#191e28'>План зала</text>
                        <text xmlSpace='preserve' textAnchor='start' fontFamily='Helvetica, Arial, sans-serif' fontSize={15} id='svg_29' y='291.4375' x='218.5' strokeOpacity='null' strokeWidth={0} stroke='#ffffff' fill='#ffffff'>МАНЕЖ</text>
                    </g>
                </svg>
        )
    }
)

export default CutImage;
