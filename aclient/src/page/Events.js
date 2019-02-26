import React, { lazy, Suspense, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import * as appActions from '../redux/actions/app'
import { bindActionCreators } from 'redux'

const GetEvents = lazy(() => import('../component/GetEvents'));
const RenderEvent = lazy(() => import('../component/RenderEvent'));

const Events = React.memo(
    (props) =>{
        const { city, date, genre } = props.app;
        const { getData, setData } = props.appActions;
        useEffect(async ()=>{
            if(genre.length>0)
                setData({name: 'Дата', data: ''})
        },[genre]);
        useEffect(async ()=>{
            await setData({name: 'События', data: []})
            await getData({name: 'События', data: {city: city, date: date, genre: genre, skip: 0}});
        },[city, date, genre]);
            return (
                <div>
                    <Suspense fallback={null}>
                        <RenderEvent nameRu={genre} nameKg={genre}/>
                    </Suspense>
                    <Suspense fallback={null}>
                        <GetEvents/>
                    </Suspense>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Events);
