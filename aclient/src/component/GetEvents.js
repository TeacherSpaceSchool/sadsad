import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import * as appActions from '../redux/actions/app'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { scrollToTop } from '../App'

const GetEvents =  React.memo(
    (props) =>{
        const { city, lang, events, date, genre } = props.app;
        const { getData } = props.appActions;
        return (
            <div className='row load-more-wrap'>
                <div className='load-more-wrap'>
                    <div className='col-12 load-more'>
                        <i className='load-more_loader'/>
                        <div className='load-more_text' onClick={
                            async ()=>{
                                await getData({name: 'События', data: {city: city, date: date, genre: genre, skip: events.length}});
                            }
                        }>
                            {lang==='ru'? 'Загрузить еще' : 'Дагы'}
                        </div>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GetEvents);
