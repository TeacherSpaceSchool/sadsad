import React, {useState, useEffect} from 'react';
import { getOther } from '../redux/actions/app'
import { connect } from 'react-redux'
import * as appActions from '../redux/actions/app'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { scrollToTop } from '../App'

const Faq =  React.memo(
    (props) =>{
        const { lang } = props.app;
        let [vacancies, setVacancies] = useState([]);
        useEffect(async ()=>{
            let data = await getOther({name: 'Вакансии'})
            for(let i=0; i<data.length; i++)
                if(data[i].requirementsRu!==undefined && !Array.isArray(data[i].requirementsRu)){
                    data[i].requirementsRu = data[i].requirementsRu.split('|')
                    data[i].dutiesRu = data[i].dutiesRu.split('|')
                    data[i].conditionsRu = data[i].conditionsRu.split('|')
                    data[i].requirementsKg = data[i].requirementsKg.split('|')
                    data[i].dutiesKg = data[i].dutiesKg.split('|');
                    data[i].conditionsKg = data[i].conditionsKg.split('|')
                }
            await setVacancies(data)
        },[]);
        return (
            <>
            <main class='main main-about'>
                <div class='container'>
                    <div class='row'>
                        <div class='col-12'>
                            {vacancies.length>0?vacancies.map((element) => {
                                return (
                                    <div class='vacancies-wrap'>
                                        <div class='vacancies-title'>
                                            <h1>{lang==='ru'? element.nameRu : element.nameKg}</h1>
                                        </div>
                                        <p><b>{lang==='ru'? 'Обязанности' : 'Милдеттери'}:</b></p>
                                        <ul>
                                            {(lang==='ru'? element.dutiesRu : element.dutiesKg).map((element) => {
                                                return (
                                                    <li>{element}</li>
                                                )
                                            })}
                                        </ul>
                                        <p><b>{lang==='ru'? 'Требования' : 'Талаптар'}:</b></p>
                                        <ul>
                                            {(lang==='ru'? element.requirementsRu : element.requirementsKg).map((element) => {
                                                return (
                                                    <li>{element}</li>
                                                )
                                            })}
                                        </ul>
                                        <p><b>{lang==='ru'? 'Условия' : 'Шарттары'}:</b></p>
                                        <ul>
                                            {(lang==='ru'? element.conditionsRu : element.conditionsKg).map((element) => {
                                                return (
                                                    <li>{element}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                )
                            }):null}
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
