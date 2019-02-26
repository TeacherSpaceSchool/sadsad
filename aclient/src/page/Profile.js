import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import * as appActions from '../redux/actions/app'
import { bindActionCreators } from 'redux'
import { getSecure } from '../redux/actions/app'
import { Link } from 'react-router-dom'

const Profile = React.memo(
    (props) =>{
        const { lang } = props.app;
        const { authenticated } = props.user;
        if(!authenticated) props.history.push('/');
        let [pass, setPass] = useState('');
        let handlePass =  (event) => {
            setPass(event.target.value)
        };
        let [name, setName] = useState('');
        let handleName =  (event) => {
            setName(event.target.value)
        };
        let [surname, setSurname] = useState('');
        let handleSurname =  (event) => {
            setSurname(event.target.value)
        };
        let [email, setEmail] = useState('');
        let handleEmail =  (event) => {
            setEmail(event.target.value)
        };
        let [phone, setPhone] = useState('');
        let handlePhone =  (event) => {
            setPhone(event.target.value)
        };
        let [balance, setBalance] = useState('');
        let [wallet, setWallet] = useState('');
        let setProfile = async () => {
            if(email.length>0&&name.length>0&&surname.length>0&&phone.length>0){
                let data = await getSecure({name: 'ИзменитьПрофиль', data: {email: email, name: name, surname: surname, phonenumber: phone, password: pass}})
                await setEmail(data.email)
                await setSurname(data.surname)
                await setName(data.name)
                await setPhone(data.phonenumber)
                await setPass('')
                await window.location.reload();
            } else alert( 'Заполните все поля!!!' );
        };
        useEffect(async ()=>{
            let data = await getSecure({name: 'Профиль'})
            setEmail(data.email)
            setSurname(data.surname)
            setName(data.name)
            setPhone(data.phonenumber)
            data = await getSecure({name: 'Баланс'})
            setWallet(data.wallet)
            setBalance(data.balance)
        },[]);
        return (
            <div className='main-buy page-profile'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 page-menu-wrap'>
                            <ul className='nav page-menu'>
                                <li className='active'><a>{lang==='ru'? 'Профиль' : 'Профиль'}</a></li>
                                <li><Link to='/historyevent'><a>{lang==='ru'? 'Заказы мероприятия' : 'Буйруктар ченөө'}</a></Link></li>
                                <li><Link to='/historycinema'><a>{lang==='ru'? 'Заказы кино' : 'Буйруктар кино'}</a></Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-md-5'>
                            <fieldset className='fields-change-pass'>
                                <legend>{lang==='ru'? 'Изменение пароля' : 'Пароль өзгөртүү'}</legend>
                                <div className='form-group'>
                                    <input value={pass} onChange={handlePass} className='form-control' type='text' placeholder={lang==='ru'? 'Новый пароль' : 'Пароль жаңы'} />
                                </div>
                            </fieldset>
                            <fieldset className='fields-contacts'>
                                <legend>{lang==='ru'? 'Контактные данные' : 'Байланыш маалыматтары'}</legend>
                                <div className='form-group'>
                                    <input value={name} onChange={handleName} className='form-control' type='text' placeholder={lang==='ru'? 'Имя' : 'Ысым'} />
                                </div>
                                <div className='form-group'>
                                    <input value={surname} onChange={handleSurname} className='form-control' type='text' placeholder={lang==='ru'? 'Фамилия' : 'Фамилия'} />
                                </div>
                                <div className='form-group'>
                                    <input value={email} onChange={handleEmail} className='form-control' type='text' placeholder='Email' />
                                </div>
                                <div className='form-group'>
                                    <input value={phone} onChange={handlePhone} className='form-control' type='text' placeholder={lang==='ru'? 'Номер телефона' : 'Телефон номуру'} />
                                </div>
                                <div className='form-group'>
                                    <input value={'Кошелек: '+wallet} className='form-control' type='text' placeholder={lang==='ru'? 'Кошелек' : 'Кошелек'} readonly/>
                                </div>
                                <div className='form-group'>
                                    <input value={'Баланс: '+balance+' сом'} className='form-control' type='text' placeholder={lang==='ru'? 'Баланс' : 'Баланс'} readonly/>
                                </div>
                            </fieldset>
                            <fieldset className='fields-agreement'>
                                <legend>{lang==='ru'? 'Условия договора' : 'Келишимдин шарттары'}</legend>
                                <div className='checkbox icheck form-group'>
                                    <label htmlFor='flat-checkbox-1' className='icheck'>
                                        {lang==='ru'? <>Согласен с <a href='#'>Правилами пользования интернет магазина</a></> : <>Мен колдонуу <a href='#'> онлайн дүкөндөн шарттары менен макул</a></>}
                                    </label>
                                </div>
                            </fieldset>
                            <div className='form-group field-button'>
                                <input className='btn btn-primary' type='submit' defaultValue={lang==='ru'? 'Сохранить изменения' : 'Сактоо өзгөртүүлөрдү'} onClick={()=>{setProfile()}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    })

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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
