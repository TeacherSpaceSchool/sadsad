import React, {lazy, Suspense, useEffect} from 'react';
import { connect } from 'react-redux'
import * as appActions from '../redux/actions/app'
import { bindActionCreators } from 'redux'

const RenderEvent = lazy(() => import('../component/RenderEvent'));

const Events = React.memo(
    (props) =>{

        const { city, search } = props.app;
        const { getData, setData } = props.appActions;
        useEffect(async ()=>{
            await setData({name: 'Жанр', data: ''});
            await setData({name: 'Дата', data: ''});
            await setData({name: 'События', data: []});
            await getData({name: 'СобытиеПоНазванию', data: {city: city, search: search, skip: 0}});
        },[search]);
        if(search.length>0)
            return (
                <div>
                    <Suspense fallback={null}>
                        <RenderEvent nameRu='Поиск' nameKg='Поиск'/>
                    </Suspense>
                </div>
            );
        else
            props.history.push('/');
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
