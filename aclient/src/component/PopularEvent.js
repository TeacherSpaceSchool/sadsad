import React, { useState, useEffect } from 'react';
import { getOther } from '../redux/actions/app'
import { connect } from 'react-redux'
import * as appActions from '../redux/actions/app'
import * as userActions from '../redux/actions/user'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { scrollToTop } from '../App'
import { stringifyDateTime, stringifyDateStartEnd } from '../redux/constants/other'

const PopularEvent =  React.memo(
    (props) =>{
        const { city, lang } = props.app;
        let [popular, setPopular] = useState({events: [], ads: {}});
        useEffect(async ()=>{
            let data = await getOther({name: 'Популярное', data: {city: city}});
            if(data!=undefined) {
                for (let i = 0; i < data.events.length; i++) {
                    data.events[i].dateTime = stringifyDateTime(data.events[i].realDate.sort()[0]);
                    data.events[i].dateStartEnd = stringifyDateStartEnd(data.events[i].realDate.sort());
                    data.events[i].price.sort(function (a, b) {
                        return parseInt(a.price) - parseInt(b.price)
                    })
                    data.events[i].price = data.events[i].price[0].price
                }
                data.ads = data.ads[0] === undefined ? {} : data.ads[0];
                await setPopular(data)
            }
        },[city]);
        return (
            <main className='main'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xl-12 heading'>
                            <div className='heading-title_wrap'>
                                {lang==='ru'? 'Популярные' : 'Элдик'}
                            </div>
                            <div className='heading-title_line' />
                        </div>{/* \-heading*/}
                    </div>{/* \-row */}
                    <div className='events'>
                        <div className='row'>
                            {popular.events.map((element) => {
                                return (
                                    <div className='col-12 col-sm-4 col-md-3 col-lg-3 col-xl-2'>
                                        <div className='event'>
                                            {element.dateStartEnd!==undefined?
                                                <div className='event_date'>
                                                    <div><span className='day'>{element.dateStartEnd[0]}</span><span className='month'>{element.dateStartEnd[1]}</span></div>
                                                    <div className='line' />
                                                    <div><span className='day'>{element.dateStartEnd[2]}</span><span className='month'>{element.dateStartEnd[3]}</span></div>
                                                </div>
                                                :
                                                null
                                            }
                                            <div className='event_image'>
                                                <Link onClick={()=>{scrollToTop()}}  to={'/event/'+(lang==='ru'? element.nameRu : element.nameKg)}><a><img  src={element.imageThumbnail} onLoad={(e)=>{if(e.target.src.includes('thumbnail')){e.target.src=element.image}}} alt /></a></Link>
                                            </div>
                                            <div className='event-content'>
                                                <div className='event-content_title'>
                                                    <Link onClick={()=>{scrollToTop()}}  to={'/event/'+(lang==='ru'? element.nameRu : element.nameKg)}><a>{lang==='ru'? element.nameRu : element.nameKg}</a></Link>
                                                </div>
                                                <div className='event-content_place'>
                                                    <span className='event-content-place_text'><Link  to={'/hall/'+element.where.name}><a>{element.where.name}</a></Link></span>
                                                </div>
                                                <div className='event-content_info'>
                                                    <div className='event-content-info_price'>
                                                        от {element.price} сом
                                                    </div>
                                                    <div className='event-content-info_date'>
                                                        {element.dateTime}
                                                    </div>
                                                    <div className='event-content-info_btn-wrap'>
                                                        <Link onClick={()=>{scrollToTop()}}  to={'/event/'+(lang==='ru'? element.nameRu : element.nameKg)}><a className='event-content-info_btn'>Купить билет</a></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <img style={{width: '100%', marginBottom: '30px'}} onClick={()=>{window.open(popular.ads.link, '_blank');}} src={popular.ads.imageThumbnail} onLoad={(e)=>{if(e.target.src.includes('thumbnail')){e.target.src=popular.ads.image}}} alt />
                            </div>
                        </div>
                    </div>

                </div>
            </main>        
        );
    }
)

function mapStateToProps (state) {
    return {
        user: state.user,
        app: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularEvent);
