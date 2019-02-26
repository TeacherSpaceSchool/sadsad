import React, {useState, useEffect} from 'react';
import { getOther } from '../redux/actions/app'
import { connect } from 'react-redux'
import * as appActions from '../redux/actions/app'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { scrollToTop } from '../App'

const Logo =  React.memo(
    (props) =>{
        const { lang } = props.app;
        let [logos, setLogos] = useState({});
        let [email, setEmail] = useState({});
        useEffect(async ()=>{
            let data = await getOther({name: 'ЛогоДругие'})
            await setLogos(data)
            data = await getOther({name: 'Контакты'})
            await setEmail(data)
        },[]);
        return (
            <>
            <main className='main main-logo'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 logo-wrap'>
                            <div className='logo vert-logo'>
                                <p>{lang==='ru'? 'Блоки для вертикальных афиш' : 'Блоки для вертикальных афиш'}</p>
                                <img className='vert-img' width={253} src={logos.vertical} alt />
                            </div>
                            <div className='logo rect-logo'>
                                <p>{lang==='ru'? 'Блоки для квадратных афиш' : 'Блоки для квадратных афиш'}</p>
                                <img className='rect-img' width={398} src={logos.square} alt />
                            </div>
                            <div className=' logo horizont-logo'>
                                <p>{lang==='ru'? 'Блоки для горизонтальных афиш' : 'Блоки для горизонтальных афиш'}</p>
                                <img className='horizont-img' width={672} src={logos.horizontal} alt />
                            </div>
                            <hr />
                            <p><b>{lang==='ru'? 'Согласование блока на афише' : 'Согласование блока на афише'}</b></p>
                            <p>{lang==='ru'? 'Размещение блока на афише каждого мероприятия предварительно (до отправки афиш в печать) согласовывается с отделом маркетинга KASSIR.KG и менеджером проектов.' : 'Размещение блока на афише каждого мероприятия предварительно (до отправки афиш в печать) согласовывается с отделом маркетинга KASSIR.KG и менеджером проектов.'}</p>
                            <p>{lang==='ru'? 'Для согласования макет афиши в формате jpeg необходимо отправить на электронный адрес ' : 'Для согласования макет афиши в формате jpeg необходимо отправить на электронный адрес '}<a href='#'>{email.cooperation}</a></p>
                            <p>{lang==='ru'? 'Афиша считается согласованной только после получения письменного подтверждения.' : 'Афиша считается согласованной только после получения письменного подтверждения.'}</p>
                            <hr />
                            <p className='info-small'><b>{lang==='ru'? 'Если требуются нестандартные размеры блоков, логотипа, а также блоков с реквизитами для размещения в наружной рекламе просьба отправлять запрос по электронной почте на адрес ' : 'Если требуются нестандартные размеры блоков, логотипа, а также блоков с реквизитами для размещения в наружной рекламе просьба отправлять запрос по электронной почте на адрес '}<a href='#'>{email.cooperation}</a></b></p>
                        </div>
                    </div>
                </div>
            </main>
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

export default connect(mapStateToProps, mapDispatchToProps)(Logo);
