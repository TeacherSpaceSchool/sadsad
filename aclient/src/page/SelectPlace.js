import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import * as appActions from '../redux/actions/app'
import { bindActionCreators } from 'redux'
import { getOther, getSecure } from '../redux/actions/app'
import { stringifyDateTime, where } from '../redux/constants/other'
import { getWhere, getRenderSeats } from '../where/index'

const About = React.memo(
    (props) =>{
        const { lang, city } = props.app;
        let [event, setEvent] = useState({});
        let [type, setType] = useState(1);
        let [cart, setCart] = useState([]);
        let [cartWithout, setCartWithout] = useState([]);
        let [fullPrice, setFullPrice] = useState(0);
        let urlData = props.location.pathname.split('/')[2].split('&');
        let dateTime = stringifyDateTime(urlData[1]);
        let [sector, setSector] = useState(undefined);
        let [part, setPart] = useState('part1');
        let [balance, setBalance] = useState('');
        let holderPart = async (part, event)=>{
            if (where[event.where.name]===1){
                setPart(part)
                setSeats(await getRenderSeats(event.where.data, event.price, urlData[1].replace(':00.000Z', ''), part, holderSeats, event))
            } else if (where[event.where.name]===3) {
                let _seats = event.where.data[urlData[1].replace(':00.000Z', '')][part];
                setSeats(_seats);
            }
        }
        let buy = async ()=>{
            if(balance<fullPrice){
                alert('Недостаточно средств!!!')
            } else {
                let _event_ = event;
                let seats = [];
                if (!_event_.where.data[_event_.date[0]].without) {
                    for (let i = 0; i < _event_.date.length; i++) {
                        let keys = Object.keys(_event_.where.data[_event_.date[i]]);
                        for (let i1 = 0; i1 < keys.length; i1++) {
                            for (let i2 = 0; i2 < _event_.where.data[_event_.date[i]][keys[i1]].length; i2++) {
                                for (let i3 = 0; i3 < _event_.where.data[_event_.date[i]][keys[i1]][i2].length; i3++) {
                                    if (_event_.where.data[_event_.date[i]][keys[i1]][i2][i3].status === 'hold')
                                        _event_.where.data[_event_.date[i]][keys[i1]][i2][i3].status = 'sold'
                                }
                            }
                        }
                    }
                    for(let i =0; i<cart.length; i++){
                        seats[i] = [cart[i], urlData[1]]
                    }
                } else {
                    let keys = Object.keys(cart);
                    let _cart = cart
                    for(let i =0; i<keys.length; i++){
                        let count = _cart[keys[i]]/parseInt(keys[i].replace(' сом'))
                        _cart[i] = {name: count+' мест в '+cartWithout[keys[i]], price: fullPrice}
                        seats[i] = [_cart[i], urlData[1]]
                    }
                }
                await getSecure({name: 'Купить', data: {event: _event_, fullPrice: fullPrice, seats: seats}})
                props.history.push('/historyevent')
            }
        }
        let holderSeats = async (seats, event, part)=>{
                setEvent(event);
                setSeats(await getRenderSeats(event.where.data, event.price, urlData[1].replace(':00.000Z', ''), part, holderSeats, event));
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
                    _fullPrice+=parseInt(_cart[i].price)
                }
                setFullPrice(_fullPrice)
                setCart(_cart)
        };
        let [seats, setSeats] = useState(undefined);
        useEffect(async ()=>{
            let data = await getOther({name: 'СобытиеПоНазванию', data: {city: city, search: urlData[0], skip: 0}});
            if(data.events.length>0){
                data = data.events[0];
                data.price.sort(function(a, b){return parseInt(a.price) - parseInt(b.price)});
                if(data.descriptionRu!==undefined && !Array.isArray(data.descriptionRu)){
                    data.descriptionRu = data.descriptionRu.split('|');
                    data.descriptionKg = data.descriptionKg.split('|');
                }
                setType(where[data.where.name])
                if (where[data.where.name]===1){
                    setSector(await getWhere(data.where.name, data.where.data, urlData[1].replace(':00.000Z', ''), holderPart, data))
                } else if (where[data.where.name]===2) {
                    setSeats(await getRenderSeats(data.where.data, data.price, urlData[1].replace(':00.000Z', ''), part, holderSeats, data))
                } else if (where[data.where.name]===3) {
                    setSector(await getWhere(data.where.name, data.where.data, urlData[1].replace(':00.000Z', ''), holderPart, data))
                }
            } else {
                data = {}
            }
            setEvent(data)
            data = await getSecure({name: 'Баланс'})
            setBalance(data.balance)
        },[]);
        return (
            <main className="main main-buy">
                <div className="container">
                    <div className="row">
                        <div className="col-12 event-name">
                            <div className="title">
                                <h1>{lang==='ru'? event.nameRu : event.nameKg}</h1>
                            </div>
                        </div>
                        <div className="col-12 col-md-9">
                            {type===1?
                                <>
                                <div className="order-first-stage">
                                    <div className="title-stage">
                                        1.{lang==='ru'? 'Выберите сектор' : 'Сектор тандоо'}
                                    </div>
                                    <div className="content-stage">
                                        <div className="content-header">
                                            <div className="content-title">{event.where!==undefined?event.where.name:null}</div>
                                            <div className="content_olace">{event.city}</div>
                                        </div>
                                        <div className="stage-sector">
                                            <div className="sector-info">
                                                <div className="sector-info_title">{lang==='ru'? 'Выберите сектор' : 'Сектор тандоо'}</div>
                                            </div>
                                            <div className="all-sectors">
                                                <div className="stadium-wrap">
                                                    <div className="stadium-holder">
                                                        {sector}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {seats!==undefined?
                                    <div className="order-two-stage">
                                        <div className="title-stage">
                                            2. {lang==='ru'? 'ВЫБОР МЕСТ' : 'ЖАЙГАШКАН ЖЕРДИ ТАНДОО'}
                                        </div>
                                        <div className="content-stage">
                                            <div className="stage-sector">
                                                {seats}
                                            </div>
                                        </div>
                                    </div>:null
                                }
                                {cart.length>0?
                                    <div className="order-three-stage">
                                        <div className="title-stage">
                                            3. {lang==='ru'? 'ОПЛАТА' : 'ТӨЛӨМДӨР'}
                                        </div>
                                        <div className="content-order">
                                            <div className="content-header">
                                                <div className="content-title">{lang==='ru'? 'Ваш заказ' : 'Сиздин заказ'}</div>
                                            </div>
                                            <div className="order">
                                                <div className="order_detail">
                                                    <div className="order_detail_title">{lang==='ru'? event.nameRu : event.nameKg}</div>
                                                    {
                                                        cart.map(option => {
                                                            return (
                                                                <>
                                                                <div className="order_detail_date">{dateTime}</div>
                                                                <div className="order_detail_place">{event.where!==undefined?event.where.name:null}</div>
                                                                <div className="order_detail_sector-place">{(lang==='ru'? 'Место: ' : 'Орун: ')+option.name}</div>
                                                                <div className="order_detail_sector">{(lang==='ru'? 'Цена: ' : 'Баа: ')+option.price+' сом'}</div>
                                                                <br/>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div className="order_sum-price">{lang==='ru'? 'К ОПЛАТЕ' : 'ТӨЛӨӨГӨ'}: <span> {' '+fullPrice} сом</span></div>
                                            </div>
                                                <div className="content-header">
                                                <div className="content-title">{lang==='ru'? 'ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ' : 'КОШУМЧА МААЛЫМАТ'}</div>
                                            </div>
                                            <div className="additional-info">
                                                <p>{lang==='ru'? <>В случае заполнения регистрационных данных и подтверждения оплаты Вы автоматически соглашаетесь с <a>условиями договора оферты.</a> </> : <>Сиздин төлөм маалыматты толтуруу учурунда, ошондой эле тастыктоо, сиз дароо эле <a> сунуш келишимдин шарттарына макул.</a> </>}</p>
                                            </div>
                                            <div className="order-button" onClick={()=>{buy()}}>
                                                <a>{lang==='ru'? 'Оплатить заказ' : 'Төлөө'}</a>
                                            </div>
                                        </div>
                                    </div>
                                    :null}
                                </>
                                :type===2?
                                    <>
                                    <div className="order-two-stage">
                                        <div className="title-stage">
                                            1. {lang==='ru'? 'ВЫБОР МЕСТ' : 'ЖАЙГАШКАН ЖЕРДИ ТАНДОО'}
                                        </div>
                                        <div className="content-stage">
                                            <div className="stage-sector">
                                                {seats}
                                            </div>
                                        </div>
                                    </div>
                                    {cart.length>0?
                                        <div className="order-three-stage">
                                            <div className="title-stage">
                                                2. {lang==='ru'? 'ОПЛАТА' : 'ТӨЛӨМДӨР'}
                                            </div>
                                            <div className="content-order">
                                                <div className="content-header">
                                                    <div className="content-title">{lang==='ru'? 'Ваш заказ' : 'Сиздин заказ'}</div>
                                                </div>
                                                <div className="order">
                                                    <div className="order_detail">
                                                        <div className="order_detail_title">{lang==='ru'? event.nameRu : event.nameKg}</div>
                                                        {
                                                            cart.map(option => {
                                                                return (
                                                                    <>
                                                                    <div className="order_detail_date">{dateTime}</div>
                                                                    <div className="order_detail_place">{event.where!==undefined?event.where.name:null}</div>
                                                                    <div className="order_detail_sector-place">{(lang==='ru'? 'Место: ' : 'Орун: ')+option.name}</div>
                                                                    <div className="order_detail_sector">{(lang==='ru'? 'Цена: ' : 'Баа: ')+option.price+' сом'}</div>
                                                                    <br/>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className="order_sum-price">{lang==='ru'? 'К ОПЛАТЕ' : 'ТӨЛӨӨГӨ'}: <span> {' '+fullPrice} сом</span></div>
                                                </div>
                                                <div className="content-header">
                                                    <div className="content-title">{lang==='ru'? 'ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ' : 'КОШУМЧА МААЛЫМАТ'}</div>
                                                </div>
                                                <div className="additional-info">
                                                    {lang==='ru'? <p>В случае заполнения регистрационных данных и подтверждения оплаты Вы автоматически соглашаетесь с <a>условиями договора оферты.</a></p> : <p>Сиздин төлөм маалыматты толтуруу учурунда, ошондой эле тастыктоо, сиз дароо эле <a> сунуш келишимдин шарттарына макул.</a></p>}
                                                </div>
                                                <div className="order-button" onClick={()=>{buy()}}>
                                                    <a>{lang==='ru'? 'Оплатить заказ' : 'Төлөө'}</a>
                                                </div>
                                            </div>
                                        </div>
                                        :null}
                                    </>
                                    :
                                    <>
                                    <div className="order-first-stage">
                                        <div className="title-stage">
                                            1.{lang==='ru'? 'Выберите сектор' : 'Сектор тандоо'}
                                        </div>
                                        <div className="content-stage">
                                            <div className="content-header">
                                                <div className="content-title">{event.where!==undefined?event.where.name:null}</div>
                                                <div className="content_olace">{event.city}</div>
                                            </div>
                                            <div className="stage-sector">
                                                <div className="sector-info">
                                                    <div className="sector-info_title">{lang==='ru'? 'Выберите сектор' : 'Сектор тандоо'}</div>
                                                </div>
                                                <div className="all-sectors">
                                                    <div className="stadium-wrap">
                                                        <div className="stadium-holder">
                                                            {sector}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {seats!==undefined?
                                        <div className="order-first-stage">
                                            <div className="title-stage">
                                                2. {lang==='ru'? 'ВЫБЕРИТЕ КОЛ-ВО БИЛЕТОВ' : 'МАРШРУТУ САНЫН ТАНДОО'}
                                            </div>
                                            <div className="content-stage">
                                                <div className="content-header">
                                                    <div className="content-title">{event.where!==undefined?event.where.name:null}</div>
                                                    <div className="content_olace">{event.city}</div>
                                                </div>
                                                <div className="stage-sector ">
                                                    <div className="table-tickets-order">
                                                        {console.log(seats)}
                                                        {seats!==undefined?seats.map((element) => {
                                                            return(
                                                                <div className="ticket-order-row">
                                                                    <div className="person">{lang==='ru'? 'Билеты' : 'Билеты'}</div>
                                                                    <div className="price">{lang==='ru'? 'Цена' : 'Баа'}: <b>{element.price.price} сом</b></div>
                                                                    <div className="amount-ticket">
                                                                        <div className="amount-control amount-minus" onClick={()=>{
                                                                            if(cart[element.price.price+' сом']!==undefined){
                                                                                let _cart = cart;
                                                                                _cart[element.price.price+' сом']=parseInt(_cart[element.price.price+' сом'])-parseInt(element.price.price)
                                                                                if(parseInt(_cart[element.price.price+' сом'])/parseInt(element.price.price)===0) {
                                                                                    delete _cart[element.price.price + ' сом']
                                                                                }
                                                                                setCart(_cart)
                                                                                let keys = Object.keys(_cart)
                                                                                let _fullPrice = 0
                                                                                for(let i=0; i<keys.length; i++){
                                                                                    _fullPrice+=parseInt(_cart[keys[i]])
                                                                                }
                                                                                setFullPrice(_fullPrice)
                                                                            }
                                                                        }}>-</div>
                                                                        <span className="amount-view" data-count={0}>{cart[element.price.price+' сом']!==undefined?parseInt(cart[element.price.price+' сом'])/parseInt(element.price.price):'0'}</span>
                                                                        <div className="amount-control amount-plus" onClick={()=>{
                                                                            let _cart = cart[element.price.price+' сом']!==undefined?parseInt(cart[element.price.price+' сом'])/parseInt(element.price.price):0;
                                                                            let _cartWithout = cartWithout
                                                                            if(_cart<parseInt(element.free)){
                                                                                _cart = cart;
                                                                                if (_cart[element.price.price+' сом']===undefined){
                                                                                    _cart[element.price.price+' сом']=0
                                                                                }
                                                                                _cart[element.price.price+' сом']=parseInt(_cart[element.price.price+' сом'])+parseInt(element.price.price)
                                                                                setCart(_cart)
                                                                                _cartWithout[element.price.price+' сом']=part
                                                                                setCartWithout(_cartWithout)
                                                                                let keys = Object.keys(_cart)
                                                                                let _fullPrice = 0
                                                                                for(let i=0; i<keys.length; i++){
                                                                                    _fullPrice+=parseInt(_cart[keys[i]])
                                                                                }
                                                                                setFullPrice(_fullPrice)
                                                                            }
                                                                        }}>+</div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }):null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :null}
                                        {Object.keys(cart).length>0?
                                            <div className="order-three-stage">
                                                <div className="title-stage">
                                                    2. {lang==='ru'? 'ОПЛАТА' : 'ТӨЛӨМДӨР'}
                                                </div>
                                                <div className="content-order">
                                                    <div className="content-header">
                                                        <div className="content-title">{lang==='ru'? 'Ваш заказ' : 'Ваш заказ'}</div>
                                                    </div>
                                                    <div className="order">
                                                        <div className="order_detail">
                                                            <div className="order_detail_title">{lang==='ru'? event.nameRu : event.nameKg}</div>
                                                            {
                                                                Object.keys(cart).map(option => {
                                                                    return (
                                                                        <>
                                                                        <div className="order_detail_date">{dateTime}</div>
                                                                        <div className="order_detail_place">{event.where!==undefined?event.where.name:null}</div>
                                                                        <div className="order_detail_sector-place">{(lang==='ru'? 'Место: ' : 'Место: ')+option}</div>
                                                                        <div className="order_detail_sector">{(lang==='ru'? 'Цена: ' : 'Баа: ')+cart[option]+' сом'}</div>
                                                                        <br/>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        <div className="order_sum-price">{lang==='ru'? 'К ОПЛАТЕ' : 'ТӨЛӨӨГӨ'}: <span> {' '+fullPrice} сом</span></div>
                                                    </div>
                                                    <div className="content-header">
                                                        <div className="content-title">{lang==='ru'? 'ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ' : 'КОШУМЧА МААЛЫМАТ'}</div>
                                                    </div>
                                                    <div className="additional-info">
                                                        {lang==='ru'? <p>В случае заполнения регистрационных данных и подтверждения оплаты Вы автоматически соглашаетесь с <a>условиями договора оферты.</a></p> : <p>Сиздин төлөм маалыматты толтуруу учурунда, ошондой эле тастыктоо, сиз дароо эле <a> сунуш келишимдин шарттарына макул.</a></p>}
                                                    </div>
                                                    <div className="order-button" onClick={()=>{buy()}}>
                                                        <a>{lang==='ru'? 'Оплатить заказ' : 'Төлөө'}</a>
                                                    </div>
                                                </div>
                                            </div>
                                            :null}
                                    </>
                            }
                        </div>
                        <div className="col-12 col-md-3 sidebar-wrap">
                            <div className="sidebar" id="fixed-sidebar">
                                <div className="sidebar_title">{dateTime}</div>
                                <div className="sidebar_place">{event.where!==undefined?event.where.name:null}</div>
                                <div className="sidebar_ticket-info">
                                    <div className="ticket-info-line">
                                        <span>{lang==='ru'? 'Билеты' : 'Билеты'}</span>
                                    </div>
                                    {type===3?
                                        Object.keys(cart).length>0?
                                            Object.keys(cart).map(option => {
                                                return (
                                                    <div className="ticket-info-line">
                                                        <b>{lang==='ru'? 'Место' : 'Место'}:</b>&nbsp;{option}&nbsp;
                                                        <div className="price"><b>{lang==='ru'? 'Цена' : 'Баа'}:</b>&nbsp;{cart[option]} сом</div>
                                                    </div>
                                                )
                                            }):null
                                        :
                                        cart.length>0?
                                        cart.map(option => {
                                            return (
                                                <div className="ticket-info-line">
                                                    <b>{lang==='ru'? 'Место' : 'Место'}:</b>&nbsp;{option.name}&nbsp;
                                                    <div className="price"><b>{lang==='ru'? 'Цена' : 'Баа'}:</b>&nbsp;{option.price} сом</div>
                                                </div>
                                            )
                                        })
                                        :null}
                                    <div className="ticket-info-line">
                                        <span>{lang==='ru'? 'Итого' : 'Итого'}: {fullPrice} сом</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    })

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

export default connect(mapStateToProps, mapDispatchToProps)(About);
