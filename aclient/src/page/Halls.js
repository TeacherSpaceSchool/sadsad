import React, {useState, useEffect} from 'react';
import { getOther } from '../redux/actions/app'
import { connect } from 'react-redux'
import * as appActions from '../redux/actions/app'
import { bindActionCreators } from 'redux'
import { mainWindow } from '../App';
import { Map, YMaps } from 'react-yandex-maps';

const Halls =  React.memo(
    (props) =>{
        const { lang } = props.app;
        let [halls, setHalls] = useState([]);
        let [size, setSize] = useState(600);
        useEffect(async ()=>{
            let data = await getOther({name: 'Площадка'})
            await setHalls(data)
            setSize(mainWindow.current.offsetWidth>1000? [1000, 300]: [mainWindow.current.offsetWidth, 300])
        },[]);
        return (
            <>
            <YMaps>
            <main className='main main-halls'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 heading'>
                            <div className='heading-title_wrap heading-title_wrap-halls'>
                                <h2>
                                    <span>{lang==='ru'? 'Места' : 'Орун'}</span>
                                </h2>
                            </div>
                            <div className='heading-title_line' />
                        </div>{/* \-heading*/}
                    </div>{/* \-row */}
                    <div className='row'>
                        <div className='col-12'>
                            {halls.map((element) => {
                                return (
                                    <div className='hall'>
                                        <img className='hall_image' src={element.imageThumbnail} onLoad={(e)=>{if(e.target.src.includes('thumbnail')){e.target.src=element.image}}}/>
                                        <div className='hall_title'>{lang==='ru'? element.nameRu : element.nameKg}</div>
                                        <div className='hall_address-text'>{lang==='ru'? 'Адрес' : 'Дарек'}</div>
                                        <div className='hall_address'>{element.address}</div>
                                        <div className='hall_map'>
                                            <Map height={size[1]} width={size[0]} defaultState={{ center: element.coords.split(', '), zoom: 16 }} />
                                        </div>
                                        <hr />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </main>
            </YMaps>
            </>
        );
    }
)

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Halls);
