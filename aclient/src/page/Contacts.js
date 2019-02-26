import React, {useState, useEffect} from 'react';
import { getOther } from '../redux/actions/app'
import { connect } from 'react-redux'
import * as appActions from '../redux/actions/app'
import { bindActionCreators } from 'redux'
import { Map, YMaps } from 'react-yandex-maps';
import { mainWindow } from '../App';

const Contacts =  React.memo(
    (props) =>{
        const { lang } = props.app;
        let [contacts, setContacts] = useState({});
        let [personals, setPersonals] = useState([]);
        let [socials, setSocials] = useState([]);
        let [size, setSize] = useState(600);
        let [coord, setCoord] = useState([55.75, 37.57]);
        useEffect(async ()=>{
            let data = await getOther({name: 'Контакты'})
            console.log(data.coords.split(', '))
            setCoord(data.coords.split(', '))
            await setContacts(data)
            data = await getOther({name: 'Социалки'})
            await setSocials(data)
            data = await getOther({name: 'Персонал'})
            await setPersonals(data)
            setSize(mainWindow.current.offsetWidth>600? [600, 600]: [mainWindow.current.offsetWidth, 200])
        },[]);
        return (
            <>
            <YMaps>
                <main className='main  main-about main-contacts'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-lg-8'>
                            <div className='contacts-wrap'>
                                <div className='contacts-title'>
                                    <h1>
                                        {lang==='ru'? 'КОНТАКТЫ KASSIR.KG' : 'КОНТАКТЫ KASSIR.KG'}
                                    </h1>
                                </div>
                                <div className='center'><b>{lang==='ru'? 'Центральная касса' : 'Борбордук касса'}:</b> {contacts.cashbox}</div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-lg-8 map-wrap'>
                            <div className='map'>
                                <Map height={size[1]} width={size[0]} defaultState={{ center: contacts.coords!==undefined?contacts.coords.split(', '):[0,0], zoom: 16 }} />
                            </div>
                        </div>
                        <div className='col-12 col-lg-4 address-wrap'>
                            <div className='address-wrap_item'>
                                <div className='address-wrap_title'>
                                    {lang==='ru'? 'Адрес офиса' : 'Дареги'}:
                                </div>
                                <div className='address-wrap_text'>
                                    {contacts.address}
                                </div>
                            </div>
                            <div className='address-wrap_item'>
                                <div className='address-wrap_title'>
                                    {lang==='ru'? 'Бронирование билетов. Информационные вопросы.' : 'Бронирование билетов. Маалымат суроолор.'}:
                                </div>
                                <div className='address-wrap_text'>
                                    {lang==='ru'? '31 декабря прием звонков до 18.00' : '31 декабря чакырууну кабыл алуу до 18.00'}<br/>
                                    {lang==='ru'? '1 января выходной!' : '1 января выходной!'}<br/>
                                    {contacts.booking}
                                </div>
                            </div>
                            <div className='address-wrap_item'>
                                <div className='address-wrap_title'>
                                    {lang==='ru'? 'Связь с сотрудниками компании' : 'Кызматкерлери менен байланыш'}:
                                </div>
                                <div className='address-wrap_text'>
                                    {contacts.connection}
                                </div>
                            </div>
                            <div className='address-wrap_item'>
                                <div className='address-wrap_title'>
                                    {lang==='ru'? 'Вопросы по возврату билетов (будние дни с 10 до 18 часов)' : 'Кайра маршруту боюнча суроолор (10 18 саатка чейин иш күндөрү)'}:
                                </div>
                                <div className='address-wrap_text'>
                                    {lang==='ru'? '30,31 декабря и 1,7 января возвраты не обрабатываются! ' : '30,31 декабря и 1,7 января төлөп кабыл алынбайт!'}
                                    <br/>
                                    <a href='#'>
                                        {contacts.return1}
                                    </a>
                                </div>
                            </div>
                            <div className='address-wrap_item'>
                                <div className='address-wrap_title'>
                                    {lang==='ru'? 'Общие вопросы (будние дни с 10 до 18 часов)' : 'Жалпы суроолор (10 18 саатка чейин иш күндөрү)'}:
                                </div>
                                <div className='address-wrap_text'>
                                    <a href='#'>
                                        {contacts.general}
                                    </a>
                                </div>
                            </div>
                            <div className='address-wrap_item'>
                                <div className='address-wrap_title'>
                                    {lang==='ru'? 'Вопросы сотрудничества и для СМИ' : 'Кызматташуу маселелери жана үчүн СМИ'}:
                                </div>
                                <div className='address-wrap_text'>
                                    <a href='#'>
                                        {contacts.cooperation}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-xl-12 heading'>
                            <div className='heading-title_wrap no-bg'>
                                <h2>
                                    <span>{lang==='ru'? 'Руководство отделений' : 'Иш кагаздарын жүргүзүү'}:</span>
                                </h2>
                            </div>
                            <div className='heading-title_line no-bg_line' />
                        </div>{/* \-heading*/}
                    </div>{/* \-row */}
                    <div className='row'>
                        <div className='col-12'>
                            {personals.map((element) => {
                                return (
                                    <>
                                    <p><b>{lang==='ru'? element.whoRu : element.whoKg}</b></p>
                                    <p><a href='#'>{element.contact}</a></p>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-xl-12 heading'>
                            <div className='heading-title_wrap no-bg'>
                                <h2>
                                    <span>{lang==='ru'? 'Группы в соц. сетях.' : 'Топтор в соц. сетях.'}</span>
                                </h2>
                            </div>
                            <div className='heading-title_line no-bg_line' />
                        </div>{/* \-heading*/}
                    </div>{/* \-row */}
                    <div className='row'>
                        <div className='col-12 social-wrap'>
                            {socials.map((element) => {
                                return(
                                    <div className='social-wrap_item'>
                                        <a className='social-wrap_link' href={element.url}>
                                            <div className='social-wrap_icon'>
                                                <img src = {element.image}/>
                                            </div>
                                        </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
