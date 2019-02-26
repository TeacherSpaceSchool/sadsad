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
            let data = await getSecure({name: 'История'});
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
                                <li className='active'><a>{lang==='ru'? 'Заказы мероприятия' : 'Буйруктар ченөө'}</a></li>
                                <li><Link to='/historycinema'><a>{lang==='ru'? 'Заказы кино' : 'Буйруктар кино'}</a></Link></li>
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
                                                    <div className='name'>{element.event}</div>
                                                    <div className='marker'>
                                                        <i className='icon icon-marker' />
                                                        <span>{lang==='ru'? 'Место' : 'Место'}:</span> {element.where}
                                                    </div>
                                                    <div className='places'>
                                                        <i className='icon icon-ticket' />
                                                        <span>{lang==='ru'? 'Билеты' : 'Билеты'}</span>
                                                        <ul>
                                                            {element.seats.map((element1) => {
                                                                let date = element1[1].split('T')[0].split('-')
                                                                let time = element1[1].split('T')[1].split(':')
                                                                let dateTime = date[2]+' '+month[date[1]]+' '+date[0]+', '+time[0]+':'+time[1];
                                                                return (
                                                                    <li>
                                                                        <div className='place-desc'>{lang==='ru'? 'Место' : 'Орун'}: </div>
                                                                        <div className='place-price'>{element1[0].name}</div>
                                                                        <div className='place-desc'>{lang==='ru'? 'Цена' : 'Баа'}: </div>
                                                                        <div className='place-price'>{element1[0].price} сом</div>
                                                                        <div className='place-desc'>{lang==='ru'? 'Дата' : 'Дата'}:</div>
                                                                        <div className='place-price'>{dateTime}</div>
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
