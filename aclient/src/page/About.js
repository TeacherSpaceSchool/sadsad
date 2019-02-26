import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import * as appActions from '../redux/actions/app'
import { bindActionCreators } from 'redux'
import { getOther } from '../redux/actions/app'

const About = React.memo(
    (props) =>{
        const { lang } = props.app;
        let [about, setAbout] = useState({descriptionRu: [], descriptionKg: []});
        useEffect(async ()=>{
            let data = await getOther({name: 'О нас'})
            if(data.descriptionRu!==undefined && !Array.isArray(data.descriptionRu)){
                data.descriptionRu = data.descriptionRu.split('|');
                data.descriptionKg = data.descriptionKg.split('|');
            }
            await setAbout(data)
        },[]);
        return (
            <main className='main main-about'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='about-wrap'>
                                <div className='about-title'>
                                    <h1>{lang==='ru'? 'О компании' : 'Долбоор жөнүндө'}</h1>
                                </div>
                                {about.descriptionRu!=undefined?(lang==='ru'? about.descriptionRu : about.descriptionKg ).map((element) => {
                                    return <p>{element}</p>
                                }):null}
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
