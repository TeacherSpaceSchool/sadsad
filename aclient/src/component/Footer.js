import React, {useState, useEffect} from 'react';
import { getOther } from '../redux/actions/app'
import { connect } from 'react-redux'
import * as appActions from '../redux/actions/app'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { scrollToTop } from '../App'

const Footer =  React.memo(
    (props) =>{
        const { lang } = props.app;
        let [socials, setSocials] = useState([]);
        useEffect(async ()=>{
            let data = await getOther({name: 'Социалки'})
            if (data!=undefined)
                await setSocials(data)
        },[]);
        return (
            <>
            <footer className='footer'>
                <div className='container-fluid footer-cont'>
                    <div className='row'>
                        <div className='col-12 col-sm-3'>
                            <ul className='footer_menu'>
                                <li className='footer_menu-item'>
                                    <Link to='/about' onClick={()=>{scrollToTop()}}>
                                        {lang==='ru'? 'О компании' : 'Компания жөнүндө'}
                                    </Link>
                                </li>
                                <li className='footer_menu-item'>
                                    <Link to='/offer' onClick={()=>{scrollToTop()}}>
                                        {lang==='ru'? 'Публичная оферта' : 'Коомдук сунуш'}
                                    </Link>
                                </li>
                                <li className='footer_menu-item'>
                                    <Link to='/vacancies' onClick={()=>{scrollToTop()}}>
                                        {lang==='ru'? 'Вакансии' : 'Жумуш ордунда'}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className='col-12 col-sm-3'>
                            <ul className='footer_menu'>
                                <li className='footer_menu-item'>
                                    <Link to='/faq' onClick={()=>{scrollToTop()}}>
                                        {lang==='ru'? 'Вопросы и ответы' : 'Суроолор жана жооптор'}
                                    </Link>
                                </li>
                                <li className='footer_menu-item'>
                                    <Link to='/return' onClick={()=>{scrollToTop()}}>
                                            {lang==='ru'? 'Правила возврата' : 'Кайтаруу саясаты'}
                                    </Link>
                                </li>
                                <li className='footer_menu-item'>
                                    <Link to='/delivery' onClick={()=>{scrollToTop()}}>
                                        {lang==='ru'? 'Доставка билетов' : 'Билеттер жеткирүү'}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className='col-12 col-sm-3'>
                            <ul className='footer_menu'>
                                <li className='footer_menu-item'>
                                    <Link to='/logo' onClick={()=>{scrollToTop()}}>
                                        {lang==='ru'? 'Логотипы' : 'Логотип'}
                                    </Link>
                                </li>
                                <li className='footer_menu-item'>
                                    <Link to='/contacts' onClick={()=>{scrollToTop()}}>
                                        {lang==='ru'? 'Контакты' : 'Контакты'}
                                    </Link>
                                </li>
                                <li className='footer_menu-item'>
                                    <Link to='/halls' onClick={()=>{scrollToTop()}}>
                                        {lang==='ru'? 'Залы' : 'Зал'}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className='col-12 col-sm-3 social-icon-wrap'>
                            <h6 className='social-icon-title'>{lang==='ru'? 'ПОДПИСАТЬСЯ НА НАС' : 'Биз жазылуу'}</h6>
                            <div className='social-icon'>
                                {socials.map((element) => {
                                    return <a href={element.url} className='fb' style={{backgroundImage: 'url('+element.image+')'}} />
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='row copy-right-wrap'>
                        <div className='col-md-3 col-sm-4 copy-right'>2018 kassir.kg</div>
                        <div className='col-md-3 col-sm-2' />
                        <div className='col-md-3 col-sm-2' />
                        <div style={{color: 'white'}} className='col-md-3 col-sm-4'>Made by Daseron</div>
                    </div>
                </div>
            </footer>
            {/*/.Footer*/}
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
