import React, {useState, useEffect} from 'react';
import { getSecure } from '../redux/actions/app'
import { connect } from 'react-redux'
import * as appActions from '../redux/actions/app'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { month } from '../redux/constants/other'

const History =  React.memo(
    (props) =>{
        const { lang } = props.app;
        const { authenticated } = props.user;
        if(!authenticated) props.history.push('/');
        let [tickets, setTickets] = useState([]);
        useEffect(async ()=>{
            let data = await getSecure({name: 'ИсторияКино'});
            for(let i=0; i<data.length; i++){
                if(data[i].event==null)
                    data[i].event={where: {}}
            }
            await setTickets(data);
        },[]);
        return (
            <>
            <div className='main-buy page-profile'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <ul className='nav page-menu'>
                                <li><Link to='/profile'><a>{lang==='ru'? 'Профиль' : 'Профиль'}</a></Link></li>
                                <li><Link to='/historyevent'><a>{lang==='ru'? 'Заказы мероприятия' : 'Буйруктар ченөө'}</a></Link></li>
                                <li className='active'><a>{lang==='ru'? 'Заказы кино' : 'Буйруктар кино'}</a></li>
                            </ul>
                        </div>
                    </div>
                    {tickets.map((element) => {
                        return (
                            <>
                                <div className='row1'>
                                <div className='col-12 col-md-8 '>
                                    <div className='tickets-list'>
                                        <div className='ticket-order'>
                                            <div className='inner'>
                                                <a  target='_blank' href={element.ticket}>{lang==='ru'? 'Скачать билет' : 'Скачать билет'}
                                                </a>
                                                <div className='right'>
                                                    <div className='ticket-status wait' style={{marginLeft: '50px'}} >{element.status}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='ticket'>
                                            <div className='ticket-body'>
                                                <div className='img'>
                                                    <img src={element.image} alt />
                                                </div>
                                                <div className='detail'>
                                                    <div className='marker'>
                                                        <i className='icon icon-marker' />
                                                        <b>Фильм:</b>&nbsp;{element.movie}
                                                    </div>
                                                    <div className='marker'>
                                                        <i className='icon icon-marker' />
                                                        <b>Кинотеатр:</b>&nbsp;{element.cinema}
                                                    </div>
                                                    <div className='marker'>
                                                        <i className='icon icon-marker' />
                                                        <b>Зал:</b>&nbsp;{element.hall}
                                                    </div>
                                                    <div className='places'>
                                                        <i className='icon icon-ticket' />
                                                        <span>Билеты</span>
                                                        <ul>
                                                            {element.seats.map((element1) => {
                                                                return (
                                                                    <li>
                                                                        <div className='place-desc'>{lang==='ru'? 'Место' : 'Орун'}: </div>
                                                                        <div className='place-price'>{element1.name}</div>
                                                                        <div className='place-desc'>{lang==='ru'? 'Цена' : 'Баа'}: </div>
                                                                        <div className='place-price'>{element1.priceSelect} сом</div>
                                                                        <div className='place-desc'>Дата:</div>
                                                                        <div className='place-price'>{element1.date}</div>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                </div>
                            </div>
                            <br/>
                            </>
                        )
                    })}
                </div>
            </div>
            </>
        );
    }
)

function mapStateToProps (state) {
    return {
        app: state.app,
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(History);
