import React, { useState, useEffect } from 'react';
import { getOther } from '../redux/actions/app'
import { connect } from 'react-redux'
import * as appActions from '../redux/actions/app'
import * as userActions from '../redux/actions/user'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { scrollToTop } from '../App'

const PopularEvent =  React.memo(
    (props) =>{
        const { lang, events, genre, search } = props.app;
        let [ads, setAds] = useState('');
        useEffect(async ()=>{
            let data = await getOther({name: 'Реклама'})
            setAds(data)
        },[genre, search]);
        if(events.length>0)
            return (
                <main className='main-events-page'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xl-12 heading'>
                                <div className='heading-title_wrap'>
                                    {lang==='ru'? props.nameRu : props.nameKg}
                                </div>
                                <div className='heading-title_line' />
                            </div>{/* \-heading*/}
                        </div>{/* \-row */}
                        {props.nameRu === 'Другие события'? null :
                            <div className='events'>
                                <div className='row'>
                                    <div className='col-12'>
                                        {ads!=undefined?
                                        <img style={{width: '100%', marginBottom: '30px'}} onClick={()=>{window.open(ads.link, '_blank');}}  src={ads.imageThumbnail} onLoad={(e)=>{if(e.target.src.includes('thumbnail')){e.target.src=ads.image}}} alt />
                                            :null}
                                    </div>
                                </div>
                            </div>
                        }
                        {events.map((element1) => {
                            return (
                                <div className='events'>
                                    <div className='row'>
                                        {element1.events.map((element) => {
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
                                                            <Link onClick={()=>{scrollToTop()}} to={'/event/'+(lang==='ru'? element.nameRu : element.nameKg)}><a><img  src={element.imageThumbnail} onLoad={(e)=>{if(e.target.src.includes('thumbnail')){e.target.src=element.image}}} alt /></a></Link>
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
                                                                    <Link onClick={()=>{scrollToTop()}} to={'/event/'+(lang==='ru'? element.nameRu : element.nameKg)}><a className='event-content-info_btn'>Купить билет</a></Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )})
                                        }
                                    </div>
                                    <div className='row'>
                                        <div className='col-12'>
                                            {element1.ads!=undefined?
                                                <img style={{width: '100%', marginBottom: '30px'}} onClick={()=>{window.open(element1.ads.link, '_blank');}} src={element1.ads.imageThumbnail} onLoad={(e)=>{if(e.target.src.includes('thumbnail')){e.target.src=element1.ads.image}}} alt />
                                                :null}
                                        </div>
                                    </div>
                                </div>
                        )})
                        }
                    </div>
                </main>
            );
        else return null
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
