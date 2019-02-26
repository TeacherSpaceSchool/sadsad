import React, {useState, useEffect} from 'react';
import { getOther } from '../redux/actions/app'
import { connect } from 'react-redux'
import * as appActions from '../redux/actions/app'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { scrollToTop } from '../App'
import { stringifyDateTime } from '../redux/constants/other'

const Event =  React.memo(
    (props) =>{
        const { lang, city } = props.app;
        const { authenticated } = props.user;
        let [event, setEvent] = useState({});
        let [date, setDate] = useState({});
        useEffect(async ()=>{
            let data = await getOther({name: 'СобытиеПоНазванию', data: {city: city, search: props.location.pathname.split('/')[2], skip: 0}});
            if(data.events.length>0){
                data = data.events[0];
                data.dateTime = data.realDate.sort();
                setDate(data.dateTime[0])
                data.price.sort(function(a, b){return parseInt(a.price) - parseInt(b.price)});
                if(data.descriptionRu!==undefined && !Array.isArray(data.descriptionRu)){
                    data.descriptionRu = data.descriptionRu.split('|');
                    data.descriptionKg = data.descriptionKg.split('|');
                }
                await setEvent(data)
            } else {
                props.history.push('/');
                window.location.reload();
            }
        },[]);
        return (
            <>
            {/*<Helmet>
                <meta charSet='utf-8' />
                <title>{lang==='ru'? event.nameRu : event.nameKg}</title>
            </Helmet>*/}
            <div className='main-buy'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 content-wrap'>
                            <div className='content'>
                                <div className='event-image'>
                                    <img src={event.imageThumbnail} onLoad={(e)=>{if(e.target.src.includes('thumbnail')){e.target.src=event.image}}} alt />
                                </div>
                                <div className='event-content'>
                                    <div className='event-content_title'>
                                        <h1>
                                            {lang==='ru'? event.nameRu : event.nameKg}
                                        </h1>
                                        <div className='icons'>
                                            <div className='age'>
                                                <span>{event.ageCategory}</span>
                                                <div className='hint'>{lang==='ru'? 'Рекомендованный возраст' : 'Cунушталган жашы'}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='event-content_info'>
                                        <div className='date-dropdown'>
                                            <div className='input-group'>
                                                <select className='custom-select'>
                                                    <option selected disabled hidden>{lang==='ru'? 'Выбрать дату' : 'Тандоо датасы'}</option>
                                                    {event.realDate!==undefined?event.realDate.map((element, idx) => {
                                                        return (
                                                            <option onClick={()=>{setDate(event.dateTime[idx])}}>{stringifyDateTime(element)}</option>
                                                        )}):null
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className='place'>
                                            <div className='place_name'>
                                                <Link onClick={()=>{scrollToTop()}}  to={event.where!==undefined?'/hall/'+event.where.name:''}><a>{event.where!==undefined?event.where.name:null}</a></Link>
                                            </div>
                                        </div>
                                        <div className='cost'>
                                            {lang==='ru'? 'Стоимось билетов:' : 'Стоимось билетов:'}
                                            <span>{event.price!==undefined?event.price[0].price:null} - {event.price!==undefined?event.price[event.price.length-1].price:null} сом</span>
                                        </div>
                                        <div className='payment-method-icon'>
                                        </div>
                                        <div className='button-buy'>
                                            {
                                                authenticated?
                                                    <Link onClick={()=>{scrollToTop()}}  to={'/selectplace/'+(lang==='ru'? event.nameRu : event.nameKg)+'&'+date}><a>{lang==='ru'? 'Купить' : 'Билет сатып алуу:'}</a></Link>
                                                    :
                                                    <a onClick={()=>{alert('Пожалуйста пройдите регистрацию!!!')}}>{lang==='ru'? 'Купить' : 'Билет сатып алуу'}</a>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='event-description'>
                                <h2 className='description_title'><span>{lang==='ru'? 'Описание' : 'Баяндоо'} </span></h2>
                                <div className='description_content'>
                                    <p><strong>{lang==='ru'? event.nameRu : event.nameKg} </strong></p>
                                    <p>{lang==='ru'? 'Жанр' : 'Жанр'}: {event.genre} </p>
                                    <p>{lang==='ru'? 'Возрастное ограничение' : 'Курактык чеги'}: {event.ageCategory}</p>
                                    {event.price!==undefined?(lang==='ru'? event.descriptionRu : event.descriptionKg ).map((element) => {
                                        return <p>{element}</p>
                                    }):null}
                                </div>
                                {event.video!==undefined&&event.video.length>0?
                                    <div className='video-wrap'>
                                        <iframe width='100%' height={360} src={event.video} frameBorder={0} allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen />
                                    </div>
                                    :
                                    null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>     </>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Event);
