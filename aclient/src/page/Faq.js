import React, {useState, useEffect} from 'react';
import { getOther } from '../redux/actions/app'
import { connect } from 'react-redux'
import * as appActions from '../redux/actions/app'
import { bindActionCreators } from 'redux'

const Faq =  React.memo(
    (props) =>{
        const { lang } = props.app;
        let [faq, setFaq] = useState([]);
        useEffect(async ()=>{
            let data = await getOther({name: 'FAQ'})
            await setFaq(data)
        },[]);
        return (
            <>
            <main className='main main-about'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='faq-wrap'>
                                <div className='faq-title'>
                                    <h1>
                                        {lang==='ru'? 'Часто задаваемые вопросы' : 'Часто задаваемые вопросы'}
                                    </h1>
                                </div>
                                {faq.map((element, idx) => {
                                    return (
                                        <>
                                        <p><b>{(idx+1) + '. ' + (lang==='ru'? element.questionRu : element.questionKg)}</b></p>
                                        <p>{lang==='ru'? element.answerRu : element.answerKg}</p>
                                        </>
                                    )
                                })}
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Faq);
