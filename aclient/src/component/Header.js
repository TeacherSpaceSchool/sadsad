import React, { useState, useEffect } from 'react';
import { getOther } from '../redux/actions/app'
import { connect } from 'react-redux'
import * as appActions from '../redux/actions/app'
import * as userActions from '../redux/actions/user'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { scrollToTop } from '../App'
import { mainWindow } from '../App'
export const mobileMenu = React.createRef();
export const closeSearchMenu = React.createRef();

const Header =  React.memo(
    (props) =>{
        const { city, lang, search } = props.app;
        const { authenticated } = props.user;
        const { setData } = props.appActions;
        const { logout } = props.userActions;
        let [phones, setPhones] = useState([]);
        let [emails, setEmails] = useState([]);
        let [logoMain, setLogoMain] = useState('');
        let handleSearch =  (event) => {
            if(event.target.value.length>0){
                setData({name: 'Поиск', data: event.target.value})
                props.history.push('/search');
            } else {
                props.history.push('/');
                window.location.reload();
            }
        };
        let [cities, setCities] = useState([]);
        useEffect(async ()=>{
            let data = await getOther({name: 'Телефон'})
            if(data!=undefined)
                await setPhones(data)
            data = await getOther({name: 'Email'})
            if(data!=undefined)
                await setEmails(data)
            data = await getOther({name: 'LogoMain'})
            if(data!=undefined)
                await setLogoMain(data.image)
            data = await getOther({name: 'Города'})
            if(data!=undefined)
                await setCities(data)
            if(city==='')setData({name: 'Город', data: data[0]})
        },[]);
        return (
            <>
            {/*header*/}
            <header className='header'>
                <div className='top'>
                    <div className='container'>
                        <div className='row mobile-header-wrap'>
                            <div className='col-12 mobile-header'>
                                {/*mobile-menu*/}
                                <div ref={mobileMenu} className='toggle-menu-btn'>
                                    <i className='toggle-menu-btn_icon' />
                                </div>
                                <div className='mobile-menu-wrap'>
                                    <div className='mobile-menu-header'>
                                        <ul className='mobile-menu-header_menu'>
                                            <li className='header-menu_current dont-selected-text'>{city===''? (lang==='ru'? 'Выберите город' : 'Шаар тандоо') : city}</li>
                                            <ul className='mobile-menu-header-menu_dropdown'>
                                                {cities.map((element) => {
                                                    if(element!==city)
                                                        return <li style={{margin: '5px'}}><Link to='/' onClick={async()=>{await setData({name: 'Город', data: element});window.location.reload()}}>{element}</Link></li>
                                                    else
                                                        return null
                                                })}
                                                <li><a href='https://kassir.kz/'>Алматы</a></li>
                                            </ul>
                                        </ul>
                                    </div>
                                    <div className='mobile-menu_content'>
                                        <ul className='main-menu'>
                                            <li className='main-menu_item'><Link onClick={()=>{mobileMenu.current.click();setData({name: 'Дата', data: ''});setData({name: 'Поиск', data: ''});setData({name: 'Жанр', data: 'Концерты'})}} to='/events'><a><i className='concert-icon' />{lang==='ru'? 'Концерты' : 'Концерты'}</a></Link></li>
                                            <li className='main-menu_item'><Link onClick={()=>{mobileMenu.current.click();setData({name: 'Дата', data: ''});setData({name: 'Поиск', data: ''});setData({name: 'Жанр', data: 'Мастер Классы'})}} to='/events'><a><i className='theater-icon' />{lang==='ru'? 'Мастер Классы' : 'Мастер Классы'}</a></Link></li>
                                            <li className='main-menu_item'><Link onClick={()=>{mobileMenu.current.click();setData({name: 'Дата', data: ''});setData({name: 'Поиск', data: ''});setData({name: 'Жанр', data: 'Детям'})}} to='/events'><a><i className='show-icon' />{lang==='ru'? 'Детям' : 'Детям'}</a></Link></li>
                                            <li className='main-menu_item'><Link onClick={()=>{mobileMenu.current.click();setData({name: 'Дата', data: ''});setData({name: 'Поиск', data: ''});setData({name: 'Жанр', data: 'Спорт'})}} to='/events'><a><i className='sport-icon' />{lang==='ru'? 'Спорт' : 'Спорт'}</a></Link></li>
                                            <li className='main-menu_item'><Link onClick={()=>{mobileMenu.current.click();setData({name: 'Дата', data: ''});setData({name: 'Поиск', data: ''});setData({name: 'Жанр', data: 'Туризм'})}} to='/events'><a><i className='children-icon' />{lang==='ru'? 'Туризм' : 'Туризм'}</a></Link></li>
                                            <li className='main-menu_item'><Link onClick={()=>{mobileMenu.current.click();setData({name: 'Дата', data: ''});setData({name: 'Поиск', data: ''})}} to='/cinema'><a><i className='movie-icon' />{lang==='ru'? 'Кино' : 'Кино'}</a></Link></li>
                                        </ul>
                                    </div>
                                    <div className='mobile-menu-footer'>
                                        <ul className='footer-menu'>
                                            <li className='footer-menu_item'><a data-toggle='modal' onClick={()=>{mobileMenu.current.click();scrollToTop()}} data-target='#exampleModal'>{lang==='ru'? 'Вход/Регистрация' : 'Кирүү/Регистрация'}</a></li>
                                            <li className='footer-menu_item'><Link to='/offer' onClick={()=>{mobileMenu.current.click();scrollToTop()}}><a>{lang==='ru'? 'Публичная оферта' : 'Коомдук сунуш'}</a></Link></li>
                                        </ul>
                                    </div>
                                </div>
                                {/*/-mobile-menu*/}
                                {/*mobile-logo*/}
                                <Link to='/' style={{minWidth: '200px'}} onClick={()=>{window.location.reload()}}>
                                    <div className='mobile-logo-wrap'>
                                        <a className='mobile-logo' href='/'>
                                            <img src={logoMain} alt />
                                        </a>
                                    </div>
                                </Link>
                                {/*/-mobile-logo*/}
                                {/*mobile-search*/}
                                <div className='search-btn-wrap '>
                                    <div className='search-btn' id='searchBtn'>
                                        <i className='search-btn_icon' />
                                    </div>
                                    <div className='mobile-search-wrap'>
                                        <div className='form-group'>
                                            <input type='text' className='form-control' value={search} onChange={handleSearch}  placeholder={lang==='ru'? 'Поиск по сайту' : 'Сайттан издөө'} />
                                        </div>
                                        <div onClick={()=>{closeSearchMenu.current.click()}} className='search-tickets dont-selected-text'>
                                            <div className='search-tickets_btn'>{lang==='ru'? 'Найти билеты' : 'Билеттерди табуу'}</div>
                                        </div>
                                        <div className='close-search-wrap dont-selected-text'>
                                            <div ref={closeSearchMenu} className='close-search-btn'>{lang==='ru'? 'Закрыть' : 'Жакын'}</div>
                                        </div>
                                    </div>{/*!-mobile-search-wrap*/}
                                </div>
                                {/*/-mobile-search*/}
                                {!authenticated?
                                    null
                                    :
                                        <div className='mobile-auth-wrap'>
                                            {/*<i class='mobile-auth_icon'></i>*/}
                                            <Link to='/profile' onClick={()=>{scrollToTop()}}>
                                                <svg className='mobile-auth_icon' width={24} height={24} viewBox='0 0 12.68 12.688'>
                                                    <g><path d='M.8 5.604l1.6 6.094 1.02.96h5.79l1.04-.96 1.63-6.094H.8zm3.16 1.548V7.15a.785.785 0 1 1-.79.786.794.794 0 0 1 .79-.784zm.022 3.978a.787.787 0 0 1 .003-1.57h.004v-.002a.785.785 0 1 1-.008 1.572zM6.32 7.103V7.1a.792.792 0 1 1-.8.793.8.8 0 0 1 .8-.79zm.03 3.98a.8.8 0 0 1 0-1.598.8.8 0 1 1 0 1.6zm2.314.01a.817.817 0 0 1-.814-.817.823.823 0 0 1 .82-.814V9.46c.45 0 .815.367.813.818a.815.815 0 0 1-.82.815zm.04-2.36a.79.79 0 0 1-.784-.79.8.8 0 0 1 .8-.79V7.15a.793.793 0 0 1-.017 1.584zM12.68 4.793V3.22H7.17L4.96.007l-1.4.8 1.665 2.415H0v1.573z' />
                                                    </g>
                                                </svg>
                                            </Link>
                                        </div>
                                }
                                </div>
                        </div>{/*/-mobile header*/}
                        <div className='row header-row'>
                            <div className='col-md-3'>
                                <div className='sity-select-box'>
                                    <ul className='sity-select-box_menu'>
                                        <li className='sity-dropdown-wrap'>
                                            <div className='city-name dont-selected-text'>{city===''? (lang==='ru'? 'Выберите город' : 'Шаар тандоо') : city}</div>
                                            <ul className='sity-select_dropdown'>
                                                <div className='dropdown-arrow' />
                                                {cities.map((element) => {
                                                    if(element!==city)
                                                        return <li style={{margin: '5px'}}><Link to='/' onClick={async()=>{await setData({name: 'Город', data: element});window.location.reload()}}>{element}</Link></li>
                                                    else
                                                        return null
                                                })}
                                                <li style={{margin: '5px'}}><a href='https://kassir.kz/'>Алматы</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <Link to='/' onClick={()=>{window.location.reload()}}>
                                    <a className='logo'>
                                        <img width={190} src={logoMain} alt='Логотип' />
                                    </a>
                                </Link>
                            </div>
                            <div className='col-md-5 col-lg-6'>
                                <div className='tagline'>
                                    <p>{lang==='ru'? 'Живи интенсивней!' : 'Живи интенсивней!'}</p>
                                </div>
                                <form action='#' className='search'>
                                    <div className='form-group'>
                                        <input type='text' value={search} onChange={handleSearch} placeholder={lang==='ru'? 'Найти билеты ...' : 'Билеттерди табуу...'} />
                                        <div className='search-icon'><i /></div>
                                    </div>
                                </form>
                            </div>
                            <div className='col-md-3'>
                                <div className='user'>
                                        <span className={lang==='kg'?'selected-text':'dont-selected-text'} onClick={()=>{setData({name: 'Язык', data: 'kg'})}} style={{marginRight: '10px'}}>Kg</span>
                                        <span className={lang==='ru'?'selected-text':'dont-selected-text'} onClick={()=>{setData({name: 'Язык', data: 'ru'})}} style={{marginRight: '10px'}}>Ru</span>
                                    {!authenticated?
                                        <>
                                        <div className='auth'>
                                            <a data-toggle='modal' className='dont-selected-text' data-target='#exampleModal'>{lang==='ru'?'Войти':'Кирүү'}</a>
                                        </div>
                                        </>
                                        :
                                        <>
                                        <div className='auth'>
                                            <a className='dont-selected-text' onClick={()=>{logout()}}>{lang==='ru'?'Выйти':'Чыгуу'}</a>
                                        </div>
                                        <Link to='/profile' onClick={()=>{scrollToTop()}}>
                                            <a className='cart'>
                                            </a>
                                        </Link>
                                        </>
                                    }
                                    </div>
                                <div className='phone'>
                                    <div className='number'>
                                        {(phones).map((element, idx) => {
                                            if(idx<3) return <a href={'tel:'+element.phone}>{element.phone}</a>
                                            else return null
                                        })}
                                    </div>
                                    <div className='email'>
                                        {emails.length>0?<a href={'mailto:'+emails[0].email}>{emails[0].email}</a>:null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {mainWindow.current==undefined||mainWindow.current.offsetWidth>700?
                    <div className='bottom'>
                    <div className='container'>
                        <ul>
                            <ul className='bottom-menu'>
                                <li><Link onClick={()=>{setData({name: 'Дата', data: ''});setData({name: 'Поиск', data: ''});setData({name: 'Жанр', data: 'Концерты'})}} to='/events'><a>{lang==='ru'? 'Концерты' : 'Концерты'}</a></Link></li>
                                <li><Link onClick={()=>{setData({name: 'Дата', data: ''});setData({name: 'Поиск', data: ''})}} to='/cinema'><a>{lang==='ru'? 'Кино' : 'Кино'}</a></Link></li>
                                <li><Link onClick={()=>{setData({name: 'Дата', data: ''});setData({name: 'Поиск', data: ''});setData({name: 'Жанр', data: 'Мастер Классы'})}} to='/events'><a>{lang==='ru'? 'Мастер Классы' : 'Мастер Классы'}</a></Link></li>
                                <li><Link onClick={()=>{setData({name: 'Дата', data: ''});setData({name: 'Поиск', data: ''});setData({name: 'Жанр', data: 'Детям'})}} to='/events'><a>{lang==='ru'? 'Детям' : 'Детям'}</a></Link></li>
                                <li><Link onClick={()=>{setData({name: 'Дата', data: ''});setData({name: 'Поиск', data: ''});setData({name: 'Жанр', data: 'Спорт'})}} to='/events'><a>{lang==='ru'? 'Спорт' : 'Спорт'}</a></Link></li>
                                <li><Link onClick={()=>{setData({name: 'Дата', data: ''});setData({name: 'Поиск', data: ''});setData({name: 'Жанр', data: 'Туризм'})}} to='/events'><a>{lang==='ru'? 'Туризм' : 'Туризм'}</a></Link></li>
                            </ul>
                            <li className={props.location.pathname.split('/')[1].length>0?'toggle-filter':'toggle-filter open'}>
                                <a>
                                    <span className='dont-selected-text'>{lang==='ru'? 'Выбрать даты мероприятий' : 'Тандалган даталар'}</span>
                                </a>
                                <div className='filter'>
                                    <div>
                                        <div className='datepicker'>
                                        </div>
                                        <div className='field skin skin-flat'>
                                            <div className='checkbox icheck form-group'>
                                                <label htmlFor='week' className='icheck'>
                                                    <input tabIndex={9} type='checkbox' id='week' /> {lang==='ru'? 'На этой неделе' : 'Ушул жумада'}
                                                </label>
                                            </div>
                                        </div>
                                        <div className='field skin skin-flat'>
                                            <div className='checkbox icheck form-group'>
                                                <label htmlFor='weekend' className='icheck'>
                                                    <input tabIndex={6} type='checkbox' id='weekend' /> {lang==='ru'? 'В эти выходные' : 'Ушул дем алышта'}
                                                </label>
                                            </div>
                                        </div>
                                        <div className='field skin skin-flat'>
                                            <div className='checkbox icheck form-group'>
                                                <label htmlFor='nextWeek' className='icheck'>
                                                    <input tabIndex={6} type='checkbox' id='nextWeek' /> {lang==='ru'? 'На следующей неделе' : 'На следующей неделе'}
                                                </label>
                                            </div>
                                        </div>
                                        <div className='button-field'>
                                            <button className='btn btn-primary btn-lg btn-dark' onClick={()=>{
                                                let date = '';
                                                if(window.pickDates!==undefined&&window.pickDates[0]!==undefined){
                                                    let date1 = window.pickDates[0].split('.')
                                                    let date2 = window.pickDates[window.pickDates.length-1].split('.')
                                                    date = [date1[2]+'-'+date1[1]+'-'+date1[0]+'T00:00:00.000Z', date2[2]+'-'+date2[1]+'-'+date2[0]+'T00:00:00.000Z']
                                                } else {
                                                    let date1 = new Date().toISOString()
                                                    date1 = date1.split('T')
                                                    let date2 = new Date().toISOString()
                                                    date2 = date2.split('T')
                                                    date = [date1[0]+'T00:00:00.000Z', date2[0]+'T00:00:00.000Z']
                                                }
                                                setData({name: 'Поиск', data: ''})
                                                setData({name: 'Дата', data: date})
                                                props.history.push('/events');
                                            }}>{lang==='ru'? 'Найти билеты' : 'Билеттерди табуу'}</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                    :null}
            </header>
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
        userActions: bindActionCreators(userActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
