import React, {useState, useEffect} from 'react';
import { getOther } from '../redux/actions/app'
import { connect } from 'react-redux'
import * as appActions from '../redux/actions/app'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { scrollToTop } from '../App'

const Cinema = React.memo(
    (props) =>{
        const { lang } = props.app;
        let [soon, setSoon] = useState([]);
        let [now, setNow] = useState([]);
        let getNow = async () => {
            let _now = now;
            let data = await getOther({name: 'КиноСейчас', data: {skip: _now.length}});
            if(data.length>0&&_now.filter(element => element._id === data[0]._id).length===0){
                _now = _now.concat(data);
                console.log(_now)
                setNow(_now);
            }
        }
        useEffect(async ()=>{
            let data = await getOther({name: 'КиноСкоро'});
            setSoon(data);
            data = await getOther({name: 'КиноСейчас', data: {skip: 0}});
            setNow(data);
        },[]);
        return (
                <main className='main main-kino'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xl-12 heading'>
                                <div className='heading-title_wrap heading-title_wrap-kino'>
                                    <h2>
                                        <span>{lang==='ru'? 'Сегодня в кино' : 'Кинотеатрында бүгүн'}</span>
                                    </h2>
                                </div>
                                <div className='heading-title_line' />
                            </div>{/* \-heading*/}
                        </div>{/* \-row */}
                        <div className='movies'>
                            <div className='row movies-row'>
                                {now.length>0?now.map((element) => {
                                    return(
                                        <div className='col-12 col-sm-4 col-md-3 movie-wrap'>
                                            <div className='movie'>
                                                <div className='movie_image'>
                                                    <Link onClick={()=>{scrollToTop()}} to={'/movie/'+element.name}>
                                                        <a>
                                                            <img src={element.image} alt />
                                                        </a>
                                                    </Link>
                                                </div>
                                                <div className='movie-info'>
                                                    <div className='movie_title'>
                                                        <Link onClick={()=>{scrollToTop()}} to={'/movie/'+element.name}>
                                                            <a>{element.name}</a>
                                                        </Link>
                                                    </div>
                                                    <div className='movie_genre'>
                                                        {element.genre}
                                                    </div>
                                                    <div className='movie_country'>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }):null}
                            </div>
                        </div>
                        <div className='row load-more-wrap'>
                            <div className='load-more-wrap'>
                                <div className='col-12 load-more'>
                                    <i className='load-more_loader load_more_loader_kino' />
                                    <div className='load-more_text-cinema' onClick={()=>{getNow()}}>{lang==='ru'? 'Загрузить еще' : 'Дагы'}</div>
                                </div>
                            </div>
                        </div>
                        <div className='row link-baner-wrap'>
                            <div className='col-12'>
                                <div className='link-baner'>
                                    <a>
                                        <img src='./img/movies-img/link-baner.jpg' alt />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-xl-12 heading'>
                                <div className='heading-title_wrap heading-title_wrap-kino'>
                                    <h2>
                                        <span>{lang==='ru'? 'Скоро в кино' : 'Киного жакында'}</span>
                                    </h2>
                                </div>
                                <div className='heading-title_line' />
                            </div>{/* \-heading*/}
                        </div>{/* \-row */}
                        <div className='movies'>
                            <div className='row movies-row'>
                                {soon.length>0?soon.map((element) => {
                                    return(
                                    <div className='col-12 col-sm-4 col-md-3 movie-wrap'>
                                        <div className='movie'>
                                            <div className='movie_image'>
                                                <a>
                                                    <img src={element.imageThumbnail} onLoad={(e)=>{if(e.target.src.includes('thumbnail')){e.target.src=element.image}}} alt />
                                                </a>
                                            </div>
                                            <div className='movie-info'>
                                                <div className='movie_title'>
                                                    <a>{element.name}</a>
                                                </div>
                                                <div className='movie_genre'>
                                                    {element.genre}
                                                </div>
                                                <div className='movie_country'>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                }):null}
                            </div>
                        </div>{/* \-movies*/}
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

export default connect(mapStateToProps, mapDispatchToProps)(Cinema);
