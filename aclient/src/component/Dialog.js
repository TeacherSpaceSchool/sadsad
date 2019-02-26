import React, { useState, useEffect } from 'react';
import { getOther } from '../redux/actions/app'
import { connect } from 'react-redux'
import * as appActions from '../redux/actions/app'
import * as userActions from '../redux/actions/user'
import { bindActionCreators } from 'redux'

const Dialog =  React.memo(
    (props) =>{
        const { lang } = props.app;
        const { signin, signup } = props.userActions;
        let [emailRecovery, setEmailRecovery] = useState('');
        let handleEmailRecovery =  (event) => {
            setEmailRecovery(event.target.value)
        };
        let [emailSignUp, setEmailSignUp] = useState('');
        let handleEmailSignUp =  (event) => {
            setEmailSignUp(event.target.value)
        };
        let [passSignUp, setPassSignUp] = useState('');
        let handlePassSignUp =  (event) => {
            setPassSignUp(event.target.value)
        };
        let [passSignUpRepeat, setPassSignUpRepeat] = useState('');
        let handlePassSignUpRepeat =  (event) => {
            setPassSignUpRepeat(event.target.value)
        };
        let [emailEnter, setEmailEnter] = useState('');
        let handleEmailEnter =  (event) => {
            setEmailEnter(event.target.value)
        };
        let [passEnter, setPassEnter] = useState('');
        let handlePassEnter =  (event) => {
            setPassEnter(event.target.value)
        };
        let sendEmailRecovery = async () => {
            await getOther({name: 'ВосстановлениеПароля', data: {email: emailRecovery}})
            window.location.reload()
        };
        useEffect(async ()=>{
        },[]);
        return (
            <>
                {/* Modal */}
                <div className='window-blur' />
                <div className='modal modal-auth fade' id='exampleModal' tabIndex={-1} role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
                    <div className='modal-dialog' role='document'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <ul className='nav nav-tabs' id='myTab' role='tablist'>
                                    <li className='nav-item'>
                                        <a className='nav-link active' id='home-tab' data-toggle='tab' href='#home' role='tab' aria-controls='home' aria-selected='true'>Регистрация:</a>
                                    </li>
                                    <li className='nav-item'>
                                        <a className='nav-link' id='profile-tab' data-toggle='tab' href='#profile' role='tab' aria-controls='profile' aria-selected='false'>{lang==='ru'? 'Войти' : 'Кирүү'}:</a>
                                    </li>
                                </ul>
                                <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                    <span aria-hidden='true'>×</span>
                                </button>
                            </div>
                            <div className='modal-body modal-body-auth'>
                                <div className='fields tab-content' id='myTabContent'>
                                    <div className=' tab-pane fade show active' id='home' role='tabpanel' aria-labelledby='home-tab'>
                                        <div className='modal-auth-form'>
                                            <div className='form-group'>
                                                <input className='form-control form-control-lg' placeholder='Email' id='RegistrationFormEmail' value={emailSignUp} onChange={handleEmailSignUp} type='text' maxLength={50} />
                                                <div className='error' id='RegistrationForm_email_em' style={{display: 'none'}} />
                                            </div>
                                            <div className='form-group'>
                                                <div className='input-group'>
                                                    <input className='form-control form-control-lg' placeholder='Пароль' value={passSignUp} onChange={handlePassSignUp} id='RegistrationForm_password' type='password' aria-autocomplete='list' />
                                                </div>
                                                <div className='error' id='RegistrationForm_password_em_' style={{display: 'none'}} />
                                            </div>
                                            <div className='form-group'>
                                                <div className='input-group'>
                                                    <input className='form-control form-control-lg' value={passSignUpRepeat} onChange={handlePassSignUpRepeat} placeholder={lang==='ru'? 'Повторите пароль' : 'Cырсөздү кайталаңыз'} id='RegistrationForm_cPassword' type='password' />
                                                </div>
                                                <div className='error' id='RegistrationForm_cPassword_em_' style={{display: 'none'}} />
                                            </div>
                                            <div className='registration_status' />
                                            <div className='form-group buttons'>
                                                <button
                                                    onClick={()=>{if(emailSignUp.length>0&&passSignUp.length>0&&passSignUpRepeat.length>0){if(passSignUpRepeat===passSignUp){signup({email: emailSignUp, password: passSignUp})} else {alert('Пароли не совпадают!!')}} else {alert('Заполните все поля!!')}}} className='btn btn-primary btn-lg'>Зарегистрироваться</button>
                                                <a className='btn btn-link btn-lg' data-dismiss='modal' data-toggle='modal' data-target='#passwordRecovery'>{lang==='ru'? 'Восстановить пароль' : 'Cөздү калыбына келтирүү'}</a>
                                            </div>
                                        </div>
                                    </div>{/*/-Регистрация*/}
                                    <div className='tab-pane fade' id='profile' role='tabpanel' aria-labelledby='profile-tab'>
                                        <div className='form modal-auth-form'>
                                            <div className='form-group'>
                                                <input className='form-control form-control-lg' value={emailEnter} onChange={handleEmailEnter} placeholder='Email' type='text' />
                                                <div className='error' style={{display: 'none'}} />
                                            </div>
                                            <div className='form-group'>
                                                <input className='form-control form-control-lg' value={passEnter} onChange={handlePassEnter} placeholder='Пароль' type='password' />
                                                <div className='error' style={{display: 'none'}} />
                                            </div>
                                            <div className='form-group buttons'>
                                                <button type='submit' onClick={()=>{if(emailEnter.length>0&&passEnter.length>0){signin({email: emailEnter, password: passEnter})} else {alert('Заполните все поля!!')}}} className='btn btn-primary btn-lg'>Войти</button>
                                                <a className='btn btn-link btn-lg' data-dismiss='modal' data-toggle='modal' data-target='#passwordRecovery'>{lang==='ru'? 'Восстановить пароль' : 'Восстановить пароль'}</a>
                                            </div>
                                        </div>
                                    </div>{/*/-Войти*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='modal modal-auth modal-recovery fade' id='passwordRecovery' tabIndex={-1} role='dialog' aria-labelledby='RecoveryModalLabel' aria-hidden='true'>
                    <div className='modal-dialog' role='document'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                    <span aria-hidden='true'>×</span>
                                </button>
                                <div className='modal-recovery-title'>{lang==='ru'? 'Восстановление пароля' : 'Сыр сөздү калыбына келтирүү'}:</div>
                            </div>
                            <div className='modal-body modal-body-auth modal-body-recovery'>
                                <div className='modal-auth-form modal-recovery-form'>
                                    <div className='form-group'>
                                        <input className='form-control form-control-lg' value={emailRecovery} onChange={handleEmailRecovery} placeholder='Email' type='text' maxLength={50} />
                                    </div>
                                    <div className='form-group buttons'>
                                        <button type='submit' className='btn btn-primary btn-lg' onClick={()=>{sendEmailRecovery()}}>{lang==='ru'? 'Восстановить пароль' : 'Cөздү калыбына келтирүү'}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
        userActions: bindActionCreators(userActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
