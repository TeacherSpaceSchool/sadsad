import React, { lazy, Suspense, useEffect, useState } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from './redux/actions/app'
import * as userActions from './redux/actions/user'
import { Switch, withRouter, Route } from 'react-router-dom'
import { getOther } from './redux/actions/app'
import Main from './page/Main';
import Events from './page/Events';
import Header from './component/Header';
import Search from './page/Search';
import Dialog from './component/Dialog';

const Contact = lazy(() => import('./component/Footer'));
const Event = lazy(() => import('./page/Event'));
const Movie = lazy(() => import('./page/Movie'));
const SelectPlace = lazy(() => import('./page/SelectPlace'));
const Cinema = lazy(() => import('./page/Cinema'));
const Hall = lazy(() => import('./page/Hall'));
const Profile = lazy(() => import('./page/Profile'));
const History = lazy(() => import('./page/History'));
const History1 = lazy(() => import('./page/History1'));
const About = lazy(() => import('./page/About'));
const Delivery = lazy(() => import('./page/Delivery'));
const Logo = lazy(() => import('./page/Logo'));
const Faq = lazy(() => import('./page/Faq'));
const Vacancies = lazy(() => import('./page/Vacancies'));
const Contacts = lazy(() => import('./page/Contacts'));
const Halls = lazy(() => import('./page/Halls'));
const Return = lazy(() => import('./page/Return'));
const Offer = lazy(() => import('./page/Offer'));


export const mainWindow = React.createRef();
export const scrollToTop = () => {
    window.scrollTo(0, 0);
}

const App = React.memo(
    (props) =>{
        const { checkAuthenticated } = props.userActions;
        useEffect(async ()=>{
            checkAuthenticated();
            if(window.scrollBannerItems!==undefined&&window.scrollBannerItems['items'].length===0){
                let data = await getOther({name: 'БегущаяСтрока'});
                window.scrollBannerItems['items'] = [];
                if(data!=undefined&&data.length>0)
                    for (let i=0; i<data.length; i++){
                        window.scrollBannerItems['items'].push({
                            'img': data[i].image,
                            'link': data[i].link
                        })
                    }
            }
        },[])
        let [load, setLoad] = useState(true);
        useEffect(()=>{
            setTimeout(function() { //Start the timer
                setLoad(false)
            }.bind(this), 500)
        },[]);
        return (
            <div ref={mainWindow} className='App'>
                    <Header history = {props.history} location = {props.location}/>
                <div className='appBody'>
                    <Switch>
                        <Route  path='/' exact component={Main}/>
                        <Route  path='/faq' component={WaitingComponent(Faq, props.history, props.location)}/>
                        <Route  path='/about' component={WaitingComponent(About, props.history, props.location)}/>
                        <Route  path='/logo' component={WaitingComponent(Logo, props.history, props.location)}/>
                        <Route  path='/offer' component={WaitingComponent(Offer, props.history, props.location)}/>
                        <Route  path='/return' component={WaitingComponent(Return, props.history, props.location)}/>
                        <Route  path='/delivery' component={WaitingComponent(Delivery, props.history, props.location)}/>
                        <Route  path='/contacts' component={WaitingComponent(Contacts, props.history, props.location)}/>
                        <Route  path='/vacancies' component={WaitingComponent(Vacancies, props.history, props.location)}/>
                        <Route  path='/halls' component={WaitingComponent(Halls, props.history, props.location)}/>
                        <Route  path='/profile' component={WaitingComponent(Profile, props.history, props.location)}/>
                        <Route  path='/historycinema' component={WaitingComponent(History1, props.history, props.location)}/>
                        <Route  path='/historyevent' component={WaitingComponent(History, props.history, props.location)}/>
                        <Route  path='/events' component={Events}/>
                        <Route  path='/search' component={Search}/>
                        <Route  path='/hall' component={WaitingComponent(Hall, props.history, props.location)}/>
                        <Route  path='/event' component={WaitingComponent(Event, props.history, props.location)}/>
                        <Route  path='/selectplace' component={WaitingComponent(SelectPlace, props.history, props.location)}/>
                        <Route  path='/cinema' component={WaitingComponent(Cinema, props.history, props.location)}/>
                        <Route  path='/movie' component={WaitingComponent(Movie, props.history, props.location)}/>
                    </Switch>
                </div>
                <div className='arrow-top'>
                    <svg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 31.49 31.49' style={{enableBackground: 'new 0 0 31.49 31.49'}} xmlSpace='preserve'>
                        <path style={{fill: '#1E201D'}} d='M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z' />
                    </svg>
                </div>
                <Suspense fallback={null}>
                    <Contact/>
                </Suspense>
                    <Dialog/>
                {load?
                    <div className='lds-div'>
                        <div className='lds-hourglass'/>
                    </div>
                    :null
                }
            </div>
        );
    })

function WaitingComponent(Component, history, location) {
    return props => (
        <Suspense fallback={<div></div>}>
            <Component {...props}  history={history} location={location}/>
        </Suspense>
    );
}

function mapStateToProps (state) {
    return {
        user: state.user,
        app: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
