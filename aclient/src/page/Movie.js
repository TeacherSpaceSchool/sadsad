import React, {useState, useEffect} from 'react';
import { getOther } from '../redux/actions/app'
import { connect } from 'react-redux'
import * as appActions from '../redux/actions/app'
import { bindActionCreators } from 'redux'
import { stringifyDate, stringifyTime } from '../redux/constants/other'
import Render from '../component/Render/Render'
import { getSecure } from '../redux/actions/app'
import { month } from '../redux/constants/other'
import { mainWindow } from '../App'

const Event =  React.memo(
    (props) =>{
        const { lang, city } = props.app;
        const { authenticated } = props.user;
        let [date, setDate] = useState(new Date());
        let [selectedDate, setSelectedDate] = useState(undefined);
        let [seances, setSeances] = useState([]);
        let _date = new Date()
        let [cart, setCart] = useState([]);
        let [fullPrice, setFullPrice] = useState(0);
        let [seance, setSeance] = useState(undefined);
        let dates = [new Date(), new Date(_date.setDate(_date.getDate() + 1)), new Date(_date.setDate(_date.getDate() + 1)), new Date(_date.setDate(_date.getDate() + 1)), new Date(_date.setDate(_date.getDate() + 1))];
        let [showRender, setShowRender] = useState({});
        let [movie, setMovie] = useState({});
        let holderSeats = async (seats, seance)=>{
                setSeance(seance);
                let _cart = cart;
                let index = -1;
                _cart.find((element, position)=>{
                    if(JSON.stringify(element)===JSON.stringify(seats))
                        index = position
                });
                if (index===-1)
                    _cart.push(seats);
                else
                    _cart.splice(index, 1);
                let _fullPrice = 0;
                for(let i=0; i<_cart.length; i++){
                    _fullPrice+=parseInt(_cart[i].priceSelect)
                }
                setFullPrice(_fullPrice)
                setCart(_cart)
        };
        useEffect(async ()=>{
            let data = await getOther({name: 'КиноПоНазванию', data: {name: props.location.pathname.split('/')[2]}});
            if(data==undefined){
                props.history.push('/');
                window.location.reload();
            }
            await setMovie(data)
            if(authenticated){
                data = await getSecure({name: 'Баланс'})
                setBalance(data.balance)
            } else {
                setBalance(0)
            }
        },[]);
        useEffect(async ()=>{
            if(movie.name!==undefined){
                if(selectedDate.cinema!==undefined){
                    let _showRender = showRender
                    let keys = Object.keys(_showRender)
                    for(let i=0; i<keys.length; i++) {
                        _showRender[keys[i]] = false
                    }
                    _showRender[selectedDate.cinema] = true
                    setShowRender(_showRender)
                    let data = await getOther({name: 'СеансПоДате', data: {movie: movie._id, cinema: selectedDate.cinema, realDate: selectedDate.date}});
                    setSeance(data)
                } else {
                    setSeance(undefined)
                }
                setCart([])
                setFullPrice(0)
            }
        },[selectedDate]);
        useEffect(async ()=>{
            if(movie.name!==undefined){
                let data = await getOther({name: 'КиноПоДате', data: {movie: movie._id, realDate: date}});
                setSeances(data)
                let _showRender = {}
                for(let i=0; i<data.length; i++){
                    _showRender[data[i].name] = false
                }
                setShowRender(_showRender)
                setSelectedDate({})
            }
        },[date]);
        let [balance, setBalance] = useState('');
        let buy = async ()=>{
            if(!authenticated) {
                alert('Пожалуйста пройдите регистрацию!!!')
            } else {
                if(balance<fullPrice){
                    alert('Недостаточно средств!!!')
                } else {
                    let seats = [];
                    let _seance = seance;
                    for (let i = 0; i < _seance.seats.length; i++) {
                        for (let i1 = 0; i1 < _seance.seats[i].length; i1++) {
                            if(_seance.seats[i][i1].status==='hold')
                                _seance.seats[i][i1].status='sold'
                        }
                    }

                    let date = selectedDate.date.split('T')[0].split('-')
                    let time = selectedDate.date.split('T')[1].split(':')
                    let dateTime = date[2]+' '+month[date[1]]+' '+date[0]+', '+time[0]+':'+time[1];
                    for(let i =0; i<cart.length; i++){
                        cart[i].date = dateTime
                        seats[i] = cart[i]
                    }
                    await getSecure({name: 'КупитьКино', data: {image: movie.image, event: _seance, movie: movie.name, cinema: _seance.cinema.split('|')[0], hall: _seance.cinema.split('|')[1], fullPrice: fullPrice, seats: seats}})
                    props.history.push('/historycinema')
                }
            }

        }
        return (
            <>
            <div className='main-buy kino-detail'>
                <div className='film-detail-wrap'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 trailer-wrap'>
                                <div className='trailer'>
                                    <div style={{height: '85px'}}/>
                                    <div className='trailer-video-wrap' id='trailer-video' style={{display: 'none'}}>
                                        <video width='100%' controls id='trailer-video-18891' className='trailer-video' src='https://api.kinohod.ru/o/3f/32/3f324763-9611-45c7-9fbc-aa57e8771237.mp4' poster='https://api.kinohod.ru/c/900x450/8d/c4/8dc494f8-ad0b-4505-bec7-d86e76a0fa6b.jpg' />
                                    </div>
                                    <div className='trailer_description'>
                                        <div className='trailer_title'>
                                            <h1 className='name'>{movie.name}</h1>
                                            <div className='genre'>{movie.genre}</div>
                                            <div className='age'>{movie.ageCategory}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='film-detail'>
                            <div className='row'>
                                <div className='col-3'>
                                    <div className='film-detail_image'>
                                        <img src={movie.imageThumbnail} onLoad={(e)=>{if(e.target.src.includes('thumbnail')){e.target.src=movie.image}}} alt />
                                    </div>
                                </div>
                                <div className='col-5'>
                                    <div className='film-detail_info'>
                                        <table className='table'>
                                            <tbody>
                                            {mainWindow.current.offsetWidth>700?
                                                <>
                                                <tr>
                                                    <td className='name'>Длительность:</td>
                                                    <td className='prop'>{movie.duration}</td>
                                                </tr>
                                                <tr>
                                                    <td className='name'>Премьера:</td>
                                                    <td className='prop'>{movie.premier}</td>
                                                </tr>
                                            <tr>
                                                <td className='name'>Режиссёры:</td>
                                                <td className='prop'>{movie.producers}</td>
                                            </tr>
                                            <tr>
                                                <td className='name'>В ролях:</td>
                                                <td className='prop'>{movie.actors}</td>
                                            </tr>
                                                </>
                                                :null}
                                            </tbody></table>
                                    </div>
                                </div>
                                {mainWindow.current.offsetWidth>700?
                                     <div className='col-4'>
                                        <div className='film-detail_description'>
                                            <p>{movie.description}</p>
                                        </div>
                                    </div>
                                    :null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='schedule-wrap'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='schedule'>
                                    <div className='schedule_filter-section'>
                                        <div className='schedule_title'>
                                            <h2>Расписание сеансов</h2>
                                        </div>
                                        <div className='schedule_days-list'>
                                            {mainWindow.current.offsetWidth>700?
                                            <div className='row'>
                                                <div className='col-2'>
                                                    <a className={date===dates[0]?'day-item js-day-item active':'day-item js-day-item'} onClick={()=>{setDate(dates[0])}}>
                                                        <span className='date'>{stringifyDate(dates[0])}</span>
                                                        Сегодня
                                                    </a>
                                                </div>
                                                <div className='col-2'>
                                                    <a className={date===dates[1]?'day-item js-day-item active':'day-item js-day-item'} onClick={()=>{setDate(dates[1])}}>
                                                        <span className='date'>{stringifyDate(dates[1])}</span>
                                                        Завтра
                                                    </a>
                                                </div>
                                                <div className='col-2'>
                                                    <a className={date===dates[2]?'day-item js-day-item active':'day-item js-day-item'} onClick={()=>{setDate(dates[2])}}>
                                                        <span className='date'>{stringifyDate(dates[2])}</span>
                                                    </a>
                                                </div>
                                                <div className='col-2'>
                                                    <a className={date===dates[3]?'day-item js-day-item active':'day-item js-day-item'} onClick={()=>{setDate(dates[3])}}>
                                                        <span className='date'>{stringifyDate(dates[3])}</span>
                                                    </a>
                                                </div>
                                                <div className='col-2'>
                                                    <a className={date===dates[4]?'day-item js-day-item active':'day-item js-day-item'} onClick={()=>{setDate(dates[4])}}>
                                                        <span className='date'>{stringifyDate(dates[4])}</span>
                                                    </a>
                                                </div>
                                            </div>
                                                :<>
                                                <div className='row'>
                                                    <div className='col-2'>
                                                        <a className={date===dates[0]?'day-item js-day-item active':'day-item js-day-item'} onClick={()=>{setDate(dates[0])}}>
                                                            <span className='date'>{stringifyDate(dates[0])}</span>
                                                            Сегодня
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-2'>
                                                        <a className={date===dates[1]?'day-item js-day-item active':'day-item js-day-item'} onClick={()=>{setDate(dates[1])}}>
                                                            <span className='date'>{stringifyDate(dates[1])}</span>
                                                            Завтра
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-2'>
                                                        <a className={date===dates[2]?'day-item js-day-item active':'day-item js-day-item'} onClick={()=>{setDate(dates[2])}}>
                                                            <span className='date'>{stringifyDate(dates[2])}</span>
                                                            Послезавтра
                                                        </a>
                                                    </div>
                                                </div>
                                                </>}
                                        </div>
                                        <div className='map'>
                                            <div className='row'>
                                                <div className='col-12'>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='cinema-list-container'>
                    {seances.map((element, idx) => {
                        return (
                            <>
                            <div className='cinema-row'>
                                <div className='container'>
                                    <div className='place'>
                                        <div className='name'>
                                            <div className='title'>
                                                <a className='cinema-icon' />
                                                <a>{element.name.split('|')[0]}</a>
                                            </div>
                                        </div>
                                        <div className='address'>
                                            {element.name.split('|')[1]}
                                        </div>
                                    </div>
                                    <div className='right'>
                                        <div className='section'>
                                            <div className='times'>
                                                {element.seance.map((element1, idx1) => {
                                                    return (
                                                        <>
                                                        <input type='radio' onClick={()=>{setSelectedDate({date: element1.realDate, cinema: element.name})}} />
                                                        <label htmlFor={'time'+idx+idx1} onClick={()=>{setSelectedDate({date: element1.realDate, cinema: element.name})}} >
                                                            <b>{element1.type}</b>&nbsp;{element1.price}&nbsp;сом&nbsp;{stringifyTime(element1.realDate)}</label>
                                                        </>
                                                )})}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {showRender[element.name]?
                                <div className='schem-container'>
                                    <div className='change-place'>
                                        <div className='change-place_content'>
                                            {seance!==undefined&&seance.seats!==undefined?
                                            <Render seats={seance.seats} holderSeats={holderSeats} seance={seance}/>:null}
                                        </div>
                                        <div className='change-place_footer'>
                                            <div className='container wrap'>
                                                <div className='amount-ticket'>
                                                    Всего <br />
                                                    {cart.length} билетов
                                                </div>
                                                <div className='ticket'>
                                                    {cart.map((item) => {
                                                        return(
                                                            <div>
                                                                <span className='white'>{item.name}</span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                <div className='price'>
                                                    <div>
                                                        Итого:
                                                        <span>{fullPrice}&nbsp;сом</span>
                                                    </div>
                                                </div>
                                                <div className='order-wrap'>
                                                    <a onClick={buy} className='btn btn-primary order-btn'>Оформить заказ</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='order-form'>
                                        <form action='#'>
                                            <div className='ticket-information'>
                                                <div className='container'>
                                                    <div className='row'><div className='col-12'><span className='back-to-schem'>Назад</span></div></div>
                                                    <div className='row'>
                                                        <div className='col-4'>
                                                            <div className='ticket_img'>
                                                                <img src='img/film-detail1.jpg' alt />
                                                            </div>
                                                        </div>
                                                        <div className='col-3 ticket_info-wrap'>
                                                            <div className='ticket_info'>
                                                                <div className='ticket_title'>Ёлки Последние</div>
                                                                <div className='ticket_date'>6 января, вс, 11:00
                                                                    <br />
                                                                    Зал 7
                                                                </div>
                                                                <div className='ticket_labels'>
                                                                    <div className='label'>Обычные сеансы 2D</div>
                                                                    <div className='label'>6+</div>
                                                                </div>
                                                                <div className='ticket_place'>
                                                                    <div className='column'>ряд <span className='white'>2</span></div>
                                                                    <div className='place'>место <span className='white'>8</span></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-5'>
                                                            <div className='ticket_form'>
                                                                <div className='form-group name'>
                                                                    <input type='text' className='form-control' placeholder='Фамилия Имя' aria-required='true' />
                                                                    <div className='help-block' />
                                                                </div>
                                                                <div className='email'>
                                                                    <div className='form-group name'>
                                                                        <input type='text' className='form-control' placeholder='Email' aria-required='true' />
                                                                        <div className='help-block' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='change-place_footer info_footer'>
                                                    <div className='container wrap'>
                                                        <div className='info'>
                                                            Нажимая кнопку «Оплатить», вы соглашаетесь с <a>условиями покупки</a>.
                                                        </div>
                                                        <div className='price'>
                                                            <div>
                                                                Итого:
                                                                <span>1740 руб.</span>
                                                            </div>
                                                        </div>
                                                        <div className='order-wrap'>
                                                            <a className='btn btn-primary order-btn'>Оплатить</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                :null}
                            </>
                        )})}
                </div>
            </div>
            </>
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
